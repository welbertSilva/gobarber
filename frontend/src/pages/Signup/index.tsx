import React, { useCallback } from 'react';
import { FiMail, FiUser, FiArrowLeft, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Input from '../../components/input';
import Button from '../../components/button';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './style';

const Signup: React.FC = () => {
  const handleSubmit = useCallback(async(data:object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um emailválido'),
        password: Yup.string()
          .required('Senha com minímo de 6 e máximo 10 digitos')
          .min(6,'Menor que 6')
          .max(10, 'Maior que 10'),
      });
      await schema.validate(data,
        { abortEarly: false });
    } catch (err) {
      console.log(err);
    }
  },[]);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form onSubmit={handleSubmit}>

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
