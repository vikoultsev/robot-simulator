import { createAction, createReducer } from 'redux-act';
import { DIRECTION_NORTH, DIRECTION_EAST, DIRECTION_SOUTH, DIRECTION_WEST, DIRECTIONS_MAP } from '../constants/directions';
import { COMMAND_PLACE, COMMAND_MOVE, COMMAND_LEFT, COMMAND_RIGHT, COMMAND_REPORT } from '../constants/commands';
import parseCommandsData from '../utils/parseCommandsData';
import createSteps from '../utils/createSteps';

const initialState = {
    robotPlaced: false,
    commandsList: [],
    currentPosition: {
        x: 0,
        y: 0,
        direction: DIRECTION_NORTH,
        rotationAngle: 0,
    },
    nextPosition: null,
    steps: [],
    isFirstPlaceStep: false,
    error: null,
    report: false,
    movement: false,
};

const tableSize = { x: 5, y: 5 };

export const setCommandList = createAction('PLACE/SET_COMMAND_LIST');

const handleCommandList = (state, data) => ({
    ...state,
    commandsText: data,
    commandsList: parseCommandsData(data),
    error: null
})

export const catchError = createAction('PLACE/CATCH_ERROR');

const handleCatchError = (state, error) => ({
    ...state,
    error: error.message,
})

export const makeMovementStep = createAction('PLACE/MAKE_MOVEMENT_STEP');

const handleMakeMovementStep = (state, command) => {
    const nextPosition = state.nextPosition || state.currentPosition;
    switch (command.command) {
    case COMMAND_PLACE:
        if (command.params.x <= tableSize.x || command.params.y <= tableSize.y) {
            return {
                ...state,
                nextPosition: {
                    ...state.currentPosition,
                    x: command.params.x,
                    y: command.params.y,
                    direction: command.params.direction,
                },
                steps: createSteps(state.currentPosition, command.params),
                robotPlaced: true,
                isFirstPlaceStep: true,
                movement: true,
                report: false,
                error: null
            };
        }
        else {
            return {
                ...state,
                error: `The ${command.command} command can not be executed!`
            }
        }
    case COMMAND_MOVE:
        switch (state.currentPosition.direction) {
        case DIRECTION_NORTH:
            if (state.currentPosition.y + 1 < tableSize.y) {
                return {
                    ...state,
                    report: false,
                    movement: true,
                    steps: state.steps.filter((step, index) => index !== 0),
                    isFirstPlaceStep: false,
                    currentPosition: {
                        ...state.currentPosition,
                        y: state.currentPosition.y + 1
                    }
                }
            }
            else {
                return {
                    ...state,
                    error: `The ${command.command} command can not be executed!`
                }
            }
        case DIRECTION_EAST:
            if (state.currentPosition.x + 1 < tableSize.x) {
                return {
                    ...state,
                    report: false,
                    movement: true,
                    steps: state.steps.filter((step, index) => index !== 0),
                    isFirstPlaceStep: false,
                    currentPosition: {
                        ...state.currentPosition,
                        x: state.currentPosition.x + 1
                    }
                }
            }
            else {
                return {
                    ...state,
                    error: `The ${command.command} command can not be executed!`
                }
            }
        case DIRECTION_SOUTH:
            if (state.currentPosition.y - 1 >= 0) {
                return {
                    ...state,
                    report: false,
                    movement: true,
                    steps: state.steps.filter((step, index) => index !== 0),
                    isFirstPlaceStep: false,
                    currentPosition: {
                        ...state.currentPosition,
                        y: state.currentPosition.y - 1
                    }
                }
            }
            else {
                return {
                    ...state,
                    error: `The ${command.command} command can not be executed!`
                }
            }
        case DIRECTION_WEST:
            if (state.currentPosition.x - 1 >= 0) {
                return {
                    ...state,
                    report: false,
                    movement: true,
                    steps: state.steps.filter((step, index) => index !== 0),
                    isFirstPlaceStep: false,
                    currentPosition: {
                        ...state.currentPosition,
                        x: state.currentPosition.x - 1
                    }
                }
            }
            else {
                return {
                    ...state,
                    error: `The ${command.command} command can not be executed!`
                }
            }
        default:
            return state;
        }
    case COMMAND_LEFT:
        return {
            ...state,
            report: false,
            movement: true,
            steps: state.steps.filter((step, index) => index !== 0),
            isFirstPlaceStep: false,
            currentPosition: {
                ...state.currentPosition,
                direction: DIRECTIONS_MAP[state.currentPosition.direction][COMMAND_LEFT],
                rotationAngle: state.currentPosition.rotationAngle - 90
            },
            nextPosition: {
                ...nextPosition,
                direction: DIRECTIONS_MAP[state.currentPosition.direction][COMMAND_LEFT],
                rotationAngle: state.currentPosition.rotationAngle - 90
            }
        }
    case COMMAND_RIGHT:
        return {
            ...state,
            report: false,
            movement: true,
            steps: state.steps.filter((step, index) => index !== 0),
            isFirstPlaceStep: false,
            currentPosition: {
                ...state.currentPosition,
                direction: DIRECTIONS_MAP[state.currentPosition.direction][COMMAND_RIGHT],
                rotationAngle: state.currentPosition.rotationAngle + 90
            },
            nextPosition: {
                ...nextPosition,
                direction: DIRECTIONS_MAP[state.currentPosition.direction][COMMAND_RIGHT],
                rotationAngle: state.currentPosition.rotationAngle + 90
            }
        }
    case COMMAND_REPORT:
        return {
            ...state,
            report: true
        }
    default:
        return state;
    }
}

export const finishMovement = createAction('PLACE/FINISH_MOVEMENT');

const handleFinishMovement = (state, position) => ({
    ...state,
    commandsList: state.commandsList.filter((command, index) => index !== 0),
    isFirstPlaceStep: false,
    movement: false,
    currentPosition: state.nextPosition || state.currentPosition,
    nextPosition: null
})

const reducer = createReducer(on => {
    on(setCommandList, handleCommandList);
    on(catchError, handleCatchError);
    on(makeMovementStep, handleMakeMovementStep);
    on(finishMovement, handleFinishMovement);
}, initialState);

reducer.key = 'place';

export default reducer;
