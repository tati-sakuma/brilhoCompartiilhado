import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Note, ThemeType } from '../types';

interface NoteInputProps {
  onAddNote: (note: Note) => void;
  theme: ThemeType;
}

const NoteInput: React.FC<NoteInputProps> = ({ onAddNote, theme }) => {
  const [noteText, setNoteText] = useState<string>('');

  const handleAddNote = () => {
    if (!noteText.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      text: noteText.trim(),
      timestamp: Date.now(),
    };

    onAddNote(newNote);
    setNoteText('');
    Keyboard.dismiss();
  };

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.md,
        borderColor: theme.colors.border,
      }
    ]}>
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder="Write a note..."
        placeholderTextColor={theme.colors.placeholder}
        value={noteText}
        onChangeText={setNoteText}
        multiline
      />
      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: noteText.trim() ? theme.colors.primary : theme.colors.border,
            borderRadius: theme.borderRadius.sm,
          }
        ]}
        onPress={handleAddNote}
        disabled={!noteText.trim()}
      >
        <Ionicons name="send" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  addButton: {
    marginLeft: 12,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NoteInput;