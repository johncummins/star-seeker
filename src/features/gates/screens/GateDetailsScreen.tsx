import { View, Text, StyleSheet } from 'react-native';
import Screen from '../../../components/Screen';
import { theme } from '../../../theme/theme';
import { useRoute, RouteProp } from '@react-navigation/native';
import { GatesStackParamList } from '../../../app/navigation/GatesStack';
import { useGate } from '../hooks/useGate';
import LoadingState from '../../../components/LoadingState';
import ErrorState from '../../../components/ErrorState';
import type { GateLink } from '../../../api/types'

type GateDetailsRouteProp = RouteProp<GatesStackParamList, 'GateDetails'>;

export default function GateDetailsScreen() {
  const route = useRoute<GateDetailsRouteProp>();

  const { gateCode } = route.params;

  const { data: gate, isLoading, error } = useGate(gateCode);

  //Only shows when no cahced data
  if (isLoading && !gate) return <LoadingState message="Loading gate..." />;

  if (!gate) return <ErrorState message={error?.message || "Failed to load gate"} />;

  return (
    <Screen>
      <View>
        <Text style={styles.title}>{gate.name}</Text>
        <Text style={styles.code}>{gate.code}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Connections</Text>
        {!gate.links || gate.links.length === 0 ? (
          <Text>No connections available.</Text>
        ) : (
          <View style={styles.chips}>
            {gate.links?.map((link: GateLink) => (
              <View key={link.code} style={styles.chip}>
                <Text style={styles.chipText}>
                  {link.code}{link.hu ? ` - ${link.hu} HU` : ''}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

    </Screen>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  code: {
    marginBottom: theme.spacing.md,
    color: theme.colors.gray,
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary + '20',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.primary,
  },
});

