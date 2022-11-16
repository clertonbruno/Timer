import { FormHeader, TaskInput, MinutesInput } from './TimerForm.styles';

import { TimerContext } from '../../Home';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

export const TimerForm = () => {
  const { activeTimer, activeTimerId } = useContext(TimerContext);
  const { register } = useFormContext();

  return (
    <FormHeader>
      <label htmlFor='task'>Will work on</label>
      <TaskInput
        id='task'
        type='text'
        list='task-list'
        placeholder='Task name'
        disabled={!!activeTimer}
        {...register('task', { required: true })}
      />
      <datalist id='task-list'>
        <option value='Task 1' />
        <option value='Task 2' />
        <option value='Task 3' />
        <option value='Task 4' />
      </datalist>

      <label htmlFor='minutesDuration'>Duration</label>
      <MinutesInput
        type='number'
        id='minutesDuration'
        placeholder='00'
        disabled={!!activeTimer}
        step={5}
        min={5}
        max={60}
        {...register('minutesDuration', {
          required: true,
          valueAsNumber: true,
        })}
      />

      <span>minutes.</span>
    </FormHeader>
  );
};
