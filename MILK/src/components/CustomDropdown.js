import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CustomDropdown = ({ label, value, onValueChange, items }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}:</Text>
      <View
        style={[
          styles.dropdownContainer,
          isFocused && styles.dropdownContainerFocused,
        ]}
      >
        <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={onValueChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          {items.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: 'black',
    fontWeight: '700',
  },
  dropdownContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
  },
  dropdownContainerFocused: {
    borderColor: '#00A6FF', // Change the border color when focused
    shadowColor: '#00A6FF', // Add a shadow effect when focused
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  picker: {
    borderWidth: 0,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default CustomDropdown;
