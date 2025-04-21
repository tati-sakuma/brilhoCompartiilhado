import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Brightness from 'expo-brightness';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const App: React.FC = () => {
  const [nivelBrilho, setNivelBrilho] = useState<number>(0.5);

  // Lê o brilho atual ao montar
  useEffect(() => {
    (async () => {
      const atual = await Brightness.getBrightnessAsync();
      setNivelBrilho(atual);
    })();
  }, []);

  // Ajusta o brilho do sistema
  const ajustarBrilho = async (valor: number): Promise<void> => {
    setNivelBrilho(valor);
    await Brightness.setBrightnessAsync(valor);
  };

  // Gera um arquivo de texto e compartilha
  const compartilharTexto = async (): Promise<void> => {
    const conteudo = "Olá! Testando compartilhamento via Expo Sharing.";
    const uri = `${FileSystem.cacheDirectory}meu-texto.txt`;
    try {
      await FileSystem.writeAsStringAsync(uri, conteudo, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert('Erro ao compartilhar', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Controle de Brilho</Text>
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={nivelBrilho}
        onValueChange={ajustarBrilho}
      />
      <Text>Brilho: {(nivelBrilho * 100).toFixed(0)}%</Text>

      <View style={styles.separator} />

      <Text style={styles.titulo}>Compartilhar Conteúdo</Text>
      <Button title="Compartilhar Texto" onPress={compartilharTexto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'stretch',
    marginVertical: 24,
  },
});

export default App;
