<template>
    <div class="virtual-list" ref="container" @scroll="onScroll">
        <div :style="{ height: totalHeight + 'px', position: 'relative' }">
            <Item
                v-for="(item, index) in visibleData"
                :key="item.id"
                :item="item"
                 v-memo="['item.id','item.name','selected']"
                 v-model:selected="selectedMap[item.id]"
                
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, watch, onMounted, computed } from 'vue'
import Item from './Item.vue'
const props = defineProps<{
    data: {id: number, name: string}[]
    loadMore: () => void
}>()

const container = ref<any>(null)
const startIndex = ref(0)
const  scrollTop  = ref(0)
const visibleCount = ref(0)

const rowHeights = ref<number[]>([]) // 动态行高
const offsets = ref<number[]>([]) // 每行 top 偏移
const totalHeight = ref(0) // 总高度

const selectedMap = reactive({}) // 每条 item 选中状态

watch(()=>props.data,(list)=>{
    console.log(list)
    // 初始化行高和偏移
    rowHeights.value = list.map(() => 50)
    offsets.value = rowHeights.value.reduce((acc, i, h) => {
        acc.push((acc[i-1]||0)+h)
        return acc
    }, [])
    totalHeight.value = offsets.value[offsets.value.length-1] || 0
    console.log(totalHeight.value)
    // 初始化 selectedMap
    list.forEach(item=>{
        if(!(item.id in selectedMap)) selectedMap[item.id] = false
    })
})


onMounted(()=>{
  if(container.value){
    visibleCount.value = Math.ceil(container.value.clientHeight/30)+5
  }
})


const onScroll = (e: any) => {
    const target = e.target
    scrollTop.value = target.scrollTop

     // 找到 startIndex
    let idx = rowHeights.value.findIndex((h,i)=> offsets.value[i]>scrollTop.value)
    startIndex.value = idx===-1?0:idx

    // 无限滚动
    if(scrollTop.value + target.clientHeight >= totalHeight.value - 100){
        props.loadMore?.()
    }
}

const visibleData = computed(()=>{
    const start = startIndex.value
    const end = Math.min(start+visibleCount.value,props.data.length)
    return props.data.slice(start,end)
})
</script>
<style scoped>
.virtual-list {
    height: 400px;
    overflow: auto;
}
.list-item {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
}
</style>