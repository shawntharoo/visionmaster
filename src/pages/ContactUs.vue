<template>

<div class="row">
  <div class="col-12 col-md-6">
<div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="cusname"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

 <q-input
        filled
        v-model="email"
        label="Your email"
        hint="Email address"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number *"
        v-model="mobile"
        label="Your contact number *"
        hint="Contact number"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your contact number'
        ]"
      />

          <q-input
        filled
        v-model="message"
        label="Message"
        hint="Message"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
  </div>
  <div class="col-12 col-md-6">
<div class="q-pa-md q-gutter-md">
    <q-list bordered padding class="rounded-borders" style="max-width: 350px">
      <q-item-label header>Contact Info</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar top>
          <q-avatar icon="folder" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Mobile</q-item-label>
          <q-item-label caption>0424387803</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" color="green" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar top>
          <q-avatar icon="folder" color="orange" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Land Line</q-item-label>
          <q-item-label caption>0112265188</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section avatar top>
          <q-avatar icon="folder" color="teal" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Email</q-item-label>
          <q-item-label caption>tharooshawn@gmail.com</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" />
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Social Media</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar top>
          <q-avatar icon="assignment" color="grey" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Facebook</q-item-label>
          <q-item-label caption>facebook page url</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" />
        </q-item-section>
      </q-item>

           <q-separator spaced />
      <q-item-label header>Location</q-item-label>

      <q-item clickable v-ripple>
        <q-item-section avatar top>
          <q-avatar icon="place" color="grey" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Address</q-item-label>
          <q-item-label caption>167/1A, Makola South, Makola</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="info" />
        </q-item-section>
      </q-item>

    </q-list>
  </div>
  </div>
</div>

</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import firebase from 'src/boot/firebase'
import {
  collection,
  addDoc
} from 'firebase/firestore'

export default {
  setup () {
    const $q = useQuasar()

    const cusname = ref(null)
    const email = ref(null)
    const mobile = ref(null)
    const message = ref(null)

    return {
      $q,
      cusname,
      email,
      mobile,
      message
    }
  },
  methods: {
    async onSubmit () {
      await addDoc(collection(firebase.db, 'Messages'), {
        Name: this.cusname,
        Email: this.email,
        Mobile: this.mobile,
        Message: this.message,
        MarkRead: false
      }).then(data => {
        this.$q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'cloud_done',
          position: 'center',
          message: 'Message succeesfully sent'
        })
      }, error => {
        this.$q.notify({
          type: 'negative',
          position: 'center',
          message: error
        })
      })

      this.onReset()
    },

    onReset () {
      this.cusname = null
      this.email = null
      this.mobile = null
      this.message = null
    }
  }
}
</script>
