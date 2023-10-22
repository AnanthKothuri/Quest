import React, {useState} from 'react';
import supabase from '../config/supabase.ts';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function Onboarding() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [extrovertedness, setExtrovertedness] = useState(0);
  const [hobbies, setHobbies] = useState('');

  const handleContinue = async () => {
    if (username.trim() === '') {
      Alert.alert('Please enter a username');
      return;
    }
    if (age === 0) {
      Alert.alert('Please enter your age');
      return;
    }
    if (extrovertedness === 0) {
      Alert.alert('Please enter your age');
      return;
    }
    if (gender.trim() === '') {
      Alert.alert('Please enter your age');
      return;
    }

    const data = {username, age, gender, extrovertedness, hobbies};
    const {data: insertedData, error} = await supabase
      .from('profile_data')
      .upsert([data]);
    if (error) {
      Alert.alert('Error inserting data into Supabase.');
      console.log(error);
    } else {
      console.log(insertedData);
    }
  };

  return (
    <ScrollView>
      <Text>
        {' '}
        To have an idea of what things we want you to do, please enter some
        information.{' '}
      </Text>
      <TextInput
        placeholder="username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        placeholder="age"
        onChangeText={text => setAge(parseInt(text, 10))}
        value={age}
        keyboardType="numeric"
      />
      <TextInput placeholder="Gender" onChangeText={setGender} value={gender} />
      <TextInput
        placeholder="On a scale from 1-5 how extrovered are you"
        onChangeText={text => setExtrovertedness(parseInt(text, 10))}
        value={extrovertedness}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="List three interests/hobbies seperated by commas"
        onChangeText={setHobbies}
        value={hobbies}
      />
      <TouchableOpacity onPress={handleContinue}>
        <Text> Continue </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// const styles = StyleSheet.create{{

// }};
