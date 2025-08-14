import { FC } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../Button';
import { FormField } from '../FormField';
import './PostForm.css';
import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../api/Post';
import { queryClient } from '../../api/QuryClient';

export interface IPostFormProps {}

const createPostShema = z.object({
  text: z.string().min(10, 'Длинна должны быть не менее 10 символов'),
});

type TCreatPostForm = z.infer<typeof createPostShema>;

export const PostForm: FC<IPostFormProps> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreatPostForm>({
    resolver: zodResolver(createPostShema),
  });

  const postMutation = useMutation(
    {
      mutationFn: createPost,
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      },
    },
    queryClient,
  );

  return (
    <form
      onSubmit={handleSubmit(({ text }) => {
        postMutation.mutate(text);
      })}
      className='post-form'
    >
      <FormField label='Текст поста' errorMessage={errors.text?.message}>
        <textarea className='post-form__input' {...register('text')} />
      </FormField>

      <Button type='submit' title='Опубликовать' isLoading={postMutation.isPending} />
    </form>
  );
};
