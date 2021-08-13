import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState }from 'react';
import { StyleSheet, Text, Share, SafeAreaView, View, Button } from 'react-native';
import Roulette from './Roulette'
import styles from './Styles'
import * as Contacts from 'expo-contacts';
import TextMessage from './Components/Texts';

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

export default function App() {
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
          message: 'Restart.',
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
          nextQuestionId: null,
        }
      ]
    ],
    [
      5, [
        {
          type: 'answer',
          questionId: 5,
          message: "Let's go.",
          nextQuestionId: null,
        }
      ]
    ]
  ]);

  const firstText = ({ message: onboardingQs.get(1)?.message, fromTextRoulette: true })
  const [history, setHistory] = useState<Array<any>>([firstText]);
  const [currentQuestionId, setCurrentQuestion] = useState<Number>(1);
  const [currentAnswers, setCurrentAnswers] = useState<Array<any>>([...onboardingAs.get(1) ?? []])

  const onAnswerPress = (answer: OnboardingAnswer, nextQuestionId: number) => {
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

  return (
    <SafeAreaView style={styles.bg}>
      <View style={{paddingTop: '3%'}}>
        <Text style={styles.largeHeaderText}>Text Roulette</Text>
        <Text style={styles.smallHeaderText}>Drunken texts made better</Text>
      </View>
      {history.map((text, i) => {
        return <TextMessage message={text.message} fromTextRoulette={text.fromTextRoulette} />
      })}
      {currentAnswers.map((answer, i) => {
        return <Button title={answer.message} onPress={() => onAnswerPress(answer, answer.nextQuestionId)}/>
      })}
      {/* <Roulette /> */}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
