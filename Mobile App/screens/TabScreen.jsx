import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home';
import Order from './Order';
import Carts from './Carts';

const Tab = createBottomTabNavigator();
export default function TabScreen() {
  const tintColor = "#006600"

  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home}
          options={
            { 
              headerShown: false,
              tabBarActiveTintColor: tintColor,
              tabBarIcon:(tabInfo)=>{
                return(
                  <AntDesign name="home" size={24} color={tabInfo.focused ? "#006600" : "#8e8e93"} />
                )
              }
            }
          }
        /> 
        <Tab.Screen name='Cart' component={Carts} 
          options={
            { 
              tabBarActiveTintColor: "#006600",
              tabBarIcon:(tabInfo)=>{
                return(
                  <AntDesign name="shoppingcart" size={24} color={tabInfo.focused ? "#006600" : "#8e8e93"}/>
                )
              }
            }
          }
        /> 
        <Tab.Screen name='Order' component={Order} 
          options={
            { 
              tabBarActiveTintColor: "#006600",
              tabBarIcon:(tabInfo)=>{
                return(
                  <FontAwesome name="history" size={24} color={tabInfo.focused ? "#006600" : "#8e8e93"}/>
                )
              }
            }
          }
        /> 
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})