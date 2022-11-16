import { HandPalm, Play } from 'phosphor-react';
import * as S from './Home.styles';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { createContext, useState, useReducer } from 'react';
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

interface TimersState {
  timers: Timer[];
  activeTimerId: string | null;
}

export const Home = () => {
  const [timersState, dispatch] = useReducer(
    (state: TimersState, action: any) => {
      switch (action.type) {
        case 'ADD_TIMER':
          return {
            ...state,
            timers: [...state.timers, action.payload],
            activeTimerId: action.payload.id,
          };
        case 'MARK_CURRENT_TIMER_AS_FINISHED':
          const timersWithNewFinishedTimer = state.timers.map((timer) => {
            if (timer.id === state.activeTimerId) {
              return { ...timer, endDate: new Date() };
            }
            return timer;
          });

          return {
            ...state,
            timers: timersWithNewFinishedTimer,
            activeTimerId: null,
          };
        case 'INTERRUPT_CURRENT_TIMER':
          const timersWithNewInterruptedTimer = state.timers.map((timer) => {
            if (timer.id === state.activeTimerId) {
              return { ...timer, interruptedDate: new Date() };
            }
            return timer;
          });

          return {
            ...state,
            timers: timersWithNewInterruptedTimer,
            activeTimerId: null,
          };
        default:
          return state;
      }
    },
    {
      timers: [],
      activeTimerId: null,
    }
  );

  const [passedTimeInSeconds, setPassedTimeInSeconds] = useState<number>(0);

  const { activeTimerId } = timersState;

  const activeTimer: Timer | undefined = timersState.timers.find(
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
    dispatch({
      type: 'MARK_CURRENT_TIMER_AS_FINISHED',
      payload: activeTimerId,
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
    dispatch({
      type: 'ADD_TIMER',
      payload: newTimer,
    });
    reset();
  };

  const handleInterrupTimer = () => {
    dispatch({
      type: 'INTERRUPT_CURRENT_TIMER',
      payload: activeTimerId,
    });
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
      <pre>{JSON.stringify(timersState.timers, null, 2)}</pre>
    </S.HomeContainer>
  );
};
