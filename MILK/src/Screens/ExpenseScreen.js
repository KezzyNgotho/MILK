import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import firebase from '../components/firebase';
/* import 'firebase/firestore'; */
import '@react-native-firebase/firestore'
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import '@react-native-firebase/auth';

const ExpenseScreen = () => {
  const navigation = useNavigation();
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
  description: '',
    amount: '',
    date: new Date() // Initialize with default date
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const db = firebase.firestore();
//fetch
useEffect(() => {
  fetchExpenses();
}, []);

const fetchExpenses = async () => {
  try {
    const user = firebase.auth().currentUser;
    if (user) {
      const snapshot = await db
        .collection('expenses')
        .where('userId', '==', user.uid)
        .get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
    }
  } catch (error) {
    // Handle error
    console.error('Error fetching expenses:', error);
    Toast.show({
      type: 'error',
      text1: 'Error retrieving expense records',
      position: 'bottom',
    });
  }
};



/*
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    axios
      .get('http://192.168.0.103:4000/expenses')
      .then((response) => {
        setExpenses(response.data);
        calculateTotalExpenses(response.data);
      })
      .catch((error) => {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Error retrieving expense records',
          position: 'bottom',
        });
      });
  }; */

 /*  const calculateTotalExpenses = (expenses) => {
    const total = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    setTotalExpenses(total);
  }; */



  /* const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.date) {
      const expenseData = {
        description: newExpense.description,
        amount: newExpense.amount,
        date: newExpense.date.toISOString(), // Convert date to ISO string format
      };
  
      // Send POST request to save the expense
      
      axios.post('http://192.168.0.103:4000/expenses', expenseData)
        .then(response => {
          // Handle successful response
          setExpenses([...expenses, newExpense]);
          setNewExpense({ description: '', amount: '', date: new Date() }); // Reset date to default
  
          // Show success notification
          Toast.show({
            type: 'success',
            text1: 'Expense recorded',
            position: 'bottom',
          });
        })
        .catch(error => {
          // Handle error
          console.error(error);
          // Show error notification
          Toast.show({
            type: 'error',
            text1: 'Error saving expense',
            text2: 'Please try again',
            position: 'bottom',
          });
        });
    } else {
      // Show error notification if any field is missing
      Toast.show({
        type: 'error',
        text1: 'Missing fields',
        text2: 'Please fill in all the fields',
        position: 'bottom',
      });
    }
  }; */
  
//add expese  
const handleAddExpense = () => {
  if (newExpense.description && newExpense.amount && newExpense.date) {
    const user = firebase.auth().currentUser;
    if (user) {
      const expenseData = {
        description: newExpense.description,
        amount: newExpense.amount,
        date: newExpense.date.toISOString(),
        userId: user.uid, // Associate the expense with the logged-in user's UID
      };

      db.collection('expenses')
        .add(expenseData)
        .then(docRef => {
          // Handle successful response
          const newExpense = { id: docRef.id, ...expenseData };
          setExpenses([...expenses, newExpense]);
          setNewExpense({ description: '', amount: '', date: new Date() });

          // Show success notification
          Toast.show({
            type: 'success',
            text1: 'Expense recorded',
            position: 'bottom',
          });
        })
        .catch(error => {
          // Handle error
          console.error('Error saving expense:', error);
          // Show error notification
          Toast.show({
            type: 'error',
            text1: 'Error saving expense',
            text2: 'Please try again',
            position: 'bottom',
          });
        });
    }
  } else {
    // Show error notification if any field is missing
    Toast.show({
      type: 'error',
      text1: 'Missing fields',
      text2: 'Please fill in all the fields',
      position: 'bottom',
    });
  }
};



  const handleGenerateStatement = () => {
    saveExpenseStatement(expenses);
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };
  
 /*  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };
 */
  const handleDateButtonPress = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setNewExpense({ ...newExpense, date });
    }
  };
//delete
const handleDeleteExpense = async (expenseId) => {
  try {
    await db.collection('expenses').doc(expenseId).delete();
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseId));

    // Show success notification (optional)
    Toast.show({
      type: 'success',
      text1: 'Expense deleted',
      position: 'bottom',
    });
  } catch (error) {
    console.error('Error deleting expense:', error);
    // Show error notification (optional)
    Toast.show({
      type: 'error',
      text1: 'Error deleting expense',
      text2: 'Please try again',
      position: 'bottom',
    });
  }
};


//back
const handleGoBack = () => {
  navigation.goBack();
};

  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
    <Text style={styles.backButtonText}>Back</Text>
  </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.headerText}>Track my expenses</Text>
        </View>
        <View style={styles.expenseForm}>
          <Text style={styles.formLabel}>Description</Text>
          <TextInput
            style={styles.formInput}
            value={newExpense.description}
            onChangeText={(text) => setNewExpense({ ...newExpense, description: text })}
          />
          <Text style={styles.formLabel}>Amount</Text>
          <TextInput
            style={styles.formInput}
            value={newExpense.amount}
            onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
            keyboardType="numeric"
          />
          <View style={styles.datePickerContainer}>
            <Text style={styles.formLabel}>Date</Text>
            <TouchableOpacity style={styles.dateButton} onPress={handleDateButtonPress}>
              <Text style={styles.dateButtonText}>{newExpense.date.toDateString()}</Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DatePicker
              value={newExpense.date}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
            <View style={styles.profile}>
              <Image
                source={require('../../src/Screens/assets/icons8-add-48.png')}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
          <Toast ref={(ref) => Toast.setRef(ref)} /> 
        </View>
  

        <View style={styles.expenseSummary}>
          <Text style={styles.summaryTitle}>Expense Summary</Text>
          <Text style={styles.summaryText}>Total Expenses:</Text>
          <Text style={styles.summaryText}>${calculateTotalExpenses()}</Text>
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateStatement}>
          <Text style={styles.generateButtonText}>Generate Expense Statement</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: 'black',
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
    marginTop: 50,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  expenseForm: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333333',
  },
  formInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
    color: 'black',
    fontSize:16
  }
    ,
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  dateButtonText: {
    color: '#CEF3CE',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    flexDirection: 'row',
  },
  addButtonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: '#CEF3CE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseSummary: {
    backgroundColor: '#CEF3CE',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  summaryText: {
    fontSize: 16,
    color: '#333333',
    marginTop: 8,
  },
  generateButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  generateButtonText: {
    color: '#CEF3CE',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpenseScreen;
