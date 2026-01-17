import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

export function RootNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Placeholder} />
    </Tab.Navigator>
  );
}

function Placeholder() {
  return (
    <View>
      <Text>Placeholder</Text>
    </View>
  );
}
