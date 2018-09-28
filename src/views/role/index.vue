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
              <el-input v-model="form.name" size="medium" placeholder="请输入角色名称" @keyup.enter.native="handleFilter"/>
            </el-form-item>
            <el-form-item>
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="handleFilter">查询
              </el-button>
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
              <!--Create-->
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                size="small"
                icon="el-icon-plus"
                @click="handleCreate">新增
              </el-button>
            </el-col>
          </el-row>
          <!--Table-->
          <el-table
            v-loading="listLoading"
            :data="list"
            :key="key"
            border
            fit
            highlight-current-row
            style="width: 100%">
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
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑
                </el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--Pagination-->
          <div class="pagination-container">
            <el-pagination
              :current-page="listQuery.page"
              :page-sizes="[10,20,30,50]"
              :page-size="listQuery.maxResultCount"
              :total="total"
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <role-modal
      :visible="dialogFormVisible"
      :status="dialogStatus"
      @dialog-visible="changeDialogVisible"
      @save-success="getList"/>

  </div>
</template>

<script>
import {
  fetchList,
  fetchRole,
  deleteRole
} from '@/api/role'
import { mapGetters } from 'vuex'
import waves from '@/directive/waves' // 水波纹指令
import RoleModal from './role-modal'

export default {
  name: 'Role',
  components: { RoleModal },
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
      dialogFormVisible: false,
      dialogStatus: 'create'
    }
  },
  computed: {
    ...mapGetters([
      'allPermissions'
    ])
  },
  created() {
    this.getList()
    this.$store.dispatch('GetAllPermissions').then(response => {
      // do nothing
    })
  },
  methods: {
    getList: function() {
      this.listLoading = true
      // TODO 注释
      this.listQuery.skipCount =
          (this.listQuery.page - 1) * this.listQuery.maxResultCount
      fetchList(this.listQuery).then(response => {
        this.list = response.result.items
        this.total = response.result.totalCount
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.listQuery.name = this.form.name
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.maxResultCount = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        displayName: '',
        description: '',
        permissions: []
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.$store.commit('SET_ROLE', this.temp)
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      fetchRole(row).then(response => {
        this.temp = Object.assign({}, response.result)
        this.$store.commit('SET_ROLE', this.temp)
        this.dialogFormVisible = true
      })
    },
    changeDialogVisible(visible) {
      this.dialogFormVisible = visible
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        deleteRole(row).then(res => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            position: 'bottom-right',
            duration: 2000
          })
        })
      }).catch(action => {
        // do nothing
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
