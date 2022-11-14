import { Play } from 'phosphor-react';
import {
  Container,
  CountdownContainer,
  FormContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles';

export function Home() {
  return (
    <Container>
      <form>
        <FormContainer>
          <label htmlFor="task">I&apos;m going to work on</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name to your project"
          />
          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
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

        <StartCountdownButton type="submit">
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </Container>
  );
}
