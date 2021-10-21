<template>
  <el-table
    ref="filterTable"
    border
    :data="tableData"
    style="width: 100%"
    stripe
    @row-click="useRowClick"
    max-height="500"
    :highlight-current-row="false"
  >
    <el-table-column prop="address" label="位置" align="center"></el-table-column>
    <el-table-column prop="type" label="类型" align="center"></el-table-column>
    <el-table-column
      prop="occurrenceTime"
      label="发生时间"
      align="center"
      column-key="date"
      :filters="[
        { text: '2021-09-15 15:15:15', value: '2021-09-15 15:15:15' },
        { text: '2021-09-16 15:15:15', value: '2021-09-16 15:15:15' },
      ]"
      :filter-method="filterHandler"
    ></el-table-column>
    <el-table-column
      prop="recoveryTime"
      label="恢复时间"
      align="center"
      :filters="[
        { text: '2021-09-15 15:15:15', value: '2021-09-15 15:15:15' },
        { text: '2021-09-16 15:15:15', value: '2021-09-16 15:15:15' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'AlarmList',
  data() {
    return {
      tableData: [
        {
          id: '1',
          address: '三楼前台',
          type: '跳闸报警',
          occurrenceTime: '2021-09-15 15:15:15',
          recoveryTime: '2021-09-15 15:15:15',
        },
        {
          id: '2',
          address: '三楼前台',
          type: '跳闸报警',
          occurrenceTime: '2021-09-16 15:15:15',
          recoveryTime: '2021-09-16 15:15:15',
        },
        {
          id: '3',
          address: '三楼前台',
          type: '跳闸报警',
          occurrenceTime: '2021-09-16 15:15:15',
          recoveryTime: '2021-09-16 15:15:15',
        },
      ],
    };
  },
  methods: {
    formatter(row) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    // 点击表格行
    useRowClick(row) {
      this.$emit('rowClick', row);
    },
  },
};
</script>
