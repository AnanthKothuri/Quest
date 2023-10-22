import {useEffect, useState} from 'react';
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {user, friend1, friend2, friend3} from '../../types/User';
import {getQuestFromGPT, getQuestLocation} from '../../api/QuestCreator';
import {Challenge} from '../../types/Challenge';
import * as Location from 'expo-location';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {GOOGLE_API_KEY} from '../../config/google';

const post = {
  date: '10-21-23',
  description: 'this is a test post',
  media: '',
};

export type RootStackParamList = {
  Challenge: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Challenge'
>;

function getFriendPosts() {
  // normally, would get all friends from supabase
  return [friend1, friend2, friend3];
}

export default function Feed({navigation}: {navigation: any}) {
  const [response, setResponse] = useState<any | null>(null);
  const [challenge, setChallenge] = useState(user.challenge);
  const [currentPost, setCurrentPost] = useState(user.latestPost);
  const [loading, setLoading] = useState(false);
  var postList = [];
  var sortedList = [];

  useFocusEffect(
    React.useCallback(() => {
      postList = user.challenge.inProgress
        ? getFriendPosts()
        : getFriendPosts().concat(user);
      sortedList = postList.slice().sort((a, b) => {
        if (a.name == user.name) {
          return -1;
        } else {
          return 0;
        }
      });
      if (!user.challenge.inProgress) {
        setCurrentPost(user.latestPost);
      }
    }, []),
  );

  async function navigateToChallenge() {
    setLoading(true);
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync();
    const keyword = response?.activity;
    const places = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${location.coords.latitude},${location.coords.longitude}&radius=40000&key=${GOOGLE_API_KEY}`,
    );
    let json = await places.json();
    const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=place_id%2Ccurrent_opening_hours%2Cformatted_address%2Cformatted_phone_number%2Cgeometry%2Cname%2Cphotos%2Crating%2Creviews%2Curl%2Cwebsite&place_id=${json.results[0].place_id}&key=${GOOGLE_API_KEY}`;
    const placeData = await fetch(url);
    const place = (await placeData.json()).result;
    setLoading(false);
    navigation.navigate('Challenge', {user, location, place});
  }

  async function createQuest() {
    setLoading(true);
    const response = await getQuestFromGPT(user);
    const location = await getQuestLocation(response);
    setResponse(response);

    const quest: Challenge = {
      name: response.activity,
      description: response.description,
      date: Date(),
      inProgress: true,
      difficulty: response.difficulty,
      location: location,
      details: '',
    };
    user.challenge = quest;
    setChallenge(quest);
    setLoading(false);
  }

  postList = user.challenge.inProgress
    ? getFriendPosts()
    : getFriendPosts().concat(user);
  sortedList = postList.slice().sort((a, b) => {
    if (a.name == user.name) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <ScrollView>
        {user.challenge.inProgress && (
          <>
            <TouchableOpacity
              onPress={createQuest}
              style={{width: 150, marginTop: 10}}>
              <Text
                style={{
                  textAlign: 'left',
                  paddingTop: 5,
                  paddingLeft: 25,
                  fontWeight: 'bold',
                }}>
                Reset Challenge
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
                          {challenge.name.trim()}
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

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                marginVertical: 30,
              }}>
              <Ionicons name="earth" size={25} />
              <Text>You still haven't finished your daily quest yet.</Text>
              <Text> . . .</Text>
            </View>
          </>
        )}

        {!user.challenge.inProgress && (
          <>
            <TouchableOpacity onPress={() => {}} style={styles.challengeButton}>
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
        {sortedList.map((item, index) => (
          <Post user={item} />
        ))}
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
