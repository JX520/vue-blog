<template>
  <div class="navbar">
    <el-row>
      <!-- <el-col :span="4"><div class="left"></div></el-col> -->
      <div class="isShowNav">
        <el-col :span="8"
          ><div class="center">
            <!-- <img class="logo" src="../assets/logo.png" alt="" /> -->
            <span>小简</span>
          </div></el-col
        >
        <el-col :span="16"
          ><div class="right">
            <div class="menu">
              <span
                class="menu-title"
                v-for="(item, index) in menuList"
                :key="index"
                @click="goPage(item.path, item.img, item.intro)"
                :class="getPath(item.path) ? 'active-menu' : ''"
              >
                <i :class="item.icon"></i>
                {{ item.name }}
              </span>
            </div>
          </div></el-col
        >
      </div>
    </el-row>

    <div
      class="navbar-bg isShow"
      :style="{ background: 'url(' + navbarBG + ') no-repeat 100% ' }"
    >
      <div class="navbar-bg-intro">
        {{ navbarIntro }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menuList: [
        {
          name: "首页",
          icon: "el-icon-s-home",
          path: "/",
          img: "https://cdn.jsdelivr.net/gh/jitwxs/cdn/blog/top/cover1.png",
          intro: "这是首页介绍"
        },
        {
          name: "归档",
          icon: "el-icon-date",
          path: "/archive/timeline",
          img: "https://cdn.jsdelivr.net/gh/jitwxs/cdn/blog/top/default.webp",
          intro: "归档"
        },
        {
          name: "留言板",
          icon: "el-icon-chat-dot-round",
          path: "/review",
          img: "https://cdn.jsdelivr.net/gh/jitwxs/cdn/blog/top/index.webp",
          intro: "留言板"
        },
        {
          name: "个人中心",
          icon: "el-icon-user",
          path: "/my",
          img: "",
          intro: "个人中心"
        },
        {
          name: "登录/注册",
          icon: "el-icon-s-promotion",
          path: "/login",
          img: "",
          intro: ""
        },
        {
          name: "GitHub",
          icon: "el-icon-share",
          path: "https://github.com/JX520",
          img: "",
          intro: ""
        }
      ],
      imgurl: "https://cdn.jsdelivr.net/gh/jitwxs/cdn/blog/top/index.webp",
      intro: "",
      showNav: false
    };
  },

  computed: {
    navbarBG: {
      set(val) {
        this.imgurl = val;
      },
      get() {
        return this.imgurl;
      }
    },
    navbarIntro: {
      set(val) {
        this.intro = val;
      },
      get() {
        return this.intro;
      }
    }
  },

  created() {
    this.getPath();
  },

  mounted() {},

  methods: {
    goPage(path, img, intro) {
      if (path == "https://github.com/JX520") {
        return window.open(path);
      } else {
        this.navbarBG = img;
        this.navbarIntro = intro;
        this.$router.push(path);
      }
    },
    getPath(path) {
      if (path === location.pathname) return true;
      else return false;
    },
    showNavbar(e) {
      // console.log(e);
      if (window.scrollY > 50) {
        this.showNav = true;
      } else this.showNav = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  //   border: 1px solid blue;
  background: white;
  box-shadow: 2px 2px 5px gray;
  text-align: center;
  color: rgb(90, 89, 89);
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 1px;
  overflow: hidden;
  .left,
  .center,
  .right {
    // border: 1px solid red;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center {
    .logo {
      height: 50px;
      border-radius: 5px;
    }
  }
  .right {
    // width: 100%;
    .menu {
      // width: 100%;
      &-title {
        padding: 5px 10px;
        // border-radius: 5px;
      }
      &-title:hover {
        cursor: pointer;
        border-bottom: 4px solid #93b493;
      }
    }
  }
  &-bg {
    // height: 20rem;
    background: #49b1f5;
    background-size: 100% 100%;
    width: 100%;
    height: 20rem;
    position: relative;
    overflow: hidden;
    display: table;
    z-index: 2;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 20rem;
      z-index: -1;
      background-color: rgba(0, 0, 0, 0.5);
    }
    &-intro {
      // width: 100%;
      height: 100%;
      // text-align: center;
      // margin: 0 auto;
      color: whitesmoke;
      font-size: 3rem;
      display: table-cell;
      vertical-align: middle;
    }
    // &:hover {
    //   transform: scale(1.5);
    //   transition: transform 0.5s ease;
    // }
  }
}
.active-menu {
  border-bottom: 4px solid #49b1f5;
}
.isShowNav {
  background: rgba(255, 255, 255, 0.6);
  position: fixed;
  top: 0;
  // color: white;
  z-index: 10;
  width: 100%;
}
.isShow {
  margin-top: 50px;
}
</style>
