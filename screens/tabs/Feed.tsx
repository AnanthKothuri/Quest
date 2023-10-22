import React from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import Post from './../../components/Post.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {user} from '../../types/User.ts';
// import {Challenge} from '../../types/Challenge.ts';

const post = {
  date: '10-21-23',
  description: 'this is a test post',
};

export type RootStackParamList = {
  Challenge: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Challenge'
>;

export default function Feed({navigation}: {navigation: any}) {
  function navigateToChallenge() {
    navigation.navigate('Challenge', {user});
  }

  return (
    <SafeAreaView>
      <ScrollView style={{height: Dimensions.get('window').height}}>
        {user.challenge.inProgress && (
          <TouchableOpacity
            onPress={navigateToChallenge}
            style={styles.challengeButton}>
            <View style={styles.challengeView}>
              <View>
                <View>
                  <Text style={styles.challengeText}>CHALLENGE</Text>
                </View>
                {/* <View>
                  <Text>{user.challenge.date}</Text>
                </View> */}
                <View>
                  <Text style={styles.challengeTitle}>
                    {user.challenge.name}
                  </Text>
                </View>
                <Text style={styles.challengeDescription}>
                  {user.challenge.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        <Post user={user} post={post} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  challengeButton: {
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
  challengeView: {
    width: Dimensions.get('screen').width - 40,
    backgroundColor: 'lightgray',
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
