import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from '../Button';
import { Avatar } from '../../utils/lists';
import { colors } from '../../styles/colors';

import { Container, Content, ContentLoading, CheckContent } from './styles';
import { IoMdClose } from 'react-icons/io';
import { FiCheck } from 'react-icons/fi';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import ReactLoading from "react-loading";

interface ModalProfileProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface ProfileImageProps {
  name: string;
  image: string;
}

const ModalProfile: React.FC<ModalProfileProps> = ({ isOpen, onRequestClose }) => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageProfile, setImageProfile] = useState<string>(user.avatar);

  useEffect(() => {
    if (isOpen) {
      setTimeout((e) => {
        setIsLoading(false);
        setImageProfile(user.avatar);
      }, 1000);
    }
  }, [isOpen]);

  function handleChangeImageProfile(item: ProfileImageProps) {
    setImageProfile(imageProfile === item.image ? '' : item.image);
  }

  function handleCloseModal() {
    onRequestClose();
    setIsLoading(true);
  }

  const handleAvatarChange = useCallback(
    async () => {
      const response = await api.patch('/users/avatar', {
        avatarFilename: imageProfile
      });

      try {
        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description: 'Suas informações de perfil foram atualizadas',
        });

        handleCloseModal();
      } catch (e) {
        addToast({
          type: 'error',
          title: 'Erro ao atualizar imagem',
          description:
            'Ocorreu um erro ao atualizar sua imagem de perfil, tente novamente.',
        });

        handleCloseModal();
      }
    },
    [addToast, updateUser, imageProfile],
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={handleCloseModal}
        className="react-modal-close"
      >
        <IoMdClose size={28} />
      </button>

      <Container>
        <h2>Selecione uma nova imagem</h2>

        {isLoading ? (
          <ContentLoading>
            <ReactLoading type={'bubbles'} color={colors.green400} />
          </ContentLoading>
        ) : (
          <Content>
            {Avatar.map((item, index) => (
              <div key={index}
                className="content-item"
                onClick={() => handleChangeImageProfile(item)}
              >
                <CheckContent
                  isVisible={item.image === imageProfile && imageProfile !== ''}
                >
                  <FiCheck size={20} />
                </CheckContent>
                <img src={item.image} alt={item.name} />
              </div>
            ))}
          </Content>
        )}

        <div className="footer">
          <Button onClick={handleAvatarChange}
            disabled={isLoading || imageProfile === user.avatar || !imageProfile}
          >
            Concluir
          </Button>
        </div>
      </Container>
    </Modal>
  )
};

export default ModalProfile;