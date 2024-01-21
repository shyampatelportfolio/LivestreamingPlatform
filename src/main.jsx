import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HistoryProvider } from './Context/HistoryContext.jsx';




// just set up oauth account old code is just fine


const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="325944126800-7gbjbalc5qr6l14bae9mrepjnm988cp7.apps.googleusercontent.com">
            <BrowserRouter>
                <HistoryProvider>
                    <App />
                </HistoryProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </QueryClientProvider>

)
