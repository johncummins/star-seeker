import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Screen from '../../../components/Screen';
import { theme } from '../../../theme/theme';
import { useGates } from '../../gates/hooks/useGates';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import { Gate } from '../../../api/types';
import { RoutesStackParamList } from '../../../app/navigation/RoutesStack';
import { GateRow } from '../../gates/components/GateRow';

type GatePickerRouteProp = RouteProp<RoutesStackParamList, 'GatePicker'>;

export default function GatePickerScreen() {
  const navigation = useNavigation();
  const route = useRoute<GatePickerRouteProp>();
  const { onSelect, title } = route.params;

  const { data: gates, isLoading, error } = useGates();

  const handleGateSelect = (gate: Gate) => {
    onSelect(gate);
    navigation.goBack();
  };

  if (isLoading && !gates) return <LoadingState message="Loading gates..." />;

  if (error && !gates) return <ErrorState message={error?.message || 'Failed to load gates'} />;

  return (
    <Screen>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={gates}
          keyExtractor={(gate) => gate.uuid}
          renderItem={({ item: gate }) => (
            <GateRow
              gate={gate}
              onPress={() => handleGateSelect(gate)}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No gates available</Text>
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: theme.spacing.md,
  },
  listContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.gray,
    textAlign: 'center',
    paddingVertical: theme.spacing.xl,
  },
});
