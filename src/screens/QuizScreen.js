import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { saveScore } from '../utils/scoreManager';  // Mengimpor fungsi untuk menyimpan skor
import Icon from 'react-native-vector-icons/FontAwesome';  // Menambahkan icon untuk emoji

// Utility function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

const QuizScreen = ({ navigation }) => {
    const questions = [
        { question: "Berapa hasil dari 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
        { question: "Apa ibu kota Prancis?", options: ["London", "Paris", "Berlin", "Madrid"], answer: "Paris" },
        { question: "Siapa presiden pertama Indonesia?", options: ["Soekarno", "Soeharto", "Jokowi", "Habibie"], answer: "Soekarno" },
        { question: "Apa warna bendera Indonesia?", options: ["Merah Putih", "Merah Biru", "Putih Hijau", "Merah Kuning"], answer: "Merah Putih" },
        { question: "Apa ibu kota Jepang?", options: ["Osaka", "Kyoto", "Tokyo", "Hokkaido"], answer: "Tokyo" },
        { question: "Berapa hasil dari 5 + 5?", options: ["8", "9", "10", "11"], answer: "10" },
        { question: "Siapa penemu listrik?", options: ["Thomas Edison", "Nikola Tesla", "Albert Einstein", "Isaac Newton"], answer: "Thomas Edison" },
        { question: "Apa bahasa pemrograman yang digunakan untuk membuat aplikasi Android?", options: ["Python", "Java", "Swift", "Kotlin"], answer: "Java" },
        { question: "Apa ibu kota Indonesia?", options: ["Surabaya", "Medan", "Jakarta", "Bali"], answer: "Jakarta" },
        { question: "Siapa penulis buku 'Harry Potter'?", options: ["J.R.R. Tolkien", "J.K. Rowling", "George R.R. Martin", "Suzanne Collins"], answer: "J.K. Rowling" },
        { question: "Siapa penemu telepon?", options: ["Alexander Graham Bell", "Nikola Tesla", "Thomas Edison", "Michael Faraday"], answer: "Alexander Graham Bell" },
        { question: "Apa nama planet terbesar di sistem tata surya?", options: ["Mars", "Jupiter", "Saturnus", "Venus"], answer: "Jupiter" },
        { question: "Di mana lokasi Taj Mahal?", options: ["Indo-China", "India", "Pakistan", "Sri Lanka"], answer: "India" },
        { question: "Apa simbol kimia untuk air?", options: ["H2O", "CO2", "O2", "N2"], answer: "H2O" },
        { question: "Siapa yang menulis 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "F. Scott Fitzgerald", "Ernest Hemingway"], answer: "Harper Lee" },
        { question: "Benua mana yang memiliki populasi terbesar?", options: ["Afrika", "Asia", "Eropa", "Amerika"], answer: "Asia" },
        { question: "Siapa yang menemukan teori relativitas?", options: ["Isaac Newton", "Niels Bohr", "Albert Einstein", "Galileo Galilei"], answer: "Albert Einstein" },
        { question: "Apa nama kota yang dikenal dengan sebutan 'Kota Cinta'?", options: ["Paris", "London", "Roma", "Tokyo"], answer: "Paris" },
        { question: "Apa ibu kota Australia?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], answer: "Canberra" },
        { question: "Apa nama gunung tertinggi di dunia?", options: ["Kilimanjaro", "Everest", "Makalu", "K2"], answer: "Everest" },
        { question: "Siapa presiden Amerika Serikat pertama?", options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"], answer: "George Washington" },
        { question: "Berapa jumlah negara di Eropa?", options: ["28", "42", "50", "23"], answer: "50" },
        { question: "Siapa penemu pesawat terbang?", options: ["Orville dan Wilbur Wright", "Alexander Graham Bell", "Leonardo da Vinci", "Nikola Tesla"], answer: "Orville dan Wilbur Wright" },
        { question: "Apa nama sungai terpanjang di dunia?", options: ["Amazon", "Nil", "Yangtze", "Ganges"], answer: "Nil" },
        { question: "Siapa yang menciptakan teori evolusi?", options: ["Albert Einstein", "Charles Darwin", "Isaac Newton", "Stephen Hawking"], answer: "Charles Darwin" },
        { question: "Apa nama alat untuk mengukur suhu?", options: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"], answer: "Thermometer" },
        { question: "Berapakah jumlah negara anggota PBB?", options: ["120", "193", "210", "130"], answer: "193" },
        { question: "Siapa yang menulis novel '1984'?", options: ["Aldous Huxley", "George Orwell", "F. Scott Fitzgerald", "John Steinbeck"], answer: "George Orwell" },
        { question: "Di negara mana terdapat piramida?", options: ["Meksiko", "Mesir", "Yunani", "Italia"], answer: "Mesir" },
        { question: "Apa ibu kota Kanada?", options: ["Vancouver", "Toronto", "Ottawa", "Montreal"], answer: "Ottawa" },
        { question: "Di negara mana terletak Stonehenge?", options: ["Skotlandia", "Irlandia", "Inggris", "Wales"], answer: "Inggris" },
        { question: "Siapa yang menulis 'Moby Dick'?", options: ["Herman Melville", "J.R.R. Tolkien", "Mark Twain", "Charles Dickens"], answer: "Herman Melville" },
        { question: "Apa yang dimaksud dengan GDP?", options: ["Gross Domestic Product", "Gross Domestic Product", "General Data Processing", "General Discount Pricing"], answer: "Gross Domestic Product" },
        { question: "Apa nama penyanyi lagu 'Shape of You'?", options: ["Justin Bieber", "Ed Sheeran", "John Legend", "Shawn Mendes"], answer: "Ed Sheeran" },
        { question: "Apa yang disebut dengan teori Big Bang?", options: ["Teori penciptaan alam semesta", "Teori gravitasi", "Teori kekekalan energi", "Teori kehidupan"], answer: "Teori penciptaan alam semesta" },
        { question: "Berapa tahun durasi satu orbit planet Merkurius?", options: ["88 hari", "365 hari", "24 jam", "12 tahun"], answer: "88 hari" },
        { question: "Siapa presiden Indonesia yang ke-5?", options: ["Joko Widodo", "Susilo Bambang Yudhoyono", "Megawati Soekarnoputri", "Abdurrahman Wahid"], answer: "Megawati Soekarnoputri" },
        { question: "Apa nama presiden Amerika Serikat ke-16?", options: ["Abraham Lincoln", "Theodore Roosevelt", "Franklin Roosevelt", "Woodrow Wilson"], answer: "Abraham Lincoln" },
      ];
    
    // Shuffle questions and options
    const shuffledQuestions = shuffleArray(questions).map((question) => ({
        ...question,
        options: shuffleArray(question.options) // Shuffle the options
    }));

    // Track questions that have been answered
    const [answeredQuestions, setAnsweredQuestions] = useState([]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);  // Untuk mengatur modal
    const [modalMessage, setModalMessage] = useState("");  // Pesan modal
    const [modalIcon, setModalIcon] = useState("");  // Menambahkan state untuk ikon modal

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    useEffect(() => {
        console.log('QuizScreen mounted');
        return () => {
            console.log('QuizScreen unmounted');
        };
    }, []);

    const handleAnswerPress = (selectedOption) => {
        let updatedScore = score;
        const correctAnswer = currentQuestion.answer;
    
        if (selectedOption === correctAnswer) {
            updatedScore += 1;
            setModalMessage("Jawaban Benar, Anda Pintar! 🎉");
            setModalIcon("smile-o");  // Icon saat jawaban benar
        } else {
            setModalMessage("Jawaban Salah, Coba Lagi! 😜");
            setModalIcon("frown-o");  // Icon saat jawaban salah
        }
    
        // Menampilkan modal
        setModalVisible(true);
        
        // Tunda 1 detik untuk modal sebelum melanjutkan ke soal berikutnya
        setTimeout(() => {
            setModalVisible(false);
            
            // Melanjutkan ke soal berikutnya jika masih ada soal
            if (currentQuestionIndex < shuffledQuestions.length - 1) {
                // Pastikan soal yang sudah dijawab tidak ditampilkan lagi
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            } else {
                // Menyimpan skor dan navigasi ke ResultScreen setelah soal terakhir
                saveScore(updatedScore);  // Menyimpan skor akhir
                navigation.navigate('ResultScreen', { score: updatedScore });
            }
            setScore(updatedScore);
        }, 1000);  // Modal ditampilkan selama 1 detik
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.optionButton} 
                        onPress={() => handleAnswerPress(option)}
                        activeOpacity={0.7} // memberi efek sentuhan pada tombol
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.scoreText}>Score: {score}</Text>

            {/* Modal Popup */}
            <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalMessage}>{modalMessage}</Text>
                        <Icon name={modalIcon} size={50} color="#ffd700" /> 
                    </View>
                </View>
            </Modal>
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
  questionText: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#004d99',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#00bfff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    margin: 8,
    borderRadius: 12,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Memberikan bayangan pada tombol untuk efek 3D
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Shadow untuk tampilan lebih menarik
    shadowOffset: { width: 0, height: 4 }, // Posisi bayangan
    shadowRadius: 4, // Radius bayangan
    shadowOpacity: 0.2, // Opasitas bayangan
  },
  optionText: {
    color: '#fff',
    fontSize: 20,
  },
  scoreText: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d99',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Transparan untuk background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d99',
    marginBottom: 10,
  },
});

export default QuizScreen;
