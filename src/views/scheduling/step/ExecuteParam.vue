<template>
  <a-card title="执行参数" :bordered="false">
    <BasicTable @register="registerTable" @edit-change="handleEditChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)" />
        </template>
      </template>
    </BasicTable>
    <a-button block class="mt-5" type="dashed" @click="handleAdd"> 新增参数 </a-button>
    <div>
      <a-divider />
      <h3>说明</h3>
      <h4>使用场景说明</h4>
      <p> key、value 参数说明 key、value 参数说明 key、value 参数说明 key、value 参数说明 </p>
    </div>
  </a-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Divider, Card } from 'ant-design-vue';

  import {
    BasicTable,
    useTable,
    TableAction,
    BasicColumn,
    ActionItem,
    EditRecordRow,
  } from '/@/components/Table';

  const columns: BasicColumn[] = [
    {
      title: 'key',
      dataIndex: 'name',
      editRow: true,
      editComponentProps: {
        addonBefore: '${',
        addonAfter: '}',
      },
    },
    {
      title: 'value',
      dataIndex: 'no',
      editRow: true,
    },
    {
      title: '描述',
      dataIndex: 'dept',
      editRow: true,
    },
  ];

  const data: any[] = [
    {
      name: '${DB_HOST}',
      no: '127.0.0.1',
      dept: '数据库地址',
    },
    {
      name: '${DB_PORT}',
      no: '63751',
      dept: '数据库端口',
    },
  ];
  export default defineComponent({
    components: { BasicTable, TableAction, [Card.name]: Card, [Divider.name]: Divider },
    setup() {
      const [registerTable, { getDataSource }] = useTable({
        columns: columns,
        showIndexColumn: false,
        dataSource: data,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
        scroll: { y: '100%' },
        pagination: false,
      });

      function handleEdit(record: EditRecordRow) {
        record.name = record.name?.replace('${', '')?.replace('}', '');
        record.onEdit?.(true);
      }

      function handleCancel(record: EditRecordRow) {
        record.onEdit?.(false);
        if (record.isNew) {
          const data = getDataSource();
          const index = data.findIndex((item) => item.key === record.key);
          data.splice(index, 1);
        }
      }

      function handleSave(record: EditRecordRow) {
        record.name = record.name?.replace('${', '')?.replace('}', '');
        record.name = `\${${record.name}}`;
        record.onEdit?.(false, true);
      }

      function handleEditChange(data: Recordable) {
        console.log(data);
      }

      function handleAdd() {
        const data = getDataSource();
        const addRow: EditRecordRow = {
          name: '',
          no: '',
          dept: '',
          editable: true,
          isNew: true,
          key: `${Date.now()}`,
        };
        data.push(addRow);
      }

      function createActions(record: EditRecordRow): ActionItem[] {
        if (!record.editable) {
          return [
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
            },
          ];
        }
        return [
          {
            label: '保存',
            onClick: handleSave.bind(null, record),
          },
          {
            label: '取消',
            popConfirm: {
              title: '是否取消编辑',
              confirm: handleCancel.bind(null, record),
            },
          },
        ];
      }

      return {
        registerTable,
        handleEdit,
        createActions,
        handleAdd,
        getDataSource,
        handleEditChange,
      };
    },
  });
</script>
