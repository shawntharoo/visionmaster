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
  <div class="q-pa-md q-gutter-md">
    <q-list bordered class="rounded-borders">
      <q-item-label header>All teachers</q-item-label>

      <q-item clickable v-ripple v-for="item in items" :key="item.Name" @click="showTeacherDetils(item)">
        <q-item-section avatar>
          <q-avatar>
            <img :src="item.Image.url">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1"  class="text-weight-bold">{{item.Name}}  <span class="text-subtitle2">({{item.Education}})</span></q-item-label>
          <q-item-label caption lines="2">
            {{item.Description}}
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          {{item.Subject}}
        </q-item-section>
      </q-item>

      <q-separator inset="item" />
    </q-list>

        <q-dialog v-model="fixed">
      <q-card>
        <q-card-section jus>
          <div class="text-h6">Teacher detail</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">
          <q-form
      @submit="onSubmit"
      @reset="onReset"
      class=" formdisply"
    >

      <q-uploader v-if="this.selectedItem == null"
        :factory="uploadFn"
        auto-upload
        color="teal"
        flat
        bordered
        accept='.jpg, .png, .jpeg, image/*'
        style="max-width: 300px"
      />
  <!-- <q-img v-if="this.selectedItem != null"
      :src="image"
      spinner-color="white"
      style="height: 170px; max-width: 300px"
      img-class="my-custom-image"
      class="rounded-borders"
    /> -->
    <q-file v-if="this.selectedItem != null" v-model="files" filled bottom-slots label="Click here to update photo" counter max-files="12">
        <template v-slot:before>
          <q-avatar>
            <img :src="image.url">
          </q-avatar>
        </template>
    </q-file>
      <q-input
        filled
        v-model="name"
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
        v-model="description"
        label="Description "
        hint="About the teacher"
      />

            <q-input
        filled
        v-model="education"
        label="Education *"
        hint="Education level"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Close" type="reset" color="primary" flat class="q-ml-sm" v-close-popup/>
         <span class="q-pl-sm"></span>
                   <q-btn
    class="q-pd"
      round
      size="sm"
      icon="delete"
      color="negative"
      @click="deleteTeacher()"
    />
      </div>

       <q-separator />
    </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
     <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" @click="addNewTeacher()"/>
          </q-page-sticky>

  </div>
</template>
<script>

import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
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
import { ref as fireRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

export default defineComponent({
  name: 'pageAdminTeachers',
  setup () {
    const $q = useQuasar()
    const name = ref(null)
    const subject = ref(null)
    const education = ref(null)
    const description = ref(null)
    const image = ref(null)
    const model = ref(null)
    return {
      fixed: ref(false),
      name,
      subject,
      education,
      description,
      image,
      model,
      $q
    }
  },
  data () {
    return {
      newContent: '',
      items: [],
      selectedItem: '',
      files: null
    }
  },
  methods: {
    showTeacherDetils: function (item) {
      this.fixed = true
      this.selectedItem = item
      this.name = item.Name
      this.subject = item.Subject
      this.education = item.Education
      this.description = item.Description
      this.image = item.Image
    },
    addNewTeacher: function () {
      this.onReset()
      this.fixed = true
      this.selectedItem = null
    },
    deleteFirebaseImages: function (deleteImg) {
      const delImgRef = fireRef(firebase.storage, `teachers/${deleteImg.name}`)
      deleteObject(delImgRef).then((data) => {
        console.log(data)
      }).catch((error) => {
        console.log(error.message)
      })
    },
    async deleteTeacher () {
      await deleteDoc(doc(firebase.db, 'Teachers', this.selectedItem.id))
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
      this.deleteFirebaseImages(this.selectedItem.Image)
      this.fixed = false
    },
    async onSubmit () {
      if (this.selectedItem != null) {
        const fileArray = []
        if (this.file !== undefined) {
          fileArray.push(this.files)
          await this.uploadFn(fileArray)
        }
        const docRef = doc(firebase.db, 'Teachers', this.selectedItem.id)
        await setDoc(docRef, {
          Name: this.name,
          Subject: this.subject,
          Description: this.description,
          Education: this.education,
          Image: this.image
        }).then(data => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            position: 'center',
            message: 'Data successfully stored in cloud'
          })
        }, error => {
          this.$q.notify({
            type: 'negative',
            position: 'center',
            message: error
          })
        })
      } else {
        this.fixed = false
        await addDoc(collection(firebase.db, 'Teachers'), {
          Name: this.name,
          Subject: this.subject,
          Description: this.description,
          Education: this.education,
          Image: this.image
        }).then(data => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            position: 'center',
            message: 'Data successfully stored in cloud'
          })
        }, error => {
          this.$q.notify({
            type: 'negative',
            position: 'center',
            message: error
          })
        })
      }
      this.fixed = false
    },
    async uploadFn (file) {
      const teacherImagesRef = fireRef(firebase.storage, `teachers/${file[0].name}`)
      await uploadBytes(teacherImagesRef, file[0]).then((snapshot) => {
        this.$q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'cloud_done',
          position: 'center',
          message: 'Image succeesfully uploaded'
        })
      }, error => {
        this.$q.notify({
          type: 'negative',
          position: 'center',
          message: error
        })
      })
      await this.download(file)
    },
    onReset () {
      this.name = null
      this.subject = null
      this.description = null
      this.education = null
      this.image = null
    },
    async download (file) {
      await getDownloadURL(fireRef(firebase.storage, `teachers/${file[0].name}`))
        .then((url) => {
          const obj = {} // <---- Move declaration inside loop
          obj.name = file.name
          obj.url = url
          this.image = obj
        })
        .catch((error) => {
          this.$q.notify({
            type: 'negative',
            position: 'center',
            message: error
          })
        })
    }
  },
  mounted () {
    const q = query(collection(firebase.db, 'Teachers'), orderBy('Name'))
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
