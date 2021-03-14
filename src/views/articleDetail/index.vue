<template>
  <div class="article">
    <div class="article-header">
      <h1 class="article-header-title">{{ detail.title }}</h1>
      <div class="article-header-tip">
        <div>
          <span>
            <i class="el-icon-s-promotion"> </i> {{ detail.category }} >
            {{ detail.lables }} |
          </span>
        </div>
        <div>
          <span>
            <i class="el-icon-timer"> </i> 发表于：{{ detail.publishTime }}
          </span>
        </div>
      </div>
      <div class="article-header-tip">
        <div>
          <span>
            <i class="el-icon-s-order"> </i> 字数：{{ detail.watchNum }} |
          </span>
        </div>
        <div>
          <span>
            <i class="el-icon-watch-1"></i> 阅读时长：{{ detail.watchNum }}分钟
            |
          </span>
        </div>
        <div>
          <span>
            <i class="el-icon-view"> </i> 浏览：{{ detail.watchNum }} |
          </span>
        </div>
        <div>
          <span>
            <i class="el-icon-chat-line-round"> </i> 评论：{{ detail.watchNum }}
          </span>
        </div>
      </div>
    </div>
    <div class="markdown-body">
      <div ref="content" class="renderNav" v-html="html" v-highlight></div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/admin/article";
// import highlight from "highlight.js";
import marked from "marked";
import "highlight.js/styles/monokai-sublime.css";
export default {
  components: {},
  data() {
    return {
      id: 0,
      html: "",
      detail: ""
    };
  },

  computed: {},

  created() {
    this.id = this.$route.params.id;
    this.getDetail();
  },

  mounted() {},

  methods: {
    //获取文章详情
    getDetail() {
      getArticle({
        id: this.id,
        type: "detail"
      })
        .then(res => {
          //   console.log(res);
          this.detail = res.result[0];
          this.html = res.result[0].detail;
          //   console.log(marked(res.result[0].detail).innerHTML);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.markdown-body {
  .renderNav {
    margin: 40px 0;
    pre {
      display: block;
      font-family: consolas, Menlo, "PingFang SC", "Microsoft YaHei", sans-serif !important;
      overflow: auto;
      font-weight: 300;
      font-family: Menlo, monospace;
      border-radius: 0.3rem;
      margin: 0.5rem;
      background-color: black;
      color: whitesmoke;
    }

    code {
      display: inline-block;
      border-radius: 0.3rem;
      font-size: 0.9rem;
      padding: 5px;
      margin: 0 3px;
      background-color: black;
      color: rgb(221, 219, 219);
      font-family: consolas, Menlo, "PingFang SC", "Microsoft YaHei", sans-serif !important;
    }

    h1::before {
      font-family: "iconfont" !important;
      color: #f47466;
      content: "\e630";
      font-size: 2rem;
      font-style: normal;
      font-weight: 600;
      font-variant: normal;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    h1:hover {
      -webkit-transform: translate(10px, 0);
      transform: translate(10px, 0);
      transition: transform 0.5s ease;
      &::before {
        color: #49b1f5;
      }
    }

    h3 {
      padding-left: 5px;
      border-left: 4px solid #ba3925;
      color: #ba3925;
      margin: 5px;
    }

    h4 {
      color: #008080;
    }

    p {
      margin: 5px;
      padding: 2px;
    }
  }
}
</style>

<style lang="scss" scoped>
.article {
  letter-spacing: 1px;
  box-sizing: border-box;
  padding: 15px;
  border-top: 1px solid lightblue;
  border-left: 1px solid lightgreen;
  border-right: 1px solid lightskyblue;
  border-bottom: 1px solid pink;
  overflow: hidden;
  border-radius: 5px;
  background: white;
  color: #4c4948;
  &:hover {
    box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
  }
  &-header {
    position: relative;
    background-size: cover;
    text-align: center;
    box-sizing: border-box;
    padding: 110px 0;
    margin: -15px;
    color: white;
    z-index: 2;
    background-image: url("../../assets/image/cover2.jpg");
    background-size: cover;
    background-repeat: no-repeat;

    transition: all 0.5s;
    &::before {
      position: absolute;
      content: "";
      z-index: -1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &-tip {
      color: whitesmoke;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: 5px 0;
      span {
        margin: 0 5px;
      }
    }
  }
}
</style>
