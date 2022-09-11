import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to='/v1' replace />} />
        <Route path='/v1' element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
