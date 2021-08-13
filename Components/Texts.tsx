import styles from '../Styles'
import { View, Text } from 'react-native';
import React from 'react';

interface TextDetails {
  message: String;
  /** 
   * Specifies message to display in text
   */
  fromTextRoulette: Boolean 
  /**
   * true if the text is from text roulette team, false if the text is meant to be sent from the user
   */
}

export default function TextMessage(props: TextDetails) {
  return (
    <View style={props.fromTextRoulette ? styles.textBGContainerFromRoulette : styles.textBGContainerFromUser}>
      <View style={props.fromTextRoulette ? styles.textBGFromTextRoulette : styles.textBGFromTextUser} >
        <View style={{padding: '5%'}}>
          <Text style={styles.mediumHeaderText}>
            {props.message}
          </Text>
        </View>
      </View>
    </View>
  );
}