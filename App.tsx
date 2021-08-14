import { StatusBar } from 'expo-status-bar';
import * as SMS from 'expo-sms';
import React, 
  { 
    useEffect, 
    useState, 
    useRef,
  } from 'react';
import { 
    ScrollView, 
    ScrollViewProps, 
    Text, 
    SafeAreaView, 
    View,
    Button,
    Alert
  } from 'react-native';
import Roulette from './Components/Roulette'
import styles from './Styles'
import * as Contacts from 'expo-contacts';
import TextMessage from './Components/Texts'
import TextResponse from './Components/ResponseText'
import { randomTexts } from './RandomTexts'
import { onboardingAs, onboardingQs, OnboardingAnswer, OnboardingQuestion, successResponses, failResponses, sayings } from './QuestionsAnswers'

export default function App() {
  //#region onboarding questions

  //#endregion

  //#region  history functions
  const scrollViewRef = useRef() as React.MutableRefObject<ScrollView>;

  const firstText = ({ message: onboardingQs.get(1)?.message, fromTextRoulette: true })
  const [history, setHistory] = useState<Array<any>>([firstText]);
  const [currentQuestionId, setCurrentQuestion] = useState<Number>(1);
  const [currentAnswers, setCurrentAnswers] = useState<Array<any>>([...onboardingAs.get(1) ?? []]);
  const [roulette, setRoulette] = useState<boolean>(false);

  const onAnswerPress = (answer: OnboardingAnswer) => {
    const nextQuestionId = answer.nextQuestionId;
    setHistory((old) => [...old, { message: answer.message, fromTextRoulette: false }]);
    if (nextQuestionId) {
      const nextQ = onboardingQs.get(nextQuestionId);
      const nextAnswers = onboardingAs.get(nextQuestionId) ?? [];
      setCurrentQuestion(nextQuestionId);
      setHistory((old) => [...old, { message: nextQ?.message, fromTextRoulette: true }]);
      setCurrentAnswers(nextAnswers);
    } else {
      //proceed to game
      setRoulette(true);
      //pick random saying
      const randIdx = Math.floor(Math.random() * sayings.length);
      const newAns = { type: 'answer', message: sayings[randIdx], questionId: null, nextQuestionId: null };
      playRoulette(newAns);
      setCurrentAnswers([newAns]);
    }
  }

  //#endregion 

  //#region roulette function, answer array for random "let's go" type sayings to show the text
  // states
  const [contacts, setContacts] = useState<Contacts.Contact[] | []>([]);
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [text, setText] = useState("")

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data)
          // const contact = data[Math.floor(Math.random() * data.length)];
        }
      }
    })();
  }, []);

  const playRoulette = async (answer: OnboardingAnswer) => {

    // put answer into history
    setHistory((old) => [...old, { message: answer.message, fromTextRoulette: false }]);

    // Find contact with non empty name and number
    var namePresent = false
    var numberPresent = false
    while ((namePresent === false) && (numberPresent === false)) {
      namePresent = false
      numberPresent = false
      var currentContact = contacts[Math.floor(Math.random() * contacts.length)]
      if (currentContact.name != undefined && currentContact.name != null && currentContact.name != "" && currentContact.name.length > 0) {
        setName(currentContact.name)
        namePresent = true
      }
      if (currentContact != undefined && namePresent === true) {
        if (currentContact.phoneNumbers && currentContact.phoneNumbers.length > 0 && currentContact.phoneNumbers[0].digits) {
          setNumber(currentContact.phoneNumbers[0].digits)
          numberPresent = true
        }
      }
    }
    var tempText = randomTexts[Math.floor(Math.random() * randomTexts.length)]
    if (tempText !== "") {
      setText(tempText)
    }
    else {
      while (tempText !== "") {
        tempText = randomTexts[Math.floor(Math.random() * randomTexts.length)]
        setText(tempText)
      }
    }
    
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const status = await SMS.sendSMSAsync(
        number,
        text
      )
      console.log("status", status)

       // put new response into history
      if (status.result == "sent") {

        //register name + message sent into history
        const msg = "You just sent \"" + text + "\" to " + name + "!";
        setHistory((old) => [...old, { message: msg, fromTextRoulette: true }]);
        const randIdx = Math.floor(Math.random() * successResponses.length);
        setHistory((old) => [...old, { message: successResponses[randIdx], fromTextRoulette: true }]);
      } else {
        const randIdx = Math.floor(Math.random() * failResponses.length);
        setHistory((old) => [...old, { message: failResponses[randIdx], fromTextRoulette: true }]);
      }
    } else {
      Alert.alert(
        "SMS not enabled",
        "You must have SMS enabled on your phone to play",
        [
          {
            text: "OK, I'll turn it on"
          }
        ]
      )
    }

    // put new ans
    const randIdx = Math.floor(Math.random() * sayings.length);
    const newAns = { type: 'answer', message: sayings[randIdx], questionId: null, nextQuestionId: null }
    setCurrentAnswers([newAns]);
  }

  // sayings[Math.floor(Math.random() * sayings.length)] picks a random one, but ignore for now
  //#endregion

  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar style="light" />
      
      <View style={{paddingTop: '3%', marginBottom: '4%'}}>
        <Text style={styles.largeHeaderText}>Text Roulette</Text>
        <Text style={styles.smallHeaderText}>Drunken texts made better</Text>
      </View>
      <ScrollView ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} >
        {history.map((text, i) => {
          return <TextMessage message={text.message} fromTextRoulette={text.fromTextRoulette} />
        })}
        {/* <TextResponse message={"Send it"} onPress={() => playRoulette()}/> */}

        <View style={{height: 200, backgroundColor: '#121212'}}></View>
      </ScrollView>
      <View style={styles.mockKeyboard}>
        <View style={{flexDirection: "row", justifyContent: 'space-around', paddingTop: '5%'}}>
          {currentAnswers.map((answer, i) => {
            return <TextResponse message={answer.message} onPress={roulette ? () => playRoulette(answer) : () => onAnswerPress(answer)}/>
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
