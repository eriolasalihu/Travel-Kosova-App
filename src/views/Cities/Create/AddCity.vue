<template>
  <body class="createPost">
    <form action="" @submit.prevent="createCity">
      <div class="container">
        <input
          required
          type="text"
          placeholder="Enter city name"
          v-model="city.name"
        />
        <textarea v-model="city.description" />
        <input
          required
          type="number"
          placeholder="Enter city rating"
          v-model="city.rating"
        />
        <button type="submit">Submit</button>
      </div>
    </form>
  </body>
</template>

<script>
import "firebase/auth";
import createCity from "../../../utility/City/createCity";

export default {
  data() {
    return {
      city: {
        description: "",
        imgPath: "",
        name: "",
        rating: null,
        insertedDate: new Date(),
      },
    };
  },
  methods: {
    async createCity() {
      try {
        const newCity = await createCity({
          ...this.city,
        });
        this.$router.push({
          name: "ViewCity",
          params: { id: newCity._id },
        });
      } catch (err) {
        console.log(`Errori te AddCity ${err}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dark body {
  background-color: #303030 !important;
}

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
