import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { ChevronDown, Trophy, Terminal, ShieldAlert, Zap, ChevronLeft } from 'lucide-react'

function EnhancedCTFEventSite() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const eventDate = new Date('2024-12-31T23:59:59').getTime()
      const now = new Date().getTime()
      const difference = eventDate - now

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateCursorPosition)

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition)
    }
  }, [])

  useEffect(() => {
    const canvas = document.getElementById('matrix-bg') as HTMLCanvasElement
    const context = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const nums = '0123456789'
    const alphabet = katakana + latin + nums

    const fontSize = 16
    const columns = canvas.width / fontSize

    const rainDrops: number[] = []

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1
    }

    const draw = () => {
      context!.fillStyle = 'rgba(0, 0, 0, 0.05)'
      context!.fillRect(0, 0, canvas.width, canvas.height)

      context!.fillStyle = '#0F0'
      context!.font = fontSize + 'px monospace'

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        context!.fillText(text, i * fontSize, rainDrops[i] * fontSize)

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0
        }
        rainDrops[i]++
      }
    }

    const interval = setInterval(draw, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-['Courier_Prime'] overflow-hidden cursor-none">
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />
      <canvas id="matrix-bg" className="fixed top-0 left-0 w-full h-full opacity-20 pointer-events-none"></canvas>
      
      <header className="bg-black bg-opacity-80 sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <Link to="/" className="text-2xl md:text-3xl font-bold text-green-500 glitch" data-text="H4CK3R_CTF">
            H4CK3R_CTF
          </Link>
          <ul className="flex flex-wrap space-x-2 md:space-x-4 mt-4 md:mt-0">
            <li><a href="#about" className="hover:text-green-300 transition-colors text-sm md:text-base">About</a></li>
            <li><a href="#categories" className="hover:text-green-300 transition-colors text-sm md:text-base">Categories</a></li>
            <li><a href="#leaderboard" className="hover:text-green-300 transition-colors text-sm md:text-base">Leaderboard</a></li>
            <li>
              <Link to="/register" className="bg-green-600 text-black px-3 py-1 md:px-4 md:py-2 rounded hover:bg-green-500 transition-colors text-sm md:text-base">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="hero container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 glitch" data-text="H4CK3R_CTF 2024">
            H4CK3R_CTF 2024
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-green-300">
            Test your skills. Claim your flags. Become the elite.
          </p>
          <Link to="/register" className="bg-green-600 text-black text-base md:text-lg px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-green-500 transition-colors inline-block">
            Join the Challenge
          </Link>
        </section>

        <section className="countdown bg-black bg-opacity-80 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 glitch" data-text="Countdown to Hack Day">Countdown to Hack Day</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-gray-900 p-4 rounded-lg border border-green-600">
                  <span className="text-3xl md:text-4xl font-bold block mb-2">{value}</span>
                  <span className="text-sm uppercase">{unit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="container mx-auto px-4 py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center glitch" data-text="About the Event">About the Event</h2>
          <p className="text-base md:text-lg max-w-3xl mx-auto text-center text-green-300">
            H4CK3R_CTF is the ultimate playground for cybersecurity enthusiasts and aspiring hackers. 
            Our challenges will push your limits, test your creativity, and sharpen your hacking skills. 
            Are you ready to join the elite?
          </p>
        </section>

        <section id="categories" className="bg-black bg-opacity-80 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center glitch" data-text="Challenge Categories">Challenge Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Web Exploitation', icon: <Terminal className="w-12 h-12 mb-4" /> },
                { name: 'Cryptography', icon: <ShieldAlert className="w-12 h-12 mb-4" /> },
                { name: 'Reverse Engineering', icon: <ChevronDown className="w-12 h-12 mb-4" /> },
                { name: 'Pwn', icon: <Zap className="w-12 h-12 mb-4" /> },
              ].map((category) => (
                <div key={category.name} className="bg-gray-900 p-6 rounded-lg text-center hover:bg-gray-800 transition-colors border border-green-600">
                  {category.icon}
                  <h3 className="text-lg md:text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-green-300">Test your skills in {category.name.toLowerCase()} challenges.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="leaderboard" className="container mx-auto px-4 py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center glitch" data-text="Leaderboard">Leaderboard</h2>
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-green-600 shadow-lg shadow-green-500/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-4 text-sm md:text-base font-bold">Rank</th>
                    <th className="p-4 text-sm md:text-base font-bold">Team</th>
                    <th className="p-4 text-sm md:text-base font-bold">Score</th>
                    <th className="p-4 text-sm md:text-base font-bold">Last Solved</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, team: 'ByteBreachers', score: 2500, lastSolved: '2h ago' },
                    { rank: 2, team: 'NullPointers', score: 2350, lastSolved: '3h ago' },
                    { rank: 3, team: 'SQLInjectors', score: 2200, lastSolved: '4h ago' },
                    { rank: 4, team: 'CipherPunks', score: 2050, lastSolved: '5h ago' },
                    { rank: 5, team: 'KernelPanics', score: 1900, lastSolved: '6h ago' },
                  ].map((team) => (
                    <tr key={team.rank} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                      <td className="p-4 text-sm md:text-base">
                        {team.rank === 1 && <Trophy className="w-5 h-5 text-yellow-400 inline mr-2" />}
                        {team.rank}
                      </td>
                      <td className="p-4 text-sm md:text-base font-medium">{team.team}</td>
                      <td className="p-4 text-sm md:text-base">{team.score}</td>
                      <td className="p-4 text-sm md:text-base text-green-300">{team.lastSolved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black bg-opacity-80 py-8 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm md:text-base">&copy; 2024 H4CK3R_CTF. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-green-300 hover:text-green-100 mx-2 transition-colors text-sm md:text-base">Privacy Policy</a>
            <a href="#" className="text-green-300 hover:text-green-100 mx-2 transition-colors text-sm md:text-base">Terms of Service</a>
            <a href="#" className="text-green-300 hover:text-green-100 mx-2 transition-colors text-sm md:text-base">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Register() {
  const [formData, setFormData] = useState({
    teamName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Add your registration logic here
  }

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-['Courier_Prime'] flex flex-col">
      <header className="bg-black bg-opacity-80 py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-green-500 hover:text-green-300 transition-colors inline-flex items-center">
            <ChevronLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-gray-900 p-8 rounded-lg border border-green-600 shadow-lg shadow-green-500/50 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center glitch" data-text="Register for H4CK3R_CTF">
            Register for H4CK3R_CTF
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium mb-1">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-black font-bold py-2 px-4 rounded hover:bg-green-500 transition-colors"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-black bg-opacity-80 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; 2024 H4CK3R_CTF. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnhancedCTFEventSite />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}