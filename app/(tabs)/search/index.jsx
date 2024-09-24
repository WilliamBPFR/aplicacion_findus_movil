// Home simple

// import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

export default function Page () {
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido al Search Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

