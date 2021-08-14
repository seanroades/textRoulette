import { StatusBar } from 'expo-status-bar';
import * as SMS from 'expo-sms';
import React, 
  { 
    useEffect, 
    useState, 
  } from 'react';
import { 
    ScrollView, 
    ScrollViewProps, 
    Text, 
    SafeAreaView, 
    View,
    Button,
    Alert,
    Image
  } from 'react-native';
import Roulette from './Components/Roulette'
import styles from './Styles'
import * as Contacts from 'expo-contacts';
import TextMessage from './Components/Texts'
import TextResponse from './Components/ResponseText'
import { randomTexts } from './RandomTexts'

export default function App() {
  //#region onboarding questions
  interface OnboardingQuestion {
    type: String;

    id: number;

    message: String;
  }


  interface OnboardingAnswer {
    type: String;

    questionId: number;

    message: String;

    nextQuestionId: number | null;
  }

  const onboardingQs : Map<number, OnboardingQuestion> = new Map([
    [
      1, {
        type: 'question',
        id: 1,
        message: 'Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?',
      }
    ],
    [
      2, {
        type: 'question',
        id: 2,
        message: 'Well maybe you should get some bitches.',
      }
    ],
    [
      3, {
        type: 'question',
        id: 3,
        message: "Alright, we're gonna queue up a random text to send to a random contact, or you're going to take a shot. But first, are any contacts off limits?"
      }
    ],
    [
      4, {
        type: 'question',
        id: 4,
        message: "yEs, s0me oF mY c0ntactS aRe oFf liMiTs -- do you think we honestly care? Sucks for you, let’s get into it",
      }
    ],
    [
      5, {
        type: 'question',
        id: 5,
        message: "Fantastic. Let's get into it."
      }
    ],
    [
      6, {
        type: 'question',
        id: 6,
        message: "Alright loser, so I'm gonna queue up a text for your drunkass to send or else you're going to have it drink, take a look."
      }
    ]
  ]);

  const onboardingAs : Map<number, Array<OnboardingAnswer>> = new Map([
    [
      1, [
        {
          type: 'answer',
          questionId: 1,
          message: 'Hell yes.',
          nextQuestionId: 3,
        },
        {
          type: 'answer',
          questionId: 1,
          message: "I'm still in my mom's basement...",
          nextQuestionId: 2,
        },
      ]
    ],
    [
      2, [
        {
          type: 'answer',
          questionId: 2,
          message: "Let's restart this.",
          nextQuestionId: 1,
        }
      ]
    ],
    [
      3, [
        {
          type: 'answer',
          questionId: 3,
          message: "Nah.",
          nextQuestionId: 5,
        },
        {
          type: 'answer',
          questionId: 3,
          message: "Yes. I don't want to text my ex.",
          nextQuestionId: 4,
        }
      ]
    ],
    [
      4, [
        {
          type: 'answer',
          questionId: 4,
          message: "Let's go.",
          nextQuestionId: 5,
        }
      ]
    ],
    [
      5, [
        {
          type: 'answer',
          questionId: 5,
          message: "Let's see the text.",
          nextQuestionId: null,
        }
      ]
    ]
  ]);

  //#endregion
  
  //#region Sucessful and not successful responses from text roulette team
  // Successful
  // All start with the text you sent and then finish with a new string from this
  // "You sent ["I don't want to have your baby chincilla"] (just the text they just sent) to [sean roades] (the name of the person they just sent it to)? "

  const successResponses = [
    "Damnnnnn, you're crazier than my old english teacher. Let's see if you can keep it up.",
    "Anything for family though right? Alright next one?",
    "Yoooooo chill chill, you're crazy. We don't even know if we're ready for your next text.",
    "Eh, I'll give it to you--but that one wasn't THAT BAD. I mean we'd probably sent it too. Ready for a harder one??",
    "**Proceeds to slow clap** Want a cookie? Look if we're being honest, we don't even like sweet stuff, so let's move onto something a bit more sour.",
    "Ah yes, the same text I sent to my kindergarden teacher a few years back. Good times. Next one?",
    "Ready for ANOTHER ONE? (DJ KHALED! WE THE BEST MUSIC...continued)",
    "lol no way I just sent that to my ex, hope she sees it 🙏 again though??",
    "Uh oh! Stinkyy! Let's get some febreeze up in here and send another one.",
    "😳 🥵 🥶 sheeeeeeeeeeeeeeeeeeeeeeeeeeeeeesh!!! What about another one?",
    "👁👅👁 yes. Next?",
    "👁👄👁..............Down for another?",
    "🤌🏻 such a spicy pizza, let's whip another one up",
    "😮😮😮😮, time to take this to another level 😼"
  ]


  // Not successful
  const failRespones = [
    "I bet if you went to McDonald's and you ordered a 6 piece chicken nugget and you only got 5, you'd be too afraid to ask for the extra one. Anyways let's go to the next one, MAYBE you'll get that one.",
    "I bet you sleep with a nightlight. Time to redeem yourself.",
    "me to u rn: 😀🤛 Imma give you another try though",
    "I feel like this me 🤰 THE WAY YOU'RE FUCKING ME! GET THAT SCORE UPPPPPP!",
    "🗣 your friends definitely talk shit about you. Next one dude, c'mon.",
    "🏋🏼‍♂️ <- your friends trying to pick up your lame ass, next one!",
    "🤪 so quirky not sending that, bet you like pineapple on your pizza, but we're not judging you....well actually we are but here's another chance.",
    "😞 when you hit that button it feels so good though, please?",
    "👿 CMON, YOU SHOULD'VE SENT ITTTT. Next one though at least right??"
  ]
  //#endregion

  //#region  history functions

  const firstText = ({ message: onboardingQs.get(1)?.message, fromTextRoulette: true })
  const [history, setHistory] = useState<Array<any>>([firstText]);
  const [currentQuestionId, setCurrentQuestion] = useState<Number>(1);
  const [currentAnswers, setCurrentAnswers] = useState<Array<any>>([...onboardingAs.get(1) ?? []])

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
      setCurrentAnswers([]);
      //proceed to game
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

  const playRoulette = async () => {
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
      // 
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
  }

  // sayings
  const sayings = [
    "Let's see the text",
    "Fuck it, let's go",
    "Let's see it",
    "Show me it",
    "I got nothing to lose",
    "Show the text",
    "Just show it already",
    "I'm ready to go",
    "? let's go already"
  ]
  // sayings[Math.floor(Math.random() * sayings.length)] picks a random one, but ignore for now
  //#endregion

  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar style="light" />
      
      <View style={{paddingTop: '3%', marginBottom: '4%'}}>
        <Text style={styles.largeHeaderText}>Text Roulette</Text>
        <Text style={styles.smallHeaderText}>Drunken texts made better</Text>
      </View>
      <ScrollView>
        {history.map((text, i) => {
          return <TextMessage message={text.message} fromTextRoulette={text.fromTextRoulette} />
        })}
        <TextResponse message={"Send it"} onPress={() => playRoulette()}/>

        <View style={{height: 200, backgroundColor: '#121212'}}></View>
      </ScrollView>
      <View style={styles.mockKeyboard}>
        <View style={{flexDirection: "row", justifyContent: 'space-around', paddingTop: '5%'}}>
          {currentAnswers.map((answer, i) => {
            return <TextResponse message={answer.message} onPress={() => onAnswerPress(answer)}/>
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}
