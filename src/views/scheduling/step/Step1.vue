<template>
  <div class="step1">
    <div class="step1-form">
      <BasicForm @register="register" />
    </div>
    <a-divider />
    <h3>说明</h3>
    <h4>采集类型说明</h4>
    <p>
      可以描述一下采集类型 可以描述一下采集类型 可以描述一下采集类型 可以描述一下采集类型
      可以描述一下采集类型 可以描述一下采集类型
    </p>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';

  import { Select, Input, Divider } from 'ant-design-vue';
  import { schemas } from './data';

  export default defineComponent({
    components: {
      BasicForm,
      [Select.name]: Select,
      [Input.name]: Input,
      [Input.Group.name]: Input.Group,
      [Divider.name]: Divider,
    },
    emits: ['next'],
    setup(_, { emit }) {
      const [register, { validate }] = useForm({
        layout: 'vertical',
        baseColProps: {
          span: 6,
        },
        schemas: schemas,
        showResetButton: false,
        submitButtonOptions: {
          text: '下一步',
        },
        actionColOptions: { span: 12 },
        submitFunc: customSubmitFunc,
      });

      async function customSubmitFunc() {
        try {
          const values = await validate();
          emit('next', values);
        } catch (error) {
          //
        }
      }

      return { register };
    },
  });
</script>
<style lang="less" scoped>
  .step1 {
    &-form {
      width: 90%;
      margin: 0 auto;
    }

    h3 {
      margin: 0 0 12px;
      color: @text-color-base;
      font-size: 16px;
      line-height: 32px;
    }

    h4 {
      margin: 0 0 4px;
      color: @text-color-base;
      font-size: 14px;
      line-height: 22px;
    }

    p {
      color: @text-color-base;
    }
  }

  .pay-select {
    width: 20%;
  }

  .pay-input {
    width: 70%;
  }
</style>
