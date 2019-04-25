/* eslint-disable */
import { Table } from 'element-ui'
import Vue from 'vue'
import mixin from './table-temp-mixin.js'

const methods = {
  getLayout (cloneConfig) {
    var layout = 'prev, pager, next, jumper'
    if (cloneConfig.page && cloneConfig.page.pageSizes) {
      layout = 'sizes, ' + layout
    }
    if (
      cloneConfig.page &&
      (cloneConfig.page.total === 0 || cloneConfig.page.total)
    ) {
      layout = 'total, ' + layout
    }
    return layout
  },
  handleSizeChange (cloneConfig) {
    return function (index) {
      if (cloneConfig.page) {
        cloneConfig.page.pageSize = index
        cloneConfig.page.pageIndex = 1
        cloneConfig.isSizeOrIndexChange = true
      }
    }
  },
  handleCurrentChange (cloneConfig) {
    return function (index) {
      if (cloneConfig.page) {
        cloneConfig.page.pageIndex = index
        cloneConfig.isSizeOrIndexChange = true
      }
    }
  }
}

Table.mixins.push(mixin.tableMixin)

var column = (h, column, index, context) => {
  return (
    <el-table-column
      class="column"
      label={column.label}
      prop={column.prop}
      align={column.align || 'center'}
      min-width={column.minWidth || 120}
      width={column.width}
      fixed={column.fixed}
      show-overflow-tooltip
      filters={column.filters}
      filter-method={column.filterMethod}
      sortable={column.sortable || false}
      key={index}
      {...{
        scopedSlots: {
          header: function (scope) {
            var render = context.data.scopedSlots
              ? context.data.scopedSlots[column.slot + '-header']
              : null
            return typeof render === 'function' ? (
              render(scope)
            ) : (<div class='cell'>{column.label}</div>)
          },
          default: function (scope) {
            var render = context.data.scopedSlots
              ? context.data.scopedSlots[column.slot]
              : null
            return typeof render === 'function' ? (
              render(scope)
            ) : (
                <span
                  style={
                    column.style
                      ? typeof column.style === 'function'
                        ? column.style(scope.row)
                        : column.style
                      : {}
                  }
                >
                  {typeof column.formatter === 'function'
                    ? column.formatter(
                      scope.row,
                      scope.column,
                      scope.row[column.prop],
                      index
                    )
                    : scope.row[column.prop]}
                </span>
              )
          }
        }
      }}
    />
  )
}

var selectionColumn = h => {
  return <el-table-column type="selection" align="center" width="55" />
}

var indexColumn = h => {
  return <el-table-column type="index" align="center" width="55" />
}

var operationColumn = (h, context, cloneConfig) => {
  return (
    <el-table-column
      align="center"
      fixed={cloneConfig.operation.fixed || 'right'}
      label={cloneConfig.operation.label || '操作'}
      min-width={cloneConfig.operation.minWidth || 150}
      width={cloneConfig.operation.width}
      {...{
        scopedSlots: {
          default: function (scope) {
            var render = context.data.scopedSlots
              ? context.data.scopedSlots.btn
              : null
            return typeof render === 'function'
              ? render(scope)
              : cloneConfig.operation.btns.map(item => {
                return (
                  <el-button
                    style={{
                      display:
                        (item.show === 'function' && item.show(scope.row)) ||
                          item.show === undefined
                          ? 'inline-block'
                          : 'none'
                    }}
                    disabled={
                      item.disabled
                        ? typeof item.disabled === 'function'
                          ? item.disabled(scope.row)
                          : item.disabled === false
                            ? false
                            : true
                        : false
                    }
                    size={item.size || 'mini'}
                    type={item.type || 'text'}
                    onClick={item.fn.bind(item, scope.row)}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        style={
                          typeof item.style === 'function'
                            ? item.style(scope.row)
                            : item.style
                        }
                      >
                        {typeof item.label === 'function'
                          ? item.label(scope.row)
                          : item.label}
                      </a>
                    ) : (
                        <span
                          style={
                            typeof item.style === 'function'
                              ? item.style(scope.row)
                              : item.style
                          }
                        >
                          {typeof item.label === 'function'
                            ? item.label(scope.row)
                            : item.label}
                        </span>
                      )}
                  </el-button>
                )
              })
          }
        }
      }}
    />
  )
}

var expandColumn = (h, context) => {
  return (
    <el-table-column
      type="expand"
      {...{
        scopedSlots: {
          default: function (scope) {
            var render = context.data.scopedSlots.expand
            return typeof render === 'function' ? (
              render(scope)
            ) : (
                <p>不存在对应expand插槽</p>
              )
          }
        }
      }}
    />
  )
}

var pagination = (h, cloneConfig) => {
  var layout = methods.getLayout(cloneConfig)
  return (
    <div class="report-nav">
      <el-pagination
        vOn:size-change={methods.handleSizeChange(cloneConfig)}
        vOn:current-change={methods.handleCurrentChange(cloneConfig)}
        current-page={cloneConfig.page ? cloneConfig.page.pageIndex : 1}
        page-size={cloneConfig.page ? cloneConfig.page.pageSize : 10}
        page-sizes={cloneConfig.page ? cloneConfig.page.pageSizes : [10, 20, 30, 40]}
        layout={layout}
        total={cloneConfig.page ? cloneConfig.page.total : 0}
      />
    </div>
  )
}

export default Vue.component('table-temp', {
  functional: true,
  props: {
    ...Table.props,
    config: {
      type: Object,
      require: true
    },
    size: {
      default: 'small'
    },
    border: {
      default: true
    }
  },
  render: function (h, context) {
    let data = context.data
    let props = context.props
    let cloneConfig = props.config || {}
    // 去掉默认的v-loading指令，在cloneConfig中配置
    if (data.directives) {
      data.directives = data.directives.filter(
        item => item.name !== 'loading' && item.rawName !== 'v-loading'
      )
    }
    return (
      <div class="table-temp">
        <el-table
          class="farm-table-temp"
          vLoading={cloneConfig.loading || false}
          {...{ ...data, props }}
        >
          {cloneConfig.selection && selectionColumn(h)}
          {cloneConfig.index && indexColumn(h)}}
          {cloneConfig.expand && expandColumn(h, context)}}
          {cloneConfig.tableSetting && cloneConfig.tableSetting.map((item, index) => {
            return column(h, item, index, context)
          })}
          {cloneConfig.operation && operationColumn(h, context, cloneConfig)}
        </el-table>
        {cloneConfig.page && pagination(h, cloneConfig)}
      </div>
    )
  }
})
