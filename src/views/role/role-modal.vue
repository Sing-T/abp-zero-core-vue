<template>
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form
      ref="roleForm"
      :rules="rules"
      :model="model"
      label-position="right"
      label-width="80px"
      style="margin-left:50px;margin-right: 60px;">
      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane label="角色信息" name="roleInfo" style="padding-top: 10px">
          <el-form-item :label="'角色名称'" prop="name">
            <el-input v-model="model.name" maxlength="32"/>
          </el-form-item>
          <el-form-item :label="'显示名称'" prop="displayName">
            <el-input v-model="model.displayName" maxlength="32"/>
          </el-form-item>
          <el-form-item :label="'角色描述'">
            <el-input v-model="model.description" maxlength="1024"/>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="角色权限" name="rolePermission">
          <el-checkbox-group v-model="model.permissions">
            <el-checkbox v-for="permission in allPermissions" :label="permission.name" :key="permission.name"/>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
      <el-button v-if="dialogStatus=='create'" size="small" type="primary" @click="createData">确定</el-button>
      <el-button v-else size="small" type="primary" @click="updateData">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  createRole,
  updateRole
} from '@/api/role'
import { mapGetters } from 'vuex'
import waves from '@/directive/waves' // 水波纹指令
import extend from '@/lib/extend'

export default {
  name: 'RoleModal',
  directives: {
    waves
  },
  props: {
    status: {
      type: String,
      default: 'create'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      model: {},
      activeTab: 'roleInfo',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        name: [
          { required: true, message: '角色名称是必填的', trigger: 'blur' }
        ],
        displayName: [
          { required: true, message: '显示名称是必填的', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'allPermissions'
    ]),
    dialogStatus: function() {
      return this.status
    },
    dialogFormVisible: {
      get: function() {
        return this.visible
      },
      set: function(newValue) {
        this.$emit('dialog-visible', newValue)
      }
    }
  },
  watch: {
    visible: function(newVal, oldVal) {
      if (newVal) {
        this.activeTab = 'roleInfo'
        this.model = extend(true, {}, this.$store.state.role.role)
        this.$nextTick(() => {
          this.$refs['roleForm'].clearValidate()
        })
      }
    }
  },
  methods: {
    createData() {
      this.$refs['roleForm'].validate(valid => {
        if (valid) {
          createRole(this.model).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              position: 'bottom-right',
              duration: 2000
            })
            this.$emit('save-success')
          })
        }
      })
    },
    updateData() {
      this.$refs['roleForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.model)
          updateRole(tempData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              position: 'bottom-right',
              duration: 2000
            })
            this.$emit('save-success')
          })
        }
      })
    }
  }
}

</script>
