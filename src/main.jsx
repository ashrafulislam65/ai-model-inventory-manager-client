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
import ModelDetails from './components/ModelDetails/ModelDetails';
import UpdateModel from './components/UpdateModel/UpdateModel';
import LogIn from './components/LogIn/LogIn';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Loader from './components/Loader';

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
        element:<PrivateRoute>
          <AddModel></AddModel>
        </PrivateRoute>,
      },
      {path: "models",
        Component:AllModels,
      },
      {
        path:"register",
        Component:Register,
      },
      {
        path:"login",
        Component:LogIn,
      },
      {
        path:"myModels",
        element:<PrivateRoute>
          <MyModels></MyModels>
        </PrivateRoute>,
      },
      {
        path:"myModelPurchase",
        element:<PrivateRoute>
          <MyModelPurchase></MyModelPurchase>
        </PrivateRoute>,
      },
      {
        path: "modelDetails/:id",
        loader:({params})=>fetch(`https://ai-inventory-model-manager-server.vercel.app/models/${params.id}`),
        hydrateFallbackElement:<Loader></Loader>,
        element:<PrivateRoute>
          <ModelDetails></ModelDetails>
        </PrivateRoute>,
      },
      {
        path: "update-model/:id",
        element:<PrivateRoute>
          <UpdateModel></UpdateModel>
        </PrivateRoute>,
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
