<!-- Tab1.vue -->
<template>
  <div style="height: 1000px;">
    <h2>Tab1 页面</h2>
    <form @submit.prevent="submitForm">
      <input v-model="form.name" placeholder="输入名字" />
      <input v-model="form.age" type="number" placeholder="输入年龄" />
      <button type="submit">提交</button>
    </form>
    <p>当前状态：{{ form }}</p>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  age: ''
})

const submitForm = () => {
  alert(JSON.stringify(form))
}
</script>