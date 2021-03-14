<template>
  <div class="layout">
    <navbar />
    <div class="main-app">
      <!-- <el-row> -->
      <el-col :span="20" :xs="24" :sm="18" :md="19" :lg="20" :xl="20">
        <main-app />
      </el-col>
      <el-col :span="4" :xs="0" :sm="6" :md="6" :lg="5" :xl="5">
        <sidebar />
      </el-col>
      <!-- </el-row> -->
    </div>
    <Footer />

    <div class="min-backtop" @click="backTop">
      <el-tooltip effect="dark" content="回到顶部" placement="bottom">
        <i class="el-icon-caret-top"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Index/Navbar.vue";
import Sidebar from "@/components/Index/Sidebar.vue";
import Footer from "@/components/Index/Footer.vue";
import MainApp from "./components/Main.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    Footer,
    MainApp
  },
  data() {
    return {
      isTop: false
    };
  },

  computed: {
    scrollHeight: {
      set(val) {
        this.isTop = val;
      },
      get() {
        if (this.isTop > 300) {
          return true;
        } else return false;
      }
    }
  },

  created() {},

  mounted() {
    window.addEventListener("mousewheel", function() {
      //   console.log(window.scrollY);
      this.scrollHeight = window.scrollY;
    });
  },

  methods: {
    isBackTop() {
      console.log(this.isTop);
    },
    //回到顶部
    backTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  background: whitesmoke;
  .main-app {
    max-width: 1300px;
    display: flex;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 3rem 10px;
    justify-content: space-between;
  }
}
.min-backtop {
  position: fixed;
  right: 40px;
  bottom: 80px;
  width: 40px;
  height: 40px;
  background: #49b1f5;
  text-align: center;
  border-radius: 50%;
  font-size: 30px;
  color: white;
  z-index: 5;
  &:hover {
    cursor: pointer;
    background: red;
  }
}
</style>
