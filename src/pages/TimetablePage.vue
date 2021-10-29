<style lang="sass" scoped>
.row > div
  padding: 10px 15px
  background: #FFFFFF
.row + .row
  margin-top: 1rem
.row
  background: #FFFFFF
.timetableH
  background: $lime-9
.my-card
  height: 100%
  max-width: 250px

</style>

<template>
  <div class="q-pa-md">

     <h4>Monday</h4>
    <div class="row">
      <div class="col-6 col-md-3 col-sm-4" v-for="monday in mondayLst" :key="monday.Subject">
           <q-card class="my-card bg-lime-8" flat bordered>
      <q-card-section >
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{monday.Teacher}}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{monday.Subject}}</div>
          <div class="text-caption">
           {{monday.Notes}}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="bg-lime-12">
        <q-icon flat round name="event" class="q-pr-sm"/>
        <text-subtitle2>
          {{monday.Start}} -
        </text-subtitle2>
        <text-subtitle2>
          {{monday.End}}
        </text-subtitle2>
      </q-card-actions>
    </q-card>
      </div>
    </div>

     <h4>Tuesday</h4>
    <div class="row">
      <div class="col-6 col-md-3 col-sm-4" v-for="tuesday in tuesdayLst" :key="tuesday.Subject">
             <q-card class="my-card bg-lime-8" flat bordered>
      <q-card-section >
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{tuesday.Teacher}}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{tuesday.Subject}}</div>
          <div class="text-caption ">
           {{tuesday.Notes}}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="bg-lime-12">
        <q-icon flat round name="event" class="q-pr-sm"/>
        <text-subtitle2>
          {{tuesday.Start}} -
        </text-subtitle2>
        <text-subtitle2>
          {{tuesday.End}}
        </text-subtitle2>
      </q-card-actions>
    </q-card>
      </div>
    </div>

     <h4>wednseday</h4>
    <div class="row">
      <div class="col-6 col-md-3 col-sm-4" v-for="wednseday in wednesdayLst" :key="wednseday.Subject">
             <q-card class="my-card bg-lime-8" flat bordered>
      <q-card-section >
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{wednseday.Teacher}}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{wednseday.Subject}}</div>
          <div class="text-caption ">
           {{wednseday.Notes}}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="bg-lime-12">
        <q-icon flat round name="event" class="q-pr-sm"/>
        <text-subtitle2>
          {{wednseday.Start}} -
        </text-subtitle2>
        <text-subtitle2>
          {{wednseday.End}}
        </text-subtitle2>
      </q-card-actions>
    </q-card>
      </div>
    </div>

     <h4>Thursday</h4>
    <div class="row">
      <div class="col-6 col-md-3 col-sm-4" v-for="thursday in thirsdayLst" :key="thursday.Subject">
            <q-card class="my-card bg-lime-8" flat bordered>
      <q-card-section >
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{thursday.Teacher}}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{thursday.Subject}}</div>
          <div class="text-caption ">
           {{thursday.Notes}}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="bg-lime-12">
        <q-icon flat round name="event" class="q-pr-sm"/>
        <text-subtitle2>
          {{thursday.Start}} -
        </text-subtitle2>
        <text-subtitle2>
          {{thursday.End}}
        </text-subtitle2>
      </q-card-actions>
    </q-card>
      </div>
    </div>

         <h4>Friday</h4>
    <div class="row">
      <div class="col-6 col-md-3 col-sm-4" v-for="friday in fridayLst" :key="friday.Subject">
            <q-card class="my-card bg-lime-8" flat bordered>
      <q-card-section >
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{friday.Teacher}}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{friday.Subject}}</div>
          <div class="text-caption ">
           {{friday.Notes}}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="bg-lime-12">
        <q-icon flat round name="event" class="q-pr-sm"/>
        <text-subtitle2>
          {{friday.Start}} -
        </text-subtitle2>
        <text-subtitle2>
          {{friday.End}}
        </text-subtitle2>
      </q-card-actions>
    </q-card>
      </div>
    </div>

         <h4>Saturday</h4>
    <div class="row">
      <div class="col-6 col-md-3 col-sm-4" v-for="saturday in saturdayLst" :key="saturday.Subject">
             <q-card class="my-card bg-lime-8" flat bordered>
      <q-card-section >
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{saturday.Teacher}}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{saturday.Subject}}</div>
          <div class="text-caption ">
           {{saturday.Notes}}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="bg-lime-12">
        <q-icon flat round name="event" class="q-pr-sm"/>
        <text-subtitle2>
          {{saturday.Start}} -
        </text-subtitle2>
        <text-subtitle2>
          {{saturday.End}}
        </text-subtitle2>
      </q-card-actions>
    </q-card>
      </div>
    </div>

         <h4>Sunday</h4>
    <div class="row">
      <div class="col-6 col-md-3 col-sm-4" v-for="sunday in sundayLst" :key="sunday.Subject">
             <q-card class="my-card bg-lime-8" flat bordered>
      <q-card-section >
        <q-card-section class="q-pt-xs">
          <div class="text-overline">{{sunday.Teacher}}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{sunday.Subject}}</div>
          <div class="text-caption ">
           {{sunday.Notes}}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions class="bg-lime-12">
        <q-icon flat round name="event" class="q-pr-sm"/>
        <text-subtitle2>
          {{sunday.Start}} -
        </text-subtitle2>
        <text-subtitle2>
          {{sunday.End}}
        </text-subtitle2>
      </q-card-actions>
    </q-card>
      </div>
    </div>

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
  name: 'pageTimetable',
  data () {
    return {
      newContent: '',
      items: [],
      mondayLst: [],
      tuesdayLst: [],
      wednesdayLst: [],
      thirsdayLst: [],
      fridayLst: [],
      saturdayLst: [],
      sundayLst: [],
      expanded: ref(false)
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
        this.mondayLst = this.items.filter(function (el) {
          return el.Day === 'Monday'
        })
        this.tuesdayLst = this.items.filter(function (el) {
          return el.Day === 'Tuesday'
        })
        this.wednesdayLst = this.items.filter(function (el) {
          return el.Day === 'Wednesday'
        })
        this.thirsdayLst = this.items.filter(function (el) {
          return el.Day === 'Thursday'
        })
        this.fridayLst = this.items.filter(function (el) {
          return el.Day === 'Friday'
        })
        this.saturdayLst = this.items.filter(function (el) {
          return el.Day === 'Saturday'
        })
        this.sundayLst = this.items.filter(function (el) {
          return el.Day === 'Sunday'
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }
})
</script>
