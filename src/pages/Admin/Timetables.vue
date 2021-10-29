<style lang="sass" scoped>
.formdisply
  body.screen--sm  &
   width: 400px
  body.screen--md  &
   width: 400px
  body.screen--lg  &
   width: 400px
</style>
<template>
  <div class="q-pa-md">
    <q-list bordered padding>
      <q-item-label header>User Controls</q-item-label>

   <q-item v-for="item in items" :key="item.Subject" clickable v-ripple @click="showProfile(item)">
        <q-item-section>
          <q-item-label>{{ item.Teacher }} - {{ item.Subject }}</q-item-label>
          <q-item-label caption lines="2">{{ item.Notes }}</q-item-label>
        </q-item-section>
 <q-item-section side top>
          <q-item-label class="text-h7  text-dark" >{{ item.Day }}</q-item-label>
          <q-item-label caption>{{ item.Start }} - {{ item.End }}</q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
        <q-dialog v-model="fixed">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">
          <q-form
      @submit="onSubmit"
      @reset="onReset"
      class=" formdisply"
    >
      <q-input
        filled
        v-model="teacher"
        label="Teachers' name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

            <q-input
        filled
        v-model="subject"
        label="Subjects name *"
        hint="Stream of subject"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

            <q-input
        filled
        v-model="note"
        label="Note "
        hint="Special notes"
      />

            <q-input
        filled
        v-model="start"
        label="Start time *"
        hint="Class start time"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

            <q-input
        filled
        v-model="end"
        label="End time *"
        hint="Class end time"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="day"
        label="Class day *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type a day of the week']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Close" type="reset" color="primary" flat class="q-ml-sm" v-close-popup/>
      </div>

       <q-separator />
    </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>

import { defineComponent, ref } from 'vue'
import firebase from 'src/boot/firebase'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  doc
} from 'firebase/firestore'

export default defineComponent({
  name: 'pageAdminTimetable',
  setup () {
    const teacher = ref(null)
    const subject = ref(null)
    const note = ref(null)
    const start = ref(null)
    const end = ref(null)
    const day = ref(null)
    return {
      fixed: ref(false),
      teacher,
      subject,
      note,
      start,
      end,
      day
    }
  },
  data () {
    return {
      newContent: '',
      items: [],
      selectedItem: ''
    }
  },
  methods: {
    showProfile: function (item) {
      this.fixed = true
      console.log(item)
      this.selectedItem = item
      this.teacher = item.Teacher
      this.subject = item.Subject
      this.note = item.Notes
      this.day = item.Day
      this.start = item.Start
      this.end = item.End
    },
    async onSubmit () {
      const docRef = doc(firebase.db, 'Timetable', this.selectedItem.id)
      // Update the timestamp field with the value from the server
      await updateDoc(docRef, {
        Teacher: this.teacher,
        Subject: this.subject,
        Notes: this.note,
        Day: this.day,
        Start: this.start,
        End: this.end
      })
    },

    onReset () {
      this.teacher.value = null
      this.subject.value = null
      this.note.value = null
      this.start.value = null
      this.end.value = null
      this.day.value = null
    }
  },
  mounted () {
    const q = query(collection(firebase.db, 'Timetable'), orderBy('Day'))
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
