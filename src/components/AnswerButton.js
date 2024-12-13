import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { theme } from '../styles/theme';

const AnswerButton = ({ option, onPress }) => {
  return (
    <TouchableOpacity style={theme.button} onPress={() => onPress(option)}>
      <Text style={theme.buttonText}>{option}</Text>
    </TouchableOpacity>
  );
};

export default AnswerButton;
