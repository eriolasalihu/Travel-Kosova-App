<template>
  <div class="createPost">
    <div class="d-flex justify-content-center">
      <v-btn class="primary-btn" tile @click="onGastronomy">
        <v-icon left>
          mdi-plus
        </v-icon>
        Create Gastronomy
      </v-btn>
      <v-btn class="primary-btn" tile @click="onPlace">
        <v-icon left>
          mdi-plus
        </v-icon>
        Create Place
      </v-btn>
    </div>
    <form action="" @submit.prevent="editCity">
      <div class="container">
        <input
          required
          type="text"
          placeholder="Enter city name"
          v-model="name"
        />
        <textarea v-model="description" />
        <input
          required
          type="number"
          placeholder="Enter city rating"
          v-model="rating"
        />
        <button type="submit">Save Changes</button>
      </div>
    </form>
  </div>
</template>

<script>
import "firebase/auth";

export default {
  data() {
    return {
      id: null,
      description: "",
      name: "",
      rating: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getCity();
    this.description = this.currentCity.description;
    this.name = this.currentCity.name;
    this.rating = this.currentCity.rating;
  },
  computed: {
    currentCity() {
      return this.$store.state.cities.city;
    },
  },
  methods: {
    getCity() {
      this.$store.dispatch("getCity", this.id);
    },
    onGastronomy() {
      this.$router.push({ name: "CityGastronomyForm", id: this.id });
    },
    onPlace() {
      this.$router.push({ name: "CityPlaceForm", id: this.id });
    },
    editCity() {
      const updatedCity = {
        description: this.description,
        name: this.name,
        rating: this.rating,
        updatedDate: new Date(),
      };
      this.$store
        .dispatch("editCity", { city: updatedCity, id: this.id })
        .then(() => {
          this.$store.dispatch("getCity", this.id);
          this.$router.push({ name: "Cities" });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 900px) {
  .createPost {
    justify-content: center !important;
    margin-right: 0%;
    margin-left: 0%;
  }
}

.createPost {
  @media (max-width: 900px) {
    .container {
      width: 100% !important;
      flex-wrap: nowrap;
      justify-content: center;
    }
  }

  margin-right: 5%;
  margin-left: 1%;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px;

  .container {
    padding: 30px;
    margin-top: 3%;
    margin-bottom: 3%;
    width: 160%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid gray;
    border-top: 5px solid #178658;
    border-radius: 10px;

    input {
      border-bottom: 1px solid gray;
      font-size: 20px;
      height: 20%;
      width: auto;
      padding: 7px;
      margin-bottom: 3%;
      margin-top: 3%;
    }

    textarea {
      font-size: 20px;
      height: 20%;
      width: auto;
      padding: 15px;
      box-sizing: border-box;
      /* border: 3px solid black; */
      margin-bottom: 3%;
      border-radius: 10px;
      margin-top: 3%;
      box-shadow: 0px 0px 4px 3px #d0cbcb;
    }
    button {
      border: 2px solid #178658;
      color: #d0a650;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin-bottom: 3%;
      margin-top: 3%;
      border-radius: 10px;
    }
  }
}
</style>
