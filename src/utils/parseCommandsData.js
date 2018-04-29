import { VALID_DIRECTIONS } from '../constants/directions';
import { COMMAND_PLACE, COMMAND_MOVE, COMMAND_LEFT, COMMAND_RIGHT, COMMAND_REPORT } from '../constants/commands';

export default (data) => {
	if (!data) {
		throw new Error('No commands!');
	}

	const parsedCommandsArr = data
		.split('\n')
		.map(instruction => instruction.toUpperCase())
		.reduce(checkCommandValidation, []);

	if (!parsedCommandsArr.length) {
		throw new Error('No valid commands!');
	}

	return parsedCommandsArr;
}

const checkCommandValidation = (commandsList, command) => {
	const parsedInstruction = parseCommandString(command);
	if (parsedInstruction) {
		commandsList.push(parsedInstruction);
	}
	return commandsList;
}

const parseCommandString = command => {
	const commandElements = command.split(' ');
	const isPlaceCommand = commandElements.length > 1 && commandElements[0] === COMMAND_PLACE;

	if (isPlaceCommand) {
		return parsePlaceCommand(commandElements);
	}

	if ([COMMAND_MOVE, COMMAND_LEFT, COMMAND_RIGHT, COMMAND_REPORT].includes(command)) {
		return { command };
	}
}

const parsePlaceCommand = commandElements => {
	const paramsArr = commandElements[1].split(',');
	const x = parseInt(paramsArr[0], 10);
	const y = parseInt(paramsArr[1], 10);
	const direction = paramsArr[2];

	if (!isNaN(x) && !isNaN(y) && VALID_DIRECTIONS.includes(direction)) {
		return {
			command: COMMAND_PLACE,
			params: {x, y, direction}
		};
	}
	else {
		return null;
	}
}
