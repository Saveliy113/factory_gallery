<template>
  <div class="container">
    <h1 v-if="isPicturesError" class="error__message">
      <span>🙁</span>Возникла ошибка при загрузке изображений. Попробуйте
      обновить страницу.
    </h1>
    <Transition name="loader">
      <loader id="pictures__loader" v-if="isPicturesLoading" />
    </Transition>
    <TransitionGroup name="pictures">
      <div
        @click="$router.push(`/picture/${picture.id}`)"
        v-if="pictures.length > 0"
        v-for="picture in pictures"
        :key="picture.id"
        class="picture__item"
      >
        <img :src="picture.urls.regular" alt="" />
      </div>
    </TransitionGroup>
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
    if (!this.searchQuery) {
      this.fetchPictures();
    }
  },

  watch: {
    searchQuery(newSearchQuery) {
      this.fetchPictures();
    },
    // pictures(newPictures) {
    //   console.log("Received new pictures: ", newPictures);
    // },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  min-height: 150px;
  margin-top: 114px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 27px;
  border: 1px solid green;

  > #pictures__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
  }

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
    width: 473px;
    height: 440px;
    cursor: pointer;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /* apply transition to moving elements */
  > .pictures-move,
  > .pictures-enter-active,
  > .pictures-leave-active {
    transition: all 0.5s ease;
  }

  > .pictures-enter-from,
  > .pictures-leave-to {
    opacity: 0;
    transform: translateX(300px);
  }

  > .pictures-leave-active {
    position: absolute;
  }
  /*----------*/

  > .loader-enter-active,
  > .loader-leave-active {
    transition: opacity 0.3s ease;
  }

  > .loader-enter-from,
  > .loader-leave-to {
    opacity: 0;
  }
}
</style>
