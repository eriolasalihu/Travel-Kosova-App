<template>
  <body>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"
          ><Logo
        /></router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }">
            Home
          </router-link>
          <router-link class="link" :to="{ name: 'Cities' }">
            Cities
          </router-link>
          <router-link class="link" :to="{ name: 'Posts' }">
            Posts
          </router-link>
          <router-link class="link" :to="{ name: 'AboutUs' }">
            About Us
          </router-link>
          <router-link
            v-if="!user.profileId"
            class="link"
            :to="{ name: 'Login' }"
          >
            Login/Register
          </router-link>
          <router-link v-else class="link" :to="{ name: 'Profile' }">
            {{ user.profileUserName }}
          </router-link>
        </ul>
        <div
          v-if="user.profileId"
          @click="toggleProfileMenu"
          class="profile"
          ref="profile"
        >
          <span>{{ this.$store.state.profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p>
                  {{ this.$store.state.profileFirstName }}
                  {{ this.$store.state.profileLastName }}
                </p>
                <p>{{ this.$store.state.profileUserName }}</p>
                <p>{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <userIcon class="icon" />
                  <p>Profile</p>
                </router-link>
              </div>
              <div v-if="isAdmin" class="option">
                <router-link class="option" :to="{ name: 'Admin' }">
                  <adminIcon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>
              <div @click="signOut" class="option">
                <signOutIcon class="icon" />
                <p>Sign out</p>
              </div>
              <div class="darkmodeset">
                <label>Change theme</label>
                <Toggle mode="light" @toggle="$emit('toggle')" />       
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon class="menu-icon" @click="toggleMobileNav" v-show="mobile" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">
          Home
        </router-link>
         <router-link v-if="isAdmin" class="link" :to="{ name: 'Cities' }">
            Cities
          </router-link>
        <router-link class="link"  :to="{ name: 'Posts' }">
          Create Post
        </router-link>
         <router-link class="link" :to="{ name: 'AboutUs' }">
            About Us
          </router-link>
        <router-link
          v-if="!user.profileId"
          class="link"
          :to="{ name: 'Login' }"
        >
          Login/Register
        </router-link>
        <router-link v-else class="link" :to="{ name: 'Profile' }">
          <span> {{ user.profileUserName }} </span>
        </router-link>
      </ul>
    </transition>
  </body>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";
import Logo from "../assets/Logo.svg";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg";
import Toggle from "../components/Toggle.vue"

import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "navigation",

  components: {
    menuIcon,
    userIcon,
    adminIcon,
    signOutIcon,
    Logo,
    Toggle
  },

  data() {
    return {
      profileMenu: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      auth: null,
      currentUser: null,
    };
  },

  created() {
    if (!this.isAdmin) {
      this.$router.push({ name: "Home" });
    }
    this.checkScreen();
    window.addEventListener("resize", this.checkScreen);
  },
  computed: {
    isAdmin() {
      return this.$store.state.users.isAdmin;
    },
    user() {
      return this.$store.state.users.currentUser;
    },
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    signOut() {
      this.$store.commit("RESET_STATE");
      firebase.auth().signOut();
      this.$store.dispatch("signUserOut");
      window.location.reload();
    },
  },

};
</script>

<style lang="scss" scoped>

.dark nav{
  border-bottom: 3px solid white !important;
}

header {
  background-color: white;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1 rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.86);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0.8px;
    transition: 0.3s color ease;
    padding: 15px;

    &:hover {
      color: teal;
    }
  }

  .header {
    font-size: 25px;
  }
}

nav {
  display: flex;
  padding: 25px 0;
  border-bottom: 3px solid #303030 !important;

  .branding {
    display: flex;
    align-items: center;

    .header {
      font-weight: 600;
      font-size: 24;
      text-decoration: none;
      color: black;
    }
  }


  .nav-links {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;

    .ul {
      margin-right: 32px;

      .link {
        margin-right: 32px;
      }

      .link:last-child {
        margin-right: 0;
      }
    }

    .profile {
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #fff;
      background-color: #303030;

      span {
        pointer-events: none;
      }

      .profile-menu {
        position: absolute;
        z-index: 3;
        top: 60px;
        right: 0;
        width: 250px;
        background-color: #303030;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

        .info {
          display: flex;
          align-items: center;
          padding: 50px;
          border-bottom: 1px solid #fff;

          .initials {
            position: initial;
            width: 40px;
            height: 40px;
            background-color: #fff;
            color: #303030;
            display: flex;
            align-items: center;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
          }

          .right {
            flex: 1;
            margin-left: 24px;

            p:nth-child(1) {
              font-size: 14px;
            }

            p:nth-child(2),
            p:nth-child(3) {
              font-size: 12px;
            }
          }
        }

        .options {
          padding: 15px;
          .option {
            text-decoration: none;
            color: #fff;
            display: flex;
            align-items: center;
            margin-bottom: 12px;

            .icon {
              width: 18px;
              height: auto;
            }
            p {
              font-size: 14px;
              margin-left: 12px;
            }

            &:last-child {
              margin-bottom: 0px;
            }
          }
        }
      }
    }
  }
}

.menu-icon {
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 25px;
  height: 25px;
  width: auto;
}

.mobile-nav {
  padding: 20px;
  width: 70%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  background-color: #303030;
  top: 0;
  left: 0;
  z-index: 3;

  .link {
    padding: 15px 0;
    color: whitesmoke;
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: all 1s ease;
}

.mobile-nav-enter {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.mobile-nav-leave-to {
  transform: translateX(-250px);
}
</style>
