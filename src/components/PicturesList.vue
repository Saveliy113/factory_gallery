<template>
  <div class="container">
    <loader v-if="isPicturesLoading" />
    <h1 v-if="isPicturesError" class="error__message">
      <span>🙁</span>Возникла ошибка при загрузке изображений. Попробуйте
      обновить страницу.
    </h1>
    <!-- <div v-for="picture in pictures" class="picture__item">
      <img v-for="picture in pictures" :src="pictures.urls.small" alt="" />
    </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import usePictures from "@/hooks/usePictures.js";

export default {
  name: "pictures-list",

  // setup(props) {
  //   const { pictures, isPicturesLoading, isPicturesError } = usePictures(8);
  //   console.log(pictures, isPicturesLoading);

  //   return {
  //     pictures,
  //     isPicturesLoading,
  //     isPicturesError,
  //   };
  // },

  methods: {
    ...mapMutations({
      setPictures: "pictures/setPictures",
    }),
    ...mapActions({
      fetchPictures: "pictures/fetchPictures",
    }),
  },

  computed: {
    ...mapState({
      searchQuery: (state) => state.pictures.searchQuery,
      pictures: (state) => state.pictures.pictures,
      isPicturesLoading: (state) => state.pictures.isPicturesLoading,
      isPicturesError: (state) => state.pictures.isPicturesError,
    }),
  },

  mounted() {
    this.fetchPictures();
  },

  watch: {
    searchQuery(newSearchQuery) {
      console.log("NEW SEARCH QUERY: ", newSearchQuery);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 27px;
  margin-top: 114px;
  border: 1px solid green;

  > .error__message {
    display: flex;
    flex-direction: column;
    font-size: 3rem;

    > span {
      display: block;
      font-size: 10rem;
    }
  }
  .picture__item {
    max-width: 473px;
    height: 440px;

    > img {
      width: 100%;
    }
  }
}
</style>
