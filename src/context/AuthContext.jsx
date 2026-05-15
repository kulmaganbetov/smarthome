import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'smarthomekz-auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = async (username, password) => {
    await new Promise((r) => setTimeout(r, 900))
    if (username === 'admin' && password === 'admin') {
      const profile = {
        username: 'admin',
        role: 'Security Architect',
        clearance: 'OMEGA',
        loginAt: new Date().toISOString(),
      }
      setUser(profile)
      return { ok: true }
    }
    return { ok: false, error: 'Invalid credentials. Access denied.' }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
