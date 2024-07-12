import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './tabs/Home'
import Watchlist from './tabs/Watchlist'
import * as SplashScreen from 'expo-splash-screen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { store } from './src/redux/store'
import { Provider } from 'react-redux'
import Favourite from './tabs/Favourite'
import Logout from './tabs/Logout'
SplashScreen.preventAutoHideAsync()

export default function App() {
    const Tab = createBottomTabNavigator()
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName

                                if (route.name === 'HomeScreen') {
                                    iconName = focused ? 'home' : 'home-outline'
                                } else if (route.name === 'Watchlist') {
                                    iconName = focused
                                        ? 'bookmark'
                                        : 'bookmark-outline'
                                } else if (route.name === 'Favourite') {
                                    iconName = focused
                                        ? 'heart'
                                        : 'heart-outline'
                                } else if (route.name === 'Logout') {
                                    iconName = focused
                                        ? 'log-out'
                                        : 'log-out-outline'
                                }
                                return (
                                    <Ionicons
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    />
                                )
                            },
                            headerShown: false,
                            tabBarActiveTintColor: '#fff',
                            tabBarInactiveTintColor: '#3EFF8B',
                            tabBarShowLabel: false,
                            tabBarStyle: {
                                backgroundColor: '#000',
                            },
                        })}
                    >
                        <Tab.Screen name="HomeScreen" component={Home} />
                        <Tab.Screen name="Watchlist" component={Watchlist} />
                        <Tab.Screen name="Favourite" component={Favourite} />
                        <Tab.Screen name="Logout" component={Logout} />
                    </Tab.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView>
        </Provider>
    )
}
