import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import supabase from '../config/supabase';





export default function Post({ user, onLoaded }: { user: any, onLoaded: any }) {
  const [postData, setPostData] = useState<any | null>(null);

  async function getPost() {
    console.log(user.name)
    console.log(user.LatestPost)
    const { data: PostData, error: PostError } = await supabase
      .from('posts')
      .select('*')
      .eq('user_id', user.LatestPost)
      .single();


    setPostData(PostData);
    console.log("postData")
    console.log(postData);
  }

  useEffect(() => {
    getPost().then(() =>
      onLoaded())
  }, [])

  const [isLiked, setIsLiked] = useState(false);

  if (!postData) {
    return null;  // Or render some placeholder
  }
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageAndName}>
          <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.date}>{postData.date}</Text>
          </View>
        </View>

      </View>


      <Image source={{ uri: postData.media }} style={styles.postContainer} />

      <View style={styles.footerContainer}>
        <Text style={{ paddingTop: 5, paddingBottom: 5 }}>{postData.description}</Text>
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
          <MaterialCommunityIcons name={isLiked ? "thumb-up" : "thumb-up-outline"} size={20} />
        </TouchableOpacity>
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
    shadowOffset: { width: 1, height: 2 },
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
