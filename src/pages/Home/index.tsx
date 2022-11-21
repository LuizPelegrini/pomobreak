import { createContext, useState } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

import { Container, StartCountdownButton, StopCountdownButton } from './styles';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  completedDate?: Date;
}

interface CyclesContextType {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  cycleElapsedSeconds: number;
  markActiveCycleAsCompleted: () => void;
  setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

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

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  // number of seconds elapsed from the current active cycle
  const [cycleElapsedSeconds, setCycleElapsedSeconds] = useState(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const cycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema), // zod integration with react-hook-form
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const { handleSubmit, reset } = cycleForm;

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

  function handleInterruptCycle() {
    // add interruptedDate to active cycle
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          };
        } else {
          return cycle;
        }
      }),
    );

    setActiveCycleId(null);
  }

  function markActiveCycleAsCompleted() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            completedDate: new Date(),
          };
        } else {
          return cycle;
        }
      }),
    );
  }

  function setSecondsPassed(seconds: number) {
    setCycleElapsedSeconds(seconds);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markActiveCycleAsCompleted,
            cycleElapsedSeconds,
            setSecondsPassed,
          }}
        >
          <FormProvider {...cycleForm}>
            <NewCycleForm
              onTaskInputChanged={(task) => setIsSubmitDisabled(!task)}
            />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </Container>
  );
}
