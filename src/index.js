import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './config/store'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Video from './features/video'

ReactDOM.render(<Provider store={store}>
        <Router>
            <Route path='/us' component={Video} />
            <Route path='/' exact component={App} />
        </Router>    
    </Provider>, document.getElementById('root'))


