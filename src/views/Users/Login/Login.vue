<template>
  <body class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">
          <h2>
            Register
          </h2>
        </router-link>
      </p>
      <h2>
        Login to KosovoTravelBlog
      </h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon" />
        </div>
        <div class="error" v-if="error">
          {{ this.errorMsg }}
        </div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">
        Forgot your password?
      </router-link>
      <button @click.prevent="signIn">
        Sign in
      </button>
    </form>
    <div class="background"></div>
  </body>
</template>

<script>
import email from "../../../assets/Icons/envelope-regular.svg";
import password from "../../../assets/Icons/lock-alt-solid.svg";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",

  components: {
    email,
    password,
  },

  data() {
    return {
      email: null,
      password: null,
      error: false,
      errorMsg: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.users.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    signIn() {
      const user = {
        email: this.email,
        password: this.password,
      };
      if (this.email === null || this.password === null) {
        this.error = true;
        this.errorMsg = "Email and Password must be filled!";
      } else {
        firebase
          .auth()
          .signInWithEmailAndPassword(user.email, user.password)
          .then(() => {
            this.error = false;
            this.errorMsg = null;
            this.$store.dispatch("getCurrentUser");
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            this.error = true;
            this.errorMsg = err.message;
          });
      }
    },
  },
};
</script>

<style lang="scss">
.dark a{
  color: white !important;
  font-size: 20px !important;
}

.dark button{
  background-color: white;
}
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  widows: 90%;

  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: black;
    }

    h2 {
      font-size: 20px;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }
    .error {
      color: red;
    }
    .forgot-password {
      text-decoration: none;
      color: black;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }
  }
}
</style>
