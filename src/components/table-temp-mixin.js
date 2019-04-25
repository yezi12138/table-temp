import request from '@/app/axios/index'
import { clone, merge } from '@/utils/obj-operation'

const tableMixin = {
  props: {
    config: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      showSelectList: false,
      cloneConfig: {
        map: {
          data: 'data.items',
          total: 'data.total'
        },
        fetchFlag: false, // 是否在获取
        isSizeOrIndexChange: false // 判断是否为页码获取，如果不是，则将重置currentIndex为1
      },
      layout: 'prev, pager, next, jumper',
      clientMaxHeight: 200
    }
  },
  methods: {
    getLayout () {
      if (this.cloneConfig.page && this.cloneConfig.page.pageSizes) {
        this.layout = 'sizes, ' + this.layout
      }
      if (this.cloneConfig.page && (this.cloneConfig.page.total === 0 || this.cloneConfig.page.total)) {
        this.layout = 'total, ' + this.layout
      }
    },
    // 请求表格的方法
    fetch () {
      if (!this.cloneConfig.fetchUrl) {
        console.log('%c没有fetchUrl，请检查', 'color: red')
        return
      }
      try {
        this.resetIndex()
        let postData = {
          ...this.cloneConfig.condition
        }
        if (this.cloneConfig.page) {
          let size = 'pageSize'
          let index = 'pageIndex'
          if (this.cloneConfig.page.map) {
            size = this.cloneConfig.page.map.size || 'pageSize'
            index = this.cloneConfig.page.map.index || 'pageIndex'
          }
          postData[size] = this.cloneConfig.page.pageSize || 15
          postData[index] = this.cloneConfig.page.pageIndex || 1
        }
        if (this.cloneConfig.hasOwnProperty('loading')) {
          this.cloneConfig.loading = true
        }
        this.cloneConfig.fetchFlag = true
        let promise = request(this.cloneConfig.fetchUrl, postData)
        promise
          .then(
            (data) => {
              // 保存结果
              data = data.data
              let tableData = this.dataMap(data, this.cloneConfig.map.data) || []
              // 数据处理函数, 传入请求返回的数据，输出处理后的数组
              if (this.cloneConfig.dataProcess) {
                tableData = this.cloneConfig.dataProcess(tableData)
              }
              // todo merge合并之后，作用于为cloneConfig，直接覆盖会使config无法响应
              this.cloneConfig.tableData = tableData
              if (this.cloneConfig.page) {
                if (this.cloneConfig.page.total === 0 ? true : this.cloneConfig.page.total) {
                  let total = this.dataMap(data, this.cloneConfig.map.total) || 0
                  this.cloneConfig.page && (this.$set(this.cloneConfig.page, 'total', total))
                }
              }
            },
            (data) => {
              this.clearData()
            }
          )
          .finally(() => {
            this.$emit('afterFetch')
            if (this.cloneConfig.hasOwnProperty('loading')) {
              this.cloneConfig.loading = false
            }
            this.cloneConfig.fetchFlag = false
          })
      } catch (e) {
        if (this.cloneConfig.hasOwnProperty('loading')) {
          this.cloneConfig.loading = false
        }
        console.log('%c%s', 'color: red', e)
      }
    },
    clearData () {
      this.cloneConfig.tableData = []
      this.cloneConfig.page && (this.cloneConfig.page.pageIndex = 1) && (this.cloneConfig.page.total = 0)
    },
    dataMap (resData, map) {
      try {
        let mapArr = map.split('.')
        let data = clone(resData)
        while (mapArr.length > 0) {
          data = data[mapArr.shift()]
        }
        return data
      } catch (e) {
        console.log('数据映射出错%c%s', 'color: red', e)
      }
    },
    resetIndex () {
      // 重置页码为1
      if (this.cloneConfig.page && !this.cloneConfig.isSizeOrIndexChange) {
        this.$set(this.cloneConfig.page, 'pageIndex', 1)
        this.cloneConfig.isSizeOrIndexChange = false
      } else {
        this.cloneConfig.isSizeOrIndexChange = false
      }
    },
    init () {
      this.cloneConfig = merge(this.config || {}, this.cloneConfig)
      if (this.cloneConfig.page) {
        this.$watch('cloneConfig.page.pageIndex', () => {
          !this.cloneConfig.fetchFlag && this.fetch()
        })
        this.$watch('cloneConfig.page.pageSize', () => {
          !this.cloneConfig.fetchFlag && this.fetch()
        })
      }
    }
  },
  created () {
    this.init()
  }
}

export default {
  tableMixin
}
