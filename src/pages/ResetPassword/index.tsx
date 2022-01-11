import React, { useRef, useCallback } from 'react';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background, CopyrightBack } from './styles';
import api from '../../services/api';
import Logo from '../../components/Logo';

interface ResetPasswordFormData {
  email: string;
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação Incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation, email } = data;

        await api.post('/password/reset', {
          password,
          password_confirmation,
          email,
        });

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
          description: 'Utilize sua nova senha para acessar o seu painel',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na ao resetar senha',
            description:
              'Ocorreu um erro ao resetar sua senha, tente novamente.',
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Logo />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar Senha</h1>

            <Input
              icon={FiMail}
              name="email"
              type="text"
              placeholder="Seu Email"
            />

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova Senha"
            />

            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmação de Senha"
            />

            <Button type="submit">Alterar Senha</Button>
          </Form>

          <Link to="/">
            <FiLogIn />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
      <CopyrightBack href="https://tvprefeito.com/primeira-feira-virtual-para-adocao-de-caes-e-gatos-de-niteroi-e-um-sucesso/">
        https://tvprefeito.com/primeira-feira-virtual...
      </CopyrightBack>
    </Container>
  );
};

export default ResetPassword;
