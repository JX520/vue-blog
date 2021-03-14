<template>
  <div class="index">
    <!-- <navbar /> -->
    <!-- <div class="article-box"> -->
    <div class="layout">
      <div class="notice">
        <div class="notice-title">
          <span><i class="el-icon-sunny"></i>公告</span>
        </div>
        <div class="notice-text">
          专注 Java 后端开发，内容涵盖
          SpringBoot、并发编程、微服务、容器化、Linux 等技术分享。
        </div>
      </div>
      <el-row>
        <el-col :span="24" :xs="24"
          ><div class="article">
            <div
              class="article-item"
              v-for="(article, index) in articleLists"
              :key="article._id"
              @click="goDetail(article._id)"
            >
              <div
                class="article-item-left "
                :class="index % 2 !== 0 ? 'change-left' : 'change-right'"
              >
                <img
                  class="article-img"
                  src="../../assets/image/cover2.jpg"
                  alt=""
                />
              </div>
              <div class="article-item-right">
                <div class="article-title">
                  {{ article.title }}
                </div>
                <div class="article-time">
                  <span
                    ><i class="el-icon-loading"></i> {{ article.category }} /
                    {{ article.lables }}</span
                  >
                  <span
                    ><i class="el-icon-timer"></i> 发表于：{{
                      article.publishTime
                    }}</span
                  >
                  <span
                    ><i class="el-icon-view"></i>
                    {{ article.watchNum }} 次浏览</span
                  >
                </div>
                <div class="article-content">
                  {{ article.brief }}
                </div>
              </div>
            </div>
          </div></el-col
        >
        <!-- <el-col :span="6" :xs="0"
          ><div class="sidebar">
            <sidebar />
          </div></el-col
        > -->
      </el-row>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { getList } from "@/api/admin/article";
import Navbar from "@/components/Index/Navbar.vue";
import Sidebar from "@/components/Index/Sidebar.vue";
export default {
  name: "Index",
  components: {
    Navbar,
    Sidebar
  },
  data() {
    return {
      articleLists: [
        {
          id: 1,
          title: "本文向大家安利一下 JDK 8 中的并发工具类",
          img: require("../../assets/image/cover2.jpg"),
          category: "java",
          tag: "jdk",
          publishTime: "2020-12-12 12:12:12",
          viewNum: "3000",
          content:
            "一、前言 本文向大家安利一下 JDK 8 中的并发工具类CompletableFuture，利用它可以方便的进行并发、异步的流式、协调操作。" +
            "自从用了它，一下次就不想用CountdownLatch 和 Future 了，赶紧一起来了解下吧。 二、实例化CompletableFuture"
        },
        {
          id: 2,
          title: "本文向大家安利一下",
          img: require("../../assets/image/cover2.jpg"),
          category: "java",
          tag: "jdk",
          publishTime: "2020-12-12 12:12:12",
          viewNum: "3000",
          content:
            "一、前言 本文向大家安利一下 JDK 8 中的并发工具类CompletableFuture，利用它可以方便的进行并发、异步的流式、协调操作。" +
            "自从用了它，一下次就不想用CountdownLatch 和 Future 了，赶紧一起来了解下吧。 二、实例化CompletableFuture"
        },
        {
          id: 3,
          title: "JDK 8 中的并发工具类",
          img: require("../../assets/image/cover2.jpg"),
          category: "java",
          tag: "jdk",
          publishTime: "2020-12-12 12:12:12",
          viewNum: "3000",
          content:
            "一、前言 本文向大家安利一下 JDK 8 中的并发工具类CompletableFuture，利用它可以方便的进行并发、异步的流式、协调操作。" +
            "自从用了它，一下次就不想用CountdownLatch 和 Future 了，赶紧一起来了解下吧。 二、实例化CompletableFuture"
        },
        {
          id: 4,
          title: "本文向大家安利一下 JDK 8 中的并发工具类",
          img: require("../../assets/image/cover2.jpg"),
          category: "java",
          tag: "jdk",
          publishTime: "2020-12-12 12:12:12",
          viewNum: "3000",
          content:
            "一、前言 本文向大家安利一下 JDK 8 中的并发工具类CompletableFuture，利用它可以方便的进行并发、异步的流式、协调操作。" +
            "自从用了它，一下次就不想用CountdownLatch 和 Future 了，赶紧一起来了解下吧。 二、实例化CompletableFuture"
        }
      ],
      //查询条件
      query: {
        articleTitle: undefined,
        page: 1,
        num: 10,
        type: "get"
      }
    };
  },

  computed: {},

  created() {
    this.getArticleList();
  },

  //   mounted() {},

  methods: {
    //获取文章
    getArticleList() {
      getList(this.query)
        .then(res => {
          //   console.log(res);
          if (res.code === 0) {
            this.articleLists = res.result;
            this.total = res.count;
          } else this.$message.error(res.msg);
        })
        .catch(e => {
          console.log(e);
        });
    },

    //文章详情
    goDetail(id) {
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
.index {
  background: whitesmoke;
  //   min-height: 100%;
  .layout {
    // max-width: 1200px;
    margin: 0 auto;
    min-height: calc(100vh - 80px);
    padding: 2rem 10px;
    .notice {
      text-align: center;
      margin: 10px 0 50px 0;
      &-title {
        font-size: 2rem;
        color: red;
        letter-spacing: 2px;
        margin-bottom: 10px;
      }
      &-text {
        color: #999;
        font-weight: 600;
        font-size: 1.5rem;
      }
    }
    .article {
      height: 100%;
      margin-right: 15px;
      &-item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        height: 16rem;
        border-radius: 10px;
        border: 1px solid rgb(240, 230, 230);
        background: white;

        &-left {
          width: 45%;
          height: 100%;
          overflow: hidden;
          .article-img {
            width: 100%;
            height: 100%;
            // border-radius: 10px 0 0 10px;
          }
          .article-img:hover {
            cursor: pointer;
            transform: scale(1.5);
            transition: transform 1s ease;
          }
        }
        &-right {
          //   height: 100%;
          flex: 1;
          overflow: hidden;
          padding: 0 20px;
          .article-title {
            font-size: 1.5rem;
            // font-weight: 600;
            color: #1f2d3d;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            &:hover {
              color: #49b1f5;
              cursor: pointer;
            }
          }
          .article-time {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
            font-size: 0.8rem;
            font-weight: 600;
            color: rgb(126, 123, 123);
          }
          .article-content {
            color: #807e7e;
            line-height: 1.5;
            font-weight: 500;
            display: -webkit-box;
            overflow: hidden;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
        }
        &:hover {
          animation: article-large 0.5s ease;
          .article-item-left-img {
            // transform: scale(1.5);
            transition: transform 0.5s ease;
            border-radius: 10px 0 0 10px;
          }
          //   animation: article-large 0.2s ease-in;
          //   -webkit-backface-visibility: hidden;
          //   backface-visibility: hidden;
        }
      }
    }
  }
}
.change-left {
  order: 2;
  img {
    border-radius: 0 10px 10px 0;
  }
}
.change-right {
  img {
    border-radius: 10px 0 0 10px;
  }
}
@keyframes article-large {
  from {
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
    // transform: scale(0.95);
  }
  to {
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
    // transform: scale(1.5);
  }
}
</style>
