import React, { Component } from 'react';
import {
  StyleSheet, View, Text, SafeAreaView, TouchableOpacity,
  Modal, Linking, FlatList, Image, ActivityIndicator, Animated,
  ImageBackground, Dimensions, ScrollView, TouchableHighlight
} from 'react-native';
import { DataTable } from 'react-native-paper';
import CustomHeader from './CustomHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, TextInput } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import renderIf from './renderIf';
import CheckBox from '@react-native-community/checkbox';
import { SwipeListView } from 'react-native-swipe-list-view';

const { width, height } = Dimensions.get('window');

export default class LocationTrasnportScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isLoading: false,
      data: [],
      modalFirstVisible: false,
      codeLocation: '',
      codeProduct: '',
      focus: true,
      modalSecondVisible: false,
      visible: false,
      visibleDelete: false,
      visibleTransport: false,
      qty: '',
      error: false
    }
  }

  getData = (barcode) => {
    this.setState({ isLoading: true });
    fetch(this.props.service + '/IfsTerminalService/Data/InventoryPartByBarcodeId/' + barcode, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer' + ' ' + this.props.token,
      }),
    })
      .then((response) => response.json()
      )
      .then((responsejson) => {
        if (responsejson == "") {
          alert("Veri Yok!");
          this.setState({
            isLoading: false,
            data: [],
          })
        }
        this.setState({
          isLoading: false,
          data: responsejson,
        })
      })
  }

  addItem = (item) => {
    const newData = this.state.listData;
    if (this.state.qty === '') {
      this.setState({ error: true })
    }
    else {
      item.qtyOnHand = this.state.qty;
      this.setState({
        listData: newData.concat(item),
        modalFirstVisible: false,

      })
    }
  }

  submitLocation = () => {
    this.secondTextInput.focus();
  }

  ifScanedLocation = e => {
    this.setState({ focus: false, codeLocation: e, })

  }

  ifScanedProduct = e => {
    this.setState({ codeProduct: e })
  }

  submitProduct = () => {
    this.getData(this.state.codeProduct);
  }

  ifScanedQty = e => {
    this.setState({ qty: e })
  }

  ifScanedTargetLocation = e => {
    this.setState({ codeProduct: e, isLoading: false, visible: true })
  }

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  deleteRow = (rowMap, rowKey) => {
    this.closeRow(rowMap, rowKey);
    const newData = [...this.state.listData];
    const prevIndex = newData.findIndex(
      item => item.key === rowKey
    );
    newData.splice(prevIndex, 1);
    this.setState({ listData: newData });
  };

  onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  renderItem = data => (
    <TouchableHighlight
      style={styles.rowFront}
      underlayColor={'#AAA'}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 2, alignItems: 'flex-start' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text> PART NO: </Text>
            <Text style={{ fontWeight: 'bold' }}> {data.item.partNo} </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text> MİKTAR: </Text>
            <Text style={{ fontWeight: 'bold' }}> {data.item.qtyOnHand} </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text> LOT NO: </Text>
            <Text style={{ fontWeight: 'bold' }}> {data.item.lotBatchNo} </Text>
          </View>
          <View>

          </View>
        </View>
        <View style={{ borderLeftWidth: 0.5, height: 'auto', color: '#872990' }}></View>
        <View style={{ flex: 2, }}>
          <View style={{ flexDirection: 'row' }}>
            <Text> PART NO: </Text>
            <Text style={{ fontWeight: 'bold' }}> {data.item.partNo} </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text> MİKTAR: </Text>
            <Text style={{ fontWeight: 'bold' }}> {data.item.qtyOnHand} </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text> LOT NO: </Text>
            <Text style={{ fontWeight: 'bold' }}> {data.item.lotBatchNo} </Text>
          </View>
          <View>

          </View>
        </View>
      </View>
    </TouchableHighlight>
  );

  renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* <Text>Left</Text> */}
      {/* <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => this.closeRow(rowMap, data.item.key)}
            >
                <Text style={styles.backTextWhite}>Close</Text>
            </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => this.deleteRow(rowMap, data.item.key)}
      >
        <Text style={styles.backTextWhite}>SİL</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <SafeAreaView >
        <ImageBackground
          source={require("../../assets/back222.png")}
          style={{ height: "100%", width: "100%" }}
        >
          {/**************************************************************** MODAL 1 *************************************************************************************************/}

          <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            swipeDirection="down"
            style={{ height: height, backgroundColor: "rgba(0,0,0,0.5)" }}
            transparent={false}
            visible={this.state.modalFirstVisible}
            onRequestClose={() => {
              this.setState({ modalFirstVisible: false });
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
                  onPress={() => this.setState({ modalFirstVisible: false })}
                >
                  <Icon
                    name='chevron-left'
                    color="white"
                    size={30}
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 11, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>
                  Barkod Okut
              </Text>
              </View>
              {/* <View style={{ flex: 1 }}></View> */}
            </View>

            <ScrollView>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{
                  marginTop: 10, marginLeft: 20, color: 'black',
                  fontWeight: 'bold'
                }}>Lokasyon Barkodu</Text>
                <TextInput
                  onChangeText={(text) => this.ifScanedLocation(text)}
                  onSubmitEditing={this.submitLocation.bind(this)}
                  value={this.state.codeLocation}
                  borderBottomColor="black"
                  returnKeyType="next"
                  autoFocus={this.state.focus}
                  blurOnSubmit={false}
                  placeholder="Lokasyon Barkodu..."
                  color="#872990"
                  style={{ height: 45, marginRight: 20, marginLeft: 20, marginBottom: 10, backgroundColor: 'none', fontSize: 14, borderBottomColor: 'black', color: '#872990' }}
                />
                <Text style={{
                  marginTop: 10, marginLeft: 20, color: 'black',
                  fontWeight: 'bold'
                }}>Malzeme Barkodu</Text>
                <TextInput
                  ref={(input) => { this.secondTextInput = input; }}
                  onSubmitEditing={this.submitProduct.bind(this)}
                  onChangeText={(text) => this.ifScanedProduct(text)}
                  value={this.state.codeProduct}
                  borderBottomColor="black"
                  placeholder="Malzeme Barkodu..."
                  color="#872990"
                  style={{ height: 45, marginRight: 20, marginLeft: 20, backgroundColor: 'none', fontSize: 14, borderBottomColor: 'black', color: '#872990' }}
                />
              </View>
              <View style={{ marginTop: 10, height: 'auto' }}>
                {!this.state.isLoading ?
                  <FlatList
                    style={{ marginBottom: 20, height: 'auto' }}
                    data={this.state.data}
                    keyExtractor={(id) => id}
                    renderItem={({ item }) => (
                      <View>
                        <View style={styles.card}>

                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={{ fontSize: 12, alignItems: 'flex-start', flex: 5 }}>MİKTAR:</Text>
                            <Text style={{ fontSize: 12, alignItems: 'flex-end', flex: 7 }}>{item.qtyOnHand}</Text>
                          </View>

                          <View style={styles.seperator} />

                          <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5 }}>
                            <Text style={{ fontSize: 12, alignItems: 'flex-start', flex: 5 }}>MALZEME KODU:</Text>
                            <Text style={{ fontSize: 12, alignItems: 'flex-end', flex: 7, fontWeight: 'bold' }}>{item.partNo}</Text>
                          </View>

                          <View style={styles.seperator} />

                          <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5 }}>
                            <Text style={{ fontSize: 12, alignItems: 'flex-start', flex: 5 }}>LOT NO:</Text>
                            <Text style={{ fontSize: 12, alignItems: 'flex-end', flex: 7, fontWeight: 'bold' }}>{item.lotBatchNo}</Text>
                          </View>

                          <View style={styles.seperator} />

                          <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5 }}>
                            <Text style={{ fontSize: 12, alignItems: 'flex-start', flex: 5 }}>SON KULLANMA TARİHİ:</Text>
                            <Text style={{ fontSize: 12, alignItems: 'flex-end', flex: 7, fontWeight: 'bold' }}>{item.expirationDate}</Text>
                          </View>

                          <View style={styles.seperator} />

                          <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 5 }}>
                            <Text style={{ fontSize: 12, alignItems: 'flex-start', flex: 5 }}>ESKİ KODU:</Text>
                            <Text style={{ fontSize: 12, alignItems: 'flex-end', flex: 7, fontWeight: 'bold' }}>{item.oldNo}</Text>
                          </View>
                        </View>
                        <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                          <Text style={{
                            marginTop: 10, color: 'black',
                            fontWeight: 'bold'
                          }}>Miktar</Text>
                          <TextInput
                            value={this.state.qty}
                            onChangeText={(text) => this.ifScanedQty(text)}
                            borderBottomColor="black"
                            autoFocus={true}
                            placeholder="Eklenecek Miktar..."
                            color="#872990"
                            style={{ height: 50, marginRight: 20, marginBottom: 0, backgroundColor: 'none', fontSize: 14, borderBottomColor: 'black', color: '#872990' }}
                          />
                          {this.state.error ?
                            <View style={{ justifyContent: 'center', marginTop: 5 }}>
                              <Text style={{ color: 'red' }}>MİKTAR GİRİN</Text>
                            </View>
                            : null
                          }
                        </View>

                        <View style={{ alignItems: 'center', marginBottom: 5 }}>

                        </View>
                        <View style={{
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>

                          <TouchableOpacity
                            onPress={() => { this.addItem(item) }}
                          >
                            <Image
                              source={require('../../assets/add.png')}
                              style={[
                                {
                                  width: 56,
                                  height: 56,

                                }
                              ]}
                            /></TouchableOpacity>
                        </View>
                      </View>
                    )}

                  />
                  : <ActivityIndicator size="small" color="#731873" style={{ marginTop: 20 }} />
                }

              </View>

            </ScrollView>
          </Modal>

          {/**************************************************************** MODAL 2 *************************************************************************************************/}

          <Modal
            animationType="slide"
            style={{ height: height, backgroundColor: "rgba(0,0,0,0.5)" }}
            transparent={false}
            visible={this.state.modalSecondVisible}
            onRequestClose={() => {
              this.setState({ modalSecondVisible: false });
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
                  onPress={() => this.setState({ modalSecondVisible: false })}
                >
                  <Icon
                    name='chevron-left'
                    color="white"
                    size={30}
                    style={{ marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 11, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>
                  Varış Lokasyonu
              </Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
            <View style={{ justifyContent: 'center' }}>

              <Text style={{
                marginTop: 10, marginLeft: 20, color: 'black',
                fontWeight: 'bold'
              }}>Varış Lokasyonu</Text>
              <TextInput
                onChangeText={(text) => { this.setState({ codeProduct: text, isLoading: false, visible: true }) }}
                borderBottomColor="black"
                autoFocus={true}
                placeholder="Varış Lokasyonu..."
                onKeyPress={this.handleKeyPress}
                color="#872990"
                style={{ height: 45, marginRight: 20, marginLeft: 20, marginBottom: 10, backgroundColor: 'none', fontSize: 14, borderBottomColor: 'black', color: '#872990' }}
              />
            </View>
            {renderIf(this.state.visible)(
              <View style={{
                opacity: 0.9,
                backgroundColor: '#FAFAFA',
                height: 150,

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
              }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>Bu lokasyona taşımak istediğinizden emin misiniz?</Text>
                <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto', marginBottom: 20, marginTop: 20 }}>

                  <View style={{ alignItems: 'flex-start' }}>
                    <TouchableOpacity
                      style={{
                        width: 80, height: 40, backgroundColor: 'none', alignItems: 'center', justifyContent: 'center', marginRight: 150,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 5,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 3.84,
                        elevation: 10,
                        backgroundColor: 'red',
                        borderRadius: 10
                      }}
                    >
                      <Text style={{ color: 'white' }}>HAYIR</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity
                      onPress={() => { this.setState({ modalSecondVisible: true }) }}
                      style={{
                        width: 80, height: 40, backgroundColor: 'none', alignItems: 'center', justifyContent: 'center',
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 5,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 3.84,
                        elevation: 10,
                        backgroundColor: '#2196F3',
                        borderRadius: 10
                      }}
                    >
                      <Text style={{ color: 'white' }}>TAŞI</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </Modal>

          {/**************************************************************** EKRAN *************************************************************************************************/}

          <CustomHeader isHome={false} title="Lokasyonlar Arası Taşıma" />
          <View style={{ alignItems: 'center', marginTop: 5, marginBottom: 20 }}>
            {/* <TouchableOpacity onPress={()=>{this.setState({modalVisible:true})}} ><Text>tıkla</Text></TouchableOpacity> */}
            <Text style={{
              color: 'yellow'
            }}>Barkodu Okutun...</Text>
            <Button
              onPress={() => { this.setState({ modalFirstVisible: true, codeLocation: '', codeProduct: '', data: [], qty: '', error: false }) }}
              style={{
                width: 120, height: 120, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'center', shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 1,
                shadowRadius: 3.84,
                elevation: 10,
                // paddingLeft:15
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
          <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
            {this.state.listData.length > 0 ?
              <View style={{ width: width, alignItems: 'center' }}>
                <View style={{ width: '80%' }}>
                  <TouchableOpacity
                    onPress={() => { this.setState({ modalSecondVisible: true }) }}
                    style={{
                      width: '100%', height: 40, backgroundColor: 'none', alignItems: 'center', justifyContent: 'center',
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 1,
                      shadowRadius: 3.84,
                      elevation: 10,
                      backgroundColor: '#2196F3',
                      borderRadius: 10
                    }}
                  >
                    <Text style={{ color: 'white' }}>TAŞI</Text>
                  </TouchableOpacity>
                </View>
                <View >
                  <Text style={{ color: "#872990", fontSize: 12, textAlign: 'center' }}>
                    Silmek için sola kaydırın...
              </Text>
                </View>
              </View>
              : null
            }
          </View>

          <View style={styles.container}>
            <SwipeListView
              data={this.state.listData}
              renderItem={this.renderItem}
              renderHiddenItem={this.renderHiddenItem}
              // renderSectionHeader={renderSectionHeader}
              // leftOpenValue={75}
              rightOpenValue={-75}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              // onRowDidOpen={this.onRowDidOpen}
              disableRightSwipe={true}

            />
          </View>
        </ImageBackground>
      </SafeAreaView>
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    paddingLeft: 10,
    backgroundColor: '#FAFAFA',
    borderColor: '#872990',
    borderBottomWidth: 0.5,
    borderRadius: 5,
    justifyContent: 'center',
    height: 65,
    marginTop: 3,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 3,

  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginLeft: 5,
    marginTop: 3,
    marginRight: 5,
    borderRadius: 5,
    borderColor: '#f2edf2',
    borderWidth: 0.5
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  card: {
    opacity: 0.9,
    backgroundColor: '#FAFAFA',
    height: 'auto',
    flex: 4,
    margin: 8,
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
    backgroundColor: "#FFF",
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

  },

});
