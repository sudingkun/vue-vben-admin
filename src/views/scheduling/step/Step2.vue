<template>
  <div>
    <TaskParam />
    <SchedulerParam class="!mt-5" />
    <ExecuteParam class="!mt-5" />

    <div class="!mt-5">
      <a-card :bordered="false">
        <BasicForm @register="register" />
      </a-card>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';

  import TaskParam from './TaskParam.vue';
  import ExecuteParam from './ExecuteParam.vue';
  import SchedulerParam from './SchedulerParam.vue';
  import { Divider, Card } from 'ant-design-vue';

  export default defineComponent({
    components: {
      BasicForm,
      TaskParam,
      ExecuteParam,
      SchedulerParam,
      [Divider.name]: Divider,
      [Card.name]: Card,
    },
    emits: ['next', 'prev'],
    setup(_, { emit }) {
      const [register, { validate, setProps }] = useForm({
        labelWidth: 80,
        actionColOptions: {
          span: 12,
        },
        resetButtonOptions: {
          text: '上一步',
        },
        submitButtonOptions: {
          text: '下一步',
        },
        resetFunc: customResetFunc,
        submitFunc: customSubmitFunc,
      });

      async function customResetFunc() {
        emit('prev');
      }

      async function customSubmitFunc() {
        try {
          const values = await validate();
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            emit('next', values);
          }, 1500);
        } catch (error) {}
      }

      return { register };
    },
  });
</script>
