<template>
  <!-- 归档页面 -->
  <div class="archive border-color">
    <div class="archive-title">
      全部文章：200
    </div>
    <article-card :lists="lists" :year="year"></article-card>
  </div>
</template>

<script>
import { getArchive } from "@/api/index";
import ArticleCard from "@/components/Index/ArticleCard";
export default {
  components: {
    ArticleCard
  },
  data() {
    return {
      year: 0,
      lists: []
    };
  },

  computed: {},

  created() {
    this.getArchiveList();
  },

  mounted() {},

  methods: {
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
    },

    detail(id) {
      this.$router.push({
        name: "ArticleDetail",
        params: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.archive {
  overflow: hidden;
  color: #4c4948;
  font-size: 1rem;
  &:hover {
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  }
  &-title {
    font-size: 1.4rem;
    font-weight: 500;
    &::before {
      font-family: "iconfont" !important;
      content: "\e630";
      width: 20px;
      height: 20px;
      color: #49b1f5;
    }
  }
  &-box {
    margin-left: 10px;
    padding-left: 20px;
    border-left: 1px solid #49b1f5;
    position: relative;
    padding-top: 10px;
    .archive-item {
      margin: 0 0 15px 15px;
      height: 80px;
      display: flex;
      align-items: center;
      .img {
        width: 80px;
        height: 80px;
        border-radius: 5px;
        object-fit: cover;
      }
      &-right {
        position: relative;
        padding: 15px;
        height: 100%;
        display: flex;
        width: 100%;
        flex-direction: column;

        justify-content: space-around;
        &-title {
          font-size: 1rem;
          font-weight: 500;
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          color: #666;
          &:hover {
            // cursor: pointer;
            color: #49b1f5;
            transform: translateX(30px);
            transition: transform 1s ease;
          }
        }
        &-time {
          color: #858585;
          font-weight: 500;
          font-size: 0.8rem;
        }
      }
      &::before {
        position: absolute;
        // top: 50%;
        left: -0.5rem;
        content: "";
        width: 1rem;
        height: 1rem;
        border: 0.2rem solid #49b1f5;
        border-radius: 50%;
        background: white;
      }
      &:hover {
        cursor: pointer;
        &::before {
          border: 0.2rem solid #ff7242;
        }
      }
    }
    .archive-year {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      margin-bottom: 15px;
      &::before {
        content: "";
        position: absolute;
        left: calc(-0.5rem - 20px);
        border: 0.2rem solid #ff7242;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: white;
      }
    }
  }
}
</style>
