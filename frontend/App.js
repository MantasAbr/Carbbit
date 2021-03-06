import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomNavbar from './navigation/BottomNavbar';
import useLinking from './navigation/useLinking';

import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

import LanguageScreen from './screens/Settings_children_screens/LanguageScreen';
import AboutScreen from './screens/Settings_children_screens/AboutScreen';
import UserAccountScreen from './screens/Settings_children_screens/UserAccountScreen';
import NewPostScreen from './screens/PostScreen';
import NotificationsScreen from './screens/NotificationsScreen';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'titillium-web': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
    
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
            <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
            <Stack.Screen options={{headerShown: false}} name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Root" component={BottomNavbar}/>

            {/* Šitam kitam langui ir visiems kitiems children screen'ams reiktų sukurti atskirą stack navigatorių iš parent elemento*/}
            {/* Kol kas juos įdedu čia*/}
            {/* Šitie pastarieji turėtų priklausyti SettingsScreen parent'ui*/}
            <Stack.Screen options={{headerShown: false}} name="LanguageSettings" component={LanguageScreen}/>
            <Stack.Screen options={{headerShown: false}} name="AboutScreen" component={AboutScreen}/>
            <Stack.Screen options={{headerShown: false}} name="UserAccountScreen" component={UserAccountScreen}/>
            <Stack.Screen options={{headerShown: false}} name="Post" component={NewPostScreen}/>
            <Stack.Screen options={{headerShown: false}} name="Notifications" component={NotificationsScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});