import { useEffect, useState } from 'react';
import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInSeconds } from 'date-fns';

import {
  Container,
  CountdownContainer,
  FormContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles';

// form schema
const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Provide the task name'),
  minutesAmount: zod
    .number()
    .min(5, 'Cycle needs to be at least 5 minutes')
    .max(60, 'Cycle needs to be less than 60 minutes'),
});

// infer types given the schema
type NewCycleFormData = zod.infer<typeof newCycleFormSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  // number of seconds elapsed from the current active cycle
  const [cycleElapsedSeconds, setCycleElapsedSeconds] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema), // zod integration with react-hook-form
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  // Start countdown when there's an active cycle
  useEffect(() => {
    let interval: number;

    // initialise a counter if there's an active cycle
    if (activeCycle) {
      interval = setInterval(() => {
        // difference in seconds from now to cycle start date is basically the elapsed seconds
        setCycleElapsedSeconds(
          differenceInSeconds(new Date(), activeCycle.startDate),
        );
      }, 1000);
    }

    // to be called when activeCycle value changes but before activeCycle receives the new value
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  // start watching the task input
  const task = watch('task');
  const isSubmitDisabled = !task;

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const remainingSeconds = activeCycle ? totalSeconds - cycleElapsedSeconds : 0;

  // convert remaining seconds to minutes and seconds
  const minutesAmount = Math.floor(remainingSeconds / 60);
  const secondsAmount = remainingSeconds % 60;

  // format accordingly to display with additional zeros
  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');
  // update document title when minutes/seconds change
  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  console.log('render');

  function handleCreateNewCycle({ task, minutesAmount }: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setCycleElapsedSeconds(0);

    // this will reset the form fields to their defaultValues
    reset();
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">I&apos;m going to work on</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name to your project"
            list="task-suggestions"
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Project 1" />
            <option value="Project 2" />
            <option value="Project 3" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </Container>
  );
}
