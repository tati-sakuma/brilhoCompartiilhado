import { useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import * as Brightness from 'expo-brightness';

export const useBrightness = () => {
  const [brightnessLevel, setBrightnessLevel] = useState<number>(0.5);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const initBrightness = async () => {
      try {
        if (Platform.OS === 'android') {
          const { status } = await Brightness.requestPermissionsAsync();
          setHasPermission(status === 'granted');

          if (status !== 'granted') {
            Alert.alert(
              'Permission Required',
              'This app needs permission to adjust screen brightness.'
            );
            return;
          }
        } else {
          setHasPermission(true);
        }

        const current = await Brightness.getBrightnessAsync();
        setBrightnessLevel(current);
      } catch (error) {
        console.error('Error initializing brightness control:', error);
        Alert.alert('Error', 'Could not access brightness control.');
      }
    };

    initBrightness();
  }, []);

  const adjustBrightness = async (value: number) => {
    setBrightnessLevel(value);
    if (hasPermission) {
      try {
        if (Platform.OS === 'android') {
          await Brightness.setSystemBrightnessAsync(value);
        } else {
          await Brightness.setBrightnessAsync(value);
        }
      } catch (error) {
        console.error('Error adjusting brightness:', error);
        Alert.alert('Error', 'Could not adjust brightness.');
      }
    }
  };

  return {
    brightnessLevel,
    hasPermission,
    adjustBrightness,
  };
};