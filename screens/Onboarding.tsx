import React, {useState} from 'react';
import supabase from '../config/supabase';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';

const data = [
  {label: 'Not at all', value: '1'},
  {label: 'A little', value: '2'},
  {label: 'Moderately', value: '3'},
  {label: 'Fairly', value: '4'},
  {label: 'Very', value: '5'},
];

const dropDownstyles = StyleSheet.create({
  dropdown: {
    margin: 20,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    zIndex: 60,
    top: 20,
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

export default function Onboarding({navigation}: {navigation: any}) {
  const [extrovertedness, setExtrovertedness] = useState<any>(null);
  const [emotionalStability, setEmotionalStability] = useState<any>(null);
  const [agreeableness, setAgreeableness] = useState<any>(null);
  const [conscientiousness, setConscientiousness] = useState<any>(null);
  const [openness, setOpenness] = useState<any>(null);
  const DropdownComponent = ({
    my_placeholder,
    my_value,
    onChange,
  }: {
    my_placeholder: any;
    my_value: any;
    onChange: any;
  }) => {
    return (
      <Dropdown
        style={dropDownstyles.dropdown}
        placeholderStyle={dropDownstyles.placeholderStyle}
        selectedTextStyle={dropDownstyles.selectedTextStyle}
        iconStyle={dropDownstyles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={my_placeholder}
        value={my_value}
        onChange={item => {
          onChange(item.value);
        }}
      />
    );
  };
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [hobbies, setHobbies] = useState('');

  const handleContinue = async () => {
    // let user_ID = 0;
    // let {data: existingID, error} = await supabase
    //   .from('users')
    //   .select('id')
    //   .eq('name', name);
    // if (error) {
    //   console.log(existingID);
    //   Alert.alert('Error retrieving data from Supabase 1.');
    //   console.log(error);
    //   return;
    // }
    // else {
    //   if (existingID != null && existingID.length != 0) {
    //     user_ID = existingID as unknown as number;
    //   }
    //   else{
    //     let {data: newID, error} = await supabase
    //       .from('profile_data')
    //       .select('id')
    //       .order('id', {'ascending': true});
    //       if (error) {
    //         Alert.alert('Error retrieving data from Supabase 2.');
    //         console.log(error);
    //         return;
    //       }
    //       else if (newID) {
    //         Alert.alert((newID.at(0) as unknown as number).toString());
    //         user_ID = newID.at(0) as unknown as number;
    //       }
    //   }
      
      
    // }
    const user_id = 1;
    const data = {
      user_id: user_id,
      age: age as unknown as number,
      extroversion: extrovertedness as number,
      agreeableness: agreeableness as number,
      emotional_stability: emotionalStability as number,
      conscientiousness: conscientiousness as number,
      openness: openness as number,
      hobbies,
    };
    
    const {data: existingData, error: err} = await supabase
      .from('profile_data')
      .select('*')
      .eq('user_id', data.user_id);
    if (err) {
      Alert.alert('Error retrieving data from Supabase 3.');
      console.log(err);
      return;
    } else {
      if (!existingData || existingData.length == 0) {
        const {data: insertedData, error} = await supabase
          .from('profile_data')
          .upsert([data]);
        if (error) {
          Alert.alert('Error inserting data into Supabase 4.');
          console.log(error);
          return;
        }
      } else {
        const {data: updatedData, error} = await supabase
          .from('profile_data')
          .update([data])
          .eq('user_id', data.user_id);
        if (error) {
          Alert.alert(data.toString());
          Alert.alert('Error inserting data into Supabase. 5');
          console.log(error);
          return;
        }
      }
    }
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.scrollContainer}>
      <ScrollView>
        <Text style={styles.heading}>
          Please answer some onboarding questions. This will help give us an
          idea of what your daily challenges shall be.
        </Text>
        <TextInput
          placeholder="Name"
          onChangeText={setName}
          value={name}
          style={styles.input}
        />
        <TextInput
          placeholder="Age"
          onChangeText={setAge}
          value={String(age)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Gender"
          onChangeText={setGender}
          value={gender}
          style={styles.input}
        />
        <TextInput
          placeholder="List three interests or hobbies separated by commas."
          onChangeText={setHobbies}
          value={hobbies}
          style={styles.input}
          numberOfLines={3}
        />

        <Text style={dropDownstyles.titleStyle}>
          {' '}
          How much do you enjoy socializing with others?{' '}
        </Text>
        <DropdownComponent
          my_placeholder="None Selected"
          my_value={extrovertedness}
          onChange={setExtrovertedness}
        />
        <Text style={dropDownstyles.titleStyle}>
          {' '}
          How often does your mood fluctuate?{' '}
        </Text>
        <DropdownComponent
          my_placeholder="None Selected"
          my_value={emotionalStability}
          onChange={setEmotionalStability}
        />
        <Text style={dropDownstyles.titleStyle}>
          {' '}
          How trusting are you of others?{' '}
        </Text>
        <DropdownComponent
          my_placeholder="None Selected"
          my_value={agreeableness}
          onChange={setAgreeableness}
        />
        <Text style={dropDownstyles.titleStyle}>
          {' '}
          How much do you enjoy trying new things?{' '}
        </Text>
        <DropdownComponent
          my_placeholder="None Selected"
          my_value={openness}
          onChange={setOpenness}
        />
        <Text style={dropDownstyles.titleStyle}>
          {' '}
          How often do you put others' needs before your own?{' '}
        </Text>
        <DropdownComponent
          my_placeholder="None Selected"
          my_value={conscientiousness}
          onChange={setConscientiousness}
        />

        <TouchableOpacity
          onPress={handleContinue}
          style={styles.continue_button}>
          <Text> Continue </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  onboaringText: {
    fontWeight: 'bold',
    fontSize: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: 15,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 60,
    top: 20,
  },
  input: {
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    borderWidth: 0.5,
    //borderRadius: 10,
  },
  continue_button: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5, // Add padding for better touch response
    margin: 20, // Adjust margin to separate it from the inputs
    alignItems: 'center', // Center the button horizontally
    display: 'flex',
  },
  heading: {
    fontSize: 14,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
