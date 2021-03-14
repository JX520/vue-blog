<template>
  <div class="search border-color">
    <article-card :lists="lists" :year="year"></article-card>
  </div>
</template>

<script>
import { getCategory } from "@/api/admin/category";
import ArticleCard from "@/components/Index/ArticleCard";
import { getArchive } from "@/api/index";
export default {
  components: {
    ArticleCard
  },
  data() {
    return {
      treeData: [],
      label: "",
      lists: [],
      year: 0
    };
  },

  computed: {},

  created() {
    this.getCategoryList();
    this.label = this.$route.params.label;
    this.getArchiveList();
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
    },
    //获取归档列表
    getArchiveList() {
      getArchive({
        type: "history"
      })
        .then(res => {
          //   console.log(res);
          this.lists = res.result.reverse();
          this.year = res.result.reverse()[0].publishTime.split("-")[0];
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.search {
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
