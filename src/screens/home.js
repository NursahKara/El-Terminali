import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import CustomHeader from './CustomHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    LogOut = async () => {
        try {
            await AsyncStorage.removeItem('token');
        } catch (e) {
            console.log(e);
        }
        Actions.login({ isLogout: true });
    }

    render() {
        return (
            <SafeAreaView>
                <ImageBackground
                    source={require("../../assets/header.png")}
                    style={{ width: width, height: "100%" }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            marginTop: 30,
                            alignItems: "center",
                            paddingHorizontal: 40,
                        }}
                    >
                        <Icon
                            name="sign-out"
                            size={30}
                            color="#fff"
                            style={{ marginLeft: '90%' }}
                            onPress={this.LogOut}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 20, marginTop: 10, }}>
                        <Text
                            style={{
                                fontSize: 30,
                                color: "white",
                                fontFamily: "RobotoBold",
                            }}
                        >
                            {this.props.username}

                        </Text>
                        <Text style={{
                            fontSize: 25,
                            color: "white",
                            fontFamily: "RobotoBold",
                        }}>
                            Hoşgeldin!
                        </Text>
                        <View style={{ marginLeft: 'auto', margin: 'auto' }}> 
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View
                                    style={{
                                        backgroundColor: "#FAFAFA",
                                        height: 180,
                                        width: 150,
                                        borderRadius: 15,
                                        borderColor: 'darkblue',
                                        shadowOffset: {
                                            width: 0,
                                            height: 5,
                                        },
                                        shadowOpacity: 1,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                        marginRight: 10,
                                        marginTop: 20,
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <TouchableOpacity onPress={() => Actions.stockQuery({ token: this.props.token, service: this.props.service })}>


                                        <View style={{ height: 130, width: 140, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                source={require("../../assets/dolu-bos.png")}
                                                style={{ width: 80, borderRadius: 10, height: 80 }}
                                            />
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: "row",
                                                width: 150,
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 5,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto'
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: "RobotoRegular",
                                                        fontSize: 12,
                                                        color: "#872990",
                                                        alignItems: 'center',
                                                        textAlign: 'center'

                                                    }}
                                                >
                                                    STOK SORGULAMA
                                                </Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: "#FAFAFA",
                                        height: 180,
                                        width: 150,
                                        borderRadius: 15,
                                        padding: 5,
                                        shadowOffset: {
                                            width: 0,
                                            height: 5,
                                        },
                                        shadowOpacity: 1,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                        marginRight: 5,
                                        marginTop: 20,
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <TouchableOpacity onPress={() => Actions.emptyLocation({ token: this.props.token, service: this.props.service })}>
                                        <View style={{ height: 130, width: 150, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                source={require("../../assets/boxes.png")}
                                                style={{ width: 80, borderRadius: 10, height: 80 }}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                width: 150,
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 5,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto'
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: "RobotoRegular",
                                                        fontSize: 12,
                                                        color: "#872990",
                                                        alignItems: 'center',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    AMBARDAKİ BOŞ LOKASYONLAR
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 200 }}>
                                <View
                                    style={{
                                        backgroundColor: "#FAFAFA",
                                        height: 180,
                                        width: 150,
                                        borderRadius: 15,
                                        padding: 5,
                                        shadowOffset: {
                                            width: 0,
                                            height: 5,
                                        },
                                        shadowOpacity: 1,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                        marginRight: 10,
                                        marginTop: 20,
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <TouchableOpacity onPress={() => Actions.locationQuery({ token: this.props.token, service: this.props.service })}>
                                        <View style={{ height: 130, width: 140, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                source={require("../../assets/truck.png")}
                                                style={{ width: 80, borderRadius: 10, height: 80 }}
                                            />
                                        </View>

                                        <View
                                            style={{
                                                flexDirection: "row",
                                                width: 150,
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    paddingVertical: 5,
                                                    paddingRight: 5,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto'
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: "RobotoRegular",
                                                        fontSize: 12,
                                                        color: "#872990",
                                                        alignItems: 'center',
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    LOKASYON SORGULAMA
                                                </Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        backgroundColor: "#FAFAFA",
                                        height: 180,
                                        width: 150,
                                        borderRadius: 15,
                                        padding: 5,

                                        marginRight: 5,
                                        marginTop: 20,
                                        alignItems: 'flex-end',
                                        shadowOffset: {
                                            width: 0,
                                            height: 5,
                                        },
                                        shadowOpacity: 1,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}
                                >
                                    <TouchableOpacity onPress={() => Actions.locationTransport({ token: this.props.token, service: this.props.service })}>
                                        <View style={{ height: 130, width: 150, alignItems: 'center', justifyContent: 'center' }}>
                                            <Image
                                                source={require("../../assets/locations.png")}
                                                style={{ width: 80, borderRadius: 10, height: 80 }}
                                            />
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                width: 150,
                                                alignItems: "center",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    paddingHorizontal: 15,
                                                    paddingVertical: 5,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto'
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: "RobotoRegular",
                                                        fontSize: 12,
                                                        color: "#872990",
                                                        alignItems: 'center',
                                                        textAlign: 'center'

                                                    }}
                                                >
                                                    LOKASYONLAR ARASI TAŞIMA
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>

        );
    }

}

