<template>
  <!-- 文章卡片 -->
  <div class="card-box">
    <div class="card-year">
      {{ year }}
    </div>
    <div
      class="card-item"
      v-for="(i, index) in lists"
      :key="index"
      @click="detail(i._id)"
    >
      <img
        class="img"
        src="https://cdn.jsdelivr.net/gh/jitwxs/cdn/blog/top/cover11.jpg"
        alt=""
      />
      <div class="card-item-right">
        <div class="card-item-right-title">
          {{ i.title }}
        </div>
        <div class="card-item-right-time">
          <i class="el-icon-timer"> </i> {{ i.publishTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArchive } from "@/api/index";
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    year: {
      type: [Number, String],
      default: ""
    },
    lists: {
      type: Array,
      default: []
    }
  },
  computed: {},

  created() {},

  mounted() {},

  methods: {
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
.card {
  overflow: hidden;
  color: #4c4948;

  &-box {
    margin-left: 10px;
    padding-left: 20px;
    border-left: 1px solid #49b1f5;
    position: relative;
    padding-top: 10px;
    .card-item {
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
    .card-year {
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
