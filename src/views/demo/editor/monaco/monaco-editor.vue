<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
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
      value: 'console.log("Hello, world")',
      language: 'javascript',
    });
  };
</script>
<template>
  <div id="codeEditBox" style="height: 70vh"></div>
</template>
