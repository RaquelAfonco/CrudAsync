import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [turno, setTurno] = useState('');
  const [curso, setCurso] = useState('');
  const [editando, setEditando] = useState(false);
  const [alunoSendoEditado, setAlunoSendoEditado] = useState(null);

  function adicionarAluno() {
    const novoAluno = { nome, matricula, turno, curso };
    setAlunos([...alunos, novoAluno]);
    setAlunoSendoEditado(null);
    setNome('');
    setMatricula('');
    setTurno('');
    setCurso('');
  }

  function editarAluno() {
    const index = alunos.indexOf(alunoSendoEditado);
    const novoAluno = { nome, matricula, turno, curso };
    const novaListaAlunos = [...alunos];
    novaListaAlunos.splice(index, 1, novoAluno);
    setAlunos(novaListaAlunos);
    setEditando(false);
    setNome('');
    setMatricula('');
    setTurno('');
    setCurso('');
  }

  function excluirAluno(aluno) {
    const novaListaAlunos = alunos.filter((item) => item !== aluno);
    setAlunos(novaListaAlunos);
  }

  function handleEditarAluno(aluno) {
    setAlunoSendoEditado(aluno);
    setNome(aluno.nome);
    setMatricula(aluno.matricula);
    setTurno(aluno.turno);
    setCurso(aluno.curso);
    setEditando(true);
  }

  function handleButton() {
    if (editando) {
      editarAluno();
    } else {
      adicionarAluno();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Matrícula"
          value={matricula}
          onChangeText={(text) => setMatricula(text)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Turno"
          value={turno}
          onChangeText={(text) => setTurno(text)}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Curso"
          value={curso}
          onChangeText={(text) => setCurso(text)}
        />
        <Button style={styles.button} mode="contained" onPress={handleButton}>
          {editando ? 'Editar' : 'Adicionar'}
        </Button>
      </View>
      <FlatList
        style={styles.list}
        data={alunos}
        renderItem={({ item }) => (
          <AlunoInfo
            aluno={item}
            onEdit={() => handleEditarAluno(item)}
            onDelete={() => excluirAluno(item)}
          />
        )}
      />
    </View>
  );
}

function AlunoInfo({ aluno, onEdit, onDelete }) {
  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content style={styles.cardContent}>
        <Text style={styles.alunoTitle}>Nome: {aluno.nome}</Text>
        <Text>Matrícula: {aluno.matricula}</Text>
        <Text>Turno: {aluno.turno}</Text>
        <Text>Curso: {aluno.curso}</Text>
        <IconButton icon="pencil" size={20} color="red" onPress={onEdit} />
        <IconButton icon="delete" size={20} color="red" onPress={onDelete} />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'red',
    marginTop: 10,
  },
  input: {
    marginBottom: 10,
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  card: {
    margin: 5,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: 'white',
  },
  alunoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
