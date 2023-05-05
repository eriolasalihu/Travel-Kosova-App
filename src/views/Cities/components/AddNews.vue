<template>
  <div class="container">
    <h1 class="mt-2">Add News</h1>
    <div class="createPost">
      <form action="" @submit.prevent="addNews">
        <div class="container">
          <input required type="text" placeholder="Title" v-model="title" />
          <textarea placeholder="News..." v-model="description" />
          <input required placeholder="Author" v-model="author" />
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
import "firebase/auth";

export default {
  name: "CityNewsForm",
  data() {
    return {
      title: "",
      description: "",
      author: "",
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    addNews() {
      const cityNews = {
        title: this.title,
        description: this.description,
        author: this.author,
        insertedDate: new Date(),
      };

      this.$store
        .dispatch("addCityNews", { cityNews: cityNews, id: this.id })
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
  margin-left: 5%;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding: 15px;

  .container {
    padding: 15px;
    margin-top: 3%;
    margin-bottom: 3%;
    width: 160%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    input {
      border: 1px solid black;
      font-size: 20px;
      height: 20%;
      width: auto;
      padding: 15px;
      margin-bottom: 3%;
      margin-top: 3%;
    }

    textarea {
      font-size: 20px;
      height: 20%;
      width: auto;
      padding: 15px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border: 3px solid black;
      margin-bottom: 3%;
      margin-top: 3%;
    }
    button {
      background-color: black;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin-bottom: 3%;
      margin-top: 3%;
    }
  }
}
</style>
  