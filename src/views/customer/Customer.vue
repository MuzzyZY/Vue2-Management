<template>
  <div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="客户姓名" align="center">
        <template slot-scope="{row}">{{ row.name }}</template>
      </el-table-column>
      <el-table-column label="客户电话" align="center">
        <template slot-scope="{row}">{{ row.phone}}</template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="{row}">{{ row.sex=='0'?'男':(row.sex=='1'?'女':'保密')}}</template>
      </el-table-column>
      <el-table-column prop="inputUserName" label="录入人" align="center">
      </el-table-column>
      <el-table-column label="录入时间" align="center">
        <template slot-scope="{row}">{{ row.entryTime && new Date(row.entryTime).toLocaleDateString().replaceAll('/','-')}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}"><i class="el-icon-edit"></i> 修改</template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20, 30 ,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getCustomerList } from '@/request/api'
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页条数
      total: null
    }
  },
  methods: {
    handleSelectionChange() {},
    async getTableData() {
      const res = await getCustomerList({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
      if (!res) return
      // console.log(res)
      this.tableData = res.rows
      this.total = res.total
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      // 当前页面改变时执行
      this.pageNum = val
      this.getTableData()
    }
  },
  created() {
    this.getTableData()
  }
}
</script>

<style lang='less' scoped>
.el-pagination {
  margin-top: 25px;
}
</style>