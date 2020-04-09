<template>
  <div>
    <div v-for="(item, index) in value" :key="index" class="module-row">
      <span class="module-label">{{ item.label }}</span>
      <div v-for="(privilege, i) in item.privileges" :key="i" class="privilege-row">
        <span class="privilege-label">{{ privilege.name }}</span>     
        <el-radio-group v-model="privilege.privilege_level" :style="{ 'margin-left': (4 - item.level) * 18 + 150 + 'px'}">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="2">个人</el-radio>
          <el-radio :label="4">部门</el-radio>
          <el-radio :label="6">上下级部门</el-radio>
          <el-radio :label="8">所有</el-radio>
        </el-radio-group>
      </div>
      <module-tree v-if="item.children.length" :value="item.children"></module-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'moduleTree',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.module-row {
  margin-left: 18px;
  margin-top: 8px;
}
.module-label {
  font-size: 14px;
  color: #333;
}
.privilege-row {
  margin-left: 18px;
  margin-top: 8px;
}
.privilege-label {
  font-size: 13px;
  color: #999;
}
</style>
