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
    <VirtualList
        :data="result"
        :loadMore="loadMore"
        v-model:selected-map="selectedMap"
    />
  </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive   } from 'vue'
import Search from '@/components/Search.vue'
import VirtualList from '@/components/VirtualList.vue'

const keyword = ref('')
const result = ref<{id: number, name: string}[]>([])
const loading = ref(false)

const onResult = (val: {id: number, name: string}[]) => {
    result.value = val
}
const onLoading = (val: boolean) => {
    loading.value = val
}

const selectedMap = reactive({}) // 每条 item 选中状态
const loadingMore = ref(false)
let page = 1
let pageSize = 1000
const loadMore = async () => {
    if(loadingMore.value) return
  loadingMore.value = true
  page++
  const newData = Array.from({length:10000},(_,i)=>({
    id:i+1,
    name:`Item ${i+1}`
  }))
    .filter(item=>item.name.toLowerCase().includes(keyword.value.toLowerCase()))
    .slice((page-1)*pageSize,page*pageSize)
  await new Promise(r=>setTimeout(r,200))

  result.value = [...result.value,...newData]
  loadingMore.value = false
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
