import { useState, useEffect } from 'react'
import type { AppState } from '../types'

const PRIMARY = '#7C3AED'

const DEMO_ACCOUNTS = {
  admin: { username: 'admin', email: 'admin@bharatcart.in', password: 'admin123', label: 'Admin Panel' },
  customer: { username: 'user', email: 'user@demo.com', password: 'user123', label: 'Customer Store' },
} as const

function matchAccount(id: string): 'admin' | 'customer' | null {
  const clean = id.trim().toLowerCase()
  if (clean === DEMO_ACCOUNTS.admin.username || clean === DEMO_ACCOUNTS.admin.email) return 'admin'
  if (clean === DEMO_ACCOUNTS.customer.username || clean === DEMO_ACCOUNTS.customer.email) return 'customer'
  return null
}

export default function AuthPage({ navigate, setLoggedIn, setRole, showToast }: AppState) {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [useOTP, setUseOTP] = useState(true)
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(['', '', '', ''])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [resendIn, setResendIn] = useState(0)
  const [error, setError] = useState('')
  const [forgotSent, setForgotSent] = useState(false)

  useEffect(() => {
    if (resendIn <= 0) return
    const t = setTimeout(() => setResendIn(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendIn])

  const handleSendOTP = () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }
    setError('')
    setOtp(['', '', '', ''])
    setOtpSent(true)
    setResendIn(30)
    showToast(`OTP sent to +91 ${phone}`)
  }

  const resendOTP = () => {
    setOtp(['', '', '', ''])
    setResendIn(30)
    showToast('OTP resent successfully')
  }

  const doLogin = (target: 'user' | 'admin', msg?: string) => {
    setRole(target)
    setLoggedIn(true)
    showToast(msg ?? (target === 'admin' ? 'Welcome back, Admin! 👑' : 'Welcome back! 👋'))
    navigate(target === 'admin' ? 'admin' : 'home')
  }

  const handleOTPChange = (i: number, val: string) => {
    if (val.length > 1) return
    const next = [...otp]
    next[i] = val
    setOtp(next)
    if (val && i < 3) {
      const nextInput = document.getElementById(`otp-${i + 1}`)
      nextInput?.focus()
    }
  }

  const handleLogin = () => {
    if (!useOTP) {
      if (!email.trim()) { setError('Please enter your email or username'); return }
      if (!password) { setError('Please enter your password'); return }
      const match = matchAccount(email)
      if (!match) { setError('Invalid credentials. Use one of the demo accounts below.'); return }
      if (DEMO_ACCOUNTS[match].password !== password) { setError('Incorrect password. Try the demo accounts below.'); return }
      setError('')
      doLogin(match === 'admin' ? 'admin' : 'user', match === 'admin' ? 'Welcome back, Admin! 👑' : 'Welcome back, Rohit! 👋')
      return
    }
    if (!otpSent) {
      setError('Please request an OTP first')
      return
    }
    if (!otp.every(d => d)) {
      setError('Please enter the 4-digit OTP')
      return
    }
    setError('')
    doLogin('user')
  }

  const handleSignup = () => {
    if (name.trim().length < 3) { setError('Please enter your full name'); return }
    if (phone.length !== 10) { setError('Please enter a valid 10-digit mobile number'); return }
    if (!email.includes('@') || !email.includes('.')) { setError('Please enter a valid email address'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setError('')
    doLogin('user', 'Account created! Welcome to BharatCart 🎉')
  }

  const fillDemo = (key: keyof typeof DEMO_ACCOUNTS) => {
    setUseOTP(false)
    setEmail(DEMO_ACCOUNTS[key].email)
    setPassword(DEMO_ACCOUNTS[key].password)
    setError('')
    setMode('login')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-3xl mx-auto mb-3"
            style={{ background: `linear-gradient(135deg, ${PRIMARY}, #EC4899)` }}
          >
            B
          </div>
          <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <span style={{ color: PRIMARY }}>Bharat</span>Cart
          </h1>
          <p className="text-sm text-gray-500 mt-1">India&apos;s favourite marketplace</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Tab switcher */}
          <div className="flex">
            {(['login', 'signup'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setOtpSent(false) }}
                className="flex-1 py-3.5 text-sm font-semibold transition-all capitalize"
                style={{
                  backgroundColor: mode === m ? PRIMARY : 'white',
                  color: mode === m ? 'white' : '#9CA3AF',
                }}
              >
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {mode === 'login' ? (
              <div className="space-y-4 fade-in">
                {/* OTP / Email toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setUseOTP(true)}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg transition-all"
                    style={useOTP ? { backgroundColor: 'white', color: PRIMARY, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' } : { color: '#6B7280' }}
                  >
                    📱 Mobile OTP
                  </button>
                  <button
                    onClick={() => setUseOTP(false)}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg transition-all"
                    style={!useOTP ? { backgroundColor: 'white', color: PRIMARY, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' } : { color: '#6B7280' }}
                  >
                    📧 Email / Password
                  </button>
                </div>

                {useOTP ? (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">Mobile Number</label>
                      <div className="flex">
                        <div className="flex items-center bg-gray-100 border border-gray-200 rounded-l-xl px-3 text-sm font-medium text-gray-600 border-r-0">
                          🇮🇳 +91
                        </div>
                        <input
                          type="tel"
                          maxLength={10}
                          value={phone}
                          onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="Enter 10-digit number"
                          className="flex-1 border border-gray-200 rounded-r-xl px-3 py-2.5 text-sm outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    {!otpSent ? (
                      <button
                        onClick={handleSendOTP}
                        className="w-full py-3 text-white font-bold rounded-xl text-sm"
                        style={{ backgroundColor: PRIMARY, opacity: phone.length === 10 ? 1 : 0.6 }}
                        disabled={phone.length !== 10}
                      >
                        Send OTP →
                      </button>
                    ) : (
                      <div className="space-y-4 fade-in">
                        <div>
                          <label className="text-xs font-semibold text-gray-700 mb-1 block">
                            Enter OTP sent to +91 {phone}
                          </label>
                          <div className="flex gap-3 justify-center mt-2">
                            {otp.map((digit, i) => (
                              <input
                                key={i}
                                id={`otp-${i}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={e => handleOTPChange(i, e.target.value)}
                                className="w-12 h-14 text-center text-xl font-black border-2 rounded-xl outline-none transition-colors"
                                style={{ borderColor: digit ? PRIMARY : '#E5E7EB' }}
                              />
                            ))}
                          </div>
                          <button
                            onClick={resendOTP}
                            disabled={resendIn > 0}
                            className="text-xs font-semibold mt-2 w-full text-center hover:underline disabled:no-underline disabled:cursor-not-allowed"
                            style={{ color: resendIn > 0 ? '#9CA3AF' : PRIMARY }}
                          >
                            {resendIn > 0 ? `Resend OTP in ${resendIn}s` : 'Resend OTP'}
                          </button>
                        </div>
                        <button
                          onClick={handleLogin}
                          className="w-full py-3 text-white font-bold rounded-xl text-sm"
                          style={{ backgroundColor: PRIMARY, opacity: otp.every(d => d) ? 1 : 0.6 }}
                        >
                          Verify & Login →
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-700 mb-1 block">Password</label>
                      <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={() => { setForgotSent(true); setError(''); showToast('Password reset link sent to your email') }}
                        className="text-xs font-semibold mt-1 hover:underline"
                        style={{ color: PRIMARY }}
                      >
                        Forgot Password?
                      </button>
                      {forgotSent && (
                        <div className="text-xs text-green-600 bg-green-50 rounded-lg px-3 py-2 mt-2 fade-in">
                          ✓ Reset link sent to {email || 'your email'}. Check your inbox.
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleLogin}
                      className="w-full py-3 text-white font-bold rounded-xl text-sm"
                      style={{ backgroundColor: PRIMARY }}
                    >
                      Login →
                    </button>
                  </>
                )}
              </div>
            ) : (
              /* Sign Up */
              <div className="space-y-4 fade-in">
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Priya Sharma"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">Mobile Number</label>
                  <div className="flex">
                    <div className="flex items-center bg-gray-100 border border-gray-200 rounded-l-xl px-3 text-sm font-medium text-gray-600 border-r-0">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="10-digit number"
                      className="flex-1 border border-gray-200 rounded-r-xl px-3 py-2.5 text-sm outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-1 block">Create Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-purple-500"
                  />
                </div>
                <div className="text-[10px] text-gray-400">
                  By creating an account, you agree to BharatCart&apos;s{' '}
                  <button className="underline" style={{ color: PRIMARY }}>Terms of Service</button>
                  {' '}and{' '}
                  <button className="underline" style={{ color: PRIMARY }}>Privacy Policy</button>
                </div>
                <button
                  onClick={handleSignup}
                  className="w-full py-3 text-white font-bold rounded-xl text-sm"
                  style={{ backgroundColor: PRIMARY }}
                >
                  Create Account →
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Error banner */}
            {error && (
              <div className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2 mt-2 fade-in">⚠️ {error}</div>
            )}

            {/* Google login */}
            <button
              onClick={() => doLogin('user', 'Signed in with Google')}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>

        {/* Demo accounts */}
        <div className="mt-4 bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🎭</span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Demo Accounts — click to autofill</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(DEMO_ACCOUNTS) as (keyof typeof DEMO_ACCOUNTS)[]).map(k => (
              <button
                key={k}
                onClick={() => fillDemo(k)}
                className="text-left border rounded-xl px-3 py-2.5 hover:border-purple-400 hover:bg-purple-50 transition-colors"
                style={{ borderColor: '#E5E7EB' }}
              >
                <div className="text-[10px] font-black uppercase tracking-wide" style={{ color: k === 'admin' ? '#DC2626' : PRIMARY }}>
                  {k === 'admin' ? '👑 ' : '🛍 '}{DEMO_ACCOUNTS[k].label}
                </div>
                <div className="text-[11px] font-semibold text-gray-800 mt-1">
                  {DEMO_ACCOUNTS[k].username} / {DEMO_ACCOUNTS[k].password}
                </div>
                <div className="text-[10px] text-gray-400">{DEMO_ACCOUNTS[k].email}</div>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
            👑 Admin login opens the BharatCart Admin Panel · 🛍 Customer login opens the normal store.
          </p>
        </div>
      </div>
    </div>
  )
}
