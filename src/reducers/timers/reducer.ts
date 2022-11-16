import { TimersActionTypes } from './actions';
import { produce } from 'immer';
import { useStorage } from '../../hooks/useStorage';

export interface Timer {
  id: string;
  task: string;
  minutesDuration: number;
  startDate: Date;
  interruptedDate?: Date;
  endDate?: Date;
}

export interface TimersState {
  timers: Timer[];
  activeTimerId: string | null;
}

export function timersReducer(state: TimersState, action: any) {
  const { setLocalStorage } = useStorage();

  switch (action.type) {
    case TimersActionTypes.ADD_TIMER: {
      return produce(state, (draft) => {
        draft.timers.push(action.payload);
        draft.activeTimerId = action.payload.id;
        setLocalStorage('timers-state', JSON.stringify(draft));
      });
    }

    case TimersActionTypes.MARK_CURRENT_TIMER_AS_FINISHED: {
      const currentTimerIndex = state.timers.findIndex((timer) => {
        return timer.id === state.activeTimerId;
      });

      if (currentTimerIndex < 0) {
        return state;
      }
      return produce(state, (draft) => {
        draft.timers[currentTimerIndex].endDate = new Date();
        draft.activeTimerId = null;
      });
    }

    case TimersActionTypes.INTERRUPT_CURRENT_TIMER: {
      const currentTimerIndex = state.timers.findIndex((timer) => {
        return timer.id === state.activeTimerId;
      });
      if (currentTimerIndex < 0) return state;

      return produce(state, (draft) => {
        draft.activeTimerId = null;
        draft.timers[currentTimerIndex].interruptedDate = new Date();
      });
    }

    default:
      return state;
  }
}
