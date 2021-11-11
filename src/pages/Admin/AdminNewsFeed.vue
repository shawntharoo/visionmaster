/* eslint-disable no-unused-vars */
<template>
  <div class="q-px-lg q-pb-md">
    <q-timeline color="secondary">

      <q-timeline-entry v-for="item in items" :key="item.Date"
        :title="item.Title"
        :subtitle= "relativeDate (item.Date)"
        :body="item.Description"
        icon="delete"
        color="red"
        @click="deleteNews(item)"
      />

    </q-timeline>

        <q-dialog v-model="fixed">
      <q-card>
        <q-card-section jus>
          <div class="text-h6">News</div>
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
        v-model="title"
        label="Title *"
        hint="Title of the news"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

            <q-input
        filled
        v-model="description"
        label="Description *"
        hint="content of the news"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
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

         <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" @click="postNewNews()"/>
          </q-page-sticky>
  </div>
</template>
<script>
import { fromUnixTime, intervalToDuration, format } from 'date-fns'
import { defineComponent, ref } from 'vue'
import firebase from 'src/boot/firebase'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
  addDoc
} from 'firebase/firestore'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PageNewsFeed',
  setup () {
    const $q = useQuasar()
    const model = ref(null)
    const title = ref(null)
    const description = ref(null)
    return {
      $q,
      model,
      title,
      description,
      fixed: ref(false)
    }
  },
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
    },
    deleteNews (news) {
      deleteDoc(doc(firebase.db, 'News', news.id))
        .then(data => {
          this.$q.notify({
            type: 'positive',
            position: 'center',
            message: 'Document successfully deleted'
          })
        }, error => {
          this.$q.notify({
            type: 'negative',
            position: 'center',
            message: error
          })
        })
    },
    postNewNews: function () {
      this.onReset()
      this.fixed = true
    },
    async onSubmit () {
      this.fixed = false
      await addDoc(collection(firebase.db, 'News'), {
        Title: this.title,
        Description: this.description,
        Date: Math.round((new Date()).getTime() / 1000)
      }).then(data => {
        this.$q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'cloud_done',
          position: 'center',
          message: 'Documet succeesfully addedd to cloud'
        })
      }, error => {
        this.$q.notify({
          type: 'negative',
          position: 'center',
          message: error
        })
      })
    },
    onReset () {
      this.title = null
      this.description = null
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
        this.$q.notify({
          type: 'negative',
          position: 'center',
          message: error
        })
      }
    )
  }
})
</script>
