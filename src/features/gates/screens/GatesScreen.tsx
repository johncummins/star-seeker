import { Text, FlatList, StyleSheet, View } from 'react-native';
import { useGates } from '../hooks/useGates';
import { GateRow } from '../components/GateRow';
import Screen from '../../../components/Screen'
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GatesStackParamList } from '../../../app/navigation/GatesStack';
import { theme } from '../../../theme/theme';

type NavigationProp = NativeStackNavigationProp<GatesStackParamList>;

export default function GatesScreen() {

  const navigation = useNavigation<NavigationProp>();

  const { data: gates, isLoading, error } = useGates();

  if (isLoading && !gates) return <LoadingState message='Loading Gates...'></LoadingState>

  if (error && !gates) return <ErrorState message={error?.message || 'Failed to load gates'}></ErrorState>

  return (
    <Screen>
      <View>
        <Text style={styles.heading}>Available Gates</Text>
        <Text style={styles.subtitle}>{gates?.length || 0} gate{gates?.length !== 1 ? 's' : ''} available</Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={gates}
          keyExtractor={(gate) => gate.uuid}
          renderItem={({ item: gate }) => (
            <GateRow
              gate={gate}
              onPress={() => navigation.navigate('GateDetails', { gateCode: gate.code })}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No gates available</Text>}
        />
      </View>
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
})