<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered v-for="item in items" :key="item.Name">
      <q-img
        :src="item.Image"
      />

      <q-card-section>
        <div class="text-overline text-orange-9">{{item.Subject}}</div>
        <div class="text-h5 q-mt-sm q-mb-xs">{{item.Name}}</div>
        <div class="text-caption text-grey">
          {{item.Education}}
        </div>
      </q-card-section>

      <q-card-actions>

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2">
            {{ item.Description }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>

  </div>
</template>
<script>

import { defineComponent, ref } from 'vue'
import firebase from 'src/boot/firebase'
import {
  collection,
  query,
  onSnapshot,
  orderBy
} from 'firebase/firestore'

export default defineComponent({
  name: 'pageTeachers',
  data () {
    return {
      newContent: '',
      items: [],
      expanded: ref(false)
    }
  },
  mounted () {
    const q = query(collection(firebase.db, 'Teachers'), orderBy('Name'))
    onSnapshot(
      q,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const itemData = change.doc.data()
          itemData.id = change.doc.id
          if (change.type === 'added') {
            this.items.unshift(itemData)
            console.log('New item: ', itemData)
          }
          if (change.type === 'modified') {
            console.log('Modified item: ', itemData)
            const index = this.items.findIndex((item) => item.id === itemData.id)
            Object.assign(this.items[index], itemData)
          }
          if (change.type === 'removed') {
            console.log('Removed item: ', itemData)
            const index = this.items.findIndex((item) => item.id === itemData.id)
            this.items.splice(index, 1)
          }
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }
})
</script>
