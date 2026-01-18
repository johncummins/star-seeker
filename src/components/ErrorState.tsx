import { Text, View, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

type ErrorStateProps = {
  message?: string
}

export default function ErrorState({ message = "Something went wrong" }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Couldn’t load</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    textAlign: 'center',
  },
});