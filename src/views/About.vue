<template>
  <el-table :data="tableData"
            style="width: 100%">
    <el-table-column v-for="(item, index) in conf.setting"
                     :key="index"
                     :prop="item.prop"
                     :label="item.label">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        {{ typeof item.formatter === 'function' ? item.formatter(scope.row, scope.column, scope.row[item.prop], index) : scope.row[item.prop] }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      conf: {
        setting: [
          {
            label: '日期',
            prop: 'date',
            formatter: () => {
              console.log(1)
              return 123
            }
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '地址',
            prop: 'address'
          }
        ]
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
