import { View, Text, StyleSheet } from 'react-native';
import { Gate } from '../../../api/types';
import { Pressable } from 'react-native';
import { theme } from "../../../theme/theme"

type GateRowProps = {
  gate: Gate;
  onPress: () => void;
}

export function GateRow({ gate, onPress }: GateRowProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.row]}>
        <Text>{gate.name}</Text>
      </View >
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal:theme.spacing.sm,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 0.2,
    borderBottomColor: theme.colors.primary,
  },
});