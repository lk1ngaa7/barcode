<script setup lang="ts">
import ToolPage from '~/components/seo/ToolPage.vue'
import { toolPages } from '../../utils/seoPages'

const page = toolPages.itf

useToolPageHead(page)
</script>

<template>
  <ToolPage :page="page" />
</template>
