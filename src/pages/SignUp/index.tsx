import React, { useCallback, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import { Container, Content, AnimationContainer, Background, CopyrightBack } from './styles';
import Logo from '../../components/Logo';
import Checkbox from '../../components/Checkbox';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  type: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'No minímo 6 dígitos'),
        });

        data.type = data.type ? 'admin' : 'client';

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer o seu logon no GoVet',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro no cadastro',
            description:
              'Ocorreu um erro ao fazer o cadastro, tente novamente.',
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <CopyrightBack href="https://www.mypetbrasil.com/blog/numeros/presenca-caes-e-gatos-nas-regioes-brasileiras/">
        https://www.mypetbrasil.com/blog...
      </CopyrightBack>

      <Content>
        <AnimationContainer>
          <Logo />

          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu Cadastro</h1>

            <Input icon={FiUser} name="name" placeholder="Nome" />
            <Input icon={FiMail} name="email" placeholder="Email" />
            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />

            <Checkbox 
              identifier="type"
              title="Você é um empresário?"  
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
