import { useContext, useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

import { CountdownContainer, Separator } from './styles';
import { CyclesContext } from '../..';

export function Countdown() {
  // number of seconds elapsed from the current active cycle
  const [cycleElapsedSeconds, setCycleElapsedSeconds] = useState(0);
  const { activeCycle, activeCycleId, markActiveCycleAsCompleted } =
    useContext(CyclesContext);

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
          activeCycle.startDate,
        );

        // if elapsed seconds reaches total seconds amount, then the cycle is completed
        if (secondsElapsed >= totalSeconds) {
          markActiveCycleAsCompleted();

          clearInterval(interval);
          setCycleElapsedSeconds(totalSeconds);
        } else {
          // difference in seconds from now to cycle start date is basically the elapsed seconds
          setCycleElapsedSeconds(secondsElapsed);
        }
      }, 1000);
    }

    // to be called when activeCycle value changes but before activeCycle receives the new value
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, activeCycleId, totalSeconds, markActiveCycleAsCompleted]);

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
