import { createContext, ReactNode, useReducer, useState } from 'react';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  completedDate?: Date;
}

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

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // reducer containing logic of creating, interrupting and completing a cycle
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      if (action.type === 'CREATE_NEW_CYCLE') {
        return {
          cycles: [...state.cycles, action.payload.newCycle],
          activeCycleId: action.payload.activeCycleId,
        };
      }

      if (action.type === 'INTERRUPT_ACTIVE_CYCLE') {
        return {
          ...state,
          // add interruptedDate to active cycle
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interruptedDate: new Date() };
            }

            return cycle;
          }),
          activeCycleId: null, // modifying both cycles array and activeCycleId in one action :D
        };
      }

      if (action.type === 'COMPLETE_ACTIVE_CYCLE') {
        return {
          ...state,
          // add completedDate to active cycle
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, completedDate: new Date() };
            }

            return cycle;
          }),
          activeCycleId: null,
        };
      }

      return state;
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  );
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

    dispatch({
      type: 'CREATE_NEW_CYCLE',
      payload: {
        newCycle,
        activeCycleId: id,
      },
    });

    setCycleElapsedSeconds(0);
  }

  function interruptActiveCycle() {
    dispatch({
      type: 'INTERRUPT_ACTIVE_CYCLE',
    });
  }

  function markActiveCycleAsCompleted() {
    dispatch({
      type: 'COMPLETE_ACTIVE_CYCLE',
    });
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
