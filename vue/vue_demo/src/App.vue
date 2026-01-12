<template>
  <TabContainer :tabs="tabs">
    <template #tab-button="{ tabs, activeTab, setTab }">
     <!-- 自定义按钮样式 -->
    <div class="custom-buttons">
      <span
        v-for="tab in tabs"
        :key="tab.name"
        :class="{ active: activeTab === tab.name }"
        @click="setTab(tab)"
      >
        {{ tab.label }}
      </span>
    </div>
    </template>
  </TabContainer>
</template>
<script setup lang="ts">
  import { defineAsyncComponent } from 'vue'
  import TabContainer from '@/components/TabContainer.vue'
  const tabs = [
    {
    name: 'Tab1',
    label: '用户表单',
    component: defineAsyncComponent(() => import('@/views/tab1/index.vue')),
    keepAlive: false,
    onDeactivate: () => {
      console.log('Tab1 被停用')
    }
  },
  {
    name: 'Tab2',
    label: '数据统计',
    component: defineAsyncComponent(() => import('@/views/tab2/index.vue')),
    keepAlive: true
  },
  {
    name: 'Tab3',
    label: '设置',
    component: defineAsyncComponent(() => import('@/views/tab3/index.vue')),
    keepAlive: true
  }
  ]
</script>

<style scoped>
.custom-buttons {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

</style>
