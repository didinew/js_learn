<template>
    <div class="tab-container">
        <!-- 自定义 Tab 按钮 -->
         <div class="tab-nav">
            <slot name="tab-button" :tabs="tabs" :activeTab="activeTab" :setTab="setTab">
                <!-- 默认按钮渲染 -->
                 <button v-for="tab in tabs"
                    :key="tab.name"
                    :class="{ active: activeTab === tab.name }"
                    @click="setTab(tab)">
                    {{ tab.name }}
                </button>
            </slot>
         </div>
    </div>
    <!-- KeepAlive 缓存异步组件 -->
    <Suspense>
        <template #default>
            <KeepAlive :include="cachedTabs">
                <component :is="currentComponent" />
            </KeepAlive>
        </template>
       <template #fallback>
        <slot name="loading">
            <div class="loading">加载中...</div>
        </slot>
        </template>
    </Suspense>
</template>
<script setup lang="ts">
  	// •	动态 Tab 数量
	// •	KeepAlive 缓存
	// •	异步组件懒加载
	// •	Slot 自定义 Tab 按钮
import { computed, ref, watch, nextTick } from 'vue'
interface propsTabs {
    name: string
    label: string
    keepAlive: boolean
    component?: () => Promise<any>
    onDeactivate?: () => void
}

const props = defineProps<{
    tabs: propsTabs[]
    defaultTab: string
}>()

const scrollMap = new Map()

const activeTab = ref(props.defaultTab || props.tabs[0] && props.tabs[0].name)

const visitedTabs = ref(new Set())

watch(() => activeTab.value, (newTab, oldTab) => {
    visitedTabs.value.add(newTab)
    const old = props.tabs.find(tab => tab.name === oldTab)
    if(old && !old.keepAlive && old.onDeactivate) {
        old.onDeactivate()
        // visitedTabs.value.delete(oldTab)
    }
    if (oldTab) {
        scrollMap.set(oldTab, window.scrollY)
    }

     nextTick(() => {
        const y = scrollMap.get(newTab) || 0
        window.scrollTo(0, y)
    })
}, {
    immediate: true
})


// 切换tab
const setTab = (tab: propsTabs) => {
    activeTab.value = tab.name
}


const cachedTabs = computed(() => {
    return props.tabs.filter(tab => tab.keepAlive).map(tab => tab.name)
})

// 当前组件
const currentComponent = computed(() => {
    const tab =  props.tabs.find(tab => tab.name === activeTab.value)
    if (!tab) return
     // 首次访问才加载异步组件
    if (!visitedTabs.value.has(tab.name)) return null
    return tab.component
})


</script>
<style scoped>

    .tab-nav {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
button.active {
  font-weight: bold;
  border-bottom: 2px solid #409eff;
}
</style>