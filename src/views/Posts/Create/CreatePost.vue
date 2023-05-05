<template>
  <div class="container">
    <h1>Create Post</h1>
    <body class="createPost">
      <form action="" @submit.prevent="addPost">
        <div class="container">
          <input
            required
            type="text"
            placeholder="Enter blog title"
            v-model="post.blogTitle"
          />
          <textarea v-model="post.blogHTML" />
          <button type="submit">Submit</button>
        </div>
      </form>
    </body>
  </div>
</template>

<script>
import createPost from "../../../utility/Posts/createPost";

export default {
  name: "CreatePost",

  components: {},

  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
      post: {
        blogTitle: "",
        imgPath: "",
        blogHTML: "",
        insertedDate: new Date(),
      },
    };
  },

  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
    },

    async addPost() {
      try {
        const newpost = await createPost({
          ...this.post,
        });
        this.$router.push({ name: "View", params: { id: newpost._id } });
      } catch (error) {
        console.log(`Errori: ${error}`);
      }
    },

    openPreview() {
      this.$store.commit("openPhotoPreview");
    },
  },

  computed: {
    profileId() {
      return this.$store.state.profileId;
    },

    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },

    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);
      },
    },
  },
};
</script>

<style lang="scss">
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
