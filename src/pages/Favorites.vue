<template>
  <div class="container">
    <h1>Избранное</h1>
    <h1 v-if="pictures.length === 0 && noImagesLeft">
      У вас нет картинок в избранных
    </h1>
    <pictures-list :pictures="pictures" />
    <div class="observer" ref="observer"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      isRandom: (state) => state.pictures.isRandom,
      pictures: (state) => state.pictures.pictures,
      noImagesLeft: (state) => state.pictures.noImagesLeft,
    }),
  },

  methods: {
    ...mapActions({
      fetchPictures: "pictures/fetchPictures",
      loadMorePictures: "pictures/loadMorePictures",
    }),

    initializeIntersectionObserver() {
      let options = {
        rootMargin: "0px",
        threshold: 1.0,
      };
      let callback = (entries, observer) => {
        if (entries[0].isIntersecting && this.pictures.length > 0) {
          this.loadMorePictures("/favorites");
        }
      };

      let observer = new IntersectionObserver(callback, options);
      this.$nextTick(() => {
        observer.observe(this.$refs.observer);
      });
    },
  },

  mounted() {
    if (this.isRandom) {
      this.fetchPictures("/favorites");
    }

    this.initializeIntersectionObserver();
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 0 !important;
  padding-top: 5rem;
  border: 1px solid blue;
  font-size: 2rem;
  color: black;

  > h1 {
    margin-bottom: 50px;
    font-size: 4.5rem;

    &:nth-child(2) {
      font-size: 3rem;
      margin-top: 100px;
      color: rgba(0, 0, 0, 0.72);
    }
  }
}

@media screen and (max-width: 480px) {
  .container {
    > h1 {
      font-size: 2.25rem;

      &:nth-child(2) {
        font-size: 1.8rem;
      }
    }
  }
}
</style>
