import { ValidationError } from 'yup';

interface Errors {
  [key:string]:string;
}
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};
  /* PULO DO GATO, SÓ TRAZ O QUE EXISTE: IF ABAIXO DEXPREZA TUDO QUE UNDEFINED */
  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });
  return validationErrors;
}
