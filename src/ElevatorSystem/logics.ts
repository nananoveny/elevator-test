import { FLOORS } from "./constants";
import { DIRECTION, DOOR_STATUS, ELEVATOR_STATUS, REQUEST_TYPE } from "./enum";
import { ElevatorEntity, TargetFloor } from "./types";

export const closeElevatorDoor = (elevator: ElevatorEntity) => {
  const nextDirection = getNextDirection(elevator);
  const nextTargetFloors = elevator.targetFloors.slice(1);
  const nextStatus =
    nextTargetFloors.length > 0 ? ELEVATOR_STATUS.MOVING : ELEVATOR_STATUS.WAIT;

  return {
    ...elevator,
    doorStatus: DOOR_STATUS.CLOSE,
    targetFloors: sortTargetFloors(elevator, nextTargetFloors),
    direction: nextDirection,
    status: nextStatus,
  };
};

export const getNextDirection = (elevator: ElevatorEntity) => {
  if (elevator.currentFloor === 0) return DIRECTION.UP;
  if (elevator.currentFloor === FLOORS - 1) return DIRECTION.DOWN;
  if (elevator.targetFloors.length === 2) {
    return elevator.targetFloors[1].floor > elevator.currentFloor
      ? DIRECTION.UP
      : DIRECTION.DOWN;
  }

  return elevator.direction;
};

export const isElevatorAvailable = (
  elevator: ElevatorEntity,
  currentFloor: number,
  direction: DIRECTION
): boolean => {
  if (elevator.direction === DIRECTION.IDLE) return true;

  const isSameDirection = elevator.direction === direction;
  const isOnTheWay =
    (direction === DIRECTION.UP && elevator.currentFloor <= currentFloor) ||
    (direction === DIRECTION.DOWN && elevator.currentFloor >= currentFloor);

  return isSameDirection && isOnTheWay;
};

export const sortTargetFloors = (
  elevator: ElevatorEntity,
  targetFloors: TargetFloor[]
) => {
  return targetFloors.sort((_, __): number => {
    if (elevator.direction === DIRECTION.DOWN) {
      return __.floor - _.floor;
    }

    if (elevator.direction === DIRECTION.UP) {
      return _.floor - __.floor;
    }

    return 0;
  });
};

export const updateElevatorWithRequest = (
  elevator: ElevatorEntity,
  floor: number,
  direction: DIRECTION
) => {
  const newRequest = { floor, direction, requestType: REQUEST_TYPE.OUTSIDE };

  return {
    ...elevator,
    targetFloors: sortTargetFloors(elevator, [
      ...elevator.targetFloors,
      newRequest,
    ]),
    requestDirection: direction,
    direction:
      elevator.direction === DIRECTION.IDLE ? direction : elevator.direction,
    status: ELEVATOR_STATUS.MOVING,
  };
};

export const floorsByDirection = (elevator: ElevatorEntity) => {
  const sameDirectionFloors = elevator.targetFloors.filter(
    (target) => target.direction === elevator.direction
  );
  const oppositeDirectionFloors = elevator.targetFloors.filter(
    (target) => target.direction !== elevator.direction
  );
  return [sameDirectionFloors, oppositeDirectionFloors];
};

export const handleFloorRequest = (elevator: ElevatorEntity, floor: number) => {
  const isFloorAlreadyRequested = elevator.targetFloors.some(
    (target) => target.floor === floor
  );

  const updatedTargetFloors = isFloorAlreadyRequested
    ? updateExistingRequest(elevator.targetFloors, floor)
    : addNewRequest(elevator, floor);

  return {
    ...elevator,
    targetFloors: sortTargetFloors(elevator, updatedTargetFloors),
  };
};

const updateExistingRequest = (targetFloors: TargetFloor[], floor: number) =>
  targetFloors.map((target) =>
    target.floor === floor
      ? { ...target, requestType: REQUEST_TYPE.DUAL }
      : target
  );

const addNewRequest = (elevator: ElevatorEntity, floor: number) => [
  ...elevator.targetFloors,
  {
    floor,
    direction: elevator.currentFloor < floor ? DIRECTION.UP : DIRECTION.DOWN,
    requestType: REQUEST_TYPE.INSIDE,
  },
];
