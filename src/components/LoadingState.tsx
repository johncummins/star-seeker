import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { theme } from '../theme/theme'; 

type LoadingStateProps = {
  message?: string
}

export default function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});