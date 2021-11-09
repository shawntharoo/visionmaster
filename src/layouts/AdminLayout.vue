<template>
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Vision Master Institute
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-scroll-area class="fit">
        <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable exact v-ripple :to="menuItem.to">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />

            </template>
                 <q-item clickable exact v-ripple @click="logout()">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section style="color:red">
                 LOGOUT
                </q-item-section>
              </q-item>
          </q-list>
        </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
const menuList = [
  {
    icon: 'event',
    label: 'Timetable',
    separator: false,
    to: '/admin'
  },
  {
    icon: 'people',
    label: 'Teachers',
    separator: false,
    to: '/admin/adminTeachers'
  },
  {
    icon: 'feed',
    label: 'News',
    separator: true,
    to: '/admin/adminNewsfeed'
  }
]
export default {
  setup () {
    const router = useRouter()
    const store = inject('store')
    const leftDrawerOpen = ref(false)

    return {
      store,
      router,
      leftDrawerOpen,
      menuList,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    logout: function () {
      this.store.actions.logOut()
      this.router.push('/')
    }
  }
}
</script>
