import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getHighestScore } from '../utils/scoreManager';  // Mengimpor fungsi untuk mengambil skor tertinggi

const ResultScreen = ({ route, navigation }) => {
  const [highestScore, setHighestScore] = useState(null);
  const { score } = route.params;  // Mendapatkan skor yang diteruskan dari QuizScreen

  useEffect(() => {
    const fetchHighestScore = async () => {
      const storedScore = await getHighestScore();
      setHighestScore(storedScore);
    };

    fetchHighestScore();

    return () => {
      console.log('ResultScreen unmounted');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.scoreText}>Your Score: {score}</Text>

      <Text style={styles.highestScoreText}>
        Highest Score: {highestScore !== null ? highestScore : 'N/A'}
      </Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.buttonText}>Go Back to Quiz</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.homeButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F7FF',  // Biru muda background
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004d99',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    marginVertical: 20,
    color: '#004d99',
    fontWeight: 'bold',
  },
  highestScoreText: {
    fontSize: 20,
    color: '#ff0000',  // Merah untuk skor tertinggi
    fontWeight: '500',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00bfff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#FF4081',  // Warna merah muda untuk tombol home
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  homeButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default ResultScreen;
