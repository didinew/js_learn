<template>
  <div>
    <input type="checkbox" v-model="selected" /> {{ item.name }}
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  item: Object,
  modelValue: Boolean // 支持 v-model:selected
})

const emit = defineEmits(['update:selected'])
const selected = ref(props.modelValue||false)

watch(selected,val=> emit('update:selected',val))
watch(()=>props.modelValue,val=> { if(val!==selected.value) selected.value = val })
</script>

