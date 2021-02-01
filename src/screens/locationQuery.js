import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Modal, Linking, FlatList, Image, ActivityIndicator, ImageBackground, Dimensions, ART, ScrollView } from 'react-native';
import CustomHeader from './CustomHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, TextInput } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');
export default class LocationQueryScreen extends Component {

  constructor(props) {
    super(props);
    console.log('locationQuery', this.props.service)
    this.state = {
      modalVisible: false,
      locationNo: '',
      isLoading: false,
      data: [],
      tok: '',
      partNo: '',
      oldNo: ''
    }
  };

  ifScaned = () => {
    this.setState({ modalVisible: false })
    this.getData(this.state.locationNo);
  }
  
  handleKeyPress = e => {
    this.setState({ locationNo: e, isLoading: false })
  }

  getData = (locationNo) => {
    this.setState({ isLoading: true });
    fetch(this.props.service + '/IfsTerminalService/Data/LocationQuery/' + locationNo, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer' + ' ' + this.props.token,
      }),
    })
      .then((response) => response.json()
      )
      .then((responsejson) => {
        console.log('responsejson:', responsejson)
        if (responsejson == "") {
          alert("Veri Yok!");
          this.setState({
            isLoading: false,
            data: "",
            locationNo: '',
            oldNo: ''
          })
        }
        this.setState({
          isLoading: false,
          data: responsejson,
          locationNo: responsejson[0].locationNo,
        })
      })
  }

  render() {
    let { data } = this.state;
    return (
      <SafeAreaView>
        <ImageBackground
          source={require("../../assets/back222.png")}
          style={{ height: "100%", width: "100%" }}
        >
          <Modal
            animationType="slide"
            style={{ height: height, backgroundColor: "rgba(0,0,0,0.5)" }}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <View style={{
              flexDirection: 'row', height: 60, borderBottomWidth: 0.2, shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0,
              shadowRadius: 15,
              elevation: 1,
              backgroundColor: "#872990"
            }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => this.setState({ modalVisible: false })}
                >
                  <Icon
                    name='chevron-left'
                    color="white"
                    size={20}
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 11, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>
                  Barkod Okut
              </Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>

            <View style={{ marginTop: '5%', justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 12 }}>
                  <TextInput
                    onChangeText={(text) => this.handleKeyPress(text)}
                    value={this.state.locationNo}
                    onSubmitEditing={this.ifScaned.bind(this)}
                    borderBottomColor="black"
                    autoFocus={true}
                    placeholder="Barkodu Girin..."
                    color="#872990"
                    style={{ height: 45, marginRight: 20, marginLeft: 20, marginBottom: 10, backgroundColor: 'none', fontSize: 14, borderBottomColor: 'black', color: '#872990' }}
                  />
                </View>
              </View>

            </View>

          </Modal>
          <CustomHeader isHome={false} title="Lokasyon Sorgulama" />
          <View style={{ height: 'auto', marginBottom: 'auto' }}>
            <View style={{ alignItems: 'center', marginTop: 5, marginBottom: 20 }}>
              <Text style={{
                color: 'yellow'
              }}>Barkodu Okutun...</Text>
              <Button
                onPress={() => { this.setState({ modalVisible: true, locationNo: '' }) }}
                style={{
                  width: 120, height: 120, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'center', shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3.84,
                  elevation: 10,
                  paddingLeft: 15
                }}
                icon={({ size, color, direction }) => (
                  <Image
                    source={require('../../assets/barcode-scan-128.png')}
                    style={[
                      {
                        width: 45,
                        height: 45,
                      }
                    ]}
                  />
                )}>

              </Button>
            </View>
            {!this.state.isLoading ?
              <View>
                {this.state.data.length > 0 ?
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ marginTop: 20, marginLeft: 10 }}>LOKASYON NO : </Text><Text style={{ fontWeight: 'bold', marginTop: 20, }}> {this.state.locationNo}</Text>
                    </View>
                    <View style={{ marginBottom: 0, marginLeft: 5, marginTop: 30 }}>
                      <ScrollView style={{ height: height - 300, marginBottom: 20 }}>
                        <ScrollView
                          horizontal
                        >

                          <View>
                            <View style={{ flexDirection: 'row' }}>

                              <Text style={{ fontSize: 16, paddingLeft: 5, marginRight: 5 }}>SİTE:  </Text>
                            </View>
                            <View style={{ height: 0.5, backgroundColor: "#000", marginTop: 3, marginBottom: 3 }}></View>
                            <View style={{ flexDirection: 'row' }}>
                              <FlatList
                                style={{ marginRight: 5, paddingLeft: 5 }}
                                data={data}
                                keyExtractor={(id) => id}
                                pagingEnabled={true}
                                renderItem={({ item }) => (

                                  <View>
                                    <Text style={{ fontSize: 12, }}>{item.contract}</Text>
                                  </View>
                                )}
                              />
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>

                            </View>

                          </View>

                          <View>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>
                              <Text style={{ fontSize: 16, paddingLeft: 5, marginRight: 5 }}>PART NO:  </Text>

                            </View>
                            <View style={{ height: 0.5, backgroundColor: "#000", marginTop: 3, marginBottom: 3 }}></View>
                            <View style={{ flexDirection: 'row' }}>
                              <FlatList
                                style={{ marginRight: 5, paddingLeft: 5 }}
                                data={data}
                                keyExtractor={(id) => id}
                                pagingEnabled={true}
                                renderItem={({ item }) => (

                                  <View>
                                    <Text style={{ fontSize: 12 }}>{item.partNo}</Text>

                                  </View>
                                )}
                              />
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>
                            </View>
                          </View>

                          <View>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>
                              <Text style={{ fontSize: 16, paddingLeft: 5, marginRight: 5 }}>LOT NO:  </Text>

                            </View>
                            <View style={{ height: 0.5, backgroundColor: "#000", marginTop: 3, marginBottom: 3 }}></View>
                            <View style={{ flexDirection: 'row' }}>
                              <FlatList
                                style={{ marginRight: 5, paddingLeft: 5 }}
                                data={data}
                                keyExtractor={(id) => id}
                                pagingEnabled={true}
                                renderItem={({ item }) => (

                                  <View>
                                    <Text style={{ fontSize: 12 }}>{item.lotBatchNo}</Text>

                                  </View>
                                )}
                              />
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>
                            </View>
                          </View>

                          <View>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>
                              <Text style={{ fontSize: 16, paddingLeft: 5, marginRight: 5 }}>MİKTAR:  </Text>

                            </View>
                            <View style={{ height: 0.5, backgroundColor: "#000", marginTop: 3, marginBottom: 3 }}></View>
                            <View style={{ flexDirection: 'row' }}>
                              <FlatList
                                style={{ marginRight: 5, paddingLeft: 5 }}
                                data={data}
                                keyExtractor={(id) => id}
                                pagingEnabled={true}
                                renderItem={({ item }) => (

                                  <View>
                                    <Text style={{ fontSize: 12, textAlign: 'right' }}>{item.qtyOnHand}</Text>

                                  </View>
                                )}
                              />
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>
                            </View>
                          </View>

                          <View>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>
                              <Text style={{ fontSize: 16, paddingLeft: 5, marginRight: 5 }}>SON KULLANMA TARİHİ:  </Text>
                            </View>
                            <View style={{ height: 0.5, backgroundColor: "#000", marginTop: 3, marginBottom: 3 }}></View>
                            <View style={{ flexDirection: 'row' }}>
                              <FlatList
                                style={{ marginRight: 5, paddingLeft: 5 }}
                                data={data}
                                keyExtractor={(id) => id}
                                pagingEnabled={true}
                                renderItem={({ item }) => (
                                  <View>
                                    <Text style={{ fontSize: 12 }}>{item.expirationDate}</Text>
                                  </View>
                                )}
                              />
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>
                            </View>
                          </View>

                          <View>
                            <View style={{ flexDirection: 'row' }}>
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>
                              <Text style={{ fontSize: 16, paddingLeft: 5, marginRight: 5 }}>ESKİ KODU:  </Text>

                            </View>
                            <View style={{ height: 0.5, backgroundColor: "#000", marginTop: 3, marginBottom: 3 }}></View>
                            <View style={{ flexDirection: 'row' }}>
                              <FlatList
                                style={{ marginBottom: 20, marginRight: 5, paddingLeft: 5 }}
                                data={data}
                                keyExtractor={(id) => id}
                                pagingEnabled={true}
                                renderItem={({ item }) => (
                                  <View>
                                    <Text style={{ fontSize: 12 }}>{item.oldNo}</Text>
                                  </View>
                                )}
                              />
                              <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#DCDCDC' }}></View>
                            </View>
                          </View>
                        </ScrollView>
                      </ScrollView>
                    </View>
                  </View>
                  : null
                }
              </View>
              : <ActivityIndicator size="small" color="#731873" style={{ marginTop: 20 }} />}
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  card: {
    opacity: 0.9,
    backgroundColor: 'white',
    height: 'auto',
    flex: 4,
    margin: 8,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 15,
    borderColor: 'gray',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 10,
    padding: 20
  },
  seperator: {
    height: 0.5,
    backgroundColor: "#DCDCDC",
    marginTop: 3,
    marginBottom: 3
  },
  vl: {
    borderLeftColor: 'black',
    height: 500,
    position: "absolute",
    left: '50%',
    marginLeft: -3,
    top: 0,

  }
});









