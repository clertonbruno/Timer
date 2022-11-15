import { Play } from 'phosphor-react';
import * as S from './Home.styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

interface Timer {
  id: string;
  task: string;
  minutesDuration: number;
  startDate: Date;
}

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
  const [timers, setTimers] = useState<Timer[]>([]);
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const [passedTimeInSeconds, setPassedTimeInSeconds] = useState<number>(0);

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

  const handleNewTimer = (data: NewTimerFormValues) => {
    setPassedTimeInSeconds(0);
    console.log('Submitted info provided by the handleSubmit > ', data);
    const newTimer: Timer = {
      id: Math.random().toString(36).substr(2, 9),
      task: data.task,
      minutesDuration: data.minutesDuration,
      startDate: new Date(),
    };
    setActiveTimerId(newTimer.id);
    setTimers((oldState) => [...oldState, newTimer]);
    reset();
  };

  const activeTimer = timers.find((timer) => timer.id === activeTimerId);

  const durationInSeconds = activeTimer ? activeTimer.minutesDuration * 60 : 0;

  const remainingTimeInSeconds = activeTimer
    ? durationInSeconds - passedTimeInSeconds
    : 0;

  const remainingFullMinutes = Math.floor(remainingTimeInSeconds / 60);
  const remainingRestSeconds = remainingTimeInSeconds % 60;

  const remainingMinutesFormatted = remainingFullMinutes
    .toString()
    .padStart(2, '0');

  const remainingSecondsFormatted = remainingRestSeconds
    .toString()
    .padStart(2, '0');

  useEffect(() => {
    if (!activeTimer) {
      return;
    }

    document.title = `${remainingMinutesFormatted}:${remainingSecondsFormatted} - ${activeTimer.task}`;
  }, [remainingMinutesFormatted, remainingSecondsFormatted, activeTimer]);

  const task = watch('task');

  const shouldEnableSubmit = task && task.length > 0;

  useEffect(() => {
    if (activeTimerId) {
      const interval = setInterval(() => {
        const timeElapseInSeconds = differenceInSeconds(
          new Date(),
          activeTimer?.startDate
        );
        setPassedTimeInSeconds(timeElapseInSeconds);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeTimerId]);

  return (
    <S.HomeContainer>
      <form action='' onSubmit={handleSubmit(handleNewTimer)}>
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
          <span>{remainingMinutesFormatted[0]}</span>
          <span>{remainingMinutesFormatted[1]}</span>
          <S.Separator>:</S.Separator>
          <span>{remainingSecondsFormatted[0]}</span>
          <span>{remainingSecondsFormatted[1]}</span>
        </S.CountdownContainer>

        <S.CountdownButton type='submit' disabled={!shouldEnableSubmit}>
          <Play size={24} />
          Start
        </S.CountdownButton>
      </form>
    </S.HomeContainer>
  );
};
