import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import Root from './routes/root.jsx';
import ErrorPage from './routes/error-page.jsx';
import Clock from './Clock.jsx';
import ApiFetcher from './ApiFetcher.jsx';
import Names from './Names.jsx';
import App from './App.jsx';
import NamePicker from './NamePicker.jsx';
import DelayedResult from './DelayFetcher.jsx';
import Hello from './hello.jsx';
import SCalculator from './SCalculator.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "App",
        element: <App />,
      },
      {
        path: "Clock",
        element: <Clock />,
      }, 
      {
        path: "ApiFetcher",
        element: <ApiFetcher />
      },
      {
        path: "DelayFetcher",
        element: <DelayedResult />
      },
      {
        path: "NamePicker",
        element: <NamePicker />
      },
      {
        path: "Names",
        element: <Names />
      },
      {
        path: "hello",
        element: <Hello />
      },
      {
        path: "SCalculator",
        element: <SCalculator />
      }
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)