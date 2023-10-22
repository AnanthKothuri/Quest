import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import {User, user, friend1, friend2, friend3} from '../../types/User';
// import {Challenge} from '../../types/Challenge.ts';
import LeaderboardItem from '../../components/LeaderboardItem';

// const challenge: Challenge = {
//   name: 'Go to Zilker Park',
//   description: 'Take a bus to Zilker park and touch some grass.',
//   date: '10-21-23',
//   inProgress: true,
//   startTime: '9:00',
//   endTime: '15:00',
//   difficulty: 3,
// };

// const user: User = {
//   name: 'Ananth Kothuri',
//   currentChallenge: challenge,
//   profilePicture: 'akjsdhka',
//   challengesCompleted: 5,
//   totalPoints: 1000,
//   friends: [],
// };

// type Props = {
//   user: User;
//   rank: number;
// };

function getFriendUsers() {
  // normally, get from supabase, for now just returing hard coded data
  return [friend1, friend2, friend3];
}

export default function Leaderboard() {
  const friendList = getFriendUsers().concat(user);
  const sortedList = friendList.slice().sort((a, b) => b.points - a.points);

  return (
    <SafeAreaView>
      <View style={styles.standingsContainer}>
        <Text>Standings</Text>
        <Text>{user.challenge.date}</Text>
      </View>

      <View style={styles.list}>
        {sortedList.map((item, index) => (
          <LeaderboardItem key={index} user={item} rank={index + 1} />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  standingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  standingText: {
    fontSize: 20
  }
});
