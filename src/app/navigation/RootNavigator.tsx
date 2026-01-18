import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GatesStack } from './GatesStack';
import { RoutesStack } from './RoutesStack';
import CalculatorScreen from '../../features/calculator/screens/CalculatorScreen';
import { theme } from '../../theme/theme';

export type RootTabParamList = {
  Gates: undefined;
  Transport: undefined;
  Route: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          // setting so the tab content looks centered in the tab, may need testing on other devices
          paddingTop: theme.spacing.sm,
        },
      }}>
      <Tab.Screen name="Gates" component={GatesStack} />
      <Tab.Screen name="Transport" component={CalculatorScreen} />
      <Tab.Screen name="Route" component={RoutesStack} />
    </Tab.Navigator>
  );
}


