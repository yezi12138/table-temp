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
            label: 'ID'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'amount1',
            label: '数值 1'
          },
          {
            prop: 'amount2',
            label: '数值 2'
          },
          {
            prop: 'amount3',
            label: '数值 3'
          }
        ]
      }
    }
  }
}
</script>
