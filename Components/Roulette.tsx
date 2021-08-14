import * as SMS from 'expo-sms';
import { Button } from 'react-native'
import React,
  {
    useState
  } from 'react'
import * as Contacts from 'expo-contacts';

import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDbS2TTFfF19WJQvGT9NDhubalqMshm0EQ",
  authDomain: "textroulette-31974.firebaseapp.com",
  projectId: "textroulette-31974",
  storageBucket: "textroulette-31974.appspot.com",
  messagingSenderId: "274149179410",
  appId: "1:274149179410:web:2735a22312ad85d86498cb",
  measurementId: "G-P1GMELRZMP"
};

firebase.initializeApp(firebaseConfig);

export default function Roulette() {
  const [contacts, setContacts] = useState<Contacts.Contact[] | []>([]);

  const playRoulette = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const status = await SMS.sendSMSAsync(
        '16179453422',
        'Random text will go here--one click send test. SUCCESS receipt'
      )
      console.log("status", status)
    } else {
      console.log("SMS is not available")
    }
  }
  return(
    <Button title="play roulette" onPress={() => playRoulette()}></Button>
  )
  
}