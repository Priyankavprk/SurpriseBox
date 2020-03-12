import React from 'react'
import Player from '../player'
import Map from '../map'
import { connect } from 'react-redux'
import { tiles } from '../../data/maps/1'
import store from '../../config/store'
// import videos from './us.mp4' import the video once added

function Video(props) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '100%',
                height: '100%'

            }}
        >  
        {/* Uncomment below code after adding the video */}
                {/* <video className="video-container video-container-overlay" autoPlay={true} loop={true} muted="" data-reactid=".0.1.0.0">
                    <source type="video/mp4" data-reactid=".0.1.0.0.0" src={videos}/>
                </video> */}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        treasureFound: state.player.treasureFound
    }
}

export default connect(mapStateToProps)(Video)