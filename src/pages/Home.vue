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
  <pictures-list />
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      searchQuery: (state) => state.pictures.searchQuery,
    }),
  },

  methods: {
    ...mapMutations({
      setSearchQuery: "pictures/setSearchQuery",
    }),
  },
};
</script>

<style lang="scss" scoped>
.search__wrapper {
  width: 100%;
  height: 268px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  border-bottom: 16px solid #c4c4c4;

  > .background {
    height: 268px;
    border: 1px solid green;
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
</style>
