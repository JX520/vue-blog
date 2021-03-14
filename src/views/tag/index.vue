<template>
  <div class="tag border-color">
    <h2 class="tag-title">
      标签
    </h2>
    <div class="tag-item-box">
      <span
        class="tag-item"
        v-for="(tag, index) in tags"
        :key="index"
        :style="{
          fontSize: randomNum(0.8, 2.5) + 'rem',
          color: randomColor()
        }"
        >{{ tag.name }}</span
      >
    </div>
  </div>
</template>

<script>
import { getTag } from "@/api/admin/tag";
export default {
  components: {},
  data() {
    return {
      tags: []
    };
  },

  computed: {},

  created() {
    this.getTagList();
  },

  mounted() {},

  methods: {
    //获取标签列表
    getTagList() {
      getTag({})
        .then(res => {
          this.tags = res.result[0].list;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.tag {
  &-title {
    text-align: center;
  }
  &-item-box {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    color: #999;
    .tag-item {
      box-sizing: border-box;
      padding: 5px;
      margin: 5px 10px;
      &:hover {
        cursor: pointer;
        color: #49b1f5;
        transform: scale(1.2);
        transition: transform 1s ease;
      }
    }
  }
}
</style>
