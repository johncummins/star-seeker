import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GatesStack } from './GatesStack';
import CalculatorScreen from '../../features/calculator/screens/CalculatorScreen';
import RoutesScreen from '../../features/routes/screens/RoutesScreen';

export type RootTabParamList = {
  Gates: undefined;
  Calculator: undefined;
  Routes: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Gates" component={GatesStack} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
      <Tab.Screen name="Routes" component={RoutesScreen} />
    </Tab.Navigator>
  );
}


