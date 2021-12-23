import React from 'react';
import { Container } from './styles';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <Container className={className}>
    <span>GoVet</span>
  </Container>
);

export default Logo;
