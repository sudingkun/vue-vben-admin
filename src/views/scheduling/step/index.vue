<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <Version v-show="current === 0" style="border-radius: 4px; width: 10%" />

    <div
      class="overflow-hidden m4 p-4"
      style="border-radius: 4px"
      :class="current !== 1 ? 'vben-page-wrapper-content-bg' : ''"
    >
      <div class="step-form-form">
        <a-steps :current="current">
          <a-step title="基础信息" />
          <a-step title="脚本参数" />
          <a-step title="脚本" />
        </a-steps>
      </div>
      <div>
        <Dropdown
          v-if="current === 0"
          :trigger="['click']"
          placement="bottom"
          :arrow="{ pointAtCenter: true }"
          :dropMenuList="[
            {
              text: '版本管理',
              event: '1',
              popConfirm: {
                title: '是否确认删除',
              },
            },
          ]"
          popconfirm
        >
          <ellipsis-outlined />
        </Dropdown>
      </div>
      <div class="mt-5">
        <Step1 @next="handleStep1Next" v-show="current === 0" />
        <Step2
          @prev="handleStepPrev"
          @next="handleStep2Next"
          v-show="current === 1"
          v-if="initSetp2"
        />
        <Step3
          v-show="current === 2"
          @redo="handleRedo"
          v-if="initSetp3"
          @prev="handleStepPrev"
          @next="handleStep2Next"
        />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue';
  import Step1 from './Step1.vue';
  import Step2 from './Step2.vue';
  import Step3 from './Step3.vue';
  import { PageWrapper } from '/@/components/Page';
  import { Steps, Col, Row } from 'ant-design-vue';
  import Version from './Version.vue';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  import { Dropdown } from '/@/components/Dropdown';

  export default defineComponent({
    name: 'FormStepPage',
    components: {
      EllipsisOutlined,
      Dropdown,
      Step1,
      Step2,
      Step3,
      PageWrapper,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      Version,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    setup() {
      const current = ref(0);

      const state = reactive({
        initSetp2: false,
        initSetp3: false,
      });

      function handleStep1Next(step1Values: any) {
        current.value++;
        state.initSetp2 = true;
        console.log(step1Values);
      }

      function handleStepPrev() {
        current.value--;
        console.log(current);
        console.log(state);
      }

      function handleStep2Next(step2Values: any) {
        current.value++;
        state.initSetp3 = true;
        console.log(step2Values);
      }

      function handleRedo() {
        current.value = 0;
        state.initSetp2 = false;
        state.initSetp3 = false;
      }

      return {
        current,
        handleStep1Next,
        handleStep2Next,
        handleRedo,
        handleStepPrev,
        ...toRefs(state),
      };
    },
  });
</script>
<style lang="less" scoped>
  .step-form-content {
    padding: 24px;
    background-color: @component-background;
  }

  .step-form-form {
    width: 750px;
    margin: 0 auto;
  }
</style>
