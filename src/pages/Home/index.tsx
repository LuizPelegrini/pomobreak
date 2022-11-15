import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema), // zod integration with react-hook-form
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  });

  // start watching the task input
  const task = watch('task');
  const isSubmitDisabled = !task;

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log('Data: ', data);
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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </Container>
  );
}
