import { Timer } from './reducer';

export enum TimersActionTypes {
  ADD_TIMER = 'ADD_TIMER',
  MARK_CURRENT_TIMER_AS_FINISHED = 'MARK_CURRENT_TIMER_AS_FINISHED',
  INTERRUPT_CURRENT_TIMER = 'INTERRUPT_CURRENT_TIMER',
}

export function addNewTimerAction(newTimer: Timer) {
  return {
    type: TimersActionTypes.ADD_TIMER,
    payload: newTimer,
  };
}

export function markCurrentTimerAsFinishedAction() {
  return {
    type: TimersActionTypes.MARK_CURRENT_TIMER_AS_FINISHED,
  };
}

export function interruptCurrentTimerAction() {
  return {
    type: TimersActionTypes.INTERRUPT_CURRENT_TIMER,
  };
}
