import { useEffect, useState } from 'react';
import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Post from './../../components/Post';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { user } from '../../types/User';
import { getQuestFromGPT, getQuestLocation } from '../../api/QuestCreator';
import { Challenge } from '../../types/Challenge';
import { default_challenge } from '../../types/User'
import * as Location from 'expo-location';
import supabase from '../../config/supabase';
import { GOOGLE_API_KEY } from '../../config/google';




export type RootStackParamList = {
  Challenge: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Challenge'
>;


async function getFriends(): Promise<any> {
  const { data: friendsData, error: friendsError } = await supabase
    .from('friends')
    .select('user_id2')
    .eq('user_id1', 2);

  if (friendsError) {
    throw friendsError;
  }
  var friendIds = friendsData.map(friend => friend.user_id2);

  const { data: usersData, error: usersError } = await supabase
    .from('users')
    .select('*')
    .in('id', friendIds)

  if (usersError) {
    throw usersError;
  }
  return usersData;
}

async function getUser(): Promise<any> {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', 2)
    .single()
  return user;
}


export default function Feed({ navigation }: { navigation: any }) {
  const [response, setResponse] = useState<any | null>(null);
  const [challenge, setChallenge] = useState(default_challenge);
  const [currentPost, setCurrentPost] = useState(user.latestPost);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null)


  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const fetchedFriends = await getFriends();
        setFriends(fetchedFriends);
      } catch (error) {
        console.error('Failed to fetch friends:', error);
        Alert.alert('Error fetching friends');
      } finally {
      }
    };
    fetchFriends();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser();
        setCurrentUser(fetchedUser)
      }
      catch (error) {

      }
    };
    fetchUser()
    console.log("User")
    console.log(currentUser)
  }, [user?.challenge.inProgress])



  var postList = [];

  useFocusEffect(
    React.useCallback(() => {
      postList = user.challenge.inProgress
        ? friends
        : [currentUser, ...friends];
      if (!user.challenge.inProgress) {
        setCurrentPost(user.latestPost);
      }
    }, [user?.challenge.inProgress]),
  );

  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [postLoadings, setPostLoadings] = useState(new Array(postList.length).fill(true));

  useEffect(() => {
    const allLoaded = postLoadings.every(loading => !loading);
    setAllPostsLoaded(allLoaded);
  }, [postLoadings])

  const handlePostLoaded = (index: any) => {
    const newLoadings = [...postLoadings];
    newLoadings[index] = false;
    setPostLoadings(newLoadings);
  };


  async function navigateToChallenge() {
    if (challenge.difficulty === 0) {
      Alert.alert("Please create a challenge")
    }
    else {

      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=place_id%2Ccurrent_opening_hours%2Cformatted_address%2Cformatted_phone_number%2Cgeometry%2Cname%2Cphotos%2Crating%2Creviews%2Curl%2Cwebsite&place_id=${challenge.place_id}&key=${GOOGLE_API_KEY}`;
      const placeData = await fetch(url);
      const place = (await placeData.json()).result;
      setLoading(false);
      navigation.navigate('Challenge', { user, location, place });
    }
  }

  async function createQuest() {
    setLoading(true);
    const response = await getQuestFromGPT(user);
    const location = await getQuestLocation(response);
    console.log(location)
    setResponse(response);

    const quest: Challenge = {
      name: response.activity,
      description: response.description,
      date: Date(),
      inProgress: true,
      difficulty: response.difficulty,
      location: location,
      details: '',
      place_id: location[0].place_id

    };
    user.challenge = quest;
    setChallenge(quest);
    setLoading(false);
  }

  postList = user.challenge.inProgress
    ? friends
    : [currentUser, ...friends];


  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <ScrollView>
        {user.challenge.inProgress && (
          <>
            <TouchableOpacity
              onPress={createQuest}
              style={{ width: 400, marginTop: 10 }}>
              <Text
                style={{
                  textAlign: 'left',
                  paddingTop: 5,
                  paddingLeft: 25,
                  fontWeight: 'bold',
                  fontSize: 20
                }}>
                Create a New Challenge
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={navigateToChallenge}
              style={styles.challengeButton}>
              <View style={styles.challengeView}>
                <View>
                  <View>
                    <Text style={styles.challengeText}>CHALLENGE</Text>
                  </View>
                  {!loading ? (
                    <>
                      <View>
                        <Text style={styles.challengeTitle}>
                          {challenge.name}
                        </Text>
                      </View>
                      <Text style={styles.challengeDescription}>
                        {challenge.description}
                      </Text>
                    </>
                  ) : (
                    <ActivityIndicator size="large" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}

        {!user.challenge.inProgress && (
          <>
            <TouchableOpacity onPress={() => { }} style={styles.challengeButton}>
              <View style={styles.challengeView}>
                <View>
                  <View>
                    <Text style={styles.challengeText}>COMPLETED</Text>
                  </View>
                  <View>
                    <Text style={styles.challengeTitle}>
                      You've completed your daily challenge!
                    </Text>
                  </View>
                  <Text style={styles.challengeDescription}>
                    Take a look at what your friends are up to
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
        {!allPostsLoaded ? (
          <ActivityIndicator size="large" />
        ) : (
          postList.map((item, index) => (
            <Post key={item.id} user={item} onLoaded={() => handlePostLoaded(index)} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  challengeButton: {
    padding: 20,
    alignContent: 'center',
  },
  challengeView: {
    width: Dimensions.get('screen').width - 40,
    backgroundColor: '#F0F7EE',
    padding: 20,
    borderRadius: 15,
  },
  challengeText: {
    fontSize: 10,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  challengeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  challengeDescription: {
    fontSize: 12,
    color: 'gray',
  },
});
