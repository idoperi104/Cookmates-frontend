import { robotService } from "../../services/robot.service"
import { REMOVE_ROBOT, SET_FILTER_BY, SET_ROBOTS } from "../reducers/robot.reducer"

export function loadRobots() {
    return async (dispatch, getState) => {
        try {
            const robots = await robotService.query(getState().robotModule.filterBy)
            const action = {
                type: SET_ROBOTS,
                robots
            }
            dispatch(action)
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function removeRobot(robotId) {
    return async (dispatch) => {
        try {
            await robotService.remove(robotId)
            const action = { type: REMOVE_ROBOT, robotId }
            dispatch(action)
            return 'Removed!'
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function setFilterBy(filterBy) {
    return (dispatch) => {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }
}