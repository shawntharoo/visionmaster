<style lang="sass" scoped>
.imageavtr
  margin-right: 20px
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
      <q-item-label header>Special Course List</q-item-label>

      <q-item clickable v-ripple v-for="item in items" :key="item.id" @click="showCourseDetails(item)">
        <q-item-section>
          <q-item-label lines="1"  class="text-weight-bold">{{item.Course}}  <span class="text-subtitle2">({{item.Teacher}})</span></q-item-label>
          <q-item-label caption lines="2">
            {{item.Notes}}
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          {{item.Day}}
          {{item.Start}} - {{item.End}}
        </q-item-section>
      </q-item>

      <q-separator inset="item" />
    </q-list>

        <q-dialog v-model="fixed">
      <q-card>
        <q-card-section jus>
          <div class="text-h6">Course detail</div>
        </q-card-section>

        <q-separator />

        <q-card-section class="scroll">
          <q-form
      @submit="onSubmit"
      @reset="onReset"
      class=" formdisply"
    >
             <q-avatar class="imageavtr"  rounded size="48px" v-for="(img, index) in images" :key="img.imgName">
          <img :src="img.url" />
          <q-badge floating color="red" @click="removeImage(index, img)"> <q-icon name="clear" /></q-badge>
        </q-avatar>
      <q-uploader
        :factory="uploadFn"
        color="teal"
        flat
        label="Update images"
        multiple
        batch
        bordered
        accept='.jpg, .png, .jpeg, image/*'
        style="max-width: 300px"
      />
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
        v-model="course"
        label="Course name *"
        hint="Name of the course"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

            <q-input
        filled
        v-model="notes"
        label="Description "
        hint="About the course"
      />

          <div class="q-pt-md q-pb-md">
 <q-badge color="teal">
        Class start time: {{ proxyTimeStart }}
      </q-badge>
      <span class="q-pl-md"></span>
          <q-btn icon="access_time" round color="primary">
      <q-popup-proxy @before-show="updateProxyStart" cover transition-show="scale" transition-hide="scale">
        <q-time v-model="start">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn label="OK" color="primary" flat @click="saveStart" v-close-popup />
          </div>
        </q-time>
      </q-popup-proxy>
    </q-btn>
</div>

       <div class="q-pt-md q-pb-md">
 <q-badge color="teal">
        Class end time: {{ proxyTimeEnd }}
      </q-badge>
      <span class="q-pl-md"></span>
          <q-btn icon="access_time" round color="primary">
      <q-popup-proxy @before-show="updateProxyEnd" cover transition-show="scale" transition-hide="scale">
        <q-time v-model="end">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn label="OK" color="primary" flat @click="saveEnd" v-close-popup />
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
    class="q-pd"
      round
      size="sm"
      icon="delete"
      color="negative"
      @click="deleteCourse()"
    />
      </div>

       <q-separator />
    </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
     <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" @click="addNewCourse()"/>
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
  name: 'pageAdminSpecialCourses',
  setup () {
    const $q = useQuasar()
    const teacher = ref(null)
    const course = ref(null)
    const images = ref([])
    const start = ref('11:00')
    const end = ref('11:00')
    const day = ref(null)
    const proxyTimeEnd = ref('11:00')
    const proxyTimeStart = ref('11:00')
    const notes = ref(null)
    const model = ref(null)
    return {
      options: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
      ],
      fixed: ref(false),
      teacher,
      course,
      start,
      end,
      day,
      proxyTimeEnd,
      proxyTimeStart,
      notes,
      images,
      model,
      $q,
      updateProxyEnd () {
        end.value = proxyTimeEnd.value
      },
      saveEnd () {
        proxyTimeEnd.value = end.value
      },
      updateProxyStart () {
        start.value = proxyTimeStart.value
      },
      saveStart () {
        proxyTimeStart.value = start.value
      }
    }
  },
  data () {
    return {
      newContent: '',
      items: [],
      deleteImgList: [],
      selectedItem: '',
      files: null
    }
  },
  methods: {
    showCourseDetails: function (item) {
      this.fixed = true
      this.selectedItem = item
      this.teacher = item.Teacher
      this.course = item.Course
      this.start = item.Start
      this.end = item.End
      this.day = item.Day
      this.notes = item.Notes
      this.images = item.Images
      this.deleteImgList = []
      this.proxyTimeStart = item.Start
      this.updateProxyStart()
      this.proxyTimeEnd = item.End
      this.updateProxyEnd()
    },
    addNewCourse: function () {
      this.onReset()
      this.updateProxyEnd()
      this.updateProxyStart()
      this.fixed = true
      this.selectedItem = null
      this.deleteImgList = []
      this.images = []
    },
    removeImage: function (elIndex, img) {
      this.images.splice(elIndex, 1)
      this.deleteImgList.push(img)
    },
    deleteFirebaseImages: function (deleteImgList) {
      if (deleteImgList.length !== 0) {
        for (let index = 0; index < deleteImgList.length; index++) {
          const delImgRef = fireRef(firebase.storage, `specialcourses/${deleteImgList[index].imgName}`)
          deleteObject(delImgRef).then((data) => {
            console.log(data)
          }).catch((error) => {
            console.log(error.message)
          })
        }
      }
    },
    async deleteCourse () {
      await deleteDoc(doc(firebase.db, 'SpecialCourses', this.selectedItem.id))
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
      this.deleteFirebaseImages(this.selectedItem.Images)
      this.fixed = false
    },
    async onSubmit () {
      if (this.selectedItem != null) {
        this.deleteFirebaseImages(this.deleteImgList)

        const docRef = doc(firebase.db, 'SpecialCourses', this.selectedItem.id)
        await setDoc(docRef, {
          Teacher: this.teacher,
          Course: this.course,
          Notes: this.notes,
          Start: this.start,
          End: this.end,
          Day: this.day,
          Images: this.images
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
            message: error.message
          })
        })
      } else {
        await addDoc(collection(firebase.db, 'SpecialCourses'), {
          Teacher: this.teacher,
          Course: this.course,
          Notes: this.notes,
          Start: this.start,
          End: this.end,
          Day: this.day,
          Images: this.images
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
            message: error.message
          })
        })
      }
      this.fixed = false
    },
    async uploadFn (files) {
      for (let index = 0; index < files.length; index++) {
        const teacherImagesRef = fireRef(firebase.storage, `specialcourses/${files[index].name}`)
        await uploadBytes(teacherImagesRef, files[index]).then((snapshot) => {
          this.$q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'cloud_done',
            position: 'center',
            message: `${files[index].name} succeesfully uploaded`
          })
        }, error => {
          this.$q.notify({
            type: 'negative',
            position: 'center',
            message: error.message
          })
        })
      }

      await this.download(files)
    },
    onReset () {
      this.teacher = null
      this.course = null
      this.notes = null
      this.images = null
    },
    async download (files) {
      for (let index = 0; index < files.length; index++) {
        await getDownloadURL(fireRef(firebase.storage, `specialcourses/${files[index].name}`))
          .then((url) => {
            const obj = {} // <---- Move declaration inside loop
            obj.imgName = files[index].name
            obj.url = url
            this.images.push(obj)
          })
          .catch((error) => {
            this.$q.notify({
              type: 'negative',
              position: 'center',
              message: error.message
            })
          })
      }
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
