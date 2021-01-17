import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiArrowLeft, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './style';
import getValidationErrors from '../../utils/getValidationErrors';

const Signup: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(async(data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string().required('Campo obrigatório').email('Email inválido'),
        password: Yup.string().min(6,'Minímo 6 digitos'),
      });
      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  },[]);

  return (
    <Container>
      <Background />
      <Content>
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
        <a href="login">
          <FiArrowLeft />
          Voltar
        </a>
      </Content>
    </Container>
  );
};

export default Signup;
