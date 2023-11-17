<template>
  <template v-for="(tag, index) in state.tags" :key="tag">
    <Tooltip v-if="tag.length > 20" :title="tag">
      <Tag :closable="index !== 0" @close="handleClose(tag)" style="margin-bottom: 3px">
        {{ `${tag.slice(0, 20)}...` }}
      </Tag>
    </Tooltip>
    <Tag v-else :closable="index !== 0" @close="handleClose(tag)" style="margin-bottom: 3px">
      {{ tag }}
    </Tag>
  </template>
  <a-input
    v-if="state.inputVisible"
    ref="inputRef"
    v-model:value="state.inputValue"
    type="text"
    size="small"
    :style="{ width: '78px' }"
    @blur="handleInputConfirm"
    @keyup.enter="handleInputConfirm"
  />
  <Tag v-else style="background: #fff; border-style: dashed" @click="showInput">
    <plus-outlined />
    New Tag
  </Tag>
</template>
<script lang="ts" setup>
  import { ref, reactive, nextTick } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { Tag, Tooltip } from 'ant-design-vue';

  const inputRef = ref();
  const state = reactive({
    tags: ['Tag 2', 'Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3Tag 3'],
    inputVisible: false,
    inputValue: '',
  });

  const handleClose = (removedTag: string) => {
    const tags = state.tags.filter((tag) => tag !== removedTag);
    console.log(tags);
    state.tags = tags;
  };

  const showInput = () => {
    state.inputVisible = true;
    nextTick(() => {
      inputRef.value.focus();
    });
  };

  const handleInputConfirm = () => {
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    Object.assign(state, {
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };
</script>
