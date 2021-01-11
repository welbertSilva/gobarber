import { getAllJSDocTagsOfKind } from 'typescript';
import { ValidationError } from 'yup';
import { string } from 'yup/lib/locale';

interface Errors {
  [key:string]:string;
}
export default function getValidationErrors(err: ValidationError): Errors {
  console.log(err.inner);
  const validationErrors: Errors = {};
  /* PULO DO GATO, SÓ TRAZ O QUE EXISTE: IF ABAIXO DEXPREZA TUDO QUE UNDEFINED */
  err.inner.forEach(error => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });
  return validationErrors;
}
