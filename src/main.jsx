import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from '../src/AdminPanel/Store/Store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="907716263386-aa3ssqua2jurap1vtgqloge7p1od17hk.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>;
  </StrictMode>,
)


  