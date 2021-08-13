import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState }from 'react';
import { StyleSheet, Text, Share, SafeAreaView, View, Button } from 'react-native';
import Roulette from './Roulette'
import styles from './Styles'
import * as Contacts from 'expo-contacts';
import TextMessage from './Components/Texts'

export default function App() {

  return (
    <SafeAreaView style={styles.bg}>
      <View style={{paddingTop: '3%'}}>
        <Text style={styles.largeHeaderText}>Text Roulette</Text>
        <Text style={styles.smallHeaderText}>Drunken texts made better</Text>
      </View>
      <TextMessage 
        message={"Ready to take drunken texts to a whole new level? Or are you still living in your mommy’s basement?"}
        fromTextRoulette={true}
      />
      <TextMessage 
        message={"Hell yes."}
        fromTextRoulette={false}
      />
      {/* <Roulette /> */}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
