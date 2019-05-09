import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default class SignIn extends Component {

  static navigationOptions = {
    header: null,
    title: 'SignIn',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  //Variavel para armazenar email, senha, erros.
  state = {
    email: '',
    password: '',
    error: '',
  };

  //Recupera email digitado e guarda no state.  
  handleEmailChange = (email) => {
    this.setState({ email });
  };

  //Recupera password digitado e guarda no state
  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  //Chama a tela cadastro.
  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {

        //Faz a requisição post para a API
        const response = await api.post('/sessions', {
          email: this.state.email,
          password: this.state.password,
          
        }); 

        //Armazena o Token offiline
        await AsyncStorage.setItem('@ParkingClient:token', response.data.token);

        //reseta o stack de navegação
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main' }),
          ],
        });

        this.props.navigation.dispatch(resetAction);
      } catch (_err) {
        console.tron.log(_err);
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        
        <Logo source={require('../../images/logo.png')} resizeMode="contain" />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />

        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}

        <Button onPress={this.handleSignInPress}>
          <ButtonText>Entrar</ButtonText>
        </Button>

        <SignUpLink onPress={this.handleCreateAccountPress}>
          <SignUpLinkText>Criar conta grátis</SignUpLinkText>
        </SignUpLink>
        
      </Container>
    );
  }
}