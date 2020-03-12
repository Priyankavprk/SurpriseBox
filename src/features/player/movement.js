import store from '../../config/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants'

export default function handleMovement(player) {
    function getNewPosition(oldPos, direction) {
        switch(direction) {
            case 'West':
                return [ oldPos[0]-SPRITE_SIZE, oldPos[1]]
            case 'East':
                return [ oldPos[0]+SPRITE_SIZE, oldPos[1]]   
            case 'North':
                return [ oldPos[0], oldPos[1]-SPRITE_SIZE]
            case 'South':
                 return [ oldPos[0], oldPos[1]+SPRITE_SIZE]
        }
    }

    function observeImpossible(oldPos, newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        if (nextTile === 4) {
            store.dispatch({
                type: 'TREASURE_FOUND',
                payload: {
                    treasureFound: true,
                }
            })
        }
        return nextTile < 5
    }

    function getWalkIndex() {
        const walkIndex = store.getState().player.walkIndex
        return walkIndex >= 7 ? 0 : walkIndex + 1
    }

    function attemptMove(direction){
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)
        if(observerBoundaries(oldPos, newPos) && observeImpossible(oldPos, newPos))
            dispatchMove(direction, newPos)
    }

    function getSpriteLocation(direction, walkIndex) {
        switch(direction) {
            case 'South':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`
            case 'East':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`
            case 'West':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`
            case 'North':
                return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`
        }
    }

    function observerBoundaries(oldPos, newPos) {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) && 
               (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
    }

    function dispatchMove (direction, newPos) {
        const walkIndex = getWalkIndex()
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: newPos,
                direction,
                walkIndex,
                spriteLocation: getSpriteLocation(direction, walkIndex)
            }
        })
    }

    function handleKeyDown (e) {
        e.preventDefault()
        switch(e.keyCode) {
            case 37:
                return attemptMove('West')
            case 38:
                    return attemptMove('North')
            case 39:
                    return attemptMove('East')
            case 40:
                return attemptMove('South')
            default:
                console.log(e.keyCode)
        }
    }
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })
    return player
}