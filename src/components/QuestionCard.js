import React from 'react';
import { Text, View } from 'react-native';
import { theme } from '../styles/theme';

const QuestionCard = ({ question }) => {
  return (
    <View style={theme.container}>
      <Text style={theme.questionText}>{question}</Text>
    </View>
  );
};

export default QuestionCard;
