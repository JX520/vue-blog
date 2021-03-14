<template>
  <div class="category border-color">
    <h2 class="category-title">
      分类
    </h2>
    <div class="category-item">
      <el-tree
        :data="treeData"
        node-key="id"
        default-expand-all
        @node-click="handleClick"
        icon-class="el-icon-s-opportunity"
        :expand-on-click-node="false"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
import { getCategory } from "@/api/admin/category";
export default {
  components: {},
  data() {
    return {
      treeData: []
    };
  },

  computed: {},

  created() {
    this.getCategoryList();
  },

  mounted() {},

  methods: {
    //获取分类列表
    getCategoryList() {
      getCategory()
        .then(res => {
          this.treeData = res.result[0].list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(data) {
      console.log(data);
    }
  }
};
</script>
<style lang="scss" scoped>
.category {
  &-title {
    text-align: center;
  }
  &-item {
    ::v-deep .el-tree-node__content {
      margin: 3px;
      &:hover {
        .el-icon-s-opportunity:before {
          color: #ff7242;
          font-size: 1.4rem;
        }
      }
    }
    ::v-deep .el-icon-s-opportunity:before {
      color: #49b1f5;
      font-size: 1.4rem;
    }
  }
}
</style>
