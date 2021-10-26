/* eslint-disable no-unused-vars */
<template>
  <div class="q-px-lg q-pb-md">
    <q-timeline color="secondary">

      <q-timeline-entry heading body="November, 2017" />

      <q-timeline-entry v-for="item in items" :key="item.Date"
        :title="item.Title"
        :subtitle= "item.Date"
        :body="item.Description"
      />

    </q-timeline>
  </div>
</template>
<script>
import { formatDistance } from 'date-fns'
import { defineComponent } from 'vue'
import firebase from 'src/boot/firebase'
import {
  collection,
  query,
  onSnapshot,
  orderBy
} from 'firebase/firestore'

export default defineComponent({
  name: 'PageNewsFeed',
  props: {
    formattedDate: {
      type: String
    }
  },
  data () {
    return {
      newcontent: '',
      items: [
      ]
    }
  },
  mathod: {
    relativeDate (value) {
      return formatDistance(value, new Date())
    }
  },

  mounted () {
    const q = query(collection(firebase.db, 'News'), orderBy('Date'))
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
