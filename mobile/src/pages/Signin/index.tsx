import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles';

interface signInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const  navigation = useNavigation();
  const  formRef = useRef<FormHandles>(null);
  const  passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(async(data: signInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('Campo obrigatório').email('Email inválido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });

        // await signIn({
        //   email: data.email,
        //   password: data.password,
        // });

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
          'Erro de autenticação',
          'Ocorreu um erro ao tentar fazer login, cheque as crendenciais.',
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
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                blurOnSubmit={false}
                autoCapitalize='none'
                keyboardType="email-address"
                returnKeyType='next'
                name='email'
                icon='mail'
                placeholder='E-mail'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry={true}
                name='password'
                icon='lock'
                placeholder='Senha'
                returnKeyType='send'
                visible-password='visible-password'
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button onPress={() => {
                formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
              </Form>

            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccountButton onPress={() => {
          navigation.navigate('SignUp');
          }}
      >
        <Icon name='log-in' size={20} color='#ff9000'/>
        <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;

