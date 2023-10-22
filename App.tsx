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
import {ProfileIcon} from './components/Icons.tsx';
import {LeaderboardIcon} from './components/Icons.tsx';
import {FeedIcon} from './components/Icons.tsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: () => {
          if (route.name === 'Leaderboard') {
            return <LeaderboardIcon dimensions={30} />;
          } else if (route.name === 'Feed') {
            return <FeedIcon dimensions={24} />;
          } else {
            return <ProfileIcon dimensions={30} />;
          }
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#999999',
      })}>
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function Onboarding() {
  return <Text>Hi</Text>;
}

function App(): JSX.Element {
  let onboarded = true;

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator initialRouteName={onboarded ? 'Home' : 'Onboarding'}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Challenge"
            component={Challenge}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
