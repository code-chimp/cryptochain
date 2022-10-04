import AsyncStates from '../@enums/AsyncStates';

type AsyncStatus =
  | AsyncStates.Idle
  | AsyncStates.Pending
  | AsyncStates.Success
  | AsyncStates.Fail;

export default AsyncStatus;
