import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import LeaderboardItem from '../../components/LeaderboardItem';
import supabase from '../../config/supabase';


async function getUsers(): Promise<any> {
  const { data: friendsData, error: friendsError } = await supabase
    .from('friends')
    .select('user_id2')
    .eq('user_id1', 2);

  if (friendsError) {
    throw friendsError;
  }
  var friendIds = friendsData.map(friend => friend.user_id2);
  friendIds = friendIds.concat(2)
  const { data: usersData, error: usersError } = await supabase
    .from('users')
    .select('*')
    .in('id', friendIds)

  if (usersError) {
    throw usersError;
  }
  console.log("Users")
  console.log(usersData)
  return usersData;


}





export default function Leaderboard() {
  const [friendList, setFriendList] = useState<any[]>([]);
  const [Loading, setLoading] = useState(true)
  useEffect(() => {
    getUsers().then(usersData => {
      setFriendList(usersData);
      setLoading(false)
    }).catch(err => {
      console.error('Failed to fetch friends:', err);
    });
  }, []);
  console.log(friendList)

  if (Loading) {
    return (
      <ActivityIndicator size="large" />
    )
  }
  // const friendList = getFriendUsers().concat(user);
  //const friendList = buildPrompt;
  const sortedList = friendList.slice().sort((a, b) => b.points - a.points);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.topContainer}>
          <View>
            <Text style={styles.topAdventurerText}>Top Adventurers</Text>
            <Text style={{ fontSize: 13, width: 150 }}>The more points you have, the more you explore!</Text>
            <Text style={{ fontSize: 11, width: 150, color: 'white' }}>Winning can even lead to rewards and benefits!</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Image source={{ uri: sortedList[0].profilePicture }} style={styles.firstPlacePicture} />
            <Text style={{ fontSize: 12, paddingTop: 5 }}>1ST PLACE</Text>
          </View>
        </View>

        <View style={styles.standingsContainer}>
          <Text style={{ textAlign: 'left', fontSize: 14, fontWeight: 'bold' }}>Today's Rankings</Text>
        </View>

        <View style={styles.list}>
          {sortedList.map((item, index) => (
            <LeaderboardItem key={index} user={item} rank={index + 1} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    marginTop: 20

  },
  standingText: {
    fontSize: 20,
  },
  topContainer: {
    alignContent: 'space-around',
    justifyContent: 'space-around',
    backgroundColor: '#FBD160',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row'
  },
  topAdventurerText: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  firstPlacePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  }
});
