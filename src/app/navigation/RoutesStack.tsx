import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoutesScreen from '../../features/routes/screens/RoutesScreen';
import GatePickerScreen from '../../features/routes/screens/GatePickerScreen';
import { Gate } from '../../api/types';

export type RoutesStackParamList = {
  RoutesList: undefined;
  GatePicker: {
    onSelect: (gate: Gate) => void;
    title: string;
  };
};

const Stack = createNativeStackNavigator<RoutesStackParamList>();

export function RoutesStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="RoutesList" component={RoutesScreen} />
      <Stack.Screen name="GatePicker" component={GatePickerScreen} />
    </Stack.Navigator>
  );
}
