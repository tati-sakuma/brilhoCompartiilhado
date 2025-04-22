import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { ThemeType } from '../types';

interface BrightnessControlProps {
  brightnessLevel: number;
  hasPermission: boolean;
  adjustBrightness: (value: number) => void;
  theme: ThemeType;
}

const BrightnessControl: React.FC<BrightnessControlProps> = ({
  brightnessLevel,
  hasPermission,
  adjustBrightness,
  theme,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons
          name="sunny"
          size={24}
          color={theme.colors.primary}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {(brightnessLevel * 100).toFixed(0)}%
        </Text>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={brightnessLevel}
        onValueChange={adjustBrightness}
        disabled={!hasPermission}
        minimumTrackTintColor={theme.colors.primary}
        maximumTrackTintColor={theme.colors.border}
        thumbTintColor={theme.colors.accent}
      />

      {!hasPermission && (
        <Text style={[styles.permissionWarning, { color: theme.colors.error }]}>
          No permission to adjust brightness
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  permissionWarning: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});

export default BrightnessControl;