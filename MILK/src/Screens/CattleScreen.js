import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import firebase from '../components/firebase';
import 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';




const CattleScreen = () => {



  const navigation = useNavigation();
  
  const [cattleList, setCattleList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [originalList, setOriginalList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newCattle, setNewCattle] = useState({
    name: '',
    age: '',
    breed: '',
    gender: '',
    isPregnant: false,
  });
  const db = firebase.firestore();

  useEffect(() => {
    const fetchCattleData = async () => {
      try {
        const snapshot = await db.collection('cattles').get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCattleList(data);
        setOriginalList(data);
      } catch (error) {
        console.error('Error fetching cattle data:', error);
      }
    };
  
    fetchCattleData();
  }, []);
  //new cattle

   const handleRegisterNewCattle = () => {
    setShowForm(true);
  };
  const handleFormSubmit = async () => {
    const newCattleData = {
      ...newCattle,
      isPregnant: newCattle.isPregnant ? 'Yes' : 'No', // Convert boolean to string
    };
  
    try {
      const docRef = await db.collection('cattles').add(newCattleData);
      const newCattle = { id: docRef.id, ...newCattleData };
      setCattleList(prevCattleList => [...prevCattleList, newCattle]);
      setOriginalList(prevOriginalList => [...prevOriginalList, newCattle]);
      setNewCattle({
        name: '',
        age: '',
        breed: '',
        gender: '',
        isPregnant: false,
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error registering new cattle:', error);
    }
  };
  
  const handleSearch = () => {
    const filteredCattle = originalList.filter(cattle =>
      cattle.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setCattleList(filteredCattle);
  };

  const renderCattleCard = ({item}) => (
    <View
      style={[
        styles.card,
        {backgroundColor: item.color === 'blue' ? '#D6E4C3' : '#CEF3CE'},
      ]}>
      <Text style={styles.cattleName}>{item.name}</Text>
      <Text style={styles.cattleDetails}>Age: {item.age}</Text>
      <Text style={styles.cattleDetails}>Breed: {item.breed}</Text>
      <Text style={styles.cattleDetails}>Gender: {item.gender}</Text>
      <Text style={styles.cattleDetails}>
        Pregnant: {item.isPregnant ? 'Yes' : 'No'}
      </Text>
      <View style={styles.genderIcon}>
  <Image
    source={item.gender === 'male' ? require('../../src/Screens/assets/icons8-year-of-ox-50.png') : require('../../src/Screens/assets/icons8-cattle-58.png')}
    style={styles.icon}
  />
</View>

      {item.isPregnant && (
        <View style={styles.pregnantIcon}>
          <View style={styles.profile}>
            <Image
              source={require('../../src/Screens/assets/icons8-heartbeat-64.png')}
              style={styles.profileImage}
            />
          </View>
        </View>
      )}
    </View>
  );

 //delete
 const handleDeleteCattle = async (cattleId) => {
  try {
    await db.collection('cattles').doc(cattleId).delete();
    setCattleList(prevCattleList => prevCattleList.filter(cattle => cattle.id !== cattleId));
    // Optionally update originalList as well if needed.
  } catch (error) {
    console.error('Error deleting cattle:', error);
  }
};

/*   const handleFormSubmit = async () => {
    const newCattleData = {
      ...newCattle,
      id: Date.now(),
    };

    try {
      const response = await axios.post(
        'http://192.168.0.103:4000/cattle',
        newCattleData,
      );
      const newCattle = response.data;
      setCattleList(prevCattleList => [...prevCattleList, newCattle]);
      setOriginalList(prevOriginalList => [...prevOriginalList, newCattle]);
      setNewCattle({
        name: '',
        age: '',
        breed: '',
        gender: '',
        isPregnant: false,
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error registering new cattle:', error);
    }
  }; */

  // Calculate summary counts
  const totalCattleCount = cattleList.length;
  const pregnantCattleCount = cattleList.filter(
    cattle => cattle.isPregnant,
  ).length;
  const maleCattleCount = cattleList.filter(
    cattle => cattle.gender === 'male',
  ).length;
  const femaleCattleCount = cattleList.filter(
    cattle => cattle.gender === 'female',
  ).length;
  //back
  const handleGoBack = () => {
    navigation.goBack();
  };


  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          marginLeft: 150,
          fontWeight: '900',
          marginTop: 25,
        }}>
        MY CATTLE
      </Text>
    
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search cattle..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <View style={styles.profile}>
              <Image
                source={require('../../src/Screens/assets/icons8-search-50.png')}
                style={styles.profileImage}
              />
            </View>
          </TouchableOpacity>
          
        </View>
        <ScrollView>
        <FlatList
  data={cattleList}
  renderItem={renderCattleCard}
  keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
/>
</ScrollView>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegisterNewCattle}>
          <Text style={styles.registerButtonText}>Register New Cattle</Text>
        </TouchableOpacity>

        <Modal visible={showForm} onRequestClose={() => setShowForm(false)}>
       
        
          <View style={styles.form}>
            <Text style={styles.formLabel}>Name:</Text>
            <TextInput
              style={styles.formInput}
              value={newCattle.name}
              onChangeText={text => setNewCattle({...newCattle, name: text})}
            />
            <Text style={styles.formLabel}>Age:</Text>
            <TextInput
              style={styles.formInput}
              value={newCattle.age}
              onChangeText={text => setNewCattle({...newCattle, age: text})}
            />
            <Text style={styles.formLabel}>Breed:</Text>
            <Picker
              style={styles.formInput}
              selectedValue={newCattle.breed}
              onValueChange={value =>
                setNewCattle({...newCattle, breed: value})
              }>
              <Picker.Item label="Friesian" value="Friesian" />
              <Picker.Item label="Jersey" value="Jersey" />
              <Picker.Item label="Holstein" value="Holstein" />
              <Picker.Item label="Guernsey" value="Guernsey" />
              <Picker.Item label="Ayrshire" value="Ayrshire" />
              <Picker.Item label="Brown Swiss" value="Brown Swiss" />
            </Picker>
            <Text style={styles.formLabel}>Gender:</Text>
            <Picker
              style={styles.formInput}
              selectedValue={newCattle.gender}
              onValueChange={value =>
                setNewCattle({...newCattle, gender: value})
              }>
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
            <View style={styles.formCheckboxContainer}>
              <TouchableOpacity
                style={styles.formCheckbox}
                onPress={() =>
                  setNewCattle({
                    ...newCattle,
                    isPregnant: !newCattle.isPregnant,
                  })
                }>
                {newCattle.isPregnant ? (
                  <View style={styles.profile}>
                    <Image
                      source={require('../../src/Screens/assets/icons8-checked-checkbox-24.png')}
                      style={styles.profileImage}
                    />
                  </View>
                ) : (
                  <View style={styles.profile}>
                    <Image
                      source={require('../../src/Screens/assets/icons8-unchecked-checkbox-50.png')}
                      style={styles.profileImage}
                    />
                  </View>
                )}
                <Text style={styles.formCheckboxLabel}>Pregnant</Text>
              </TouchableOpacity>
              
            </View>
       
            <TouchableOpacity
              style={styles.formSubmitButton}
              onPress={handleFormSubmit}>
              <Text style={styles.formSubmitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Cattle Summary</Text>
          <Text style={styles.summaryText}>
            Total Count: {totalCattleCount}
          </Text>
          <Text style={styles.summaryText}>
            Pregnant Count: {pregnantCattleCount}
          </Text>
          <Text style={styles.summaryText}>Male Count: {maleCattleCount}</Text>
          <Text style={styles.summaryText}>
            Female Count: {femaleCattleCount}
          </Text>
        </View>
        <View>
        <TouchableOpacity   style={styles.generateButton}    
  /*       onPress={generateStatements} */
        >
        <Text style={styles.statement}>Generate cattle statements</Text>
        </TouchableOpacity>
        </View>
       
     
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  genderIcon: {
    marginRight: 10,
  },
  icon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  statement:{
    fontSize:16,
    color:"black",
    marginHorizontal:100,
    marginBottom:20
  },
  summaryCard: {
    backgroundColor: '#CEF3CE',
    padding: 20,
    borderRadius: 4,
    marginBottom: 20,
    marginHorizontal: 20,
    marginTop: 20,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 3,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    marginLeft: 10,
  },
  searchButton: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 1,
  },
  card: {
    backgroundColor: '#CEF3CE',
    padding: 20,
    borderRadius: 1,
    marginBottom: 8,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderColor:"black"
  },
  cattleName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000000',
  },
  cattleDetails: {
    fontSize: 16,
    marginBottom: 4,
    color: '#000000',
  },
  genderIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  pregnantIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  registerButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 16,
    marginHorizontal: 30,
  },
  registerButtonText: {
    color: '#CEF3CE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 4,
    margin: 40,
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000000',
  },
  formInput: {
    height: 40,
    borderWidth: 3,
    borderColor: '#CEF3CE',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  formCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  formCheckboxLabel: {
    fontSize: 16,
    marginLeft: 4,
    color: '#000000',
  },
  formSubmitButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  formSubmitButtonText: {
    color: '#CEF3CE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNavigation: {
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 8,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
    backgroundColor: '#CEF3CE',
  },
});
export default CattleScreen;
 