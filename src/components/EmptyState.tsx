import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeType } from '../types';

interface EmptyStateProps {
  theme: ThemeType;
}

const EmptyState: React.FC<EmptyStateProps> = ({ theme }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="document-text-outline"
        size={64}
        color={theme.colors.placeholder}
      />
      <Text style={[styles.title, { color: theme.colors.text }]}>
        No Notes Yet
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.placeholder }]}>
        Add your first note by typing above
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default EmptyState;