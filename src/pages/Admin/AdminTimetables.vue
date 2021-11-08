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

   <q-item v-for="item in items" :key="item.Subject" clickable v-ripple @click="showSlotDetils(item)">
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
        <q-card-section jus>
          <div class="text-h6">Timetable Slots</div>
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

         <!--     <q-input
        filled
        v-model="end"
        label="End time *"
        hint="Class end time"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      /> -->
       <div class="q-pt-md q-pb-md">
 <q-badge color="teal">
        Class end time: {{ end }}
      </q-badge>
      <span class="q-pl-md"></span>
          <q-btn icon="access_time" round color="primary">
      <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
        <q-time v-model="proxyTime">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn label="OK" color="primary" flat @click="save" v-close-popup />
          </div>
        </q-time>
      </q-popup-proxy>
    </q-btn>
</div>
<q-select outlined v-model="day" :options="options" label="Class day" hint="The day of the week"/>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Close" type="reset" color="primary" flat class="q-ml-sm" v-close-popup/>
        <span class="q-pl-sm"></span>
                   <q-btn
      round
      size="sm"
      icon="delete"
      color="negative"
      @click="deleteSlot()"
    />
      </div>

       <q-separator />
    </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
     <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" @click="addNewSlot()"/>
          </q-page-sticky>
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
  setDoc,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'

export default defineComponent({
  name: 'pageAdminTimetable',
  setup () {
    const teacher = ref(null)
    const subject = ref(null)
    const note = ref(null)
    const start = ref(null)
    const end = ref('11:00')
    const day = ref(null)
    const proxyTime = ref('11:00')
    return {
      options: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      fixed: ref(true),
      teacher,
      subject,
      note,
      start,
      day,
      proxyTime,
      end,
      updateProxy () {
        proxyTime.value = end.value
        console.log(end)
      },
      save () {
        end.value = proxyTime.value
      }
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
    showSlotDetils: function (item) {
      this.fixed = true
      this.selectedItem = item
      this.teacher = item.Teacher
      this.subject = item.Subject
      this.note = item.Notes
      this.day = item.Day
      this.start = item.Start
      this.end = item.End
    },
    addNewSlot: function () {
      this.onReset()
      this.updateProxy()
      this.fixed = true
      this.selectedItem = null
    },
    async deleteSlot () {
      await deleteDoc(doc(firebase.db, 'Timetable', this.selectedItem.id))
      this.fixed = false
    },
    async onSubmit () {
      if (this.selectedItem != null) {
        console.log('not null')
        const docRef = doc(firebase.db, 'Timetable', this.selectedItem.id)
        // Update the timestamp field with the value from the server
        await setDoc(docRef, {
          Teacher: this.teacher,
          Subject: this.subject,
          Notes: this.note,
          Day: this.day,
          Start: this.start,
          End: this.end
        })
      } else {
        this.fixed = false
        console.log('null')
        await addDoc(collection(firebase.db, 'Timetable'), {
          Teacher: this.teacher,
          Subject: this.subject,
          Notes: this.note,
          Day: this.day,
          Start: this.start,
          End: this.end
        })
      }
    },

    onReset () {
      this.teacher = null
      this.subject = null
      this.note = null
      this.start = null
      this.end = null
      this.day = null
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
