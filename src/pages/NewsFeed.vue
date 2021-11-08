/* eslint-disable no-unused-vars */
<template>
  <div class="q-px-lg q-pb-md">
    <q-timeline color="secondary">

      <q-timeline-entry v-for="item in items" :key="item.Date"
        :title="item.Title"
        :subtitle= "relativeDate (item.Date)"
        :body="item.Description"
      />
    </q-timeline>
  </div>
</template>
<script>
import { fromUnixTime, intervalToDuration, format } from 'date-fns'
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
  methods: {
    relativeDate (value) {
      const formatteddate = intervalToDuration({
        start: fromUnixTime(value),
        end: new Date()
      })
      console.log(formatteddate)
      if (formatteddate.days === 0 && formatteddate.months === 0 && formatteddate.years === 0) {
        const date = formatteddate.minutes + ' minutes ago'
        return date
      } else {
        return format(new Date(value * 1000), 'MM/dd/yyyy')
      }
    }
  },

  mounted () {
    const q = query(collection(firebase.db, 'News'), orderBy('Date', 'desc'))
    onSnapshot(
      q,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const itemData = change.doc.data()
          itemData.id = change.doc.id
          if (change.type === 'added') {
            this.items.unshift(itemData)
          }
          if (change.type === 'modified') {
            const index = this.items.findIndex((item) => item.id === itemData.id)
            Object.assign(this.items[index], itemData)
          }
          if (change.type === 'removed') {
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
