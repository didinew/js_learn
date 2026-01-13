<!-- Tab1.vue -->
<template>
  <div style="height: 1000px;">
    <h2>Tab1 页面</h2>
    <Search
        :keyword="keyword"
        @update:result="onResult"
        @update:loading="onLoading"/>
    <div v-if="loading">搜索中...</div>
  <ul>
    <Item v-for="item in result" :key="item.id" :item="item" v-memo="['item.id']"/>
  </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Search from '@/components/Search.vue'
import Item from '@/views/tab1/item.vue'

const keyword = ref('')
const result = ref<{id: number, name: string}[]>([])
const loading = ref(false)

const onResult = (val: {id: number, name: string}[]) => {
    result.value = val
}
const onLoading = (val: boolean) => {
    loading.value = val
}

</script>

<style scoped>
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        padding: 5px;
    }
</style>
