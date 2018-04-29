import { COMMAND_LEFT, COMMAND_RIGHT } from '../constants/commands';

export const DIRECTION_NORTH = 'NORTH';

export const DIRECTION_EAST = 'EAST';

export const DIRECTION_SOUTH = 'SOUTH';

export const DIRECTION_WEST = 'WEST';

export const VALID_DIRECTIONS = [DIRECTION_NORTH, DIRECTION_EAST, DIRECTION_SOUTH, DIRECTION_WEST];

export const DIRECTIONS_MAP = {
	[DIRECTION_NORTH]: {
		[COMMAND_LEFT]: DIRECTION_WEST,
		[COMMAND_RIGHT]: DIRECTION_EAST
	},
	[DIRECTION_EAST]: {
		[COMMAND_LEFT]: DIRECTION_NORTH,
		[COMMAND_RIGHT]: DIRECTION_SOUTH
	},
	[DIRECTION_SOUTH]: {
		[COMMAND_LEFT]: DIRECTION_EAST,
		[COMMAND_RIGHT]: DIRECTION_WEST
	},
	[DIRECTION_WEST]: {
		[COMMAND_LEFT]: DIRECTION_SOUTH,
		[COMMAND_RIGHT]: DIRECTION_NORTH
	}
  };
