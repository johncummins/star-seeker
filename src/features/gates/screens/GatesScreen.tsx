import { Text, FlatList, StyleSheet } from 'react-native';
import { useGates } from '../hooks/useGates';
import { GateRow } from '../components/GateRow';
import Screen from '../../../components/Screen'
import { theme } from '../../../theme/theme'

export default function GatesScreen() {

  const { data: gates, isLoading, error, refetch } = useGates();

  // to do: have a proper loading component
  if (isLoading) {
    return <Text>Loading gates…</Text>;
  }

  // to do: have a proper error component
  if (error) {
    return <Text>Failed to load gates</Text>;
  }

  return (
    <Screen>
      <FlatList
        data={gates}
        keyExtractor={(gate) => gate.uuid}
        renderItem={({ item: gate }) => (
          <GateRow
            gate={gate}
            onPress={() => console.log(gate.uuid)}
          />
        )}
        ListHeaderComponent={
          <Text style={styles.heading}>Available Gates</Text>
        }
        ListEmptyComponent={<Text>No gates available</Text>}
      />
    </Screen>
  );
}


const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'medium',
  }
})