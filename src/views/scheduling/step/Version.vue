<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <List :data-source="result" :split="false">
      <template #header>
        <div style="text-align: center; font-size: 16px">版本</div>
      </template>
      <template #renderItem="{ item }">
        <ListItem>{{ item.id }}</ListItem>
      </template>
    </List>
  </div>
</template>
<script lang="ts" setup>
  import { List, ListItem } from 'ant-design-vue';
  import { ref } from 'vue';

  const result = ref([]);

  for (let i = 0; i < 6; i++) {
    result.value.push({
      id: `20231110${i}`,
    });
  }
</script>
