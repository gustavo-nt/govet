import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container } from './styles';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  identifier: string;
  title: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  identifier,
  title
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const { fieldName, registerField } = useField(identifier);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'checked',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <div className="content">
        <input
          ref={inputRef}
          id={identifier}
          name={identifier}
          type="checkbox"
          title={title}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        {checked && (
          <FiCheck
            size={14}
            onClick={() => setChecked(!checked)}
          />
        )}
      </div>

      <label htmlFor={identifier}>
        {title}
      </label>
    </Container>
  )
};

export default Checkbox;
