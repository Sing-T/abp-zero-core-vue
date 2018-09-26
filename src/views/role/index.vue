<template>
  <div class="mixin-components-container">

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>角色管理</span>
        </div>
        <div>
          <!--Form-->
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="角色名称">
              <el-input v-model="form.name" size="medium" placeholder="请输入角色名称"/>
            </el-form-item>
            <el-form-item>
              <el-button v-waves class="filter-item" type="primary" size="small" icon="el-icon-search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>

    <el-row style="margin-top:30px;">
      <el-col :span="24">
        <el-card class="box-card">
          <el-row type="flex" justify="end" style="margin-bottom: 10px">
            <el-col :span="6" style="text-align: right">
              <!--Add-->
              <el-button v-waves class="filter-item" type="primary" size="small" icon="el-icon-plus" @click="handleCreate">新增</el-button>
            </el-col>
          </el-row>
          <!--Table-->
          <el-table v-loading="listLoading" :data="list" :key="key" border fit highlight-current-row style="width: 100%">
            <el-table-column :label="'角色名称'" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="'显示名称'" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.displayName }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="'角色描述'" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.description }}</span>
              </template>
            </el-table-column>
            <el-table-column :label="'静态角色'" class-name="status-col" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isStatic | statusFilter">{{ scope.row.isStatic?'是':'否' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column :label="'操作'" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row,'deleted')">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--Pagination-->
          <div class="pagination-container">
            <el-pagination :current-page="listQuery.page" :page-sizes="[10,20,30,50]" :page-size="listQuery.maxResultCount" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="80px"
        style="margin-left:50px;margin-right: 60px;">
        <el-tabs v-model="activeTab" type="border-card">
          <el-tab-pane label="角色信息" name="roleInfo" style="padding-top: 10px">
            <el-form-item :label="'角色名称'" prop="name">
              <el-input v-model="temp.name" maxlength="32"/>
            </el-form-item>
            <el-form-item :label="'显示名称'" prop="displayName">
              <el-input v-model="temp.displayName" maxlength="32"/>
            </el-form-item>
            <el-form-item :label="'角色描述'">
              <el-input v-model="temp.description" maxlength="1024"/>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="角色权限" name="rolePermission">配置管理</el-tab-pane>
        </el-tabs>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { fetchList/*, fetchPv, createArticle, updateArticle*/ } from '@/api/role'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'Role',
  components: {
  },
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      return status ? 'success' : 'danger'
    }
  },
  data() {
    return {
      form: {
        name: ''
      },
      key: 1, // table key
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        maxResultCount: 20,
        skipCount: 0,
        name: null
      },
      activeTab: '',
      temp: {
        id: undefined,
        name: '',
        displayName: '',
        description: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        name: [{ required: true, message: '角色名称是必填的', trigger: 'blur' }],
        displayName: [{ required: true, message: '显示名称是必填的', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList: function() {
      this.listLoading = true
      // TODO 注释
      this.listQuery.skipCount = (this.listQuery.page - 1) * this.listQuery.maxResultCount
      fetchList(this.listQuery).then(response => {
        this.list = response.result.items
        this.total = response.result.totalCount

        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.maxResultCount = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetTab() {
      this.activeTab = 'roleInfo'
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        displayName: '',
        description: ''
      }
    },
    handleCreate() {
      this.resetTab()
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.resetTab()
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          /* createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })*/
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          /* updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })*/
        }
      })
    }
  }
}
</script>

<style scoped>
  .mixin-components-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: calc(100vh - 84px);
  }
</style>
