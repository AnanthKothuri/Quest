import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import {friend1} from '../../types/User';
import Onboarding from '../Onboarding';
import {user} from '../../types/User';
import {Dropdown} from 'react-native-element-dropdown';
import {Ionicons} from '@expo/vector-icons';

const data = [
  {label: 'Not at all', value: '1'},
  {label: 'A little', value: '2'},
  {label: 'Moderately', value: '3'},
  {label: 'Fairly', value: '4'},
  {label: 'Very', value: '5'},
];

const days: number[] = [];
for (let i = 0; i < 30; i++) {
  days.push(Math.random() > 0.5 ? 0 : 1);
}

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

function Circle(radius: number, color: string) {
  return (
    <View
      style={{
        backgroundColor: color,
        width: radius * 2,
        height: radius * 2,
        borderWidth: 0.5,
        borderRadius: radius,
        margin: 5,
      }}></View>
  );
}

export default function Profile({navigation}: {navigation: any}) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [hobbies, setHobbies] = useState('');
  function navigateToOnboard() {
    navigation.navigate('Onboarding', {user});
  }
  const [extrovertedness, setExtrovertedness] = useState<any>(null);
  const [emotionalStability, setEmotionalStability] = useState<any>(null);
  const [agreeableness, setAgreeableness] = useState<any>(null);
  const [openness, setOpenness] = useState<any>(null);

  return (
    <SafeAreaView>
      <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: friend1.profilePicture,
          }}
        />
      </View>
      <Text style={styles.name}>{friend1.name}</Text>
      <Text style={styles.stats}>{friend1.points} points</Text>
      <Text style={styles.stats}>
        {friend1.challengesCompleted} challenges completed
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
        <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 15}}>
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
            <View key={index} style={{flexDirection: 'column', padding: 2}}>
              <Text style={{fontSize: 10, textAlign: 'center'}}>
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
