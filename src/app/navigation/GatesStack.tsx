import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GatesScreen from '../../features/gates/screens/GatesScreen';
import GateDetailsScreen from '../../features/gates/screens/GateDetailsScreen';

export type GatesStackParamList = {
  GatesList: undefined;
  GateDetails: { gateCode: string };
};

const Stack = createNativeStackNavigator<GatesStackParamList>();

export function GatesStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="GatesList" component={GatesScreen} />
      <Stack.Screen name="GateDetails" component={GateDetailsScreen} />
    </Stack.Navigator>
  );
}
