表格table-temp

说明

基于elmentUI的表格，进行封装,支持原生el-table所有属性和方法

附加功能：

1. 增加分页功能，切换分页或者页码自动获取数据
2. 增加column的配置项（支持单元格样式，文本的定制化，自定义行内容，自定义行头等）
3. 基本需求进行配置化封装，如请求的挂载参数，分页的映射，数据获取前后的钩子等
4. 默认size为small，border为true



差异： 

1. 不能直接写el-table-column ，必须通过config.tableSetting进行配置
2. v-loading指令会直接忽略掉，必须配置config.loading才能实现loading
3. 不能在表格的行插槽重复使用el-table-column标签，会导致重复渲染问题
4. 行头的插槽必须是config.tableSetting中对应的slot + ‘-header’，详情看例子



存在bug:

经过测试,element的表格当鼠标enter和leave单元格时候，会重新渲染整个表格，所以在按钮的函数中，不应该执行对数据的操作，或者打印太多东西，会导致栈满.



实例



基础表格

![基础表格](https://github.com/yezi12138/table-temp/blob/master/md-img/1556187056391.png)

    <template>
      <div class="test">
        <div>
          <h1>基础表格</h1>
          <table-temp :config="conf1"
                      :data="conf1.tableData"
                      style="width: 100%">
          </table-temp>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'test',
      data () {
        return {
          conf1: {
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
            }],
            tableSetting: [
              {
                prop: 'date',
                label: '日期'
              },
              {
                prop: 'name',
                label: '姓名'
              },
              {
                prop: 'address',
                label: '地址'
              }
            ]
          }
        }
      }
    }
    </script>



带状态表格

同原生组件

![带状态表格](https://github.com/yezi12138/table-temp/blob/master/md-img/1556187798376.png)

    <template>
      <div class="test">
        <div>
          <h1>带状态表格</h1>
          <table-temp :config="conf1"
                      :data="conf1.tableData"
                      :row-class-name="tableRowClassName"
                      style="width: 100%">
          </table-temp>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'test',
      methods: {
        tableRowClassName ({ row, rowIndex }) {
          if (rowIndex === 1) {
            return 'warning-row';
          } else if (rowIndex === 3) {
            return 'success-row';
          }
          return '';
        }
      },
      data () {
        return {
          conf1: {
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
            }],
            tableSetting: [
              {
                prop: 'date',
                label: '日期'
              },
              {
                prop: 'name',
                label: '姓名'
              },
              {
                prop: 'address',
                label: '地址'
              }
            ]
          }
        }
      }
    }
    </script>
    
    <style>
      .el-table .warning-row {
        background: oldlace;
      }
    
      .el-table .success-row {
        background: #f0f9eb;
      }
    </style>
    





固定列及行内容自定义

![固定列及行内容自定义](https://github.com/yezi12138/table-temp/blob/master/md-img/1556188354264.png)

    <template>
      <div class="test">
        <div>
          <h1>固定列及行内容自定义</h1>
          <table-temp :config="conf1"
                      style="width: 700px;margin: 0 auto;"
                      :data="conf1.tableData">
          </table-temp>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'test',
      data () {
        return {
          conf1: {
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '小明',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }],
            tableSetting: [
              {
                prop: 'date',
                label: '日期',
                width: 200
              },
              {
                prop: 'name',
                label: '姓名',
                style: (row) => {
                  return row.name === '小明' ? {
                    color: 'red'
                  } : {}
                },
                fixed: 'right'
              },
              {
                prop: 'address',
                label: '地址',
                formatter: (row) => {
                  return '自定义内容：' + row.address
                },
                width: 400
              }
            ]
          }
        }
      }
    }
    </script>





自定义行内容及行头

![自定义行内容及行头](https://github.com/yezi12138/table-temp/blob/master/md-img/1556188786475.png)

    <template>
      <div class="test">
        <div>
          <h1>固定列及行内容自定义</h1>
          <table-temp :config="conf1"
                      style="width: 700px;margin: 0 auto;"
                      :data="conf1.tableData">
            <div slot='date'
                 slot-scope="scope">
              <el-popover placement="left"
                          title="标题"
                          width="200"
                          trigger="hover"
                          :content='`时间为： ${scope.row.date}`'>
                <el-button slot="reference">hover 激活</el-button>
              </el-popover>
            </div>
            <div slot='date-header'
                 slot-scope="scope">
              <el-tag type="success">自定义头</el-tag>
            </div>
          </table-temp>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'test',
      data () {
        return {
          conf1: {
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '小明',
              address: '上海市普陀区金沙江路 1517 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }],
            tableSetting: [
              {
                prop: 'date',
                label: '日期',
                width: 200,
                slot: 'date'
              },
              {
                prop: 'name',
                label: '姓名',
                style: (row) => {
                  return row.name === '小明' ? {
                    color: 'red'
                  } : {}
                },
                fixed: 'right'
              },
              {
                prop: 'address',
                label: '地址',
                formatter: (row) => {
                  return '自定义内容：' + row.address
                },
                width: 400
              }
            ]
          }
        }
      }
    }
    </script>



原生事件

和官网一样

![原生事件](https://github.com/yezi12138/table-temp/blob/master/md-img/1556189080930.png)

    <template>
      <div class="test">
        <div>
          <h1>原生表格方法: 合并行或列</h1>
          <table-temp :config="conf1"
                      :span-method="arraySpanMethod"
                      :data="conf1.tableData">
          </table-temp>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'test',
      methods: {
        arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
          if (rowIndex % 2 === 0) {
            if (columnIndex === 0) {
              return [1, 2];
            } else if (columnIndex === 1) {
              return [0, 0];
            }
          }
        },
    
        objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 0) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }
        }
      },
      data () {
        return {
          conf1: {
            tableData: [{
              id: '12987122',
              name: '王小虎',
              amount1: '234',
              amount2: '3.2',
              amount3: 10
            }, {
              id: '12987123',
              name: '王小虎',
              amount1: '165',
              amount2: '4.43',
              amount3: 12
            }, {
              id: '12987124',
              name: '王小虎',
              amount1: '324',
              amount2: '1.9',
              amount3: 9
            }, {
              id: '12987125',
              name: '王小虎',
              amount1: '621',
              amount2: '2.2',
              amount3: 17
            }, {
              id: '12987126',
              name: '王小虎',
              amount1: '539',
              amount2: '4.1',
              amount3: 15
            }],
            tableSetting: [
              {
                prop: 'id',
                label: 'ID',
              },
              {
                prop: 'name',
                label: '姓名',
              },
              {
                prop: 'amount1',
                label: '数值 1',
              },
              {
                prop: 'amount2',
                label: '数值 2',
              },
              {
                prop: 'amount3',
                label: '数值 3',
              }
            ]
          }
        }
      }
    }
    </script>



开启多选，索引

![开启多选，索引](https://github.com/yezi12138/table-temp/blob/master/md-img/1556189188251.png)

    <template>
      <div class="test">
        <div>
          <h1>开启多选，索引</h1>
          <table-temp :config="conf1"
                      :data="conf1.tableData">
          </table-temp>
        </div>
      </div>
    </template>
    
    <script>
    export default {
      name: 'test',
      data () {
        return {
          conf1: {
            index: true,
            selection: true,
            tableData: [{
              id: '12987122',
              name: '王小虎',
              amount1: '234',
              amount2: '3.2',
              amount3: 10
            }, {
              id: '12987123',
              name: '王小虎',
              amount1: '165',
              amount2: '4.43',
              amount3: 12
            }, {
              id: '12987124',
              name: '王小虎',
              amount1: '324',
              amount2: '1.9',
              amount3: 9
            }, {
              id: '12987125',
              name: '王小虎',
              amount1: '621',
              amount2: '2.2',
              amount3: 17
            }, {
              id: '12987126',
              name: '王小虎',
              amount1: '539',
              amount2: '4.1',
              amount3: 15
            }],
            tableSetting: [
              {
                prop: 'id',
                label: 'ID',
              },
              {
                prop: 'name',
                label: '姓名',
              },
              {
                prop: 'amount1',
                label: '数值 1',
              },
              {
                prop: 'amount2',
                label: '数值 2',
              },
              {
                prop: 'amount3',
                label: '数值 3',
              }
            ]
          }
        }
      }
    }
    </script>



数据的获取

1: 使用fetchUrl

配置fetchUrl，如果需要查询参数，则在condition中绑定参数

    <input v-model="tableConfig.condition.departmentId"></input>
    <table-temp :config="tableConfig" ref="table"></table-temp>

    tableConfig: {
            tableData: [],
            tableSetting: [
              {
                label: '桌面名称',
                prop: 'productName',
                sortable: true
              },
              {
                label: '桌面类型',
                prop: 'productTypeName',
                sortable: true
              }
            ],
            condition: {
              departmentId: ''
            },
            page: {
              pageIndex: 1,
              pageSize: 10,
              pageSizes: [10, 20, 30, 40],
              total: 0
            },
            fetchUrl: 'getDesktopProducts'
          },

    mounted () {
    // do something..
    // tableConfig.condition.departmentName = name
        this.$nextTick(() => {
            this.$refs.table.fetch()
          })
      }



2: 自定义请求获取

    <table-temp :config="tableConfig" ref="table"></table-temp>

    tableConfig: {
            tableData: [],
            tableSetting: [
              {
                label: '桌面名称',
                prop: 'productName',
                sortable: true
              },
              {
                label: '桌面类型',
                prop: 'productTypeName',
                sortable: true
              }
            ],
            page: {
              pageIndex: 1,
              pageSize: 10,
              pageSizes: [10, 20, 30, 40],
              total: 0
            }
          }

    function () {
        fetch('${url}')
        .then(data => {
            tableConfig.tableData = data
        })
    }



3: 对数据进行处理

    config: {
            // ... 需返回处理完的函数
            dataProcess (data) {
              return data.map(item => {
                if (item.orderType != 0) {
                  item.hasChildren = true
                }
                return item
              })
            }
          }



API

原生属性自然支持，config为配置文件

config

       参数     	       说明       	      类型      	    可选值    	                  默认值                   	返回值 
   condition  	   表格查询挂载的参数    	    object    	     -     	                   {}                   	 -  
  tableSetting	     表格的列设置     	    object    	     -     	                   {}                   	 -  
   operation  	     表格的操作栏     	    object    	     -     	                   {}                   	 -  
   selection  	    是否显示复选框     	   boolean    	false\|true	                 false                  	 -  
     index    	     是否显示序号     	   boolean    	false\|true	                 false                  	 -  
     expand   	     是否开启折叠     	   boolean    	false\|true	                 false                  	 -  
      page    	     是否开启分页     	   boolean    	false\|true	                 false                  	 -  
      map     	     数据的映射      	    object    	     -     	{data: "data.items", total: "data.total"}	 -  
     border   	    是否带有纵向边框    	   boolean    	false\|true	                  true                  	 -  
    loading   	 是否开启加载loading  	   boolean    	false\|true	                  true                  	 -  
    fetchUrl  	     请求的地址      	    string    	     -     	                   -                    	 -  
  dataProcess 	获取数据后，挂载数据前的处理函数	function(data)	     -     	                   -                    	data

事件

     事件名    	    说明    	 参数 	 参数说明  	    
  afterFetch	请求完成后触发的函数	data	请求返回的数据	    
     原生事件   	    -     	 -  	   -   	    

插槽

  name  	说明                            
  expand	展开内容的插槽,需配置expand为true        
  btn   	按钮的插槽，如果没有自定义，可使用operation参数配置
  -     	tableSetting里面配置slot，可设置列的插槽  



tableSetting

       参数      	     说明      	         类型          	可选值 	 默认值  
      label    	    列的字段     	       string        	 -  	  -   
      prop     	    列的key    	       string        	 -  	  -   
      width    	    列的宽度     	       number        	 -  	  -   
    minWidth   	   列的最小宽度    	       number        	 -  	 120  
      fixed    	    是否固定     	       boolean       	 -  	false 
     filters   	     原生      	          -          	 -  	  -   
  filter-method	     原生      	          -          	    	  -   
    sortable   	     原生      	          -          	 -  	  -   
      slot     	插槽具名，用以自定义列内容	       string        	 -  	  -   
      style    	   列字段的样式    	function(row)\|object	 -  	  -   
    formatter  	     原生      	          -          	 -  	  -   
      align    	    列对齐方式    	       string        	 -  	center
               	             	                     	    	      
               	             	                     	    	      



operation

     参数   	   说明   	         类型          	可选值 	 默认值  
   fixed  	 固定操作栏  	       string        	 -  	right 
   label  	 操作栏字段  	       string        	 -  	  操作  
   width  	 操作栏的宽度 	       number        	 -  	  -   
  minWidth	操作栏的最小宽度	       number        	 -  	 150  
    btns  	 操作栏按钮  	        array        	 -  	  []  
    按钮配置  	        	                     	    	      
   label  	 按钮的字段  	function(row)\|stirng	 -  	  -   
    show  	 是否显示按钮 	function(row)\|object	 -  	 true 
  disabled	 是否禁止按钮 	function(row)\|object	    	false 
    size  	 按钮的大小  	       string        	 -  	 mini 
    type  	 按钮的类型  	       string        	 -  	 text 
   style  	 按钮的样式  	function(row)\|object	 -  	  -   
    href  	链接地址的按钮 	       string        	 -  	  -   
   align  	 列对齐方式  	       string        	 -  	center
     fn   	按钮的点击事件 	    function(row)    	 -  	  -   
          	        	                     	    	      

page

     参数    	  说明   	  类型  	可选值 	                  默认值                   
  pageIndex	  当前页  	number	 -  	                   1                    
  pageSize 	 当前页码  	number	 -  	                   10                   
  pageSizes	 页码的数组 	array 	 -  	            [10, 20, 30, 40]            
     map   	分页的映射路径	object	 -  	{index: " data.items ", size: " data.total "}
    total  	 数据总量  	number	 -  	                   0                    
