<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Vision Higheir Education
          {{ $route.name }}
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="right">
        <q-route-tab
          exact
          v-for="link in essentialLinks"
          :key="link.to"
          :to="link.to"
          :label="link.label"
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>{{ $route.name }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>

const linksList = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Timetable',
    to: '/timetable'
  },
  {
    label: 'Teachers',
    to: '/teachers'
  },
  {
    label: 'News Feed',
    to: '/newsfeed'
  },
  {
    label: 'About Us',
    to: '/aboutus'
  },
  {
    label: 'Contact Us',
    to: '/contactus'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {

  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
