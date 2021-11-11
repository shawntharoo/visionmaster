<style lang="sass">
.chat
  body.screen--xs &
    width: 100%
    max-width: 400px
  body.screen--sm &
    width: 100%
    max-width: 700px
  body.screen--md &
    width: 100%
    max-width: 800px
  body.screen--lg &
    width: 100%
    max-width: 1000px
</style>>

<template>
  <div class="q-pa-md row justify-start">
    <div class="chat">
      <q-chat-message  class="q-pt-md" v-for="message in items" :key="message.Email" @click="updateMarkread(message)"
        :name="message.Email"
        avatar="https://firebasestorage.googleapis.com/v0/b/vision-e90f5.appspot.com/o/user.png?alt=media&token=a90cc44d-cede-44d8-9c59-5c820db48929"
        :text="[message.Message]"
        :stamp="message.Mobile"
        :label="message.Name"
        :sent="message.MarkRead"
        text-color="white"
        bg-color="primary"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import firebase from 'src/boot/firebase'
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  setDoc
} from 'firebase/firestore'

export default defineComponent({
  name: 'AdminMessages',
  setup () {
    const $q = useQuasar()
    return {
      $q
    }
  },
  data () {
    return {
      markread: false,
      items: []
    }
  },
  methods: {
    async updateMarkread (message) {
      const docRef = doc(firebase.db, 'Messages', message.id)
      await setDoc(docRef, {
        Name: message.Name,
        Email: message.Email,
        Mobile: message.Mobile,
        Message: message.Message,
        MarkRead: !message.MarkRead
      }).then(data => {
        if (message.MarkRead) {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            position: 'center',
            message: 'Message marked as read'
          })
        } else {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            position: 'center',
            message: 'Message marked as unread'
          })
        }
      }, error => {
        this.$q.notify({
          type: 'negative',
          position: 'center',
          message: error
        })
      })
    }
  },
  mounted () {
    const q = query(collection(firebase.db, 'Messages'), orderBy('Name'))
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
