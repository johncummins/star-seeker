import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import Screen from '../../../components/Screen';
import { theme } from '../../../theme/theme';
import { useTransport } from '../hooks/useTransport';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import ResultCard from '../../../components/ResultCard';
import Button from '../../../components/Button';

export default function CalculatorScreen() {
  const [distance, setDistance] = useState('');
  const [passengers, setPassengers] = useState('');
  const [parking, setParking] = useState('');
  const [shouldCalculate, setShouldCalculate] = useState(false);

  const { data: transportData, isLoading, error } = useTransport({
    distance: parseFloat(distance) || 0,
    passengers: parseInt(passengers) || 0,
    parking: parseInt(parking) || 0,
    enabled: shouldCalculate,
  });

  const handleCalculate = () => {
    Keyboard.dismiss();
    if (distance && passengers && parking) {
      setShouldCalculate(true);
    }
  };

  const totalCost = transportData ? transportData.journeyCost + transportData.parkingFee : null;
  const hasAllInputs = !!distance && !!passengers && !!parking;

  return (
    <Screen>
      <Text style={styles.heading}>Transport Cost Calculator</Text>
      <Text style={styles.subtitle}>Calculate the cheapest transport option</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Distance (AU)</Text>
              <TextInput
                style={styles.input}
                value={distance}
                onChangeText={setDistance}
                placeholder="0"
                keyboardType="decimal-pad"
                onFocus={() => setShouldCalculate(false)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Passengers</Text>
              <TextInput
                style={styles.input}
                value={passengers}
                onChangeText={setPassengers}
                placeholder="0"
                keyboardType="number-pad"
                onFocus={() => setShouldCalculate(false)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Parking Days</Text>
              <TextInput
                style={styles.input}
                value={parking}
                onChangeText={setParking}
                placeholder="0"
                keyboardType="number-pad"
                onFocus={() => setShouldCalculate(false)}
              />
            </View>

            <Button
              onPress={handleCalculate}
              disabled={!hasAllInputs}
              loading={isLoading}
              label="Calculate"
            />
          </View>

          {isLoading && <LoadingState message="Calculating..." />}

          {error && <ErrorState message={error?.message || 'Failed to calculate transport cost'} />}

          {transportData && !isLoading && !error && (
            <ResultCard
              label="Cheapest Option"
              title={transportData.recommendedTransport.name}
              cost={`${transportData.currency} ${totalCost?.toFixed(2)}`}
              breakdown={`Journey: ${transportData.currency} ${transportData.journeyCost.toFixed(2)} | Parking: ${transportData.currency} ${transportData.parkingFee.toFixed(2)}`}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
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
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: 16,
  },
});
