import * as Yup from 'yup';

export const homeFormSchema = Yup.object().shape({
  roomcode: Yup.string().required('O código da sala é obrigatório'),
});
