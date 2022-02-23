import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import { Provider } from 'react-redux';

import TabScreen from './screens/TabScreen'
import store from "./redux/store"
import DetailProduct from './screens/DetailProduct';
import Carts from './screens/Carts';
import Register from './screens/Register';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Login}>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Main' component={TabScreen} options={{ headerShown: false }} />
          <Stack.Screen name='DetailProduct' component={DetailProduct} options={{ headerShown: false }} />
          <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
