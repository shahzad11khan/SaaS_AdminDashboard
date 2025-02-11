import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from '../src/AdminPanel/Store/Store.js'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="907716263386-aa3ssqua2jurap1vtgqloge7p1od17hk.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          closeButton={false}
          limit={3}
          toastStyle={{
            fontSize: '11px',
            fontFamily: 'Arial, sans-serif',
            color: 'white',
            width: '220px',
            minHeight: '40px',
            padding: '8px 12px',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            transition: 'all 0.8s ease',
          }}
        />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
)


