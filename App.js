import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Moviecollection from './tabs/Moviecollection';
import Home from './tabs/Home';
import Watchlist from './tabs/Watchlist'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Watchlist') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }
          else if (route.name === 'Moviecollection') {
            iconName = focused ? 'film' : 'film-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#3EFF8B',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#000'
        }
      })}>
        <Tab.Screen name="HomeScreen" component={Home} />
        <Tab.Screen name="Watchlist" component={Watchlist} />
        <Tab.Screen name="Moviecollection" component={Moviecollection} />
      </Tab.Navigator>


    </NavigationContainer>


  );
}
