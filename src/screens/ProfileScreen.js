import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getHighestScore } from '../utils/scoreManager'; // Mengimpor fungsi untuk mengambil skor tertinggi

const ProfileScreen = ({ navigation }) => {
  const [highestScore, setHighestScore] = useState(null);
  const [userName] = useState('Feby Nurhazizah'); // Nama pengguna
  const avatarUrl = require('../../assets/image.png'); // Ganti dengan path lokal gambar avatar

  useEffect(() => {
    const fetchHighestScore = async () => {
      const score = await getHighestScore();
      setHighestScore(score);
    };

    fetchHighestScore();

    return () => {
      console.log('ProfileScreen unmounted');
    };
  }, []); // Hanya dijalankan sekali saat komponen dimuat

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <Image source={avatarUrl} style={styles.avatar} />
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Score Section */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Highest Score:</Text>
        <Text style={styles.scoreText}>
          {highestScore !== null ? highestScore : 'N/A'}
        </Text>
      </View>

      {/* Button to go to Home */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')} // Navigate to Home screen
      >
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6F7FF',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#004d99',
    marginBottom: 30,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#004d99',
  },
  userName: {
    fontSize: 22,
    fontWeight: '500',
    color: '#004d99',
  },
  scoreContainer: {
    marginBottom: 40,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  scoreLabel: {
    fontSize: 20,
    color: '#004d99',
    marginBottom: 10,
    fontWeight: '500',
  },
  scoreText: {
    fontSize: 24,
    color: '#ff0000',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00bfff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
