import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  SafeAreaView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Note } from '../types';
import { useBrightness } from '../hooks/useBrightness';
import { shareNote } from '../utils/noteUtils';
import { lightTheme, darkTheme } from '../theme/Theme';

import BrightnessControl from '../components/BrightnessControl';
import NoteInput from '../components/NoteInput';
import NoteItem from '../components/NoteItem';
import EmptyState from '../components/EmptyState';

const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');
  const theme = isDarkMode ? darkTheme : lightTheme;

  const [notes, setNotes] = useState<Note[]>([]);
  const { brightnessLevel, hasPermission, adjustBrightness } = useBrightness();

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleAddNote = (newNote: Note) => {
    setNotes(currentNotes => [newNote, ...currentNotes]);
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: theme.colors.background }
    ]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />

      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Ionicons name="journal-outline" size={24} color={theme.colors.primary} />
          <View style={styles.titleSpacer} />
          <Ionicons
            name="journal"
            size={24}
            color={theme.colors.primary}
          />
        </View>

        <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggle}>
          <Ionicons
            name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <BrightnessControl
          brightnessLevel={brightnessLevel}
          hasPermission={hasPermission}
          adjustBrightness={adjustBrightness}
          theme={theme}
        />

        <NoteInput onAddNote={handleAddNote} theme={theme} />

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteItem
              note={item}
              onShare={(note) => shareNote(note)}
              theme={theme}
            />
          )}
          contentContainerStyle={[
            styles.listContainer,
            notes.length === 0 && styles.emptyList
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState theme={theme} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleSpacer: {
    width: 8,
  },
  themeToggle: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  listContainer: {
    paddingBottom: 24,
  },
  emptyList: {
    flex: 1,
  },
});

export default HomeScreen;