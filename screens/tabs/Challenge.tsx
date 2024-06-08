import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { User } from '../../types/User';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Place } from '../../types/Place';
import { Foundation, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

function getDifficulty(num: number) {
  if (num == 1) {
    return 'Easy';
  } else if (num == 2) {
    return 'Medium';
  } else if (num == 3) {
    return 'Hard';
  } else {
    return 'Unknown';
  }
}

function getPoints(num: number) {
  if (num == 1) {
    return 10;
  } else if (num == 2) {
    return 25;
  } else if (num == 3) {
    return 50;
  } else {
    return 0;
  }
}


export default function Challenge({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const location: Location.LocationObject = route.params.location;
  const place: Place = route.params.place;
  const user: User = route.params.user;

  const pickImage = () => {
    navigation.navigate('Submit Post', { user });
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.challengeName}> {user.challenge.name} </Text>
        </View>
        <View style={styles.mapImage}>
          {location && (
            <>
              <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 1,
                  longitudeDelta: 1,
                }}
                showsUserLocation={true}>
                {place && (
                  <Marker
                    coordinate={{
                      latitude: place.geometry.location.lat,
                      longitude: place.geometry.location.lng,
                    }}
                    title={place.name}
                    description={place.formatted_address}
                  />
                )}
              </MapView>
            </>
          )}
        </View>

        <View style={styles.detailsContainer}>
          <View style={{ flexDirection: 'row', gap: 15 }}>
            <View style={styles.difficultyView}>
              <Ionicons name="barbell-outline" size={25} />
              <Text style={styles.difficulty}>
                {' '}
                {getDifficulty(user.challenge.difficulty)}
              </Text>
            </View>
            <View style={styles.pointsView}>
              <Foundation name="graph-bar" size={25} />
              <Text style={styles.difficulty}>
                {' '}
                {getPoints(user.challenge.difficulty)} Points
              </Text>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <MaterialCommunityIcons name="map-marker" size={30} />
              <Text style={styles.locationText}>
                {place.name == 'Navigate to the undefined homepage'
                  ? 'Unspecified'
                  : place.name}
              </Text>
            </View>
            <Text style={styles.description}>{place.formatted_address}</Text>
            <Text style={styles.description}>{place.formatted_phone_number}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={pickImage} style={styles.completeButton}>
          <Text
            style={{ textAlign: 'center', fontSize: 17.5, fontWeight: 'bold' }}>
            I did it!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function mapImage() { }

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  challengeName: {
    fontSize: 27.5,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    paddingVertical: 20,
  },
  mapImage: {
    flexDirection: 'row',
    flex: 1,
    minHeight: 300,
    backgroundColor: 'lightgray',
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficulty: {
    fontSize: 15,
    padding: 5,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    padding: 5,
    color: 'gray',
    textAlign: 'center'
  },
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  locationText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 17.5,
    fontWeight: 'bold',
    padding: 5,
    textAlign: 'center',
  },
  difficultyView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F0C9B3',
    flexDirection: 'row',
    margin: 5,
  },
  pointsView: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#AFDEDC',
    flexDirection: 'row',
    margin: 5,
  },
  completeButton: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#F0F7EE',
    margin: 30,
    padding: 10,
    // shadowOpacity: 0.5,
    // shadowOffset: {width: 0, height: 0}
  },
  detailsText: {
    fontSize: 15,
    padding: 5,
    margin: 5,
    textAlign: 'left',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});
