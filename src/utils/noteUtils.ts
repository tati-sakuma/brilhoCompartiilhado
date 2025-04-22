import { Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Note } from '../types';

export const shareNote = async (note: Note) => {
  const uri = `${FileSystem.cacheDirectory}note-${note.id}.txt`;
  try {
    await FileSystem.writeAsStringAsync(uri, note.text, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    await Sharing.shareAsync(uri);
  } catch (error) {
    Alert.alert('Error sharing', (error as Error).message);
  }
};