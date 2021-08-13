import { StatusBar } from 'expo-status-bar';
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
    View 
  } from 'react-native';
import Roulette from './Roulette'
import styles from './Styles'
import * as Contacts from 'expo-contacts';
import TextMessage from './Components/Texts'
import TextResponse from './Components/ResponseText'

export default function App() {
  return (
    <SafeAreaView style={styles.bg}>
      <StatusBar style="light" />
      
      <View style={{paddingTop: '3%', marginBottom: '4%'}}>
        <Text style={styles.largeHeaderText}>Text Roulette</Text>
        <Text style={styles.smallHeaderText}>Drunken texts made better</Text>
      </View>
      <ScrollView>
        <TextMessage 
          message={"Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?"}
          fromTextRoulette={true}
        />
        <TextMessage 
          message={"Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?"}
          fromTextRoulette={true}
        />
        <TextMessage 
          message={"Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?"}
          fromTextRoulette={true}
        />
        <TextMessage 
          message={"Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?"}
          fromTextRoulette={true}
        />
        <TextMessage 
          message={"Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?"}
          fromTextRoulette={true}
        />
        <TextMessage 
          message={"Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?"}
          fromTextRoulette={true}
        />
        <TextMessage 
          message={"Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?"}
          fromTextRoulette={true}
        />
        <TextMessage 
          message={"Hell yes."}
          fromTextRoulette={false}
        />
        <TextMessage 
          message={"Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?"}
          fromTextRoulette={true}
        />
        <View style={{height: 200, backgroundColor: '#121212'}}></View>
      </ScrollView>
      <View style={styles.mockKeyboard}>
        <View style={{flexDirection: "row", justifyContent: 'space-around', paddingTop: '5%'}}>
          <TextResponse message="No I put pinapple on my pizza" />
          <TextResponse message="Hell yeah." />
        </View>
      </View>
      {/* <Roulette /> */}
    </SafeAreaView>
  );
}
