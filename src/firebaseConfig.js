import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAcOhoJo1Z8Gh37YdVp0VSv9AjmGqU7bao',
  authDomain: 'cat-app-79854.firebaseapp.com',
  databaseURL: 'https://cat-app-79854-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cat-app-79854',
  storageBucket: 'cat-app-79854.appspot.com',
  messagingSenderId: '711837649291',
  appId: '1:711837649291:web:8ac8ee3745414a213b878e'
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth()

export { auth, db }
