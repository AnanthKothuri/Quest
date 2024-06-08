import { useState } from 'react';
import supabase from '../../config/supabase';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import { User } from '../../types/User';
import { PostDetails } from '../../types/PostDetails';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SubmitPost({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const user: User = route.params.user;
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState('');


  const updateInformation = async () => {
    let { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', 2)
      .single();
    if (error) {
      throw error;
    }
    if (user.challenge.difficulty === 1) {
      data.points += 10;
    } else if (user.challenge.difficulty === 2) {
      data.points += 30;
    } else {
      data.points += 50;
    }
    data.challengesCompleted += 1;
    data.days_completed[data.days_completed.length - 1] = true

    const { } = await supabase
      .from('users')
      .update({
        points: data.points,
        challengesCompleted: data.challengesCompleted,
        days_completed: data.days_completed
      })
      .eq('id', 2);
    user.challenge.inProgress = false;
  }
  async function navigateToFeed() {
    // ADD POST TO SUPABASE
    const { } = await supabase
      .from('posts')
      .update({
        date: user.challenge.date,
        description: description,
        media: media
      })
      .eq('user_id', 4)


    const newPost: PostDetails = {
      date: user.challenge.date,
      description: description,
      media: media,
    };
    user.latestPost = newPost;

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
        <Image source={{ uri: media }} style={styles.image} />
      )}
      <Text style={styles.date}>{new Date(user.challenge.date).toDateString()}</Text>

      <TextInput
        placeholder="Optional description . . ."
        onChangeText={setDescription}
        value={description}
        style={styles.description}
      />

      <TouchableOpacity
        onPress={async () => {
          await updateInformation();
          await navigateToFeed();
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
