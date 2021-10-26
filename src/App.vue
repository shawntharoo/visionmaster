<template>
  <router-view />
</template>
<script>
import { defineComponent, provide } from 'vue'
import store from './store'

export default defineComponent({
  name: 'App',
  setup () {
    provide('store', store)
    store.actions.handleAuthStateChanged()
  },
  mounted () {
    this.$q.dark.set(false)
  }
})
</script>
