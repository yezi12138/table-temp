<template>
  <div class="home">
    <el-button @click="fetch">刷新</el-button>
    <table-temp :config="conf1"
                :data="conf1.tableData"
                @afterFetch="afterFetch"
                tooltip-effect="light"
                @row-click="rowClick"
                :row-style="{color: 'red'}"
                @selection-change="selectionChange"
                ref="table1">
      <div slot="adminUserId"
           slot-scope="detailScope">
        {{ `slotvalue adminUserId ${detailScope.row.adminUserId}` }}
      </div>
      <!-- eslint-disable -->
      <div slot='adminUserId-header'
           slot-scope='detailScope'>
        <el-select v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div slot="createTime"
           slot-scope="detailScope">
        {{ `${detailScope.row.createTime} : over` }}
      </div>

    </table-temp>
    <div class="m20"></div>
    <!-- <table-temp :config="conf2"
                tooltip-effect="light"
                :data="conf2.tableData"
                row-key="orderAllotId"
                lazy
                :load="load"
                ref="table2">
      <template slot="header"
                slot-scope="scope">
        <el-input v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索" />
      </template>
    </table-temp> -->
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      conf1: {
        loading: true,
        selection: true,
        tableData: [],
        tableSetting: [
          {
            label: '日志类型',
            prop: 'logType',
            style: (row) => {
              return {
                color: 'red'
              }
            }
          },
          {
            label: '管理员角色ID',
            prop: 'adminUserId',
            slot: 'adminUserId'
          },
          {
            label: '创建时间',
            prop: 'createTime',
            slot: 'createTime'
          },
          {
            label: '日志内容',
            prop: 'logMessage'
          }
        ],
        condition: {
          endTime: '',
          logType: 0,
          operateUser: '',
          page: 1,
          pageSize: 10,
          startTime: '',
          token: 'BuZBtRbLtYRVGGigq92AYEtTspQ5mkPcb+TeXWG10jBI9xpiLQz8+JV6FA1B6x6xY7x/7LRVTbPhzjCIQDUI0Q=='
        },
        fetchUrl: '/log/getLogList',
        map: {
          data: 'data.items'
        },
        page: {
          pageIndex: 1,
          pageSize: 10,
          pageSizes: [10, 20, 30, 40],
          total: 0,
          map: {
            index: 'page',
            size: 'pageSize'
          }
        }
      },
      conf2: {
        loading: true,
        tableData: [],
        tableSetting: [
          {
            label: '订单号',
            prop: 'orderAllotId',
            minWidth: 210
          },
          {
            label: '产品名称',
            prop: 'appName'
          },
          {
            label: '订单下达时间',
            prop: 'createTime'
          },
          {
            label: '申请时长',
            prop: 'timeLength'
          },
          {
            label: '申请人',
            prop: 'applicantUserId'
          },
          {
            label: '被授权人',
            prop: 'targetUserId'
          },
          {
            label: '执行时间',
            prop: 'executeTime'
          },
          {
            label: '结束时间',
            prop: 'endTime'
          }
        ],
        condition: {
          page: 1,
          pageSize: 10,
          pageState: 2,
          searchEndTime: '',
          searchKey: { keyType: 0, keyInfo: '' },
          searchStartTime: '',
          token: 'BuZBtRbLtYRVGGigq92AYEtTspQ5mkPcb+TeXWG10jBI9xpiLQz8+JV6FA1B6x6xY7x/7LRVTbPhzjCIQDUI0Q=='

        },
        fetchUrl: '/appOrder/searchOrderList',
        map: {
          data: 'data.items'
        },
        dataProcess (data) {
          return data.map(item => {
            if (item.orderType !== 0) {
              item.hasChildren = true
            }
            return item
          })
        },
        page: {},
        rowKey: 'orderAllotId',
        loadFn: (tree, treeNode, resolve) => {
          return this.load(tree, treeNode, resolve)
        },
        stripe: false
      },
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  },
  methods: {
    rowClick (row) {
      console.log(row)
    },
    selectionChange (selection) {
      console.log(selection)
    },
    afterFetch () {
      console.log('afterFetch')
    },
    load (tree, treeNode, resolve) {
      resolve([
        {
          'orderAllotId': 'qqqqq',
          'appName': '产品1',
          'createTime': '2019/04/02 12:00',
          'timeLength': '7天',
          'applicantUserId': 'aaa',
          'targetUserId': 'bbb',
          'executeTime': 'bb',
          'endTime': 'ccc',
          'state': 5,
          'orderType': 1
        }
      ])
    },
    fetch () {
      this.$refs.table1.fetch()
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.fetch()
        // this.$refs.table2.fetch()
      }, 1000)
    })
  }
}
</script>

<style lang="scss" scoped>
.m20 {
  height: 10px;
  margin: 20px;
}
</style>
