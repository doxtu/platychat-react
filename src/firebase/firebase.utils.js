import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCSqIX7JgOxs-W0KSP11rWgg_Smyq3dRr0',
  authDomain: 'platychat.firebaseapp.com',
  databaseURL: 'https://platychat.firebaseio.com',
  projectId: 'platychat',
  storageBucket: 'platychat.appspot.com',
  messagingSenderId: '540254856882',
  appId: '1:540254856882:web:5eb0db85a5670ceb77cbab',
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()

export default firebase
