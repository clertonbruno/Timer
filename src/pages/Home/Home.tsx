import { Play } from 'phosphor-react';
import * as S from './Home.styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const newTimerFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Task is required'),
  minutesDuration: zod
    .number()
    .min(5, 'Timer cannot be less than 5 minutes')
    .max(60, 'Timer cannot be more than 60 minutes'),
});

// to create a type NewTimerFormValues we can use zod's infer method
type NewTimerFormValues = zod.infer<typeof newTimerFormValidationSchema>;

// // or we can create a type (or interface) manually
// interface NewTimerFormValues {
//   task: string;
//   minutesDuration: number;
// }

export const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<NewTimerFormValues>({
    resolver: zodResolver(newTimerFormValidationSchema),
    defaultValues: {
      task: '',
      minutesDuration: 0,
    },
  });

  const onSubmit = (data: NewTimerFormValues) => {
    console.log('Submitted info provided by the handleSubmit > ', data);
    reset();
  };

  const task = watch('task');

  const shouldEnableSubmit = task && task.length > 0;

  return (
    <S.HomeContainer>
      <form action='' onSubmit={handleSubmit(onSubmit)}>
        <S.FormHeader>
          <label htmlFor='task'>Will work on</label>
          <S.TaskInput
            id='task'
            type='text'
            list='task-list'
            placeholder='Task name'
            {...register('task', { required: true })}
          />
          <datalist id='task-list'>
            <option value='Task 1' />
            <option value='Task 2' />
            <option value='Task 3' />
            <option value='Task 4' />
          </datalist>

          <label htmlFor='minutesDuration'>Duration</label>
          <S.MinutesInput
            type='number'
            id='minutesDuration'
            placeholder='00'
            step={5}
            min={5}
            max={60}
            {...register('minutesDuration', {
              required: true,
              valueAsNumber: true,
            })}
          />

          <span>minutes.</span>
        </S.FormHeader>
        <S.CountdownContainer>
          <span>0</span>
          <span>0</span>
          <S.Separator>:</S.Separator>
          <span>0</span>
          <span>0</span>
        </S.CountdownContainer>

        <S.CountdownButton type='submit' disabled={!shouldEnableSubmit}>
          <Play size={24} />
          Start
        </S.CountdownButton>
      </form>
    </S.HomeContainer>
  );
};
