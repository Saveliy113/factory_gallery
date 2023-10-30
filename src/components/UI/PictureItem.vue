<template>
  <div
    @click="$router.push(`/picture/${picture.id}`)"
    :key="picture.id"
    class="picture__item"
  >
    <blur-hash-image
      width="473"
      height="440"
      :hash="picture.blur_hash"
      :src="picture.urls.full"
      :alt="picture.alt_description"
    />
    <!-- <img :src="picture.urls.regular" alt="" /> -->
  </div>
</template>

<script>
export default {
  name: "picture-item",
  props: {
    picture: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.picture__item {
  width: 473px;
  height: 440px;
  cursor: pointer;

  > .parent {
    border: 1px solid green;
    width: 100%;
    height: 100%;

    > canvas,
    > img {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>
