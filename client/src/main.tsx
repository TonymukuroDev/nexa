import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import HomePage from './pages/home/Home.tsx'
import LoginPage from './pages/auth/login/Login.tsx'
import RegisterPage from './pages/auth/register/Register.tsx'
import CommunitiesPage from './pages/communities/Communities.tsx'
import ContactsPage from './pages/contacts/Contacts.tsx'
import ProfilePage from './pages/profile/Profile.tsx'
import SettingsPage from './pages/settings/Settings.tsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage/>
  },
  {
    path: 'register',
    element: <RegisterPage/>
  },
  {
    path: 'home',
    element: <HomePage/>
  },
  {
    path: '/communities',
    element: <CommunitiesPage/>
  },
  {
    path: '/contacts',
    element: <ContactsPage/>
  },
  {
    path: '/settings',
    element: <SettingsPage/>
  },
  {
    path: '/profile',
    element: <ProfilePage/>
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
