import { ActionsProps } from './action';

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  completedDate?: Date;
}

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

export enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  // eslint-disable-next-line no-unused-vars
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
  // eslint-disable-next-line no-unused-vars
  COMPLETE_ACTIVE_CYCLE = 'COMPLETE_ACTIVE_CYCLE',
}

export function cyclesReducer(state: CyclesState, action: ActionsProps) {
  if (action.type === ActionTypes.CREATE_NEW_CYCLE) {
    return {
      cycles: [...state.cycles, action.payload.newCycle],
      activeCycleId: action.payload.newCycle.id,
    };
  }

  if (action.type === ActionTypes.INTERRUPT_ACTIVE_CYCLE) {
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

  if (action.type === ActionTypes.COMPLETE_ACTIVE_CYCLE) {
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
}
