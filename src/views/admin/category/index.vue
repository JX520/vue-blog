<template>
  <div class="admin-category">
    <el-col :span="24">
      <el-card>
        <div class="category-box">
          <h2>现有分类：</h2>
          <div class="category-save">
            <el-button size="small" type="primary" @click="addCategory"
              >新增父分类</el-button
            >
          </div>
          <div class="category-item">
            <el-tree
              :data="treeData.list"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    type="primary"
                    size="mini"
                    plain
                    @click="() => append(data)"
                  >
                    新增子分类
                  </el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    plain
                    @click="() => remove(node, data)"
                  >
                    删除
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
          <div class="category-save">
            <el-button size="small" type="primary" @click="saveSubmit"
              >保存分类</el-button
            >
          </div>
        </div>
      </el-card>
    </el-col>

    <el-dialog
      title="请输入分类名称"
      :visible.sync="dialogOpen"
      width="30%"
      center
    >
      <div class="validate">
        <el-input
          v-model="label"
          ref="pwdInput"
          size="small"
          placeholder="请输入分类名称"
          clearable
        >
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogOpen = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addCategory, updateCategory, getCategory } from "@/api/admin/category";
export default {
  components: {},
  data() {
    return {
      treeData: {},
      tmpData: null,
      dialogOpen: false,
      label: ""
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
          this.treeData = res.result[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    submit() {
      const newChild = {
        id: Math.floor(Math.random() * 1000),
        label: this.label,
        children: []
      };
      if (this.tmpData) {
        if (!this.tmpData.children) {
          this.$set(this.tmpData, "children", []);
        }
        this.tmpData.children.push(newChild);
        // console.log(this.tmpData);
        this.label = "";
        this.tmpData = null;
        this.dialogOpen = false;
      } else {
        //新增父分类
        this.treeData.push(newChild);
        this.label = "";
        this.dialogOpen = false;
      }
    },
    //增加新分类
    append(data) {
      this.dialogOpen = true;
      this.tmpData = data;
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    saveSubmit() {
      if (this.treeData._id) {
        //修改
        updateCategory({
          list: this.treeData
        })
          .then(res => {
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
        addCategory({
          list: this.treeData.list
        })
          .then(res => {
            if (res.code === 0) {
              this.msgSuccess(res.msg);
            } else {
              this.msgError(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
            this.msgError(err);
          });
      }
    },
    //新增父分类
    addCategory() {
      this.dialogOpen = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.admin-category {
  .category-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .category-item {
      width: 50%;
      ::v-deep .el-tree-node__content {
        height: auto;
      }
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 5px;
      }
    }
    .category-save {
      margin: 20px 0;
      text-align: center;
    }
  }
}
</style>
