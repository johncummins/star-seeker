import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import Screen from '../../../components/Screen';
import { theme } from '../../../theme/theme';
import { useTransport } from '../hooks/useTransport';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';

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
      <Text style={styles.heading}>Journey Cost Calculator</Text>
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

            <TouchableOpacity
              style={[styles.button, !hasAllInputs && styles.buttonDisabled]}
              onPress={handleCalculate}
              disabled={!hasAllInputs || isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Calculating...' : 'Calculate'}
              </Text>
            </TouchableOpacity>
          </View>

          {isLoading && <LoadingState message="Calculating..." />}

          {error && <ErrorState message={error?.message || 'Failed to calculate transport cost'} />}

          {transportData && !isLoading && !error && (
            <View>
              <Text style={styles.resultLabel}>Cheapest Option</Text>
              <View style={styles.resultCard}>
                <Text style={styles.resultVehicle}>{transportData.recommendedTransport.name}</Text>
                <View style={styles.costSection}>
                  <Text style={styles.resultCost}>{transportData.currency} {totalCost?.toFixed(2)}</Text>
                  <Text style={styles.resultBreakdown}>
                    Journey: {transportData.currency} {transportData.journeyCost.toFixed(2)} • Parking: {transportData.currency} {transportData.parkingFee.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
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
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray,
    opacity: 0.5,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.gray,
    marginBottom: theme.spacing.sm,
  },
  resultCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  resultVehicle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  costSection: {
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderLight,
  },
  resultCost: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: theme.spacing.xs,
  },
  resultBreakdown: {
    fontSize: 13,
    color: theme.colors.gray,
    lineHeight: 18,
  },
});
