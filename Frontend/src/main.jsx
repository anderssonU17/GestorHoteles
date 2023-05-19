import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'

import './styles.css'
import { HotelApp } from './HotelApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <HotelApp />
    </BrowserRouter>
  </React.StrictMode>,
)
