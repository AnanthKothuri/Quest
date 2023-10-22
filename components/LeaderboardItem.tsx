import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {User} from '../types/User';

type Props = {
  user: User;
  rank: number;
};

function itemStyle(rank: number) {
  return {
    flexDirection: 'row',
    backgroundColor: rank == 1 ? '#FBD160' : rank == 2 ? '#F0C9B3': rank == 3 ? 'lightgray' : 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  }
}

export default function LeaderboardItem(props: Props) {
  return (
    <View style={{paddingBottom: 5}}>
        <TouchableOpacity style={itemStyle(props.rank)}>
        {/* <View> */}
        <View style={styles.row}>
          <Text style={styles.rankNumber}>{props.rank}</Text>
          {/* display profile picture here */}
          <Text style={styles.name}>{props.user.name}</Text>
        </View>

        <View>
          {/* display coin image */}
          <Text style={styles.score}>{props.user.points} points</Text>
        </View>
        {/* </View> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flex: 1,
    // borderRadius: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  rankNumber: {
    padding: 7,
    // backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 10,
  },
  name: {
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 30
  },
  score: {
    fontSize: 15,
  }
});
