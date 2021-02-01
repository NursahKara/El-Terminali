import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
export default class SplashScreen extends Component {
    componentDidMount() {
        setTimeout(function(){ 
            Actions.login();
         }, 3000);
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#872990'}}>
                <ImageBackground
                    source={require("../../assets/ifslogo.jpg")}
                    style={styles.imageBackground} ></ImageBackground>
            </View>
        )
    }
    
}
var styles = StyleSheet.create({
    imageBackground: {
        width: 100,
        height: 100,
    }
});