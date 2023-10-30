<template>
  <MainHeader />
  <!-- <router-view /> -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";

export default {
  components: {
    MainHeader,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Roboto, sans-serif;
}

a {
  color: unset;
  text-decoration: none;
  cursor: pointer;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-bottom: 200px;
  color: #2c3e50;
}

.container {
  max-width: 1479px;
  margin: 0 auto;
  padding: 0 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
