import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider} from 'react-router'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import AppProviders from './context/AppContextProvider.tsx'
import { router } from './appRouter.tsx'
import { ToastContainer } from 'react-toastify'





createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppProviders>
        <ToastContainer/>
        <RouterProvider router={router}/>
      </AppProviders>
    </Provider>
  </StrictMode>,
)
