<template>
  <div class="container-fluid cityContainer">
    <div class="cityHero">
      <div class="imgShadow">
        <img
          :src="require('../../../assets/blogPhotos/designed-for-everyone.jpg')"
          :alt="this.currentCity.id"
          :onerror="replaceByDefault"
          class="cityMainImage"
        />
      </div>
      <h1 class="cityName">News</h1>
    </div>
    <div class="descriptionContainer">
      <h2>
        All of {{ cityName }}'s experiences are tailored to each individual
        guest – ensuring you’ll remember them for a lifetime. From skiing to
        wild truffle hunting, the surrounding landscape offers an array of
        activities for all four seasons.
      </h2>
    </div>
    <div class="container-fluid citySubmenu">
      <h2>Visit {{ cityName }}</h2>
    </div>
    <div class="cityMainContent">
      <div class="cityTopPlacesContainer">
        <!-- 1 -->
        <div class="col col-lg-5 col-12 cityTopPlacesBox">
          <div class="container boxContainer">
            <h2>{{ cityName }}'s top Restaurants and Bars!</h2>
            <hr />
            <h4>
              Experience modern local dishes and breathtaking views at our
              favourite restaurant, {{ cityName }}'s best restaurant, where the
              menu is created by executive and professional chefs.
            </h4>
            <p>Location: {{ cityName }}</p>
            <button class="btn seeMoreBtn">See More</button>
          </div>
        </div>
        <div class="col col-lg-5 col-12 cityTopPlacesBox">
          <div class="container boxContainerImg">
            <img
              :src="require('../../../assets/blogPhotos/gastronomy1.jpg')"
              :alt="currentCity.id"
              :onerror="replaceByDefault"
              class="topPlacesImg"
            />
          </div>
        </div>
      </div>
      <div v-for="news in cityNews" :key="news._id">
        <div class="cityTopPlacesContainer">
          <!-- 1 -->
          <div class="col col-lg-5 col-12 cityTopPlacesBox">
            <div class="container boxContainer">
              <h2>{{ news.title }}</h2>
              <hr />
              <h4>{{ news.description }}</h4>
              <p>Location: {{ news.author }}</p>
              <button class="btn seeMoreBtn">See More</button>
            </div>
          </div>
          <div class="col col-lg-5 col-12 cityTopPlacesBox">
            <div class="container boxContainerImg">
              <img
                :src="require('../../../assets/blogPhotos/gastronomy2.jpg')"
                :alt="currentCity.id"
                :onerror="replaceByDefault"
                class="topPlacesImg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <TreeLogo />
    </div>
    <div class="descriptionContainer">
      <h2>
        “Cities, like dreams, are made of desires and fears, even if the thread
        of their discourse is secret, their rules are absurd, their perspectives
        deceitful, and everything conceals something else.”
      </h2>
      <h5>― Italo Calvino, Invisible Cities</h5>
    </div>
  </div>
</template>

<script>
import TreeLogo from "../../../assets/Icons/tree.svg";

export default {
  name: "CityExperiences",
  components: {
    TreeLogo,
  },
  data() {
    return {
      imgError: false,
      id: null,
      cityName: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.fetchCityNews();
    this.cityName = this.$store.state.cities.city.name;
  },
  computed: {
    loading() {
      return this.$store.state.cities.loading;
    },
    currentCity() {
      return this.$store.state.cities.city;
    },
    cityNews() {
      return this.$store.state.cities.cityNews;
    },
  },
  methods: {
    replaceByDefault(e) {
      e.target.src = this.defaultImg;
    },
    fetchCityNews() {
      this.$store.dispatch("getCityNews", this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
@import "../../../assets/sass/_variables.scss";

* {
  font-family: $secondary-font, serif;
}
.cityContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 0;

  hr {
    color: #1a4531;
    opacity: 1;
  }

  .cityHero {
    width: 100%;

    .cityName {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      position: absolute;
      top: 25%;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 9vw;
      color: #fff;
      z-index: 2;
    }
  }

  .imgShadow {
    width: 100%;
    box-shadow: 100vw 0px 10px rgba(0, 0, 0, 0.8) inset;

    .cityMainImage {
      opacity: 0.5;
      flex-shrink: 0;
      min-width: 100%;
      max-height: 100vh;
      object-fit: cover;
    }
  }

  .descriptionContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 5rem;

    h2 {
      font-family: $secondary-font, serif;
      font-weight: 400;
      text-align: center;
    }
    h5 {
      margin-top: 2rem;
      text-align: center;
    }
  }

  .citySubmenu {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: #1a4531;
    min-height: 5rem;
  }

  .cityMainContent {
    padding: 2rem;
    width: 100%;

    .cityTopPlacesContainer {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .cityTopPlacesBox {
        min-height: 30rem;
        margin: 2rem 1rem;
        background-color: #fff;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

        .boxContainer {
          display: flex;
          justify-content: space-evenly;
          flex-direction: column;
          height: 100%;
          padding: 2rem 4rem;

          .seeMoreBtn {
            background-color: #1a4531;
            padding: 1rem 2rem;
            color: #fff;

            &:focus {
              box-shadow: 0 0 0 0.25rem rgba(26, 69, 49, 0.25);
            }
          }
        }
        .boxContainerImg {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 0;
          img {
            height: 100%;
            object-fit: contain;
          }
        }
      }
      .cityTopPlacesImg {
        max-width: 40%;
        img {
          object-fit: cover;
        }
      }
    }
  }

  .cityColumns {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0;
    width: 100%;

    .cityOptions {
      height: 40rem;
      margin: 0.5rem 0;
      border: 0.5rem solid #fff;
    }
    .mosques {
      background-image: url("../../../assets/blogPhotos/mosques.jpg");
    }
    .hiking {
      background-image: url("../../../assets/blogPhotos/hiking.jpg");
    }
    .museums {
      background-image: url("../../../assets/blogPhotos/museums.jpg");
    }
    .nature {
      background-image: url("../../../assets/blogPhotos/nature.jpg");
    }
    .artifacts {
      background-image: url("../../../assets/blogPhotos/stock-5.jpg");
    }
    .lakes {
      background-image: url("../../../assets/blogPhotos/stock-3.jpg");
    }
    .mosques,
    .hiking,
    .nature,
    .artifacts,
    .lakes,
    .museums {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-position: 50% 50%;
      background-size: cover;
      box-shadow: 100vw 0px 10px rgba(0, 0, 0, 0.5) inset;
      transition: box-shadow 0.5s;
      cursor: pointer;
      background-position: bottom;

      &:hover {
        box-shadow: 100vw 0px 10px rgba(0, 0, 0, 0.4) inset;
        transition: box-shadow 0.5s;
      }
    }
  }
}
</style>
