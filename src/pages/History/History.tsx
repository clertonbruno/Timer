import * as S from './History.styles';
import { useEffect, useState } from 'react';
import { Timer } from '../../reducers/timers/reducer';
import { useStorage } from '../../hooks/useStorage';

export const History = () => {
  const [timers, setTimers] = useState<Timer[]>([]);
  const { getLocalStorage } = useStorage();

  useEffect(() => {
    const timersHistory = getLocalStorage('timers-state');
    console.log('timersHistory', timersHistory);
    if (timersHistory) {
      console.log('Inside', JSON.parse(timersHistory));
      setTimers(JSON.parse(timersHistory).timers);
    }
  }, []);

  return (
    <S.HistoryContainer>
      <pre>{JSON.stringify(timers)}</pre>
      <h1>My History</h1>
      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {timers &&
              timers.map((timer) => {
                return (
                  <tr key={timer.id}>
                    <td>{timer.task}</td>
                    <td>{timer.minutesDuration} minutes</td>
                    <td>{new Date(timer.startDate).toISOString()}</td>
                    {timer.endDate && (
                      <td>
                        <S.Status status='success'>Finished</S.Status>
                      </td>
                    )}
                    {timer.interruptedDate && (
                      <td>
                        <S.Status status='interrupted'>Interrupted</S.Status>
                      </td>
                    )}
                    {!timer.endDate && !timer.interruptedDate && (
                      <td>
                        <S.Status status='ongoing'>On going</S.Status>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  );
};
