import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {User} from '../types/User';
import {PostDetails} from '../types/PostDetails';

type Props = {
  user: User;
  post: PostDetails;
};

export default function Post(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageAndName}>
          {/* <Icon name="person" /> */}
          <View>
            <Text style={styles.name}>{props.user.name}</Text>
            <Text style={styles.date}>{props.post.date}</Text>
          </View>
        </View>

        {/* <MaterialCommunityIcons name="account" /> */}
      </View>

      <View style={styles.postContainer} />

      <View style={styles.footerContainer}>
        <Text style={styles.footerContainer}>{props.post.description}</Text>
        {/* <MaterialCommunityIcons name="thumb-up-icon" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 20,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    padding: 10,
  },
  postContainer: {
    minHeight: 200,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'lightgray',
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
});
