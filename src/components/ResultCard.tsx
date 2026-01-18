import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

type ResultCardProps = {
  title: string;
  cost: string;
  breakdown?: string;
  label?: string;
};

export default function ResultCard({ title, cost, breakdown, label }: ResultCardProps) {
  return (
    <View>
      {label && <Text style={styles.resultLabel}>{label}</Text>}
      <View style={styles.resultCard}>
        <Text style={styles.resultTitle}>{title}</Text>
        <View style={styles.costSection}>
          <Text style={styles.resultCost}>{cost}</Text>
          {breakdown && (
            <Text style={styles.resultBreakdown}>{breakdown}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  resultTitle: {
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
