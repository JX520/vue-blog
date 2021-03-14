<template>
  <section class="main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <!-- <el-collapse-transition>
      <router-view :key="key" />
    </el-collapse-transition> -->
  </section>
</template>

<script>
export default {
  name: "Main",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped>
.main {
  box-sizing: border-box;
  padding: 0 15px;
  min-height: calc(100vh - 80px);
}
</style>
