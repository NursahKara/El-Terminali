import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginScreen from './screens/login';
import StockQueryScreen from './screens/stockQuery';
import EmptyLocationScreen from './screens/emptyLocation';
import HomeScreen from './screens/home';
import TabMenu from './screens/tabMenu';
import LocationTransportScreen from './screens/locationTransport';
import LocationQueryScreen from './screens/locationQuery';
import SplashScreen from './screens/splashScreen';

const RouterComp = () => {
    return (
        <Router titleStyle={{ color: '#000' }}  >
            <Scene key='root' hideNavBar={true}>
                <Scene key='main'>
                    {/* <Scene key='splash'
                        component={SplashScreen}
                        title='Splash'
                        hideNavBar={true}
                        animation='fade'
                        
                    /> */}
                    <Scene key='login'
                        component={LoginScreen}
                        title='Giriş'
                        hideNavBar={true}
                        animation='fade'
                        initial
                    />
                    <Scene key='stockQuery'
                        component={StockQueryScreen}
                        title='Stok Sorgulama'
                        animation='fade'
                        hideNavBar={true}
                    />
                    <Scene key='emptyLocation'
                        component={EmptyLocationScreen}
                        title='Detaylar'
                        animation='fade'
                        hideNavBar={true}
                    />
                    <Scene key='homee'
                        component={HomeScreen}
                        title='Anasayfa'
                        animation='fade'
                        hideNavBar={true}

                    />
                    <Scene key='locationTransport'
                        component={LocationTransportScreen}
                        title='Anasayfa'
                        animation='fade'
                        hideNavBar={true}

                    />
                    <Scene key='locationQuery'
                        component={LocationQueryScreen}
                        title='Anasayfa'
                        animation='fade'
                        hideNavBar={true}

                    />
                </Scene>
            </Scene>
        </Router>
    )
}
export default RouterComp