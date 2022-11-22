import { ActionTypes, Cycle } from './reducer';

interface CreateNewCycleActionProps {
  type: ActionTypes.CREATE_NEW_CYCLE;
  payload: {
    newCycle: Cycle;
  };
}

interface InterruptActiveCycleProps {
  type: ActionTypes.INTERRUPT_ACTIVE_CYCLE;
}

interface CompleteActiveCycleProps {
  type: ActionTypes.COMPLETE_ACTIVE_CYCLE;
}

export type ActionsProps =
  | CreateNewCycleActionProps
  | InterruptActiveCycleProps
  | CompleteActiveCycleProps;

export function createNewCycleAction(cycle: Cycle): CreateNewCycleActionProps {
  return {
    type: ActionTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle: cycle,
    },
  };
}

export function interruptActiveCycleAction(): InterruptActiveCycleProps {
  return {
    type: ActionTypes.INTERRUPT_ACTIVE_CYCLE,
  };
}

export function completeActiveCycleAction(): CompleteActiveCycleProps {
  return {
    type: ActionTypes.COMPLETE_ACTIVE_CYCLE,
  };
}
