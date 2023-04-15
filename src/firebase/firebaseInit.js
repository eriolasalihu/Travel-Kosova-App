import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRkfpRfaiRe8DbKZLyx5lK0jAhHSRBB6Q",
  authDomain: "tourism-kosova-blog.firebaseapp.com",
  projectId: "tourism-kosova-blog",
  storageBucket: "tourism-kosova-blog.appspot.com",
  messagingSenderId: "764756162393",
  appId: "1:764756162393:web:538de15be3493a20807e48"
};

const fireabaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

const getAuth = firebase.auth();
export { timestamp,getAuth };
export default fireabaseApp.firestore();
