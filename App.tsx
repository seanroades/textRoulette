import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState }from 'react';
import { StyleSheet, Text, Share, SafeAreaView, Button } from 'react-native';
import Roulette from './Roulette'
import styles from './styles'
import * as Contacts from 'expo-contacts';

export default function App() {

  return (
    <SafeAreaView style={styles.bg}>
      <Text style={styles.largeHeaderText}>TEXT ROULETTE</Text>
      <Roulette />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
