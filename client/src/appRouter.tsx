import { createBrowserRouter, Navigate } from "react-router"
import HomePage from './pages/home/Home.tsx'
import LoginPage from './pages/auth/login/Login.tsx'
import RegisterPage from './pages/auth/register/Register.tsx'
import CommunitiesPage from './pages/communities/Communities.tsx'
import ContactsPage from './pages/contacts/Contacts.tsx'
import ProfilePage from './pages/profile/Profile.tsx'
import SettingsPage from './pages/settings/Settings.tsx'
import ProtectedRoute from './components/auth/protectedRoute/ProtectedRoute.tsx'


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute requireAuth={false}>
        <LoginPage/>
      </ProtectedRoute>
    )
  },
  {
    path: 'register',
    element: (
      <ProtectedRoute requireAuth={false}>
        <RegisterPage/>
      </ProtectedRoute>
    )
  },
  {
    path: '/communities',
    element: (
      <ProtectedRoute>
        <CommunitiesPage/>
      </ProtectedRoute>
    )
  },
  {
    path: '/contacts',
    element: (
      <ProtectedRoute>
        <ContactsPage/>
      </ProtectedRoute>
    )
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <SettingsPage/>
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <ProfilePage/>
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }

])