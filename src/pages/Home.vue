<template>
  <div class="search__wrapper">
    <div class="background">
      <img src="@/assets/search_background.jpg" alt="Search Background" />
    </div>
    <search-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
    ></search-input>
  </div>
  <h1 v-if="pictures.length === 0 && noImagesLeft">
    По вашему запросу картинок не найдено
  </h1>
  <pictures-list :pictures="pictures" />
  <div class="observer" ref="observer"></div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      isRandom: (state) => state.pictures.isRandom,
      isPicturesError: (state) => state.pictures.isPicturesError,
      searchQuery: (state) => state.pictures.searchQuery,
      pictures: (state) => state.pictures.pictures,
      noImagesLeft: (state) => state.pictures.noImagesLeft,
    }),
  },

  methods: {
    ...mapMutations({
      setSearchQuery: "pictures/setSearchQuery",
    }),
    ...mapActions({
      fetchPictures: "pictures/fetchPictures",
      loadMorePictures: "pictures/loadMorePictures",
    }),

    initializeIntersectionObserver() {
      let options = {
        rootMargin: "0px",
        threshold: 1.0,
      };
      let callback = (entries) => {
        if (entries[0].isIntersecting && this.pictures.length > 0) {
          this.loadMorePictures("/");
        }
      };

      let observer = new IntersectionObserver(callback, options);
      this.$nextTick(() => {
        observer.observe(this.$refs.observer);
      });
    },
  },

  mounted() {
    if (!this.searchQuery || !this.isRandom) {
      this.fetchPictures("/");
    }
    this.initializeIntersectionObserver();
  },

  watch: {
    searchQuery(newSearchQuery) {
      this.fetchPictures("/");
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 3rem;
}
.search__wrapper {
  width: 100%;
  height: 268px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 16px solid #c4c4c4;
  > .background {
    height: 268px;
    position: absolute;
    z-index: -1;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
}
.observer {
  width: 100%;
  height: 5px;
}
</style>
