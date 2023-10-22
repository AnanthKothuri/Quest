/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Feed from './screens/tabs/Feed';
import Leaderboard from './screens/tabs/Leaderboard';
import Profile from './screens/tabs/Profile';
import Challenge from './screens/tabs/Challenge';
import Onboarding from './screens/Onboarding';
import SubmitPost from './screens/tabs/SubmitPost';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
// import {ProfileIcon} from './components/Icons';
// import {LeaderboardIcon} from './components/Icons';
// import {FeedIcon} from './components/Icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          if (route.name === 'Leaderboard') {
            return (
              <Ionicons
                name={focused ? 'md-podium' : 'podium-outline'}
                size={25}
              />
            );
          } else if (route.name === 'Feed') {
            return (
              <Ionicons
                name={focused ? 'compass' : 'compass-outline'}
                size={30}
              />
            );
          } else if (route.name === 'Profile') {
            return (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={25}
              />
            );
          }
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#999999',
      })}>
      <Tab.Screen name="Leaderboard" component={Leaderboard} />
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  let onboarded = false;

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName={onboarded ? 'Home' : 'Onboarding'}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Challenge" component={Challenge} />
          <Stack.Screen name="Submit Post" component={SubmitPost} />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
