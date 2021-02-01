import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Button
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';
import { TypingAnimation } from 'react-native-typing-animation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from 'react-native-animatable';
import { ScrollView } from "react-native-gesture-handler";

const { height } = Dimensions.get('window');

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      typing_email: false,
      typing_password: false,
      typing_service: false,
      animation_login: new Animated.Value(width - 40),
      enable: true,
      username: '',
      password: '',
      data: [],
      dataSuccess: false,
      token: '',
      isLoading: false,
      isLoggedIn: true,
      name: '',
      service: '',
      serv: '',
      userNameData: '',
      userServiceData: '',
      tokenExpireDate: '',
      error:false
    }
  }

  componentDidMount() {
    this.readStore().then(() => {
      if (this.state.token != '' && !this.props.isLogout) {
        if (this.state.tokenExpireDate != '') {
          var datediff = Date.now() - new Date(this.state.tokenExpireDate);
          if (datediff < 86400000) {
            const { token, username, service } = this.state;
            this.setState({ isLoading: true })
            Actions.homee({ token: token, username: username, service: service });
          }
          else {
            this.setState({ isLoggedIn: false})
          }
        }
        else {
          this.setState({ isLoggedIn: false })
        }
      }
      else {
        this.setState({ isLoggedIn: false })
      }
    }
    );
  }

  _foucus(value) {
    if (value == "email") {
      this.setState({
        typing_email: true,
        typing_password: false,
        typing_service: false
      })
    }
    else if (value == "service") {
      this.setState({
        typing_email: false,
        typing_password: false,
        typing_service: true
      })
    }
    else {
      this.setState({
        typing_email: false,
        typing_password: true,
        typing_service: false
      })
    }
  }

  _typing() {
    return (
      <TypingAnimation
        dotColor="#93278f"
        style={{ marginRight: 25 }}
      />
    )
  }

  _animation() {
    Animated.timing(
      this.state.animation_login,
      {
        toValue: 40,
        duration: 250
      }
    ).start();
    // startsWith((str,word)=>{
    //   if(this.state.service.startsWith("http://"))
    //   {

    //     this.setState({})
    //   }
    // })
    setTimeout(() => {
      this.setState({
        enable: false,
        typing_email: false,
        typing_password: false,
        typing_service: false
      })
    }, 150);
  }

  fetchLogin = () => {
    if (this.state.username == undefined || this.state.password == undefined || this.state.service == undefined) {
      console.log("alanlar boş");
      this.setState({ isLoading: false });
      return;
    }
    this.storeServiceData();
    this.storeNameData();
    fetch(this.state.service + '/IfsTerminalService/Token/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'Username=' + this.state.username + '&Password=' + this.state.password
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('responseJson', responseJson);
        this.setState({ token: responseJson.token });
        const { token, username, service } = this.state;
        if (responseJson.token != undefined) {
          this.storeToken();
          Actions.homee({ token: token, username: username, service: service });
        }

      })
      .catch(this.setState({error:true})).finally(() => {
        this.setState({ isLoading: false });
      });
  }

  onLoginBtnPress = () => {
    this.setState({ isLoading: true });
    this.fetchLogin();
  }

  storeNameData = async () => {
    const { username } = this.state;
    try {
      await AsyncStorage.setItem('username', JSON.stringify(username));
    } catch (e) {
      console.log('', e)
    }
  }

  storeToken = async () => {
    const { token } = this.state;
    try {
      await AsyncStorage.setItem('token', JSON.stringify(token));
      await AsyncStorage.setItem('tokenExpireDate', JSON.stringify(Date.now()));
    } catch (e) {
      console.log('', e)
    }
  }

  storeServiceData = async () => {
    const { service } = this.state;
    try {
      await AsyncStorage.setItem('service', JSON.stringify(service));
    } catch (e) {
      console.log(e)
    }
  }

  readStore = async () => {
    try {
      const valueName = await AsyncStorage.getItem('username');
      const valueService = await AsyncStorage.getItem('service');
      const token = await AsyncStorage.getItem('token');
      const tokenExpireDate = await AsyncStorage.getItem('tokenExpireDate');
      const parsedToken = JSON.parse(token);
      const parsedValue = JSON.parse(valueName);
      const parsedValueS = JSON.parse(valueService);
      const parsedTokenExpireDate = JSON.parse(tokenExpireDate);
      console.info(parsedValue + " ~ " + parsedValueS + " ~ " + parsedTokenExpireDate + "\n" + parsedToken);
      if (parsedValue !== null) {
        this.setState({
          username: parsedValue
        })
      }
      if (parsedValueS !== null) {
        this.setState({
          service: parsedValueS,
        })
      }
      if (parsedToken !== null) {
        this.setState({
          token: parsedToken
        })
      }
      if (parsedTokenExpireDate !== null) {
        this.setState({
          tokenExpireDate: parsedTokenExpireDate
        })
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const width = this.state.animation_login;
    let { isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={{ marginTop: height / 2.25 }}>
          <ActivityIndicator size="large" animating color="#872990" />
        </View>
      )
    }
    else {
      return (

        <View style={{ flex: 1 }}>
          {!this.state.isLoggedIn ?
            <View style={styles.container}>
              <View style={styles.header}>
                <ImageBackground
                  source={require("../../assets/hdr.png")}
                  style={styles.imageBackground}
                >
                  <Text style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 30
                  }}>HOŞGELDİNİZ</Text>
                  <Text style={{
                    color: 'yellow'
                  }}>Devam etmek için giriş yapın.</Text>

                </ImageBackground>
              </View>

              <View style={styles.footer}>
                <ScrollView>
                  <Text style={[styles.title, {
                    marginTop: 20
                  }]}>Kullanıcı Adı</Text>
                  <View style={styles.action}>
                    <TextInput
                      placeholder="Kullanıcı Adınız.."
                      style={styles.textInput}
                      onFocus={() => this._foucus("email")}
                      defaultValue={this.state.username}
                      onChangeText={valuee =>
                        this.setState({ username: valuee })
                      }
                    />
                    {this.state.typing_email ?
                      this._typing()
                      : null}
                  </View>

                  <Text style={[styles.title, {
                    marginTop: 20
                  }]}>Şifre</Text>
                  <View style={styles.action}>
                    <TextInput
                      secureTextEntry
                      placeholder="Şifreniz.."
                      style={styles.textInput}
                      onFocus={() => this._foucus("password")}
                      onChangeText={valuee =>
                        this.setState({ password: valuee })
                      }
                    />
                    {this.state.typing_password ?
                      this._typing()
                      : null}
                  </View>
                  <Text style={[styles.title, {
                    marginTop: 20
                  }]}>Servis Url</Text>
                  <View style={styles.action}>
                    <TextInput
                      placeholder="Servis Url.."
                      style={styles.textInput}
                      onFocus={() => this._foucus("service")}
                      defaultValue={this.state.service}
                      onChangeText={valuee =>
                        this.setState({ service: valuee })
                      }
                    />
                    {this.state.typing_service ?
                      this._typing()
                      : null}
                  </View>
                  <View><Text style={{ fontSize: 10, color: 'green' }}>Örnek : http://192.168.10.20</Text></View>
                  {/* <TouchableOpacity
                    onPress={() => this._animation()}>
                    <View style={styles.button_container}>
                      <Animated.View style={[styles.animation, {
                        paddingLeft: 10, paddingRight: 10
                      }]}>
                        {this.state.enable ?
                          <Text style={{ fontSize: 12, color: 'white' }}>Test Et</Text>
                          :
                          <Animatable.View
                            animation="bounceIn"
                            delay={50}>
                            <FontAwesome
                              name="check"
                              color="white"
                              size={20}
                            />
                          </Animatable.View>
                        }
                      </Animated.View >
                    </View>
                  </TouchableOpacity> */}

                  <TouchableOpacity style={{
                    backgroundColor: '#93278f',
                    paddingVertical: 10,
                    marginTop: 15,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                    onPress={this.onLoginBtnPress.bind(this)}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={styles.textLogin}>Giriş</Text>
                    </View>
                  </TouchableOpacity>
                  {this.state.error ?
                  <View style={{alignItems:'center',justifyContent:'center',marginTop:5}}>
                    <Text style={{color:'red'}}>HATALI GİRİŞ</Text>
                  </View>
                   : null
                  }
                </ScrollView>
              </View>
            </View>
            : null}
        </View>
      )
    }
  }

}

const width = Dimensions.get("screen").width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
  },
  footer: {
    flex: 2,
    padding: 20
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: '100%'
  },
  title: {
    color: 'black',
    fontWeight: 'bold'
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  textInput: {
    flex: 1,
    marginTop: 5,
    paddingBottom: 5,
    color: 'gray'
  },
  button_container: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: -20
  },
  animation: {
    backgroundColor: '#93278f',
    paddingVertical: 5,
    marginTop: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
});