<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://firebasestorage.googleapis.com/v0/b/vision-e90f5.appspot.com/o/LOGO.jpg?alt=media&token=55ef8706-527f-455e-8b33-f16c6efbe48d">
          </q-avatar>
          Vision Master Higheir Education
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
         <q-btn-dropdown auto-close stretch flat label="Timetable">

               <q-route-tab
               v-for="nested in nestedLinks"  :key="nested.to"
          exact
          :to="nested.to"
          :label="nested.label"
        />
        </q-btn-dropdown>
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

const nestedLinkList = [
  {
    label: 'Regular Courses',
    to: '/timetable'
  },
  {
    label: 'Special Courses',
    to: '/specialcourses'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {

  },
  setup () {
    const leftDrawerOpen = ref(false)
    const tab = ref('mails')
    return {
      tab,
      essentialLinks: linksList,
      nestedLinks: nestedLinkList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
