import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { SecurityProvider } from './context/SecurityContext.jsx'
import LoadingScreen from './components/common/LoadingScreen.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'

const Landing = lazy(() => import('./pages/Landing.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const SmartHome = lazy(() => import('./pages/SmartHome.jsx'))
const NetworkTopology = lazy(() => import('./pages/NetworkTopology.jsx'))
const AIAnalysis = lazy(() => import('./pages/AIAnalysis.jsx'))
const AttackCenter = lazy(() => import('./pages/AttackCenter.jsx'))
const Devices = lazy(() => import('./pages/Devices.jsx'))
const Logs = lazy(() => import('./pages/Logs.jsx'))

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <RequireAuth>
                <SecurityProvider>
                  <DashboardLayout />
                </SecurityProvider>
              </RequireAuth>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/home" element={<SmartHome />} />
            <Route path="/dashboard/network" element={<NetworkTopology />} />
            <Route path="/dashboard/ai" element={<AIAnalysis />} />
            <Route path="/dashboard/attacks" element={<AttackCenter />} />
            <Route path="/dashboard/devices" element={<Devices />} />
            <Route path="/dashboard/logs" element={<Logs />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
