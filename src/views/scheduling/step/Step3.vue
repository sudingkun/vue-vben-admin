<template>
  <div class="step3">

    <div id="codeEditBox"  style="height:95%"></div>


    <div>
      <BasicForm @register="register" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BasicForm, useForm } from '@/components/Form';
  import { ref,onMounted } from 'vue';
  import * as monaco from 'monaco-editor';
  import { editor } from 'monaco-editor';
  type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
  let codeEditor = ref<IStandaloneCodeEditor>();



onMounted(() => {
  initEditor();
});
const initEditor = () => {
  // Initialize editor , Make sure dom Has rendered
  codeEditor.value = monaco.editor.create(document.getElementById('codeEditBox')!, {
    value: '#!/bin/sh\n' +
      '#Author: wuwj1@wangsu.com\n' +
      '#Modified: 2021.5.17\n' +
      '#Function: 监控系统忙时是否加载nf_conntrack模块\n' +
      '\n' +
      'function monitor_nf_conntrack()\n' +
      '{\n' +
      '    export PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin\n' +
      '    hour_array=(00 01 02 03 04 05 06 07)\n' +
      '    nh=`date +"%H"`\n' +
      '    wt=`echo "${hour_array[@]}" | grep -wq "$nh" &&  echo 0 || echo 1`\n' +
      '    /usr/sbin/lsmod | grep nf_conntrack 2>/dev/null\n' +
      '    if [[ $? -eq 0 && $wt -eq 1 ]];then\n' +
      "        /usr/local/bin/wsms_areport -n nfconntrack_mod_alarm -p 'mode nf_conntrack is exist'\n" +
      '    fi\n' +
      '}\n' +
      '\n' +
      'monitor_nf_conntrack',
    language: 'shell',
  });
};


  // your action

  const [register] = useForm({
    labelWidth: 80,
    actionColOptions: {
      span: 12,
    },
    resetButtonOptions: {
      text: '上一步',
    },
    submitButtonOptions: {
      text: '提交',
    },
    resetFunc: customResetFunc,
    submitFunc: customSubmitFunc,
  });

  const emit = defineEmits(['prev', 'next']);

  async function customResetFunc() {
    emit('prev');
  }

  async function customSubmitFunc() {
    try {
      setTimeout(() => {
        emit('next', null);
      }, 1500);
    } catch (error) {}
  }
</script>
<style lang="less" scoped>
  .step3 {
    width: 100%;
    height: calc(100vh - 200px);
    margin: 0 auto;
  }
</style>
