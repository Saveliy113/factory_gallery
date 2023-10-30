<template>
  <div class="container">
    <h1 v-if="isPicturesError" class="error__message">
      <span>🙁</span>Возникла ошибка при загрузке изображений. Попробуйте
      обновить страницу.
    </h1>
    <Transition name="loader">
      <loader
        id="pictures__loader"
        v-if="!pictures.length && isPicturesLoading"
      />
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
    <div class="observer" ref="observer" v-if="pictures.length !== 0"></div>
    <mini-loader
      class="mini-loader"
      :isLoading="isPicturesLoading && pictures.length > 0"
    />
    <scroll-button class="pictures__scroll" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "pictures-list",

  props: {
    currentRoute: {
      type: String,
      required: true,
    },
  },

  methods: {
    ...mapMutations({
      setPictures: "pictures/setPictures",
    }),
    ...mapActions({
      fetchPictures: "pictures/fetchPictures",
      loadMorePictures: "pictures/loadMorePictures",
    }),
  },

  computed: {
    ...mapState({
      searchQuery: (state) => state.pictures.searchQuery,
      pictures: (state) => state.pictures.pictures,
      isPicturesLoading: (state) => state.pictures.isPicturesLoading,
      isPicturesError: (state) => state.pictures.isPicturesError,
      noImagesLeft: (state) => state.pictures.noImagesLeft,
    }),
  },

  mounted() {
    if (
      (!this.searchQuery && this.currentRoute === "/") ||
      this.currentRoute === "/favorites"
    ) {
      this.fetchPictures(this.currentRoute);
    }

    let options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    let callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        console.log("INTERSECTED");
      }
      if (
        (entries[0].isIntersecting && this.searchQuery && !this.noImagesLeft) ||
        (entries[0].isIntersecting &&
          this.currentRoute === "/favorites" &&
          !this.noImagesLeft)
      ) {
        this.loadMorePictures(this.currentRoute);
      }
    };
    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },

  watch: {
    searchQuery(newSearchQuery) {
      this.fetchPictures(this.currentRoute);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  min-height: 150px;
  margin-top: 114px;
  padding-bottom: 50px;
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

  > .mini-loader {
    position: absolute;
    bottom: 0;
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

  > .picture__item {
    width: 473px;
    height: 440px;
    cursor: pointer;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  > .observer {
    width: 100%;
    height: 10px;
    background: green;
  }

  > .pictures__scroll {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
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
