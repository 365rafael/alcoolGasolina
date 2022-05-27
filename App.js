import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  Modal,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      alcool: '',
      gasolina: '',
      melhor: '',
    };
    this.calcular = this.calcular.bind(this);
    this.sair = this.sair.bind(this);
  }
  calcular() {
    if (this.state.alcool === '' || this.state.gasolina === '') {
      alert('Preencha os valores');
      return;
    }
    let precoAlcool = parseFloat(this.state.alcool);
    let precoGasolina = parseFloat(this.state.gasolina);
    let preco = precoAlcool / precoGasolina;
    if (preco > 0.7) {
      preco = 'Gasolina';
    } else {
      preco = 'Álcool';
    }
    this.setState({modalVisible: true});
    this.setState({melhor: preco});
  }
  sair() {
    this.setState({modalVisible: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./src/img/logo.png')} />
        <Text style={styles.titulo}>Qual a melhor opção?</Text>

        <View style={styles.valores}>
          <Text style={styles.text}>Álcool (preço por litro): </Text>
          <TextInput
            style={styles.input}
            onChangeText={valueAlcool => this.setState({alcool: valueAlcool})}
            keyboardType="numeric"
          />
          <Text style={styles.text}>Gasolina (preço por litro): </Text>
          <TextInput
            style={styles.input}
            onChangeText={valueGas => this.setState({gasolina: valueGas})}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.botao} onPress={this.calcular}>
            <Text style={styles.text}>Calcular</Text>
          </TouchableOpacity>

          <Modal
            transparent={false}
            animationType="slide"
            visible={this.state.modalVisible}>
            <View style={styles.modal}>
              <Image source={require('./src/img/gas.png')} />
              <Text style={styles.textModal}>
                Compensa usar {this.state.melhor}{' '}
              </Text>
              <Text style={styles.titulo}>Com os preços:</Text>
              <Text style={styles.text}>Álcool: R${this.state.alcool}</Text>
              <Text style={styles.text}>Gasolina: R${this.state.gasolina}</Text>
              <TouchableOpacity
                style={styles.botaoModal}
                onPress={() => this.sair(false)}>
                <Text style={styles.texBtn}>Calcular novamente</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929',
  },

  titulo: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 30,
  },
  valores: {
    marginTop: 80,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
  },
  input: {
    backgroundColor: '#FFF',
    width: 300,
    borderRadius: 10,
    margin: 10,
  },
  botao: {
    backgroundColor: '#dd7b22',
    borderRadius: 10,
    width: 300,
    height: 50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#292929',
    width: '100%',
    height: 350,
    alignItems: 'center',
    padding: 30,
  },
  textModal: {
    color: '#32CD32',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  botaoModal: {
    justifyContent: 'center',
    width: 230,
    height: 50,
    borderWidth: 2,
    borderColor: '#dd7b22',
    borderRadius: 10,
    margin: 20,
  },
  texBtn: {
    color: '#dd7b22',
    fontSize: 15,
    textAlign: 'center',
  },
});
