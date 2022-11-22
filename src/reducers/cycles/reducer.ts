import { produce } from 'immer';

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
    // with immer we can work with immutable state in a more convenient way.
    return produce(state, (draft) => {
      draft.cycles.push(action.payload.newCycle);
      draft.activeCycleId = action.payload.newCycle.id;
    });
  }

  if (action.type === ActionTypes.INTERRUPT_ACTIVE_CYCLE) {
    const activeCycleIndex = state.cycles.findIndex(
      (cycle) => cycle.id === state.activeCycleId,
    );

    if (activeCycleIndex < 0) {
      return state;
    }

    // modifying both cycles array and activeCycleId in one action :D
    return produce(state, (draft) => {
      draft.cycles[activeCycleIndex].interruptedDate = new Date();
      draft.activeCycleId = null;
    });
  }

  if (action.type === ActionTypes.COMPLETE_ACTIVE_CYCLE) {
    const activeCycleIndex = state.cycles.findIndex(
      (cycle) => cycle.id === state.activeCycleId,
    );

    if (activeCycleIndex < 0) {
      return state;
    }

    // modifying both cycles array and activeCycleId in one action :D
    return produce(state, (draft) => {
      draft.cycles[activeCycleIndex].completedDate = new Date();
      draft.activeCycleId = null;
    });
  }

  return state;
}
