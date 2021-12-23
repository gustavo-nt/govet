import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background, CopyrightBack } from './styles';
import api from '../../services/api';
import Logo from '../../components/Logo';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoading(true);
        formRef.current?.setErrors([]);

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Nome obrigatório')
            .email('Digite um email válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'Email de recuperação enviado',
          description:
            'Enviamos um email para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na recuperação de senha',
            description:
              'Ocorreu um erro ao fazer tentar fazer a recuperação de senha.',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Logo />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar</h1>

            <Input icon={FiMail} name="email" placeholder="Email" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>

          <Link to="signup">
            <FiLogIn />
            Voltar para Login
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

export default ForgotPassword;
