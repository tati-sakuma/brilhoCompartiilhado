import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Brightness from 'expo-brightness';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

type Nota = {
  id: string;
  texto: string;
};

const App: React.FC = () => {
  const [nivelBrilho, setNivelBrilho] = useState<number>(0.5);
  const [textoNota, setTextoNota] = useState<string>('');
  const [notas, setNotas] = useState<Nota[]>([]);
  const [temPermissao, setTemPermissao] = useState<boolean>(false);

  // Pedir permissão e carregar brilho inicial
  useEffect(() => {
    (async () => {
      try {
        // Verificar se precisa de permissão (apenas necessário no Android)
        if (Platform.OS === 'android') {
          const { status } = await Brightness.requestPermissionsAsync();
          setTemPermissao(status === 'granted');
          
          if (status !== 'granted') {
            Alert.alert(
              'Permissão necessária',
              'O aplicativo precisa de permissão para ajustar o brilho da tela.'
            );
            return;
          }
        } else {
          // iOS não precisa de permissão explícita
          setTemPermissao(true);
        }
        
        // Se tem permissão, obter o brilho atual
        const atual = await Brightness.getBrightnessAsync();
        setNivelBrilho(atual);
      } catch (error) {
        console.error('Erro ao inicializar o controle de brilho:', error);
        Alert.alert('Erro', 'Não foi possível acessar o controle de brilho.');
      }
    })();
  }, []);

  // Ajusta brilho
  const ajustarBrilho = async (valor: number) => {
    setNivelBrilho(valor);
    if (temPermissao) {
      try {
        // No Android, use o brilho do sistema. No iOS pode usar o brilho do app
        if (Platform.OS === 'android') {
          await Brightness.setSystemBrightnessAsync(valor);
        } else {
          await Brightness.setBrightnessAsync(valor);
        }
      } catch (error) {
        console.error('Erro ao ajustar brilho:', error);
        Alert.alert('Erro', 'Não foi possível ajustar o brilho.');
      }
    }
  };

  // Adiciona nova nota
  const adicionarNota = () => {
    if (!textoNota.trim()) {
      Alert.alert('Erro', 'Digite algo para salvar a nota.');
      return;
    }
    const nova: Nota = {
      id: Date.now().toString(),
      texto: textoNota.trim(),
    };
    setNotas([nova, ...notas]);
    setTextoNota('');
  };

  // Compartilha uma nota
  const compartilharNota = async (nota: Nota) => {
    const uri = `${FileSystem.cacheDirectory}nota-${nota.id}.txt`;
    try {
      await FileSystem.writeAsStringAsync(uri, nota.texto, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert('Erro ao compartilhar', (error as Error).message);
    }
  };

  // Renderiza cada item
  const renderItem = ({ item }: { item: Nota }) => (
    <View style={styles.notaContainer}>
      <Text style={styles.notaTexto}>{item.texto}</Text>
      <TouchableOpacity
        style={styles.botaoCompartilhar}
        onPress={() => compartilharNota(item)}
      >
        <Text style={styles.botaoTexto}>Compartilhar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Controle de Brilho */}
      <Text style={styles.titulo}>Brilho: {(nivelBrilho * 100).toFixed(0)}%</Text>
      <Slider
        style={{ width: '90%', height: 40 }}
        minimumValue={0}
        maximumValue={1}
        value={nivelBrilho}
        onValueChange={ajustarBrilho}
        disabled={!temPermissao}
      />
      {!temPermissao && (
        <Text style={styles.avisoPermissao}>
          Sem permissão para ajustar o brilho
        </Text>
      )}

      {/* Input de Nova Nota */}
      <TextInput
        style={styles.input}
        placeholder="Digite sua nota aqui"
        value={textoNota}
        onChangeText={setTextoNota}
      />
      <Button title="Adicionar Nota" onPress={adicionarNota} />

      {/* Lista de Notas */}
      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50, // Para evitar sobreposição com a barra de status
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 8,
    marginVertical: 16,
    width: '100%',
  },
  notaContainer: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  notaTexto: {
    fontSize: 14,
    marginBottom: 8,
  },
  botaoCompartilhar: {
    alignSelf: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 12,
  },
  avisoPermissao: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default App;