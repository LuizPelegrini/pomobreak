import { useContext, useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';

import { CountdownContainer, Separator } from './styles';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markActiveCycleAsCompleted,
    cycleElapsedSeconds,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const remainingSeconds = activeCycle ? totalSeconds - cycleElapsedSeconds : 0;

  // convert remaining seconds to minutes and seconds
  const minutesAmount = Math.floor(remainingSeconds / 60);
  const secondsAmount = remainingSeconds % 60;

  // format accordingly to display with additional zeros
  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  // Start countdown when there's an active cycle
  useEffect(() => {
    let interval: number;

    // initialise a counter if there's an active cycle
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsElapsed = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate), // converts to a Date, as startDate is a string when reading from localStorage
        );

        // if elapsed seconds reaches total seconds amount, then the cycle is completed
        if (secondsElapsed >= totalSeconds) {
          markActiveCycleAsCompleted();

          clearInterval(interval);
          setSecondsPassed(totalSeconds);
        } else {
          // difference in seconds from now to cycle start date is basically the elapsed seconds
          setSecondsPassed(secondsElapsed);
        }
      }, 1000);
    }

    // to be called when activeCycle value changes but before activeCycle receives the new value
    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markActiveCycleAsCompleted,
    setSecondsPassed,
  ]);

  // update document title when minutes/seconds change
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
