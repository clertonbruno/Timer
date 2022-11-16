import { HandPalm, Play } from 'phosphor-react';
import * as S from './Home.styles';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { createContext, useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { TimerForm } from './components/TimerForm/TimerForm';
import { Countdown } from './components/Countdown/Countdown';

interface Timer {
  id: string;
  task: string;
  minutesDuration: number;
  startDate: Date;
  interruptedDate?: Date;
  endDate?: Date;
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

interface TimerContextType {
  activeTimer: Timer | undefined;
  activeTimerId: string | null;
  passedTimeInSeconds: number;
  markCurrentTimerAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const TimerContext = createContext({} as TimerContextType);

export const Home = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [activeTimerId, setActiveTimerId] = useState<string | null>(null);
  const [passedTimeInSeconds, setPassedTimeInSeconds] = useState<number>(0);

  const activeTimer: Timer | undefined = timers.find(
    (timer) => timer.id === activeTimerId
  );

  const newTimerForm = useForm<NewTimerFormValues>({
    resolver: zodResolver(newTimerFormValidationSchema),
    defaultValues: {
      task: '',
      minutesDuration: 0,
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = newTimerForm;

  const markCurrentTimerAsFinished = () => {
    setTimers((oldState) => {
      return oldState.map((timer) => {
        if (timer.id === activeTimerId) {
          return { ...timer, endDate: new Date() };
        }
        return timer;
      });
    });
  };

  const setSecondsPassed = (seconds: number) => {
    setPassedTimeInSeconds(seconds);
  };

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

  const handleInterrupTimer = () => {
    const updatedTimerList = timers.map((timer, index) => {
      if (timer.id === activeTimerId) {
        return { ...timer, interruptedDate: new Date() };
      }
      return timer;
    });
    setTimers(updatedTimerList);
    setActiveTimerId(null);
  };

  const task = watch('task');

  const shouldEnableSubmit = task && task.length > 0;

  return (
    <S.HomeContainer>
      <form action='' onSubmit={handleSubmit(handleNewTimer)}>
        <TimerContext.Provider
          value={{
            activeTimer,
            activeTimerId,
            markCurrentTimerAsFinished,
            passedTimeInSeconds,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newTimerForm}>
            <TimerForm />
          </FormProvider>
          <Countdown />
        </TimerContext.Provider>

        {activeTimer ? (
          <S.StopCountdownButton type='button' onClick={handleInterrupTimer}>
            <HandPalm size={24} />
            Stop
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton type='submit' disabled={!shouldEnableSubmit}>
            <Play size={24} />
            Start
          </S.StartCountdownButton>
        )}
      </form>
    </S.HomeContainer>
  );
};
