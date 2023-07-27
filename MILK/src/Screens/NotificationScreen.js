import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


import { useNavigation } from '@react-navigation/native';
import firebase from '../components/firebase';
import '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNotification, setNewNotification] = useState({
    id: '',
    title: '',
    description: '',
    datetime: '',
  });
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const db = firebase.firestore();
  // ... existing code ...

  // Get the current user ID
  const { currentUser } = firebase.auth();
  const userId = currentUser ? currentUser.uid : null;

  // ... existing code ...

  // Add new notification with user ID
  const handleAddNotification = async () => {
    try {
      if (!userId) {
        // If there's no logged-in user, show an error message (optional)
        Toast.show({
          type: 'error',
          text1: 'You must be logged in to add a notification',
          position: 'bottom',
        });
        return;
      }

      // Add the user ID to the new notification data
      const newNotificationData = {
        ...newNotification,
        userId: userId,
      };

      // Add the new notification to Firestore
      const docRef = await db.collection('notifications').add(newNotificationData);
      const notification = { id: docRef.id, ...newNotificationData };
      setNotifications([...notifications, notification]);
      setNewNotification({ id: '', title: '', description: '', datetime: '' });
      setModalVisible(false);

      // Show success notification
      Toast.show({
        type: 'success',
        text1: 'Notification added',
        position: 'bottom',
      });
    } catch (error) {
      console.error('Error adding notification:', error);
      // Show error notification
      Toast.show({
        type: 'error',
        text1: 'Error adding notification',
        text2: 'Please try again',
        position: 'bottom',
      });
    }
  };
//fetch
useEffect(() => {
  fetchNotifications();
}, []);

  // Fetch notifications for the logged-in user
  const fetchNotifications = async () => {
    try {
      if (!userId) {
        // If there's no logged-in user, show an error message (optional)
        Toast.show({
          type: 'error',
          text1: 'You must be logged in to view notifications',
          position: 'bottom',
        });
        return;
      }

      const snapshot = await db
        .collection('notifications')
        .where('userId', '==', userId) // Query notifications for the logged-in user
        .get();

      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Show error notification
      Toast.show({
        type: 'error',
        text1: 'Error retrieving notification records',
        position: 'bottom',
      });
    }
  };

/*
  useEffect(() => {
    fetchNotifications();
  }, []);

   const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        'http://192.168.0.103:4000/notifications',
      );
      setNotifications(response.data);
    } catch (error) {
      console.log('Error fetching notifications:', error);
    }
  };
  */

  //add
/*   const handleAddNotification = async () => {
    try {
      const docRef = await db.collection('notifications').add({
        title: newNotification.title,
        description: newNotification.description,
        datetime: newNotification.datetime,
      });
      const notification = { id: docRef.id, ...newNotification };
      setNotifications([...notifications, notification]);
      setNewNotification({ id: '', title: '', description: '', datetime: '' });
      setModalVisible(false);
  
      // Show success notification
      Toast.show({
        type: 'success',
        text1: 'Notification added',
        position: 'bottom',
      });
    } catch (error) {
      console.error('Error adding notification:', error);
      // Show error notification
      Toast.show({
        type: 'error',
        text1: 'Error adding notification',
        text2: 'Please try again',
        position: 'bottom',
      });
    }
  };
   */

  
/*
  const handleAddNotification = async () => {
    try {
      const response = await axios.post(
        'http://192.168.0.103:4000/notifications',
        {
          title: newNotification.title,
          description: newNotification.description,
          datetime: newNotification.datetime,
        },
      );
      const notification = response.data;
      setNotifications([...notifications, notification]);
      setNewNotification({id: '', title: '', description: '', datetime: ''});
      setModalVisible(false);
    } catch (error) {
      console.log('Error adding notification:', error);
    }
  };
 */
  const renderNotificationItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.notificationItem}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <Text style={styles.notificationDatetime}>{item.datetime}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = item => item.id;

  const openDateTimePicker = () => {
    setShowDateTimePicker(true);
  };

  const handleDateTimeChange = (event, selectedDateTime) => {
    setShowDateTimePicker(false);
    if (selectedDateTime) {
      const formattedDateTime = selectedDateTime.toLocaleString();
      setNewNotification({...newNotification, datetime: formattedDateTime});
    }
  };

  const startCronJob = () => {
    cron.schedule('* * * * *', async () => {
      try {
        const currentDateTime = new Date();

        // Find notifications whose datetime is due
        const dueNotifications = notifications.filter(
          notification => new Date(notification.datetime) <= currentDateTime,
        );

        // Send notifications to users
        dueNotifications.forEach(notification => {
          // TODO: Implement notification sending logic
          console.log('Sending notification:', notification);
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  //delete
  const handleDeleteNotification = async (notificationId) => {
    try {
      await db.collection('notifications').doc(notificationId).delete();
      setNotifications(prevNotifications =>
        prevNotifications.filter(notification => notification.id !== notificationId)
      );
  
      // Show success notification (optional)
      Toast.show({
        type: 'success',
        text1: 'Notification deleted',
        position: 'bottom',
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      // Show error notification (optional)
      Toast.show({
        type: 'error',
        text1: 'Error deleting notification',
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

      <Text style={styles.screenTitle}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.notificationList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No notifications found.</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Notification</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Notification</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={newNotification.title}
              onChangeText={text =>
                setNewNotification({...newNotification, title: text})
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newNotification.description}
              onChangeText={text =>
                setNewNotification({...newNotification, description: text})
              }
            />
            <TouchableOpacity
              style={styles.datetimeButton}
              onPress={openDateTimePicker}>
              <Text style={styles.datetimeButtonText}>Select Date & Time</Text>
            </TouchableOpacity>
            <Text style={styles.selectedDatetime}>
              {newNotification.datetime}
            </Text>
            {showDateTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="datetime"
                is24Hour={false}
                display="default"
                onChange={handleDateTimeChange}
              />
            )}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddNotification}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  notificationList: {
    flexGrow: 1,
  },
  notificationItem: {
    backgroundColor: '#F2F6F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'black',
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  notificationDescription: {
    fontSize: 16,
    color: '#555555',
  },
  notificationDatetime: {
    fontSize: 14,
    marginTop: 8,
    color: '#888888',
  },
  emptyListText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
    color: '#555555',
  },
  addButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333333',
  },
  input: {
    borderColor: '#CEF3CE',
    borderWidth: 3,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: '#333333',
  },
  datetimeButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  datetimeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDatetime: {
    fontSize: 14,
    marginTop: 8,
    color: '#CEF3CE',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#000000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
