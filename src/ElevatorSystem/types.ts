export type ElevatorEntity = {
  id: number;
  currentFloor: number;
  targetFloors: TargetFloor[];
  direction: number;
  status: number;
  doorStatus: number;
  requestDirection: number;
  move: (
    updateState: (id: number, changes: Partial<ElevatorEntity>) => void
  ) => void;
};

export type RequestElevator = {
  currentUserFloor: number;
  direction: number;
};

export type RequestFloor = {
  currentFloor: number;
  direction: number;
  pickingFloors: number[];
};

export type TargetFloor = {
  floor: number;
  direction: number;
  requestType: number;
};
