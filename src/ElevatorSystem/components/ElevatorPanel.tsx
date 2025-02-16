import { Button, Card } from "antd";

import { ElevatorEntity } from "../types";
import { FLOORS } from "../constants";
import { DIRECTION, DOOR_STATUS, ELEVATOR_STATUS, REQUEST_TYPE } from "../enum";

type Props = {
  elevator: ElevatorEntity;
  requestFloor: (elevatorId: number, floor: number) => void;
  manualCloseDoor: (elevatorId: number) => void;
};

const ElevatorPanel = ({ elevator, requestFloor, manualCloseDoor }: Props) => {
  return (
    <Card title="Elevator Control Panel" style={{ width: 300 }}>
      <div className="flex flex-col  space-y-4">
        <div className="flex flex-col font-bold">
          <span>ElevatorID: {elevator?.id}</span>
          <span>Current Floor: {elevator?.currentFloor + 1}</span>
          <span>Status: {ELEVATOR_STATUS[elevator?.status]}</span>
          <span>Door Status: {DOOR_STATUS[elevator?.doorStatus]}</span>
          <span>Direction: {DIRECTION[elevator?.direction]}</span>

          <span>
            Target Floors:{" "}
            {elevator?.targetFloors
              .map(
                (_) =>
                  _.floor +
                  1 +
                  "-" +
                  DIRECTION[_.direction] +
                  "-" +
                  REQUEST_TYPE[_.requestType]
              )
              .join(", ")}
          </span>
        </div>

        {elevator?.doorStatus === DOOR_STATUS.OPEN && (
          <>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: FLOORS }, (_, index) => FLOORS - index).map(
                (floorNumber) => {
                  const floorIndex = floorNumber - 1;
                  const targetInfoOnFloor = elevator.targetFloors.find(
                    (_) => _.floor === floorIndex
                  );
                  const isRequestInside =
                    targetInfoOnFloor?.requestType === REQUEST_TYPE.INSIDE;
                  const isRequestDual =
                    targetInfoOnFloor?.requestType === REQUEST_TYPE.DUAL;

                  const displayType =
                    targetInfoOnFloor && (isRequestInside || isRequestDual)
                      ? "primary"
                      : "default";

                  return (
                    <Button
                      key={floorIndex}
                      type={displayType}
                      onClick={() => requestFloor(elevator?.id, floorIndex)}
                    >
                      {floorNumber}
                    </Button>
                  );
                }
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                type="default"
                onClick={() => manualCloseDoor(elevator?.id)}
              >
                {"> <"}
              </Button>
              <Button type="default">{"< >"}</Button>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default ElevatorPanel;
