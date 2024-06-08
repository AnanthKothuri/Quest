import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import supabase from '../../config/supabase';

const data = [
  { label: 'Not at all', value: '1' },
  { label: 'A little', value: '2' },
  { label: 'Moderately', value: '3' },
  { label: 'Fairly', value: '4' },
  { label: 'Very', value: '5' },
];



const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const dropDownstyles = StyleSheet.create({
  dropdown: {
    margin: 20,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  titleStyle: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: -10,
    fontWeight: 'bold',
  },
});



export default function Profile({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [Loading, setLoading] = useState(true)
  const [profilePicture, setProfilePicture] = useState('')
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [points, setPoints] = useState(0)
  const [days, setDays] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        let { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', 2)
          .single();

        if (error) {
          throw error;
        }

        setName(data.name)
        setProfilePicture(data.profilePicture)
        setChallengesCompleted(data.challengesCompleted)
        setPoints(data.points)
        setDays(data.days_completed)

      } catch (error: any) {
        console.error('Error fetching user:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  function navigateToOnboard() {
    navigation.navigate('Onboarding');
  }


  if (Loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: profilePicture,
            }}
          />
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.stats}>{points} points</Text>
        <Text style={styles.stats}>
          {challengesCompleted} challenges completed
        </Text>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            marginTop: 40,
            borderWidth: 0.5,
            borderRadius: 60,
            width: 250,
            alignItems: 'center',
            padding: 10,
            alignSelf: 'center',
          }}
          onPress={navigateToOnboard}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>
            {' '}
            Update Preferences{' '}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 50,
          }}>
          {days.map((item, index) => {
            const date = new Date(Date.now() - 86_400_000 * (30 - index - 1));
            return (
              <View key={index} style={{ flexDirection: 'column', padding: 2 }}>
                <Text style={{ fontSize: 10, textAlign: 'center' }}>
                  {date.getMonth() + 1 + '/' + date.getDate()}
                </Text>
                <Ionicons
                  name="compass"
                  size={36}
                  color={item ? 'green' : 'lightgray'}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',

  },
  image: {
    marginTop: 50,
    width: 150,
    height: 150,
    borderRadius: 75,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 30,
  },
  stats: {
    fontSize: 20,
    margin: 5,
    textAlign: 'center',
  },
});
