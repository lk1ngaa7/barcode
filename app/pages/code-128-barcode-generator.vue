<script setup lang="ts">
import ToolPage from '~/components/seo/ToolPage.vue'
import { toolPages } from '../../utils/seoPages'

const page = toolPages.code128

useToolPageHead(page)
</script>

<template>
  <ToolPage :page="page" />
</template>
