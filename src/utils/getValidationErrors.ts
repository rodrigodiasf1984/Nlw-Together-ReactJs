/* eslint-disable no-console */
import { ValidationError } from 'yup';

export interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach((error: any) => {
    validationErrors[error?.path] = error.message;
  });

  return validationErrors;
}
