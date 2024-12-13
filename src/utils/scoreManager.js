import AsyncStorage from '@react-native-async-storage/async-storage';

// Fungsi untuk menyimpan skor
export const saveScore = async (score) => {
  try {
    const highestScore = await getHighestScore();
    if (score > highestScore) {
      await AsyncStorage.setItem('highestScore', score.toString());
    }
  } catch (error) {
    console.error('Error saving score:', error);
  }
};

// Fungsi untuk mendapatkan skor tertinggi
export const getHighestScore = async () => {
  try {
    const score = await AsyncStorage.getItem('highestScore');
    return score ? parseInt(score, 10) : 0; // Jika tidak ada, return 0
  } catch (error) {
    console.error('Error fetching highest score:', error);
    return 0;
  }
};
