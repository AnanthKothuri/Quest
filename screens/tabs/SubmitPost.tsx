import {useEffect, useState} from 'react';
import supabase from '../../config/supabase';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  Image,
} from 'react-native';

import Post from './../../components/Post';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {User} from '../../types/User';
import {Challenge} from '../../types/Challenge';
import {PostDetails} from '../../types/PostDetails';
import * as ImagePicker from 'expo-image-picker';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function SubmitPost({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const user: User = route.params.user;
  //const media = String(route.params.media);
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState('');
  function addPoints() {
    console.log(user.points);
    if (user.challenge.difficulty === 1) {
      route.user.points += 10;
    } else if (user.challenge.difficulty === 2) {
      user.points += 30;
    } else {
      user.points += 50;
    }
    user.challengesCompleted++;
    
    console.log(user.points);
  }
  function navigateToFeed() {
    // ADD POST TO SUPABASE
    const newPost: PostDetails = {
      date: user.challenge.date,
      description: description,
      media: media,
    };
    user.latestPost = newPost;
    user.challenge.inProgress = false;
    navigation.navigate('Feed');
  }

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView>
      {!media ? (
        <TouchableOpacity style={styles.image} onPress={pickImage}>
          <MaterialCommunityIcons name="upload" size={40} />
        </TouchableOpacity>
      ) : (
        <Image source={{uri: media}} style={styles.image} />
      )}
      <Text style={styles.date}>{new Date(user.challenge.date).toDateString()}</Text>

      <TextInput
        placeholder="Optional description . . ."
        onChangeText={setDescription}
        value={description}
        style={styles.description}
      />

      <TouchableOpacity
        onPress={() => {
          navigateToFeed();
          addPoints();
        }}
        style={styles.submitButton}>
        <Text style={styles.buttonText}>Post!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    margin: 20,
    height: 300,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    marginLeft: 20,
  },
  description: {
    margin: 20,
  },
  submitButton: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 15,
    margin: 10,
    alignSelf: 'center',
    backgroundColor: 'lightgray',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  }
});
