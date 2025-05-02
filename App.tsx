import React from 'react';
import {NativeModules, View, Text} from 'react-native';
const {CalendarModule} = NativeModules;

CalendarModule.createCalendarEvent('Meeting', 'Zoom').then((result: any) => {
  console.log(result); // Should print success message
});

const App: React.FC = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20}}>Hello, World!</Text>
      <Text style={{fontSize: 20}}>
        This is a React Native app with native module integration.
      </Text>
      <Text style={{fontSize: 20}}>
        Check the console for calendar event creation status.
      </Text>
      <Text style={{fontSize: 20}}>
        Make sure to run the app on a real device or simulator.
      </Text>
      <Text style={{fontSize: 20}}>Enjoy coding!</Text>
      <Text style={{fontSize: 20}}>
        This is a simple example of using native modules in React Native.
      </Text>
      <Text style={{fontSize: 20}}>
        You can create calendar events using the native module.
      </Text>
    </View>
  );
};
export default App;
