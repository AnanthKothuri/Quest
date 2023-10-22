import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {User} from '../../types/User';

export default function Challenge({route}: {route: any}) {
  const user: User = route.params.user;
  return (
    <SafeAreaView>
      <View style={styles.challengeView}>
        <Text style={styles.challengeText}>CURRENT CHALLENGE</Text>
        <Text style={styles.challengeTitle}>{user.challenge.name}</Text>
        <Text style={styles.challengeText}>{user.challenge.description}</Text>
        <Text style={styles.challengeText}>
          {' '}
          Start Time: {user.challenge.startTime}
        </Text>
        <Text style={styles.challengeText}>
          {' '}
          Start Time: {user.challenge.endTime}
        </Text>
        {user.challenge.inProgress && (
          <TouchableOpacity style={styles.challengeButton}>
            <View style={styles.challengeView}>
              <Text>FINISH CHALLENGE!</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{padding: 10}} />
      <View style={styles.progressContainer}>
        <Text style={styles.progressBig}>
          {user.points}
          <Text style={styles.progressSmall}>Current Points</Text>
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressBig}>
          {route.params.user.challengesCompleted}
          <Text style={styles.progressSmall}>Challenges Completed</Text>
        </Text>
      </View>
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
  progressContainer: {
    padding: 20,
    backgroundColor: 'darkblue',
    borderRadius: 15,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  progressBig: {
    fontSize: 20,
    color: 'white',
    padding: 10,
  },
  progressSmall: {
    fontSize: 14,
    color: 'white',
    padding: 10,
  },
});
