import React, { useCallback, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';

import api from '../../services/api';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText
} from './styles';

interface SignUpFormData{
  name: string,
  email: string,
  password: string,
}
const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const  formRef = useRef<FormHandles>(null);
  const  emailInputRef = useRef<TextInput>(null);
  const  passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async(data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('Email obrigatório').email('Email inválido'),
          password: Yup.string().min(6,'Minímo 6 digitos'),
        });
        await schema.validate(data, { abortEarly: false });
        /* Chama a requisição de cadastro de usuários passado os dados através do data*/
        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso!',
          'Você já pode fazer login na aplicação.',
        );

        /* Redireciona para página de logon após o cadastramento*/
        navigation.navigate('SignIn');

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao tentar fazer cadastro, tente novamente.',
        );
      }
    },[]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding': undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name='name'
                icon='user'
                autoCorrect={false}
                blurOnSubmit={false}
                autoCapitalize='words'
                autoFocus={true}
                returnKeyType='next'
                placeholder='Nome Completo'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                name='email'
                icon='mail'
                autoCorrect={false}
                blurOnSubmit={false}
                autoCapitalize='none'
                keyboardType="email-address"
                returnKeyType='next'
                placeholder='E-mail'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name='password'
                icon='lock'
                placeholder='Senha'
                returnKeyType='send'
                secureTextEntry={true}
                textContentType='newPassword'
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button onPress={() => {
                formRef.current?.submitForm();
                }}
              >
                Salvar
              </Button>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => {
          navigation.goBack();
          }}
      >
        <Icon name='arrow-left' size={20} color='#f4ede8'/>
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;

