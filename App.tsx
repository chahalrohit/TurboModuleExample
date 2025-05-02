import React, {useEffect} from 'react';
import {
  NativeModules,
  View,
  Text,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
const {CalendarModule} = NativeModules;

CalendarModule.createCalendarEvent('Meeting', 'Zoom').then((result: any) => {
  console.log(result); // Should print success message
});

const App: React.FC = () => {
  useEffect(() => {
    requestCalendarPermission();
  }, []);

  async function requestCalendarPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
        {
          title: 'Calendar Permission',
          message: 'This app needs access to your calendar to create events.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }

  const openCalendar = () => {
    CalendarModule.openCalendar()
      .then((res: any) => console.log(res))
      .catch((err: any) => console.warn(err));
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      <Text style={{fontSize: 20, color: '#fff'}}>Hello, World!</Text>
      <Text style={{fontSize: 20, color: '#fff'}}>
        This is a React Native app with native module integration.
      </Text>
      <TouchableOpacity
        onPress={openCalendar}
        style={{
          borderWidth: 1,
          borderColor: 'white',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text style={{color: '#fff'}}>Open Calender</Text>
      </TouchableOpacity>
    </View>
  );
};
export default App;
