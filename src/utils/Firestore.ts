import firebase from 'firebase';
import {Subscription} from "../model/Subscription";

const firebaseConfig = {
    apiKey: "AIzaSyBIqAAJWmr18LDMMmekTtMzbDpQbRPNzZc",
    authDomain: "permesso-status-checker.firebaseapp.com",
    databaseURL: "https://permesso-status-checker.firebaseio.com",
    projectId: "permesso-status-checker",
    storageBucket: "permesso-status-checker.appspot.com",
    messagingSenderId: "124650216843",
    appId: "1:124650216843:web:13bd9d1bffe083fbdfe38e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

export function saveSubscription(s: Subscription) {
    return db.collection('subscription').add(s);
}