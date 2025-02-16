import { DOOR_STATUS, ELEVATOR_STATUS, DIRECTION } from "./enum";
import { ElevatorEntity, TargetFloor } from "./types";

const createElevator = (id: number) => ({
  id,
  currentFloor: 0,
  targetFloors: [],
  requestDirection: DIRECTION.IDLE,
  direction: DIRECTION.IDLE,
  status: ELEVATOR_STATUS.WAIT,
  doorStatus: DOOR_STATUS.CLOSE,

  move(updateState: (id: number, changes: Partial<ElevatorEntity>) => void) {
    if (this.doorStatus === DOOR_STATUS.OPEN) {
      return;
    }

    if (this.targetFloors.length === 0) {
      updateState(this.id, {
        status: ELEVATOR_STATUS.WAIT,
        direction: DIRECTION.IDLE,
        requestDirection: DIRECTION.IDLE,
      });
      return;
    }

    const targetFloor: TargetFloor = this.targetFloors[0];

    if (this.currentFloor < targetFloor.floor) {
      updateState(this.id, {
        currentFloor: this.currentFloor + 1,
        direction: DIRECTION.UP,
        status: ELEVATOR_STATUS.MOVING,
      });
      return;
    }
    if (this.currentFloor > targetFloor.floor) {
      updateState(this.id, {
        currentFloor: this.currentFloor - 1,
        direction: DIRECTION.DOWN,
        status: ELEVATOR_STATUS.MOVING,
      });
      return;
    }

    if (this.currentFloor === targetFloor.floor) {
      updateState(this.id, {
        doorStatus: DOOR_STATUS.OPEN,
        status: ELEVATOR_STATUS.WAIT,
      });
      return;
    }
  },
});

export default createElevator;
