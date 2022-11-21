import { FormContainer, MinutesAmountInput, TaskInput } from './styles';

import { useContext } from 'react';
import { CyclesContext } from '../..';
import { useFormContext } from 'react-hook-form';

interface NewCycleFormProps {
  onTaskInputChanged: (task: string) => void;
}

export function NewCycleForm({ onTaskInputChanged }: NewCycleFormProps) {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  // start watching the task input
  const taskFormRegister = register('task', {
    onChange(event) {
      const task = event.target.value as string;
      onTaskInputChanged(task);
    },
  });

  return (
    <FormContainer>
      <label htmlFor="task">I&apos;m going to work on</label>
      <TaskInput
        type="text"
        id="task"
        placeholder="Give a name to your project"
        list="task-suggestions"
        disabled={!!activeCycle}
        {...taskFormRegister}
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
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutes.</span>
    </FormContainer>
  );
}
