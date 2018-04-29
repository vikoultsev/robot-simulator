import { DIRECTION_NORTH, DIRECTION_EAST, DIRECTION_SOUTH, DIRECTION_WEST } from '../constants/directions';
import { COMMAND_MOVE, COMMAND_LEFT, COMMAND_RIGHT } from '../constants/commands';

export default (currentPosition, nextPosition) => {
	let {x: currentX, y: currentY, direction: currentDirection } = currentPosition;
	const {x: nextX, y: nextY, direction: nextDirection } = nextPosition;
	const diffX = nextX - currentX;
	const diffY = nextY - currentY;
	const steps = [];

	if (diffX > 0) {
		switch (currentDirection) {
		case DIRECTION_NORTH:
			steps.push(COMMAND_RIGHT)
			break;
		case DIRECTION_EAST:
			break;
		case DIRECTION_SOUTH:
			steps.push(COMMAND_LEFT)
			break;
		case DIRECTION_WEST:
			steps.push(COMMAND_LEFT, COMMAND_LEFT);
			break;
		default:
			break;
		}

		for (let index = 0; index < diffX; index++) {
			steps.push(COMMAND_MOVE);
		}

		currentDirection = DIRECTION_EAST;
	}

	if (diffX < 0) {
		switch (currentDirection) {
		case DIRECTION_NORTH:
			steps.push(COMMAND_LEFT)
			break;
		case DIRECTION_EAST:
			steps.push(COMMAND_RIGHT, COMMAND_RIGHT);
			break;
		case DIRECTION_SOUTH:
			steps.push(COMMAND_RIGHT)
			break;
		case DIRECTION_WEST:
			break;
		default:
			break;
		}

		for (let index = 0; index > diffX; index--) {
			steps.push(COMMAND_MOVE)
		}

		currentDirection = DIRECTION_WEST;
	}

	if (diffY > 0) {
		switch (currentDirection) {
		case DIRECTION_NORTH:
			break;
		case DIRECTION_EAST:
			steps.push(COMMAND_LEFT)
			break;
		case DIRECTION_SOUTH:
			steps.push(COMMAND_RIGHT, COMMAND_RIGHT);
			break;
		case DIRECTION_WEST:
			steps.push(COMMAND_RIGHT);
			break;
		default:
			break;
		}

		for (let index = 0; index < diffY; index++) {
			steps.push(COMMAND_MOVE);
		}

		currentDirection = DIRECTION_NORTH;
	}

	if (diffY < 0) {
		switch (currentDirection) {
		case DIRECTION_NORTH:
			steps.push(COMMAND_LEFT, COMMAND_LEFT);
			break;
		case DIRECTION_EAST:
			steps.push(COMMAND_RIGHT)
			break;
		case DIRECTION_SOUTH:
			break;
		case DIRECTION_WEST:
			steps.push(COMMAND_LEFT);
			break;
		default:
			break;
		}

		for (let index = 0; index > diffY; index--) {
			steps.push(COMMAND_MOVE);
		}

		currentDirection = DIRECTION_SOUTH;
	}

	if (currentDirection === DIRECTION_NORTH) {
		switch (nextDirection) {
		case DIRECTION_NORTH:
			break;
		case DIRECTION_EAST:
			steps.push(COMMAND_RIGHT);
			break;
		case DIRECTION_SOUTH:
			steps.push(COMMAND_RIGHT, COMMAND_RIGHT);
			break;
		case DIRECTION_WEST:
			steps.push(COMMAND_LEFT);
			break;
		default:
			break;
		}
	}

	if (currentDirection === DIRECTION_EAST) {
		switch (nextDirection) {
		case DIRECTION_NORTH:
			steps.push(COMMAND_LEFT);
			break;
		case DIRECTION_EAST:
			break;
		case DIRECTION_SOUTH:
			steps.push(COMMAND_RIGHT);
			break;
		case DIRECTION_WEST:
			steps.push(COMMAND_LEFT, COMMAND_LEFT);
			break;
		default:
			break;
		}
	}

	if (currentDirection === DIRECTION_SOUTH) {
		switch (nextDirection) {
		case DIRECTION_NORTH:
			steps.push(COMMAND_RIGHT, COMMAND_RIGHT);
			break;
		case DIRECTION_EAST:
			steps.push(COMMAND_LEFT);
			break;
		case DIRECTION_SOUTH:
			break;
		case DIRECTION_WEST:
			steps.push(COMMAND_RIGHT);
			break;
		default:
			break;
		}
	}

	if (currentDirection === DIRECTION_WEST) {
		switch (nextDirection) {
		case DIRECTION_NORTH:
			steps.push(COMMAND_RIGHT);
			break;
		case DIRECTION_EAST:
			steps.push(COMMAND_LEFT, COMMAND_LEFT);
			break;
		case DIRECTION_SOUTH:
			steps.push(COMMAND_LEFT);
			break;
		case DIRECTION_WEST:
			break;
		default:
			break;
		}
	}
	
	return steps;
};
