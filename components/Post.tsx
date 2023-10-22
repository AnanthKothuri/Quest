import React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {User} from '../types/User';
import {PostDetails} from '../types/PostDetails';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

// type Props = {
//   user: User;
//   post: PostDetails;
// };

export default function Post({user}: {user: User}) {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageAndName}>
          <Image source={{uri: user.profilePicture}} style={styles.profileImage} />
          <View style={{paddingLeft: 10}}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.date}>{user.latestPost.date}</Text>
          </View>
        </View>

        <Ionicons name="ellipsis-horizontal-sharp" size={25} />
      </View>

      
      <Image source={{uri: user.latestPost.media}} style={styles.postContainer}/>
      {/* <View style={styles.postContainer} /> */}
        
      <View style={styles.footerContainer}>
        <Text style={{paddingTop: 5, paddingBottom: 5}}>{user.latestPost.description}</Text>
        <MaterialCommunityIcons name="thumb-up-outline" size={20}/>
      </View>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 15,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.3,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    padding: 10,
  },
  postContainer: {
    minHeight: 350,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 10,
    // backgroundColor: 'lightgray',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    padding: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  imageAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 3,
  },
  date: {
    fontSize: 12,
    color: 'gray',
    paddingLeft: 5,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 13,
  }
});
