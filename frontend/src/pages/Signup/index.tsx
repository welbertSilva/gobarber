import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiUser, FiArrowLeft, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimationContainer } from './style';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/Toast';

interface SignUpData{
  name: string,
  email: string,
  password: string,
}

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(async(data: SignUpData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string().required('Campo obrigatório').email('Email inválido'),
        password: Yup.string().min(6,'Minímo 6 digitos'),
      });
      await schema.validate(data, { abortEarly: false });

      /* Chama a requisição de cadastro de usuários passado os dados através do data */
      await api.post('/users', data);
      /* Mostra a mensagem de cadatrado com sucesso no toast */
      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você ja pode fazer seu lon no GoBarber!',
      });
      /* Redireciona para página de logon após o cadastramento */
      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
      addToast({
        type: 'error',
        title: 'Error no cadastro',
        description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
      });
    }
  },[addToast, history]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input
              name="name"
              icon={FiUser}
              placeholder="Nome"
            />
            <Input
              name="email"
              icon={FiMail}
              placeholder="E-mail"
            />
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Password"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default Signup;
