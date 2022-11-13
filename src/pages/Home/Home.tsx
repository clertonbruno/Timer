import { Play } from 'phosphor-react';
import * as S from './Home.styles';

export const Home = () => {
  return (
    <S.HomeContainer>
      <form action=''>
        <S.FormHeader>
          <label htmlFor='task'>Will work on</label>
          <S.TaskInput
            id='task'
            type='text'
            list='task-list'
            placeholder='Task name'
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

        <S.CountdownButton type='submit' disabled>
          <Play size={24} />
          Start
        </S.CountdownButton>
      </form>
    </S.HomeContainer>
  );
};
