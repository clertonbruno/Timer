import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect } from 'react';
import { TimerContext } from '../../Home';
import { CountdownContainer, Separator } from './Countdowm.styles';

export const Countdown = () => {
  const {
    activeTimer,
    activeTimerId,
    markCurrentTimerAsFinished,
    passedTimeInSeconds,
    setSecondsPassed,
  } = useContext(TimerContext);

  const durationInSeconds = activeTimer ? activeTimer.minutesDuration * 60 : 0;

  useEffect(() => {
    if (activeTimer) {
      const interval = setInterval(() => {
        const timeElapseInSeconds = differenceInSeconds(
          new Date(),
          new Date(activeTimer.startDate)
        );

        if (timeElapseInSeconds >= durationInSeconds) {
          markCurrentTimerAsFinished();
          setSecondsPassed(durationInSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(timeElapseInSeconds);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [
    activeTimer,
    activeTimerId,
    durationInSeconds,
    markCurrentTimerAsFinished,
  ]);

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

  return (
    <CountdownContainer>
      <span>{remainingMinutesFormatted[0]}</span>
      <span>{remainingMinutesFormatted[1]}</span>
      <Separator>:</Separator>
      <span>{remainingSecondsFormatted[0]}</span>
      <span>{remainingSecondsFormatted[1]}</span>
    </CountdownContainer>
  );
};
