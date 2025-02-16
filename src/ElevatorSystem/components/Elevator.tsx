import clsx from "clsx";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { ElevatorEntity, RequestElevator } from "../types";
import { DIRECTION, DOOR_STATUS, REQUEST_TYPE } from "../enum";
import { FLOORS } from "../constants";

type Props = {
  elevatorIndex: number;
  floorIndex: number;
  requestElevator: ({ currentUserFloor, direction }: RequestElevator) => void;
  elevator: ElevatorEntity;
};

const Elevator = (props: Props) => {
  const { floorIndex, requestElevator, elevator } = props;

  const isElevatorOnFloor = elevator.currentFloor === floorIndex;
  const isElevatorDoorOpenOnFloor =
    elevator.doorStatus === DOOR_STATUS.OPEN && isElevatorOnFloor;
  const isElevatorDoorCloseOnFloor =
    elevator.doorStatus === DOOR_STATUS.CLOSE && isElevatorOnFloor;

  const targetInfoOnFloor = elevator.targetFloors.find(
    (_) => _.floor === floorIndex
  );
  const isTargetInfoOnFloorDirectionUp =
    targetInfoOnFloor?.direction === DIRECTION.UP;
  const isTargetInfoOnFloorDirectionDown =
    targetInfoOnFloor?.direction === DIRECTION.DOWN;
  const isTargetInfoOnFloorRequestOutside =
    targetInfoOnFloor?.requestType === REQUEST_TYPE.OUTSIDE;
  const isTargetInfoOnFloorRequestDual =
    targetInfoOnFloor?.requestType === REQUEST_TYPE.DUAL;

  const isActiveRequestUpButton =
    (targetInfoOnFloor &&
      isTargetInfoOnFloorDirectionUp &&
      (isTargetInfoOnFloorRequestOutside || isTargetInfoOnFloorRequestDual)) ||
    (isElevatorDoorOpenOnFloor &&
      targetInfoOnFloor &&
      isTargetInfoOnFloorDirectionUp);

  const isActiveRequestDownButton =
    (targetInfoOnFloor &&
      isTargetInfoOnFloorDirectionDown &&
      (isTargetInfoOnFloorRequestOutside || isTargetInfoOnFloorRequestDual)) ||
    (isElevatorDoorOpenOnFloor &&
      targetInfoOnFloor &&
      isTargetInfoOnFloorDirectionDown);

  return (
    <div className="flex items-center justify-center h-fit w-52 p-3 bg-gray-200 space-x-3">
      <span className="text-black text-bold">{floorIndex + 1}</span>
      <div
        className={clsx(
          "relative w-[50px] h-[70px]  border-4  rounded-lg flex items-end justify-center p-2 overflow-hidden",
          {
            "border-gray-600": !isElevatorOnFloor,
            "border-yellow-300": isElevatorOnFloor,
          },
          {
            "bg-white": isElevatorDoorOpenOnFloor,
            "bg-gray-800": isElevatorDoorCloseOnFloor,
          }
        )}
      >
        <div className="absolute inset-0 border-4 border-gray-700 rounded-lg" />
        <div
          className={clsx(
            "absolute left-0 top-0 h-full w-1/2 bg-gray-500 border-r-2 border-gray-700 transition-transform duration-500",
            {
              "-translate-x-full": isElevatorDoorOpenOnFloor,
              "translate-x-0": isElevatorDoorCloseOnFloor,
            }
          )}
        ></div>
        <div
          className={clsx(
            "absolute right-0 top-0 h-full w-1/2 bg-gray-500 border-l-2 border-gray-700 transition-transform duration-500",
            {
              "translate-x-full": isElevatorDoorOpenOnFloor,
              "translate-x-0": isElevatorDoorCloseOnFloor,
            }
          )}
        ></div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2">
        {floorIndex + 1 !== FLOORS && (
          <ArrowUpOutlined
            className={clsx(
              "text-xs border-2 p-1 hover:bg-blue-200 cursor-pointer active:bg-blue-400",
              {
                "bg-orange-600": isActiveRequestUpButton,
              }
            )}
            onClick={() =>
              requestElevator({
                currentUserFloor: floorIndex,
                direction: DIRECTION.UP,
              })
            }
          />
        )}
        {floorIndex !== 0 && (
          <ArrowDownOutlined
            className={clsx(
              "text-xs border-2 p-1 hover:bg-blue-200 cursor-pointer active:bg-blue-400",
              {
                "bg-orange-600": isActiveRequestDownButton,
              }
            )}
            onClick={() =>
              requestElevator({
                currentUserFloor: floorIndex,
                direction: DIRECTION.DOWN,
              })
            }
          />
        )}
      </div>
    </div>
  );
};

export default Elevator;
