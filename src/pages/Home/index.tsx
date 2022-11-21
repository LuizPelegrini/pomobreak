import { useContext, useState } from 'react';
import { HandPalm, Play } from 'phosphor-react';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

import { Container, StartCountdownButton, StopCountdownButton } from './styles';
import { CyclesContext } from '../../contexts/CyclesContext';

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
  const { activeCycle, createNewCycle, interruptActiveCycle } =
    useContext(CyclesContext);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const cycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema), // zod integration with react-hook-form
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  const { handleSubmit /* reset */ } = cycleForm;

  return (
    <Container>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...cycleForm}>
          <NewCycleForm
            onTaskInputChanged={(task) => setIsSubmitDisabled(!task)}
          />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptActiveCycle}>
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
