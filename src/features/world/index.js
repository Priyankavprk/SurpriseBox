import React from 'react'
import Player from '../player'
import Map from '../map'
import { connect } from 'react-redux'
import { tiles } from '../../data/maps/1'
import store from '../../config/store'
import { useHistory } from "react-router-dom";

function World(props) {
    !props.treasureFound && store.dispatch({ type: 'ADD_TILES', payload: {
        tiles
    }})
    const history = useHistory()
    return (
        <div
            style={{
                position: 'relative',
                width: '800px',
                height: '400px',
                margin: '20px auto',
            }}
        >
            {!props.treasureFound &&
                <div style={{display: !props.treasureFound ? '' : 'none'}}>
                    <Map />
                    <Player />
                </div>
            }
            {/* Add vedio into the folder features/video and uncomment below line for the surprise box */}
            {/* {props.treasureFound && window.location.href.split('/')[3] !== 'us' &&
                history.push("/us")
            } */}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        treasureFound: state.player.treasureFound
    }
}

export default connect(mapStateToProps)(World)