import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import RootLayout from './layout/RootLayout';
import Home from './components/Home/Home';
import ErrorPage from './Pages/ErrorPage';
import AllModels from './Pages/AllModels';
import AddModel from './Pages/AddModel';
import AuthProvider from './context/AuthProvider';
import Register from './components/Register/Register';
import MyModels from './components/MyModels/MyModels';
import MyModelPurchase from './components/My Model Purchase/MyModelPurchase';

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children: [
      {
        index: true,
        Component:Home,
      },
      {
        path: "add-model",
        Component:AddModel,
      },
      {path: "models",
        Component:AllModels,
      },
      {
        path:"register",
        Component:Register,
      },
      {
        path:"myModels",
        element:<MyModels></MyModels>,
      },
      {
        path:"myModelPurchase",
        element:<MyModelPurchase></MyModelPurchase>,
      }
    ]
  },
  {
    path: "/*",
    Component:ErrorPage,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
