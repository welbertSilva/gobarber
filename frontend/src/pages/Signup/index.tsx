import React from 'react';
import { FiMail, FiUser, FiArrowLeft, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './style';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/button';

const Signup: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="GoBarber" />
      <form>

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

      </form>
      <a href="login">
        <FiArrowLeft />
        Voltar
      </a>
    </Content>
  </Container>
);

export default Signup;
