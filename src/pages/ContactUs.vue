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
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

 <q-input
        filled
        v-model="name"
        label="Your email"
        hint="Email address"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        type="number *"
        v-model="age"
        label="Your contact number *"
        hint="Contact number"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Please type your contact number',
          val => val > 0 && val < 100 || 'Please type a real contact number'
        ]"
      />

          <q-input
        filled
        v-model="name"
        label="Message"
        hint="Message"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" />

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

export default {
  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)

    return {
      name,
      age,
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        } else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        name.value = null
        age.value = null
        accept.value = false
      }
    }
  }
}
</script>
