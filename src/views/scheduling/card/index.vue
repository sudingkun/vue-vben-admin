<template>
  <PageWrapper :class="prefixCls">
    <template #tags>
      <a-button :class="activeTag === 'all' ? 'tag-button' : 'no-active'" @click="changeTag('all')"
        >全部</a-button
      >

      <div v-for="tag in tags" :key="tag" class="inline">
        <a-button
          type="text"
          :class="activeTag === tag ? 'tag-button' : 'no-active'"
          @click="changeTag(tag)"
          >{{ tag }}</a-button
        >
      </div>
    </template>

    <template #extra>
      <a-input-search placeholder="脚本名称" />
    </template>
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="团队脚本" />
        <a-tab-pane key="logs" tab="公共脚本" />
      </a-tabs>
    </template>

    <div :class="`${prefixCls}__content`">
      <a-spin :spinning="spinning">
        <a-list :pagination="pagination">
          <a-row :gutter="16">
            <template v-for="item in list" :key="item.title">
              <a-col :span="6">
                <a-list-item>
                  <a-card :hoverable="true" :class="`${prefixCls}__card`">
                    <a-card-meta :title="item.title" :description="item.description">
                      <template #avatar>
                        <div :class="`${prefixCls}__card-title`">
                          <Icon class="icon" icon="logos:vue" color="#1890ff" />
                        </div>
                      </template>
                    </a-card-meta>

                    <a-card-meta>
                      <template #avatar>
                        <span style="margin-left: 70px; margin-top: 10px"></span>
                        <div
                          v-for="tag in item.tags"
                          :key="tag"
                          :class="`${prefixCls}__card-title`"
                          style="margin-top: 10px; margin-bottom: -10px; display: inline-block"
                        >
                          <a-tag :bordered="false" color="processing">{{ tag }}</a-tag>
                        </div>
                      </template>
                    </a-card-meta>

                    <template #actions>
                      <eye-outlined />
                      <edit-outlined v-if="currentKey === 'detail'" @click="handleView" />
                      <fork-outlined v-if="currentKey === 'logs'" @click="handleView" />
                      <Dropdown
                        v-if="currentKey === 'detail'"
                        :trigger="['click']"
                        placement="bottom"
                        :arrow="{ pointAtCenter: true }"
                        :dropMenuList="[
                          {
                            text: '脚本删除',
                            event: '1',
                            popConfirm: {
                              title: '是否确认删除',
                              confirm: handleView.bind(null, item.id),
                            },
                          },

                          {
                            text: '脚本发布',
                            event: '3',
                            popConfirm: {
                              title: '是否确认删除',
                              confirm: handleView.bind(null, item.id),
                            },
                          },
                          {
                            text: 'fock',
                            event: '4',
                            popConfirm: {
                              title: '是否确认删除',
                              confirm: handleView.bind(null, item.id),
                            },
                          },
                        ]"
                        popconfirm
                      >
                        <ellipsis-outlined />
                      </Dropdown>
                    </template>
                  </a-card>
                </a-list-item>
              </a-col>
            </template>
            <a-col :span="6" v-show="!spinning">
              <a-list-item>
                <a-card
                  :hoverable="true"
                  :class="`${prefixCls}__card task-add`"
                  style="height: 200px"
                  @click="handleView"
                >
                  <PlusOutlined style="font-size: 30px" />
                  <p>添加脚本</p>
                </a-card>
              </a-list-item>
            </a-col>
          </a-row>
        </a-list>
      </a-spin>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import {
    SettingOutlined,
    EyeOutlined,
    EditOutlined,
    EllipsisOutlined,
    PlusOutlined,
    ForkOutlined,
  } from '@ant-design/icons-vue';
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Col, InputSearch, List, Row, Tabs, Tag, Spin } from 'ant-design-vue';
  import { getScriptList, getTags } from '@/api/demo/test/script';
  import { ScriptParams } from '@/api/demo/model/scriptModel';
  import { useGo } from '/@/hooks/web/usePage';
  import { Dropdown } from '/@/components/Dropdown';

  export default defineComponent({
    components: {
      Icon,
      PageWrapper,
      [Card.name]: Card,
      [Card.Meta.name]: Card.Meta,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
      [Tag.name]: Tag,
      [Spin.name]: Spin,
      [InputSearch.name]: InputSearch,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
      SettingOutlined,
      EditOutlined,
      EllipsisOutlined,
      PlusOutlined,
      EyeOutlined,
      ForkOutlined,
      Dropdown,
    },
    setup() {
      const spinning = ref(false);
      const activeTag = ref('all');
      let scriptList = ref([]);

      const pagination = reactive({
        current: 1,
        pageSize: 12,
        total: 100,
        pageSizeOptions: ['12', '24', '48', '96'],
        showSizeChanger: true,
      });

      const req = reactive({
        name: '',
        page: pagination.current,
        pageSize: pagination.pageSize,
      });

      const currentKey = ref('detail');
      const tags = ref([]);
      const search = async (req: ScriptParams) => {
        spinning.value = true;
        let result = await getScriptList(req);
        pagination.total = result.total;
        scriptList.value = result.items;
        console.log(scriptList);

        spinning.value = false;
        tags.value = await getTags();
      };

      onMounted(() => {
        search(req);
      });

      const changeTag = (key: string) => {
        activeTag.value = key;
        search(req);
      };

      const go = useGo();
      function handleView() {
        go('/scheduling/script_detail');
      }

      return {
        req,
        prefixCls: 'list-card',
        list: scriptList,
        pagination,
        currentKey,
        tags,
        spinning,
        activeTag,
        changeTag,
        handleView,
      };
    },
  });
</script>
<style lang="less" scoped>
  .task-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    color: #999;
  }
  .task-add:hover {
    color: #409eff;
  }
  .task-add i {
    font-size: 30px;
  }
  .task-add p {
    font-size: 15px;
    margin-top: 20px;
  }

  .tag-button {
    color: #4096ff;
    border-color: #4096ff;
  }

  .no-active {
    background: none;
    border: none;
  }

  .list-card {
    &__card {
      width: 100%;
      margin-bottom: -8px;

      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        color: @text-color-base;
        font-size: 16px;
        font-weight: 500;

        .icon {
          margin-right: 10px;
          font-size: 38px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        color: @text-color-secondary;
        font-size: 14px;
      }
    }
  }
</style>
