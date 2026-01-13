<template>
    <div>
        <input type="text" v-model="internalKeyword" placeholder="搜索">
        <div v-if="loading"> loading。。。。。。</div>
    </div>
</template>
<script lang="ts" setup>
import {onBeforeUnmount, ref, watch} from 'vue'
import debounce from 'lodash/debounce';
import { mockSearchApi } from '@/utils/mockSearch.js'

// 根据输入的文字 请求接口

const props = defineProps<{
    keyword: string
}>()


const emit = defineEmits(['update:keyword', 'update:result', 'update:loading'])
const internalKeyword = ref(props.keyword)
const loading = ref(false)
const result = ref<{id: number, name: string}[]>([])

// 并发控制
let controller: any = null
let lastKey = ''
let requestId = 0
let lastRequestId = 0

// 搜索函数
const search = async (val: string) => {
    // val 不是有效值
    if (!val || val === lastKey) return
    // 每次只请求一个
    const currentId = ++requestId
    lastRequestId = currentId

    // 取消上一次请求
    // 	2.	请求取消
	// •	上一个请求未完成，直接 abort
	// •	避免无效网络请求
    if (controller) {
        controller.abort()
    }

    controller = new AbortController()

    // 搜索开始
    loading.value = true
    emit('update:loading', true)

    try{
        // const res = await fetch(`/api/search?q=${val}`, {
        //     signal: controller.signal
        // })

        // const data = await res.json()

        // 模拟 fetch + abort
        const data: {id: number, name: string}[] = await new Promise((resolve, reject) => {
        const timer = setTimeout(async () => {
            const res = await mockSearchApi(val)
            resolve(res)
        }, 0)

        controller.signal.addEventListener('abort', () => {
            clearTimeout(timer)
            reject({ name: 'AbortError' })
        })
        })
        // console.log(data)
        // 只渲染最新请求结果
        //         	3.	并发控制 / 乱序保护
        // •	requestId + latestRequestId
        // •	面试官常考「网络返回顺序可能乱」的问题
        // console.log(val)
        if (currentId === lastRequestId) {
            result.value = data
            lastKey = val
            emit('update:result', data)
        }
    }catch (err: any) {
        if (err.name !== 'AbortError') console.error(err)
    } finally {
        if (currentId === lastRequestId) {
            loading.value = false
            emit('update:loading', false)
        }
    }
}


// 防抖输入
const debouncedSearch = debounce((val) => search(val), 300)


// watch 受控输入
watch(internalKeyword, (val) => {
    emit('update:keyword', val)
    debouncedSearch(val)
})

// // 外部 v-model 同步内部值
watch(() => props.keyword, (val) => {
    if (val !== internalKeyword.value) internalKeyword.value = val
})

// 关于卸载 	5.	资源释放
onBeforeUnmount(() => {
    debouncedSearch.cancel()
    controller?.abort()
})
</script>