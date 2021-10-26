import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import firebase from 'src/boot/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

const auth = firebase.firebaseAuth

const state = reactive({

  contacts: [{
    id: 5,
    name: 'Brunhilde Panswick',
    email: 'bpanswick4@csmonitor.com',
    avatar: 'avatar2.jpg'
  }, {
    id: 6,
    name: 'Winfield Stapforth',
    email: 'wstapforth5@pcworld.com',
    avatar: 'avatar6.jpg'
  }]

})

const actions = {

  handleAuthStateChanged () {
    const router = useRouter()
    console.log(router.currentRoute)
    if (router.currentRoute.value.fullPath === '/admin') {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Activo')
          router.push('/admin')
        } else {
          router.push('/login')
        }
      })
    } else {
      router.push('/')
    }
  },

  Login (payload) {
    console.log('Login')

    const { email, pass } = payload

    signInWithEmailAndPassword(auth, email, pass)
      .then((user) => {
        // Signed in
        // ...
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
      })
  },

  Register (payload) {
    console.log(payload)
    const { email, pass } = payload

    console.log(email, pass)

    createUserWithEmailAndPassword(auth, email, pass)
      .then((user) => {
        // Signed in
        // ...
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
        // ..
      })
  },

  logOut () {
    signOut(auth)
  }

}

export default {
  state,
  actions
}
