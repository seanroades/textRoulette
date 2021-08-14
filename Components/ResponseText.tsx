import styles from '../Styles'
import { View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface OnboardingAnswer {
  type: String;

  questionId: number;

  message: String;

  nextQuestionId: number | null;
}

interface TextResponse {
  message: String;
  /** 
   * Specifies message to display in text
   */

  onPress(event: any) : void;
}

export default function TextMessage(props: TextResponse) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View>
          <View style={styles.textBGFromTextUserResponse} >
            <View style={{padding: '5%', justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={[styles.mediumHeaderText, {textAlign: 'center'}]}>
                {props.message}
              </Text>
            </View>
          </View>
      </View>
    </TouchableOpacity> 
  );
}