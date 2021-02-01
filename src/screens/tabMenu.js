import React, { Component } from 'react';
import { Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home';
import { Actions } from 'react-native-router-flux';

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}
const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator();

const Tab = createBottomTabNavigator();

const StackApp = createStackNavigator();
export default class App extends Component {

  constructor(props) {
    super(props);
    console.log('tabmenu::::::::', this.props.token)

  }

  HomeStack() {
    return (
      <StackHome.Navigator initialRouteName="Home">
        <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler} />
      </StackHome.Navigator>
    )
  }

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Anasayfa') {
                iconName = focused
                  ? require('../../assets/remove.png')
                  : require('../../assets/user.png')
              } else if (route.name === 'Profil') {
                iconName = focused
                  ? require('../../assets/remove.png')
                  : require('../../assets/user.png')
              }

              return <Image source={iconName} style={{ width: 20, height: 20 }} resizeMode="contain" size={size} color={color} />;
            },
          })}
          tabBarComponent='TabBarBottomKeyboardAware'
          initialRouteName="Profil"
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'gray',
            style: {
              backgroundColor: 'white',
              borderTopWidth: 0,
              backgroundColor: '#FFFFFF',
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              height: 50,
              paddingBottom: 5,
            }
          }}>
          <Tab.Screen name="Anasayfa" component={this.HomeStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

}