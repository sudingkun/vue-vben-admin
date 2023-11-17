<template>
  <PageWrapper title="服务列表">
    <template #footer>
      <!--      <div style="display: inline-block">-->
      <!--        <a-tabs default-active-key="detail">-->
      <!--          <a-tab-pane key="detail" tab="默认服务" />-->
      <!--          <a-tab-pane key="logs" tab="归档服务" />-->
      <!--        </a-tabs>-->
      <!--      </div>-->

      <!--      <span style="position: absolute; right: 20px">-->
      <!--        <a-input-search placeholder="服务名称" />-->
      <!--      </span>-->

      <a-row>
        <a-col :span="8">
          <a-tabs default-active-key="detail">
            <a-tab-pane key="detail" tab="默认服务" />
            <a-tab-pane key="logs" tab="归档服务" />
          </a-tabs>
        </a-col>
        <a-col :span="4" :offset="12">
          <a-input-search placeholder="服务名称" />
        </a-col>
      </a-row>
    </template>

    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleOpen">新增服务</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '详情',
                onClick: handleOpen.bind(null, record),
              },
              {
                label: '删除',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';
  import { Col, Row, Tabs } from 'ant-design-vue';

  import { demoListApi } from '/@/api/demo/table';
  import { PageWrapper } from '@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    components: {
      PageWrapper,
      TableAction,
      BasicTable,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { getForm }] = useTable({
        api: demoListApi,
        columns: getBasicColumns(),
        useSearchForm: false,
        formConfig: getFormConfig(),
        showTableSetting: false,
        showIndexColumn: false,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        },
      });

      function getFormValues() {
        console.log(getForm().getFieldsValue());
      }

      function handleDelete(record: Recordable) {
        console.log('点击了删除', record);
      }

      const go = useGo();
      function handleOpen(record: Recordable) {
        go('/scheduling/test_info');
      }

      return {
        registerTable,
        getFormValues,
        checkedKeys,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>
