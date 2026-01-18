import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Keyboard, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Screen from '../../../components/Screen';
import { theme } from '../../../theme/theme';
import { useRoute } from '../hooks/useRoute';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import ResultCard from '../../../components/ResultCard';
import Button from '../../../components/Button';
import { Gate } from '../../../api/types';
import { RoutesStackParamList } from '../../../app/navigation/RoutesStack';

type NavigationProp = NativeStackNavigationProp<RoutesStackParamList>;

export default function RoutesScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [fromGate, setFromGate] = useState<Gate | null>(null);
  const [toGate, setToGate] = useState<Gate | null>(null);
  const [shouldCalculate, setShouldCalculate] = useState(false);

  const { data: route, isLoading: routeLoading, error: routeError } = useRoute({
    fromGateCode: fromGate?.code || '',
    toGateCode: toGate?.code || '',
    enabled: shouldCalculate,
  });

  const handleCalculate = () => {
    Keyboard.dismiss();
    if (fromGate && toGate && fromGate.code !== toGate.code) {
      setShouldCalculate(true);
    }
  };

  const openGatePicker = (type: 'from' | 'to') => {
    navigation.navigate('GatePicker', {
      title: `Select ${type === 'from' ? 'Start' : 'End'} Gate`,
      onSelect: (gate: Gate) => {
        if (type === 'from') {
          setFromGate(gate);
        } else {
          setToGate(gate);
        }
        setShouldCalculate(false);
      },
    });
  };

  const hasBothGates = !!fromGate && !!toGate && fromGate.code !== toGate.code;

  return (
    <Screen>
      <Text style={styles.heading}>Cheapest Route Finder</Text>
      <Text style={styles.subtitle}>Find the cheapest route between gates</Text>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Start Gate</Text>
            <Pressable
              style={styles.gateSelector}
              onPress={() => openGatePicker('from')}
            >
              <Text style={styles.gateSelectorText}>
                {fromGate ? `${fromGate.name} (${fromGate.code})` : 'Select gate'}
              </Text>
            </Pressable>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>End Gate</Text>
            <Pressable
              style={styles.gateSelector}
              onPress={() => openGatePicker('to')}
            >
              <Text style={styles.gateSelectorText}>
                {toGate ? `${toGate.name} (${toGate.code})` : 'Select gate'}
              </Text>
            </Pressable>
          </View>

          <Button
            onPress={handleCalculate}
            disabled={!hasBothGates}
            loading={routeLoading}
            label="Find Route"
          />
        </View>

        {routeLoading && <LoadingState message="Calculating route..." />}

        {routeError && <ErrorState message={routeError?.message || 'Failed to calculate route'} />}

        {route && !routeLoading && !routeError && (
          <ResultCard
            label="Cheapest Route"
            title={`${route.from.code} to ${route.to.code}`}
            cost={`£${route.totalCost}`}
            breakdown={`Route: ${route.route.join(' - ')}`}
          />
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.gray,
    fontWeight: '500',
    marginBottom: theme.spacing.xl,
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    marginBottom: theme.spacing.xl,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  gateSelector: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  gateSelectorText: {
    fontSize: 16,
  },
});
