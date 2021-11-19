<template>
  <div class="q-pa-md">
    <q-list bordered class="rounded-borders">
      <q-item v-for="item in items" :key="item.id">
        <q-item-section >
          <q-item-label>{{item.Course}}</q-item-label>
          <q-item-label lines="1">
               <span class="text-grey-8">{{item.Day}}</span>
            <span class="text-grey-8"> - {{item.Start}}-{{item.End}}</span>
          </q-item-label>
          <q-item-label caption>
            {{item.Notes}}
          </q-item-label>
          <q-item-label class="text-weight-small">{{item.Teacher}}</q-item-label>
                      <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
    >
      <q-carousel-slide v-for="img in item.Images" :name="img" :key="img['imgName']" :img-src="img['url']" />
    </q-carousel>
        </q-item-section>

      </q-item>
    </q-list>
      <q-separator inset dark class="q-pt-lg"/>
  </div>
</template>
<script>
import { ref } from 'vue'
import firebase from 'src/boot/firebase'
import {
  collection,
  query,
  onSnapshot,
  orderBy
} from 'firebase/firestore'

export default {
  setup () {
    return {
      slide: ref(1)
    }
  },
  data () {
    return {
      items: [
      ]
    }
  },
  mounted () {
    const q = query(collection(firebase.db, 'SpecialCourses'), orderBy('Day'))
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
}
</script>
