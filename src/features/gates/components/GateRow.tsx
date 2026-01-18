import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Gate } from '../../../api/types';
import { theme } from "../../../theme/theme"

type GateRowProps = {
  gate: Gate;
  onPress: () => void;
}

export function GateRow({ gate, onPress }: GateRowProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.content}>
          <Text style={styles.name}>{gate.name}</Text>
          <Text style={styles.code}>{gate.code}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: {
    gap: theme.spacing.xs,
  },
  name: {
    fontSize: 17,
    fontWeight: '500',
  },
  code: {
    fontSize: 14,
    color: theme.colors.gray,
    fontWeight: '500',
  },
});