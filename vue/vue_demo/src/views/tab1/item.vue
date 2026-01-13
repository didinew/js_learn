<template>
    <div>
        <p>{{ item.name }}</p>
    </div>
</template>
<script setup lang="ts">

const props = defineProps<{
    item: {
        id: number,
        name: string
    }
}>()
</script>
sc  