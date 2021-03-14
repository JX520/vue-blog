<template>
  <div class="admin-tag">
    <el-col :span="24">
      <el-card>
        <div class="tag-box">
          <h2 class="tag-title">
            现有标签：
          </h2>
          <div class="tag-item-box">
            <!-- <el-tag
                class="tag-item"
                v-for="(tag, index) in tags"
                :key="tag.name"
                closable
                :type="tag.type"
                @close="handleClose(index)"
              >
                {{ tag.name }}
              </el-tag> -->
            <div
              class="tag-item"
              :style="{
                color: randomColor(),
                fontSize: randomNum(0.8, 2) + 'rem'
              }"
              v-for="(tag, index) in tags.list"
              :key="tag.name"
            >
              <span>{{ tag.name }}</span>
              <i class="el-icon-close" @click="handleClose(index)"></i>
            </div>
            <div class="tag-add">
              <el-input
                class="new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                placeholder="输入完成后按Enter即可"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else size="small" type="primary" @click="showInput"
                >添加新标签</el-button
              >
            </div>
          </div>
          <div class="tag-save">
            <el-button size="small" type="primary" @click="submit"
              >保存标签</el-button
            >
          </div>
          <el-dialog
            title="请输入安全密码"
            :visible.sync="dialogOpen"
            width="30%"
            center
          >
            <div class="validate">
              <el-input
                v-model="passward"
                ref="pwdInput"
                size="small"
                placeholder="请输入安全密码"
                clearable
                show-password
              >
              </el-input>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogOpen = false">取 消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { addTag, updateTag, getTag } from "@/api/admin/tag";
export default {
  components: {},
  data() {
    return {
      inputValue: "",
      inputVisible: false,
      tags: {},
      dialogOpen: false,
      passward: ""
    };
  },

  computed: {
    tagColor() {
      return randomColor();
    }
  },

  created() {
    this.getTagList();
  },

  mounted() {},

  methods: {
    //获取标签列表
    getTagList() {
      getTag({})
        .then(res => {
          this.tags = res.result[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    //删除标签
    handleClose(index) {
      this.tags.list.splice(index, 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.tags.list.push({
          name: this.inputValue,
          type: "sucess"
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    submit() {
      if (this.tags._id) {
        //修改
        updateTag({
          list: this.tags
        })
          .then(res => {
            console.log(res);
            if (res.code === 0) {
              this.msgSuccess(res.msg);
            } else {
              this.msgError(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        //新增
        addTag({
          list: this.tags.list
        })
          .then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.msgSuccess(res.msg);
            } else {
              this.msgError(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.admin-tag {
  .tag-box {
    text-align: center;
    .tag-item-box {
      display: flex;
      justify-content: center;
      align-items: center;
      .tag-item {
        margin: 0 10px;
        box-sizing: border-box;
        padding: 6px;
        // vertical-align: center;
        // border: 1px dotted rgb(192, 189, 189);
        // border-radius: 5px;
        font-size: 0.8rem;
        // background: whitesmoke;
        .el-icon-close {
          margin-left: 8px;
          border-radius: 50%;
          padding: 2px;
          &:hover {
            background: rgb(231, 100, 100);
            color: white;
            cursor: pointer;
          }
        }
        &:hover {
          transform: scale(1.2);
          transition: transform 1s ease;
        }
      }
      .tag-add {
        display: flex;
        justify-content: center;
        width: 200px;
      }
    }
    .tag-save {
      margin-top: 50px;
      text-align: center;
    }
    .validate {
      width: 200px;
      margin: 0 auto;
    }
  }
}
</style>
