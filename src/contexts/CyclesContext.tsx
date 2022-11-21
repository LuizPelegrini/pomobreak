import { createContext, ReactNode, useReducer, useState } from 'react';
import {
  completeActiveCycleAction,
  createNewCycleAction,
  interruptActiveCycleAction,
} from '../reducers/cycles/reducer/action';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer/cycles';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  cycleElapsedSeconds: number;
  markActiveCycleAsCompleted: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptActiveCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // reducer containing logic of creating, interrupting and completing a cycle
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });
  // number of seconds elapsed from the current active cycle
  const [cycleElapsedSeconds, setCycleElapsedSeconds] = useState(0);

  const { activeCycleId, cycles } = cyclesState;

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function createNewCycle({ task, minutesAmount }: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    };

    dispatch(createNewCycleAction(newCycle));

    setCycleElapsedSeconds(0);
  }

  function interruptActiveCycle() {
    dispatch(interruptActiveCycleAction());
  }

  function markActiveCycleAsCompleted() {
    dispatch(completeActiveCycleAction());
  }

  function setSecondsPassed(seconds: number) {
    setCycleElapsedSeconds(seconds);
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markActiveCycleAsCompleted,
        cycleElapsedSeconds,
        setSecondsPassed,
        createNewCycle,
        interruptActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
