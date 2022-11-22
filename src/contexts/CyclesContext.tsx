import { differenceInSeconds } from 'date-fns';
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {
  completeActiveCycleAction,
  createNewCycleAction,
  interruptActiveCycleAction,
} from '../reducers/cycles/action';
import { Cycle, cyclesReducer, CyclesState } from '../reducers/cycles/reducer';

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

// initialise cycles state from localstorage
function initCyclesState(): CyclesState {
  const storedStateAsJSON = localStorage.getItem(
    '@pomobreak:cycles-state-1.0.0',
  );

  if (storedStateAsJSON) {
    return JSON.parse(storedStateAsJSON) as CyclesState;
  }

  return {
    cycles: [],
    activeCycleId: null,
  };
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // reducer containing logic of creating, interrupting and completing a cycle
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    initCyclesState,
  );

  const { activeCycleId, cycles } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  // number of seconds elapsed from the current active cycle
  const [cycleElapsedSeconds, setCycleElapsedSeconds] = useState(() => {
    // update elapsed seconds as soon as the component is rendered, so we dont need to wait 1 second for the elapsedSeconds state to be updated
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  // save into localStorage whenever cycles state changes
  useEffect(() => {
    localStorage.setItem(
      '@pomobreak:cycles-state-1.0.0',
      JSON.stringify(cyclesState),
    );
  }, [cyclesState]);

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
