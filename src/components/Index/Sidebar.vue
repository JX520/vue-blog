<template>
  <div class="sidebar">
    <div class="sidebar-user">
      <img class="avatar" src="../../assets/image/avatar.jpg" alt="" />
      <h3>{{ userInfo.name }}</h3>
      <h4 class="m-font-color intro">{{ userInfo.intro }}</h4>
      <div class="summary">
        <div
          class="summary-item"
          v-for="s in summary"
          :key="s.id"
          @click="toSummary(s.path)"
        >
          <h5 class="summary-item-title">{{ s.title }}</h5>
          <span class="summary-item-num">{{ s.num }}</span>
        </div>
      </div>
      <div class="link">
        <!-- <el-button type="primary" size="medium"
          ><i class="el-icon-postcard"></i> My Github</el-button
        > -->
        <!-- <span>联系方式：</span> -->
        <div class="link-user">
          <el-tooltip
            class="item"
            effect="dark"
            v-for="link in links"
            :key="link.icon"
            :content="link.tip"
            placement="bottom"
          >
            <a :href="link.href"
              ><svg-icon :icon-class="link.icon" class-name="svg-style"
            /></a>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="sidebar-category">
      <div class="category-title">
        <i class="el-icon-s-management"></i>
        分类
      </div>
      <div class="category-list">
        <!-- <div
          class="category-list-item"
          v-for="cate in category"
          :key="cate.title"
        >
          <span>{{ cate.title }}</span>
          <span>{{ cate.num }}</span>
        </div> -->
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          @node-click="handleClick"
          icon-class="el-icon-s-flag"
          :expand-on-click-node="false"
        >
        </el-tree>
      </div>
      <div class="category-more">
        <router-link to="/category">
          查看更多 >
        </router-link>
      </div>
    </div>
    <div class="sidebar-tag">
      <div class="tag-title">
        <i class="el-icon-s-promotion"></i>
        标签
      </div>
      <div class="tag-list">
        <span
          class="tag-list-item"
          v-for="(tag, index) in tags"
          :key="index"
          :style="{
            fontSize: randomNum(0.8, 1.5) + 'rem',
            color: randomColor()
          }"
          @click="toTag(tag.name)"
          >{{ tag.name }}</span
        >
      </div>
      <div class="tag-more">
        <router-link to="/tag">
          查看更多 >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getTag } from "@/api/admin/tag";
import { getCategory } from "@/api/admin/category";
export default {
  components: {},
  data() {
    return {
      userInfo: {
        name: "你最愛的小简",
        intro:
          "喜欢敲代码的小简，希望世界和平！喜欢敲代码的小简，希望世界和平！喜欢敲代码的小简，希望世界和平！"
      },
      summary: [
        {
          id: 1,
          title: "文章",
          path: "/archive/timeline",
          num: 100
        },
        {
          id: 2,
          title: "分类",
          path: "/category",
          num: 100
        },
        {
          id: 3,
          title: "标签",
          path: "/tag",
          num: 100
        }
      ],
      links: [
        {
          tip: "[VX]：JX54004300",
          href: "#",
          icon: "wechat"
        },
        {
          tip: "我的GitHub",
          href: "https://github.com/JX520",
          icon: "github"
        },
        {
          tip: "[email]：173929685@qq.com",
          href: "#",
          icon: "email"
        },
        {
          tip: "我的掘金",
          href: "https://juejin.cn/user/3007903221168312",
          icon: "juejin"
        }
      ],
      category: [
        {
          title: "Java",
          num: 50
        },
        {
          title: "JavaScript",
          num: 10
        },
        {
          title: "Go",
          num: 150
        },
        {
          title: "Python",
          num: 50
        },
        {
          title: "前端",
          num: 50
        },
        {
          title: "Go1",
          num: 150
        },
        {
          title: "Python1",
          num: 50
        },
        {
          title: "前端1",
          num: 50
        },
        {
          title: "Python12",
          num: 50
        },
        {
          title: "前端12",
          num: 50
        }
      ],
      tags: [],
      treeData: []
    };
  },

  computed: {},

  created() {
    this.getTagList();
    this.getCategoryList();
  },

  //   mounted() {},

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
    },

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
    toSummary(path) {
      this.$router.push({
        path: path
      });
    },
    //点击分类
    handleClick(data) {
      // console.log(data);
      this.$router.push({
        name: "ArticleSearch",
        params: {
          label: data.label
        }
      });
    },
    toTag(label) {
      this.$router.push({
        name: "ArticleSearch",
        params: {
          label: label
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  margin-left: 10px;
  &-user,
  &-category,
  &-tag {
    box-sizing: border-box;
    padding: 5px;
    font-size: 0.9rem;
    background: white;
    box-shadow: (0 0 5px 3px rgb(214, 213, 213));
    border-radius: 10px;
    &:hover {
      box-shadow: 0 4px 12px 12px rgba(7, 17, 27, 0.15);
    }
  }
  &-user {
    text-align: center;
    .intro {
      margin: 10px 0;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      &:hover {
        transform: rotate(360deg);
        transition: transform 1s ease;
      }
    }
    .summary {
      display: flex;
      justify-content: center;
      &-item {
        // display: table-cell;
        font-size: 1rem;
        color: #4c4948;
        border: 1px dotted #49b1f5;
        border-radius: 10px;
        margin: 10px;

        // font-weight: 500;
        &:hover {
          cursor: pointer;
          animation: summary 1s ease;
        }
        &-title {
          margin: 3px 10px;
        }
      }
    }
    .link {
      &-user {
        padding: 10px;
        font-size: 1.5rem;
        // border: 1px solid #49b1f5;
        display: flex;
        justify-content: center;
        a {
          margin: 0 15px;
        }
      }
    }
  }
  &-category {
    margin: 15px 0;

    .category-title {
      color: #4c4948;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 5px 0;
    }
    .category-list {
      padding: 0 10px;
      overflow: hidden;
      &-item {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;
        margin: 5px 0;
        border-radius: 5px;
        border: 1px solid whitesmoke;
        &:hover {
          background: #49b1f5;
          border-radius: 5px;
          color: whitesmoke;
          cursor: pointer;
          transform: scale(1.05);
          transition: transform 0.5s ease;
        }
      }
      ::v-deep .el-tree-node__content {
        &:hover {
          color: #ff7242;
          .el-tree-node__expand-icon {
            color: #ff7242;
          }
        }
      }
      ::v-deep .el-tree-node__expand-icon {
        color: #49b1f5;
      }
    }
  }
  &-tag {
    margin: 15px 0;
    .tag-title {
      color: #4c4948;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 5px 0;
    }
    .tag-list {
      // box-sizing: border-box;
      // padding: 0 10px;
      color: #999;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      // display: -webkit-box;
      // overflow: hidden;
      // -webkit-line-clamp: 5;
      &-item {
        box-sizing: border-box;
        padding: 5px;
        &:hover {
          cursor: pointer;
          color: #49b1f5;
          transform: scale(1.2);
          transition: transform 1s ease;
        }
      }
    }
  }
}
.category-more,
.tag-more {
  line-height: 30px;
  text-align: center;
  color: #807e7e;
  font-size: 0.7rem;
  margin: 0 auto;
  //   background: #49b1f5;
  &:hover {
    cursor: pointer;
    // transform: scale(1.05);
    color: #49b1f5;
  }
}
@keyframes summary {
  from {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(10deg);
  }
  to {
    transform: rotate(-30deg);
  }
}
</style>
