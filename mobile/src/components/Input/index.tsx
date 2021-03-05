import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';
import { useField  } from '@unform/core';

import { Container, TextInput, Icon  } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}
  const Input: React.ForwardRefRenderFunction<InputRef,InputProps> = ({ name, icon, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);
  const {registerField, defaultValue, fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const[isFocused, setIsFocused] = useState(false);
  const[isField, setIsField] = useState(false);

  const handleFocused = useCallback(() => {
    setIsFocused(true);
  },[]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);

    setIsField(!!inputValueRef.current.value); //Isto é um if
  },[]);

  useImperativeHandle(ref, () => ({
    focus(){
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',

      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },

      clearValue(){
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },

    })
  },[fieldName, inputValueRef]);
   return (
    <Container isFocused={isFocused} isErrored={ !!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isField ? '#ff9000' : '#666360'}
      />

      <TextInput
        ref={inputElementRef}
        keyboardAppearance='dark'
        placeholderTextColor='#666360'
        defaultValue={defaultValue}
        onFocus={handleFocused}
        onBlur={handleBlur}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />

    </Container>
  );
};

export default forwardRef (Input);
