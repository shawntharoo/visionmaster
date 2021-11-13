<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
  height: 250px
</style>
<template>
<q-page style="padding-top: 5px; pending-left:5px">
    <div class="row justify-center">
        <div class="col-1">
        </div>
        <div class="col-10">
            <q-img fit="cover" style="max-height: 900px;" src="https://firebasestorage.googleapis.com/v0/b/vision-e90f5.appspot.com/o/VMI.png?alt=media&token=c20af9be-30c8-4b94-b840-b2ab8731cc94">
            </q-img>

        </div>
        <div class="col-1">
        </div>
    </div>
    <div class="q-pa-md row items-start justify-between q-gutter-md">
        <transition-group appear enter-active-class="animated slideInUp" leave-active-class="animated slideInDown">
            <q-card dark bordered class="bg-lime-9 my-card" key="1">
                <q-card-section>
                    <div class="text-h6">Vision Master Institue</div>
                    <div class="text-subtitle2">Josef Albers</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    Good teaching is more a giving of right questions than a giving of right answers
                </q-card-section>
            </q-card>

       <q-card dark bordered class="bg-lime-9 my-card" key="1">
                <q-card-section>
                    <div class="text-h6">Vision Master Institue</div>
                    <div class="text-subtitle2">Malcom x</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                   Education is the passport to the future, for tomarrow belongs to those who prepare for it today.
                </q-card-section>
            </q-card>

                   <q-card dark bordered class="bg-lime-9 my-card" key="1">
                <q-card-section>
                    <div class="text-h6">Vision Master Institue</div>
                    <div class="text-subtitle2">Henry S. Haskins</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    It is not so much tutoring that the mind needs, but clearer recognition and better use of what it already knows.
                </q-card-section>
            </q-card>

            <q-card dark bordered class="bg-lime-9 my-card" key="2">
                <q-card-section>
                    <div class="text-h6">Vision Master Institue</div>
                    <div class="text-subtitle2">Dave Eggers</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    So this is the space during tutoring hours. It's very busy. Same principles: One-on-one attention, Complete devotion to the students' work and a bondless optimism and sort of a possibility of creativity and ideas.
                </q-card-section>
            </q-card>

            <q-card dark bordered class="bg-lime-9 my-card" key="3">
                <q-card-section>
                    <div class="text-h6">Vision Master Institue</div>
                    <div class="text-subtitle2">Anonymous</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    The best teachers are those who show you where to look but don't tell you what to look
                </q-card-section>
            </q-card>
        </transition-group>
    </div>
</q-page>
</template>

<script>
import {
  defineComponent
} from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
