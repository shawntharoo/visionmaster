<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
<template>
<q-page style="padding-top: 5px; pending-left:5px">
    <div class="row justify-center">
        <div class="col-1">
        </div>
        <div class="col-10">
            <q-img fit="cover" style="max-height: 900px;" src="images/VMI.png">
            </q-img>

        </div>
        <div class="col-1">
        </div>
    </div>
    <div class="q-pa-md row items-start justify-between q-gutter-md">
        <transition-group appear enter-active-class="animated slideInUp" leave-active-class="animated slideInDown">
            <q-card dark bordered class="bg-lime-9 my-card" key="1">
                <q-card-section>
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    I started using quasar and I would like to have input centered but in a quasar way (using quasar available classes, components and directives). I do not want to force style with !important. Here is codepen
                </q-card-section>
            </q-card>

       <q-card dark bordered class="bg-lime-9 my-card" key="1">
                <q-card-section>
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    I started using quasar and I would like to have input centered but in a quasar way (using quasar available classes, components and directives). I do not want to force style with !important. Here is codepen
                </q-card-section>
            </q-card>

                   <q-card dark bordered class="bg-lime-9 my-card" key="1">
                <q-card-section>
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    I started using quasar and I would like to have input centered but in a quasar way (using quasar available classes, components and directives). I do not want to force style with !important. Here is codepen
                </q-card-section>
            </q-card>

            <q-card dark bordered class="bg-lime-9 my-card" key="2">
                <q-card-section>
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    I started using quasar and I would like to have input centered but in a quasar way (using quasar available classes, components and directives). I do not want to force style with !important. Here is codepen
                </q-card-section>
            </q-card>

            <q-card dark bordered class="bg-lime-9 my-card" key="3">
                <q-card-section>
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section>
                    I started using quasar and I would like to have input centered but in a quasar way (using quasar available classes, components and directives). I do not want to force style with !important. Here is codepen
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
