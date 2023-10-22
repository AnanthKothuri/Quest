import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image} from 'react-native';
import {User} from '../types/User';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

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
    shadowColor: rank == 1 ? 'rgba(245, 206, 66, 1)' : 'rgba(0, 0, 0, 0)', // Adjust the color and opacity of the glow
    shadowOffset: { width: 4, height: 0 }, // Adjust the offset to control the glow's position
    shadowRadius: rank == 1 ? 20 : 0, // Adjust the radius to control the glow's size
    shadowOpacity: rank == 1 ? 1 : 0, // Adjust the opacity to control the glow's visibility
  }
}

export default function LeaderboardItem(props: Props) {
  return (
    <View style={{paddingBottom: 5}}>
        <TouchableOpacity style={itemStyle(props.rank)}>
        {/* <View> */}
        <View style={styles.row}>
        <Image source={{uri: props.user.profilePicture}} style={styles.profilePicture}/>
          <Text style={styles.rankNumber}>{props.rank} .</Text>
          <Text style={styles.name}>{props.user.name}</Text>
          {props.rank == 1 && (
          <MaterialCommunityIcons name="crown" size={20} style={{color: 'white'}}/>
        )
        }
        </View>
        <Text style={styles.score}>{props.user.points} pts</Text>
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
    // justifyContent: 'space-around',
    alignItems: 'center',

  },
  rankNumber: {
    paddingRight: 4,
    padding: 7,
    // backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 13,
  },
  name: {
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 30
  },
  score: {
    fontSize: 15,
    marginLeft: 'auto'

  },
  profilePicture: {
    width: 30,
    height: 30,
    borderRadius: 5
  }
});
