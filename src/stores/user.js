import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { ref, get, child, push } from 'firebase/database'

import { auth, db } from '../firebaseConfig'
import router from '../router'
import { firebaseErrorHandler, buildSlug } from '../mixins/index'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false
  }),
  persist: true,
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        this.userData = { email: user.email, uid: user.uid }
        router.push('/')
        return user
      } catch (error) {
        const errorMessage = firebaseErrorHandler(error)
        throw Error(errorMessage)
      } finally {
        this.loadingUser = false
      }
    },
    async changeProfile(user, data) {
      try {
        await updateProfile(user, data)
        this.userData.displayName = data?.displayName
      } catch (error) {
        console.log(error)
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.userData = { email: user.email, uid: user.uid }
        router.push({ name: 'Dashboard' })
      } catch (error) {
        const errorMessage = firebaseErrorHandler(error)
        throw Error(errorMessage)
      } finally {
        this.loadingUser = false
      }
    },
    async logoutUser() {
      try {
        await signOut(auth)
        this.userData = null
        router.push('/login')
        const store = useCatStore()
        store.clearData()
      } catch (error) {
        console.log(error)
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName
              }
            } else {
              this.userData = null
            }
            resolve(user)
          },
          (e) => reject(e)
        )
      })
    }
  }
})

export const useCatStore = defineStore('catSore', {
  state: () => ({
    catsData: {},
    catsCounter: 0,
    loadingCatsData: false
  }),
  persist: true,
  actions: {
    async getCats(uid) {
      await get(child(ref(db), `/users/${uid}`))
        .then((snapshot) => {
          this.loadingCatsData = true
          if (snapshot.exists()) {
            this.catsData = snapshot.val()?.cats || {}
            this.catsCounter = Object.keys(this.catsData).length
          }
          this.loadingCatsData = false
        })
        .catch((error) => {
          console.error(error)
          this.loadingCatsData = false
        })
    },
    async registerCat(uid, data) {
      try {
        const catsRef = ref(db, `users/${uid}/cats`)
        const slug = buildSlug(data, this.catsCounter)
        await push(catsRef, { ...data, slug: slug })
        this.catsCounter++
        await this.getCats(uid)
        router.push({ name: 'Cat profile', params: { slug: slug } })
      } catch (error) {
        console.log(error)
      }
    },
    clearData() {
      this.catsData = null
      this.catsCounter = 0
      this.loadingCatsData = false
    }
  }
})
