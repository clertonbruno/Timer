import { HandPalm, Play } from 'phosphor-react';
import * as S from './Home.styles';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { createContext, useState, useReducer, useEffect } from 'react';
import { TimerForm } from './components/TimerForm/TimerForm';
import { Countdown } from './components/Countdown/Countdown';
import { Timer, timersReducer } from '../../reducers/timers/reducer';
import {
  addNewTimerAction,
  interruptCurrentTimerAction,
  markCurrentTimerAsFinishedAction,
} from '../../reducers/timers/actions';
import { useStorage } from '../../hooks/useStorage';
import { differenceInSeconds } from 'date-fns';

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
  const { getLocalStorage } = useStorage();
  const [timersState, dispatch] = useReducer(
    timersReducer,
    {
      timers: [],
      activeTimerId: null,
    },
    () => {
      const localData = getLocalStorage('timers-state');
      return localData
        ? JSON.parse(localData)
        : { timers: [], activeTimerId: null };
    }
  );

  const { activeTimerId } = timersState;

  const activeTimer: Timer | undefined = timersState?.timers?.find(
    (timer) => timer.id === activeTimerId
  );

  const [passedTimeInSeconds, setPassedTimeInSeconds] = useState<number>(() => {
    if (activeTimer) {
      return differenceInSeconds(new Date(), activeTimer.startDate);
    }
    return 0;
  });

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
    dispatch(markCurrentTimerAsFinishedAction());
  };

  const setSecondsPassed = (seconds: number) => {
    setPassedTimeInSeconds(seconds);
  };

  const handleNewTimer = (data: NewTimerFormValues) => {
    setPassedTimeInSeconds(0);
    const newTimer: Timer = {
      id: Math.random().toString(36).substr(2, 9),
      task: data.task,
      minutesDuration: data.minutesDuration,
      startDate: new Date(),
    };
    dispatch(addNewTimerAction(newTimer));
    reset();
  };

  const handleInterrupTimer = () => {
    dispatch(interruptCurrentTimerAction());
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
