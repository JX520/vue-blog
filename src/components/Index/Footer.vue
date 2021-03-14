<template>
  <div class="footer">
    <div class="footer-item">
      <span>@2020-2021 By Jian</span>
      <a href="">
        <img src="../../assets/image/icp.png" alt="" />
        <span>皖ICP XXXXXXX</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {}
};
</script>
<style lang="scss" scoped>
.footer {
  &-item {
    padding: 7px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #49b1f5;
    color: whitesmoke;
    font-size: 0.7rem;
    a * {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
