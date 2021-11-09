<template>
  <router-view />
</template>
<script>
import { defineComponent, provide } from 'vue'
import store from './store'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'App',
  setup () {
    const router = useRouter()
    provide('store', store)
    store.actions.handleAuthStateChanged(router)
  },
  mounted () {
    this.$q.dark.set(false)
  }
})
</script>
