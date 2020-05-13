import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './components/Home'
import Signin from './components/Signin'
import SignUp from './components/Signup'

const StackMain = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();



const StackScreen = () => {
  return (
    <StackMain.Navigator>
      <StackMain.Screen name="SignIn" component={Signin} />
      <StackMain.Screen name="SignUp" component={SignUp} />
    </StackMain.Navigator>
  )
}

export default function App() {
  // const [token, setToken] = useState(null)
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='NeedHelp' component={Home} options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }} />
        <Tab.Screen name='Volunteer' component={StackScreen} options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }} />
      </Tab.Navigator>

    </NavigationContainer>
  );
}
