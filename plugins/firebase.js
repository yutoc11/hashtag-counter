import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyA97gnNlQLpzSEccq06qwXgRYQFqCK4LYM",
    authDomain: "hashtag-counter-ea535.firebaseapp.com",
    databaseURL: "https://hashtag-counter-ea535.firebaseio.com",
    projectId: "hashtag-counter-ea535",
    storageBucket: "",
    messagingSenderId: "179794720112",
    appId: "1:179794720112:web:f06ef0f0efe48085"
  })
}

export default firebase
