import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import store from './redux/store.js'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from "./redux/store.js"
import ThemeProvider from './components/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
)
