import firebase from 'firebase/app'
import 'firebase/database'

// Initalize and export Firebase.
const config = {
  apiKey: 'AIzaSyCpyCT4EUlu-M5DOw4GQKI-keGLjBWA5jQ',
  authDomain: 'guess-that-hex.firebaseapp.com',
  databaseURL: 'https://guess-that-hex.firebaseio.com',
  projectId: 'guess-that-hex',
  storageBucket: 'guess-that-hex.appspot.com',
  messagingSenderId: '1045046411085'
};
export default firebase.initializeApp(config);
