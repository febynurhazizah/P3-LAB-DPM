import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    console.log('HomeScreen mounted');
    return () => {
      console.log('HomeScreen unmounted');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Quiz App!</Text>
      <Text style={styles.subtitle}>Test your knowledge with fun quizzes</Text>

      <TouchableOpacity 
        style={styles.startButton} 
        onPress={() => navigation.navigate('QuizScreen')}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>

      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Kahoot_Logo_2021.png' }}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 20
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: '#FF4081',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileButton: {
    backgroundColor: '#00bfff',  // Biru muda untuk tombol profil
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 20,
    resizeMode: 'contain',
  }
});

export default HomeScreen;
