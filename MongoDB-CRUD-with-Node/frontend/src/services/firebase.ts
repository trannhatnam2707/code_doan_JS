import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCi3O2o0BGPjQ039DXbiKV9GyIJZWd-nY4',
  authDomain: 'crud-35377.firebaseapp.com',
  projectId: 'crud-35377',
  storageBucket: 'crud-35377.appspot.com',
  messagingSenderId: '414154059966',
  appId: '1:414154059966:web:b198b535d531830c9e2eef',
  measurementId: 'G-FHJ5X3N4GE',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
// Get a reference to the storage service
const storage = firebase.storage();

export { storage, firebase };
