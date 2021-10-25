<style lang="sass" scoped>
.my-card
  width: 100%
</style>
<template>
<q-page style="padding: 5px;">
    <div class="row justify-center padding-bottom: 10px">
        <div class="col-1">
        </div>
        <div class="col-10">
            <q-img fit="cover" style="max-height: 900px;" src="images/tiution.jpg">
            </q-img>

        </div>
        <div class="col-1">
        </div>
    </div>
    <div class="q-pa-md row items-center justify-center q-gutter-md">
        <h3>Vision Master Education</h3>
         <text-body1>
             Body 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
         </text-body1>
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
