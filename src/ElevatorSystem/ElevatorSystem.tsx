import { useEffect, useState } from "react";

import createElevator from "./elevator";
import Elevator from "./components/Elevator";
import ElevatorPanel from "./components/ElevatorPanel";
import { ELEVATORS, FLOORS } from "./constants";
import { DIRECTION, DOOR_STATUS } from "./enum";
import { ElevatorEntity, RequestElevator } from "./types";
import {
  closeElevatorDoor,
  floorsByDirection,
  getNextDirection,
  handleFloorRequest,
  isElevatorAvailable,
  sortTargetFloors,
  updateElevatorWithRequest,
} from "./logics";

const initElevator = Array.from({ length: ELEVATORS }, (_, index) =>
  createElevator(index)
);

const ElevatorSystem = () => {
  const [elevators, setElevators] = useState<ElevatorEntity[]>(initElevator);

  const onUpdateElevator = (elevatorId: number, values: object) => {
    setElevators((prev) =>
      prev.map((_) => (_.id === elevatorId ? { ..._, ...values } : _))
    );
  };

  const requestElevator = ({
    currentUserFloor,
    direction,
  }: RequestElevator) => {
    const nearestElevator = findNearestElevator(currentUserFloor, direction);
    if (!nearestElevator) return;

    setElevators((prevElevators) =>
      prevElevators.map((elevator) =>
        elevator.id === nearestElevator.id
          ? updateElevatorWithRequest(elevator, currentUserFloor, direction)
          : elevator
      )
    );
  };

  const moveElevators = () => {
    setElevators((prevElevators) => {
      return prevElevators.map((elevator) => {
        const updatedElevator = { ...elevator };

        updatedElevator.move(onUpdateElevator);
        const nextDirection = getNextDirection(elevator);

        const [sameDirectionFloors, oppositeDirectionFloors] =
          floorsByDirection(elevator);

        return {
          ...updatedElevator,
          direction: nextDirection,
          targetFloors: [
            ...sortTargetFloors(elevator, sameDirectionFloors),
            ...sortTargetFloors(elevator, oppositeDirectionFloors),
          ],
        };
      });
    });
  };

  const requestFloorInsideElevator = (elevatorId: number, floor: number) => {
    setElevators((prevElevators) =>
      prevElevators.map((elevator) =>
        elevator.id === elevatorId
          ? handleFloorRequest(elevator, floor)
          : elevator
      )
    );
  };

  const findNearestElevator = (
    currentFloor: number,
    direction: DIRECTION
  ): ElevatorEntity | null => {
    let bestElevator: ElevatorEntity | null = null;
    let minDistance = Infinity;

    elevators.forEach((elevator) => {
      const distance = Math.abs(elevator.currentFloor - currentFloor);

      if (
        isElevatorAvailable(elevator, currentFloor, direction) &&
        distance < minDistance
      ) {
        bestElevator = elevator;
        minDistance = distance;
      }
    });

    return bestElevator;
  };

  const manualCloseDoor = (elevatorId: number) => {
    setElevators((prevElevators) =>
      prevElevators.map((elevator) =>
        elevator.id === elevatorId && elevator.doorStatus === DOOR_STATUS.OPEN
          ? closeElevatorDoor(elevator)
          : elevator
      )
    );
  };

  useEffect(() => {
    const hasMovingElevator = elevators.some(
      (elevator) => elevator.targetFloors.length
    );

    if (!hasMovingElevator) return;

    const interval = setInterval(moveElevators, 500);

    return () => clearInterval(interval);
  });

  return (
    <div className="flex">
      <div className="flex flex-col-reverse">
        {Array.from({ length: FLOORS }, (_, floorIndex) => (
          <div key={floorIndex} className="flex space-x-3">
            {elevators.map((elevator, elevatorIndex) => (
              <Elevator
                key={`${elevatorIndex}.${floorIndex}`}
                elevatorIndex={elevatorIndex}
                floorIndex={floorIndex}
                elevator={elevator}
                requestElevator={requestElevator}
              />
            ))}
          </div>
        ))}
      </div>
      {elevators.map((elevator, index) => (
        <ElevatorPanel
          key={index}
          elevator={elevator}
          manualCloseDoor={manualCloseDoor}
          requestFloor={requestFloorInsideElevator}
        />
      ))}
    </div>
  );
};

export default ElevatorSystem;
