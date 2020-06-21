<template>
  <div class="mod-log">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <el-form-item>
        <el-input
          v-model="dataForm.key"
          placeholder="用户名／用户操作"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
      <br />
      <br />
      <el-form-item>
        <el-input
          v-model="dataForm.testName"
          placeholder="请输入内容"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getTest()">提交</el-button>
      </el-form-item>
      <br />
      <br />
      <el-form-item>
        <el-select
          v-model="dataForm.value10"
          filterable
          allow-create
          default-first-option
          placeholder="请选择文章标签"
        >
          <el-option
            v-for="item in options5"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="putTest()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options5: [
        {
          value: "HTML",
          label: "HTML",
        },
        {
          value: "CSS",
          label: "CSS",
        },
        {
          value: "JavaScript",
          label: "JavaScript",
        },
      ],
      dataForm: {
        key: "",
        testName: "66666",
        value10: "",
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      dataListLoading: false,
      selectionDataList: [],
    };
  },
  created() {
    //刷新页面 执行的 方法;
    this.getDataList();
    //this.getTest();
  },
  methods: {
    putTest() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.memains("/test/test1"),
        method: "post",
        params: this.$http.adornParams({
          testname: this.dataForm.value10,
        }),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.dataList = data.page.list;
          this.totalCount = data.page.totalCount;
          testName = this.testName;
        } else {
          this.dataList = [];
          this.totalCount = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 获取数据列表
    getTest() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/data/test/test"),
        method: "get",
        params: this.$http.adornParams({
          testname: this.dataForm.testName,
        }),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.dataList = data.page.list;
          this.totalCount = data.page.totalCount;
          testName = this.testName;
        } else {
          this.dataList = [];
          this.totalCount = 0;
        }
        this.dataListLoading = false;
      });
    },
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/sys/log/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          key: this.dataForm.key,
          sidx: "id",
          order: "desc",
        }),
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.dataList = data.page.list;
          this.totalCount = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalCount = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
  },
};
</script>
