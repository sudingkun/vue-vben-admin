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
                    <div :class="`${prefixCls}__card-title`">
                      <Icon class="icon" v-if="item.icon" :icon="item.icon" :color="item.color" />
                      {{ item.title }}
                    </div>
                    <div :class="`${prefixCls}__card-detail`">
                      基于Vue Next, TypeScript, Ant Design Vue实现的一套完整的企业级后台管理系统
                    </div>
                  </a-card>
                </a-list-item>
              </a-col>
            </template>
          </a-row>
        </a-list>
      </a-spin>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { PageWrapper } from '/@/components/Page';
  import { Card, Col, InputSearch, List, Row, Tabs, Tag, Spin } from 'ant-design-vue';
  import { getScriptList, getTags } from '@/api/demo/test/script';
  import { ScriptParams } from '@/api/demo/model/scriptModel';

  export default defineComponent({
    components: {
      Icon,
      PageWrapper,
      [Card.name]: Card,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
      [Tabs.name]: Tabs,
      [Tag.name]: Tag,
      [Spin.name]: Spin,
      [InputSearch.name]: InputSearch,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const spinning = ref(false);
      const activeTag = ref('all');
      let scriptList = ref([]);

      const pagination = reactive({
        current: 1,
        pageSize: 16,
        total: 100,
        pageSizeOptions: ['16', '32', '64', '128'],
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
      };
    },
  });
</script>
<style lang="less" scoped>
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
          margin-top: -5px;
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
