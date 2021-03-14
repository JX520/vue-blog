<template>
  <div class="article-index">
    这是首页
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"])
  }
};
</script>

<style lang="scss" scoped>
// .article-index {
// }
</style>
