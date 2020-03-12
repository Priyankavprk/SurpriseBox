const initialState = {
    position: [0, 0],
    spriteLocation:  '0px 0px',
    direction: 'East',
    walkIndex: 0,
    treasureFound: false,
}

const playerReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'MOVE_PLAYER':
            return {
                ...action.payload,
            }
        case 'TREASURE_FOUND':{
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}

export default playerReducer