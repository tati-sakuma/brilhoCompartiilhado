import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Note, ThemeType } from '../types';

interface NoteItemProps {
  note: Note;
  onShare: (note: Note) => void;
  theme: ThemeType;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onShare, theme }) => {
  const date = new Date(note.timestamp);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.md,
        borderColor: theme.colors.border,
      }
    ]}>
      <Text style={[styles.noteText, { color: theme.colors.text }]}>
        {note.text}
      </Text>

      <View style={styles.footer}>
        <Text style={[styles.timestamp, { color: theme.colors.placeholder }]}>
          {formattedDate}
        </Text>

        <TouchableOpacity
          style={[
            styles.shareButton,
            { backgroundColor: theme.colors.primary }
          ]}
          onPress={() => onShare(note)}
        >
          <Ionicons name="share-outline" size={16} color="#ffffff" />
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noteText: {
    fontSize: 16,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  shareText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default NoteItem;