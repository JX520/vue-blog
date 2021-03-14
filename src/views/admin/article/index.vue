<template>
  <div class="article">
    <el-col :span="24">
      <el-card>
        <!-- 列表查询条件 -->
        <el-form
          ref="queryForm"
          :model="query"
          :inline="true"
          label-width="68px"
        >
          <el-form-item label="文章标题" prop="articleTitle">
            <el-input
              v-model="query.articleTitle"
              placeholder="请输入文章标题"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <!-- <el-form-item label="选择" prop="id">
            <el-select
              v-model="groups"
              :placeholder="groupTitle"
              clearable
              size="small"
              @change="groupChange"
            >
              <el-option
                v-for="dict in pigGourp"
                :key="dict.id"
                :label="dict.title"
                :value="dict.id"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 列表操作按钮 -->
        <el-row :gutter="10" class="">
          <el-col :span="1.5">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
              >新增</el-button
            >
          </el-col>
        </el-row>
        <!-- 列表正文数据 -->
        <el-table v-loading="loading" :data="articleLists">
          <el-table-column label="文章标题" align="center" prop="title" />
          <el-table-column label="文章简介" align="center" prop="brief" />
          <el-table-column
            label="文章内容"
            align="center"
            prop="detail"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="所属分类"
            align="center"
            prop="category"
            :show-overflow-tooltip="true"
            ><template slot-scope="scope">
              <el-tag type="success">{{ scope.row.category }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="所属标签"
            align="center"
            prop="lables"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-tag
                effect="light"
                v-for="(lable, index) in scope.row.lables"
                :key="index"
                >{{ lable }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="评论数"
            align="center"
            width="100"
            prop="reviewNum"
          />
          <el-table-column
            label="点赞数"
            align="center"
            width="100"
            prop="likeNum"
          />
          <el-table-column
            label="浏览数"
            align="center"
            width="100"
            prop="watchNum"
          />
          <el-table-column
            label="发布时间"
            align="center"
            width="150"
            prop="publishTime"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.publishTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="query.page"
          :limit.sync="query.rows"
          @pagination="getArticleList"
        />
        <!-- 添加或修改文章 -->
        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogOpen"
          width="900px"
        >
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="form.title" placeholder="请输入文章标题" />
            </el-form-item>
            <el-form-item label="文章简介" prop="brief">
              <el-input v-model="form.brief" placeholder="请输入文章简介" />
            </el-form-item>
            <el-form-item label="文章内容" prop="detail">
              <div>
                <tinymce v-model="form.detail" :height="300" />
              </div>
            </el-form-item>
            <!-- <el-form-item label="选择集团" prop="theGroupID">
              <el-select
                v-model="form.theGroupID"
                placeholder="请选择集团"
                @change="groupChanges"
                :disabled="isSelect"
              >
                <el-option
                  v-for="item in pigGourpOptions"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                />
              </el-select>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { getList, updateArticle, addArticle } from "@/api/admin/article";
import Tinymce from "@/components/Tinymce";
export default {
  components: { Tinymce },
  data() {
    return {
      //模态框标题
      dialogTitle: "",
      //模态框状态
      dialogOpen: false,
      //加载数据状态
      loading: false,
      // 列表数据
      articleLists: [],
      //查询条件
      query: {
        articleTitle: undefined,
        page: 1,
        num: 10,
        type: "get"
      },
      //列表数量
      total: 0,
      //表单数据
      form: {},
      //表单验证规则
      rules: {
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" }
        ],
        brief: [
          { required: true, message: "文章简介不能为空", trigger: "blur" }
        ],
        detail: [
          { required: true, message: "文章内容不能为空", trigger: "blur" }
        ]
      }
    };
  },

  computed: {},

  created() {
    this.getArticleList();
  },

  mounted() {},

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
    //搜索
    handleQuery() {},
    //新增
    handleAdd() {
      this.form = {};
      this.dialogOpen = true;
      this.dialogTitle = "新增文章";
    },
    //修改
    handleUpdate(row) {
      this.form = row;
      this.dialogOpen = true;
      this.dialogTitle = "修改文章";
    },

    //新增或修改提交按钮
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form._id !== undefined) {
            updateArticle(this.form).then(response => {
              //   console.log(response);
              if (response.code === 0) {
                this.msgSuccess("修改成功");
                this.dialogOpen = false;
                this.getArticleList();
              } else {
                this.msgError(response.msg);
              }
            });
          } else {
            addArticle(this.form).then(response => {
              //   console.log(response);
              if (response.Code === 0) {
                this.msgSuccess("新增成功");
                this.dialogOpen = false;
                this.getArticleList();
              } else {
                this.msgError(response.msg);
              }
            });
          }
        }
      });
    },
    //删除
    handleDelete(row) {},
    //重置表单
    reset() {
      this.form = {};
    },
    cancel() {
      this.dialogOpen = false;
      this.reset();
    }
  }
};
</script>
<style lang="scss" scoped></style>
