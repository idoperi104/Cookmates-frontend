
export const SET_ROBOTS = 'SET_ROBOTS'
export const ADD_ROBOT = 'ADD_ROBOT'
export const REMOVE_ROBOT = 'REMOVE_ROBOT'
export const UPDATE_ROBOT = 'UPDATE_ROBOT'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const INITIAL_STATE = {
    robots: null,
    filterBy: {
        model: '',
        type: '',
        minBatteryStatus: '',
        maxBatteryStatus: '',
    }
}

export function robotReducer(state = INITIAL_STATE, action = {}) {

    switch (action.type) {
        case SET_ROBOTS:
            return {
                ...state,
                robots: action.robots
            }
        case ADD_ROBOT:
            return {
                ...state,
                robots: [...state.robots, action.robot]
            }
        case REMOVE_ROBOT:
            return {
                ...state,
                robots: state.robots.filter(robot => robot._id !== action.robotId)
            }
        case UPDATE_ROBOT:
            return {
                ...state,
                robots: state.robots.map(robot => robot._id === action.robot._id ? action.robot : robot)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }

        default:
            return state;
    }
}