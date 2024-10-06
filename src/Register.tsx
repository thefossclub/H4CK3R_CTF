import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function Register() {
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
          <Link href="/" className="text-green-500 hover:text-green-300 transition-colors inline-flex items-center">
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

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');

        body {
          background-color: #050505;
          cursor: none;
        }

        .glitch {
          position: relative;
          animation: glitch 1s linear infinite;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .glitch::before {
          left: 2px;
          text-shadow: -2px 0 #ff00c1;
          clip: rect(44px, 450px, 56px, 0);
          animation: glitch-anim 5s infinite linear alternate-reverse;
        }

        .glitch::after {
          left: -2px;
          text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
          animation: glitch-anim2 1s infinite linear alternate-reverse;
        }

        @keyframes glitch {
          2%, 64% {
            transform: translate(2px,0) skew(0deg);
          }
          4%, 60% {
            transform: translate(-2px,0) skew(0deg);
          }
          62% {
            transform: translate(0,0) skew(5deg);
          }
        }

        @keyframes glitch-anim {
          0% {
            clip: rect(31px, 9999px, 94px, 0);
          }
          5% {
            clip: rect(70px, 9999px, 71px, 0);
          }
          10% {
            clip: rect(29px, 9999px, 83px, 0);
          }
          15% {
            clip: rect(50px, 9999px, 5px, 0);
          }
          20% {
            clip: rect(63px, 9999px, 27px, 0);
          }
          25% {
            clip: rect(84px, 9999px, 67px, 0);
          }
          30% {
            clip: rect(71px, 9999px, 65px, 0);
          }
          35% {
            clip: rect(54px, 9999px, 84px, 0);
          }
          40% {
            clip: rect(30px, 9999px, 68px, 0);
          }
          45% {
            clip: rect(36px, 9999px, 62px, 0);
          }
          50% {
            clip: rect(7px, 9999px, 98px, 0);
          }
          55% {
            clip: rect(40px, 9999px, 49px, 0);
          }
          60% {
            clip: rect(89px, 9999px, 4px, 0);
          }
          65% {
            clip: rect(9px, 9999px, 90px, 0);
          }
          70% {
            clip: rect(61px, 9999px, 36px, 0);
          }
          75% {
            clip: rect(56px, 9999px, 94px, 0);
          }
          80% {
            clip: rect(56px, 9999px, 39px, 0);
          }
          85% {
            clip: rect(55px, 9999px, 40px, 0);
          }
          90% {
            clip: rect(94px, 9999px, 69px, 0);
          }
          95% {
            clip: rect(46px, 9999px, 27px, 0);
          }
          100% {
            clip: rect(67px, 9999px, 35px, 0);
          }
        }

        @keyframes glitch-anim2 {
          0% {
            clip: rect(65px, 9999px, 99px, 0);
          }
          5% {
            clip: rect(79px, 9999px, 49px, 0);
          }
          10% {
            clip: rect(12px, 9999px, 46px, 0);
          }
          15% {
            clip: rect(26px, 9999px, 75px, 0);
          }
          20% {
            clip: rect(89px, 9999px, 97px, 0);
          }
          25% {
            clip: rect(90px, 9999px, 90px, 0);
          }
          30% {
            clip: rect(84px, 9999px, 41px, 0);
          }
          35% {
            clip: rect(97px, 9999px, 26px, 0);
          }
          40% {
            clip: rect(87px, 9999px, 16px, 0);
          }
          45% {
            clip: rect(16px, 9999px, 51px, 0);
          }
          50% {
            clip: rect(90px, 9999px, 45px, 0);
          }
          55% {
            clip: rect(32px, 9999px, 93px, 0);
          }
          60% {
            clip: rect(7px, 9999px, 82px, 0);
          }
          65% {
            clip: rect(40px, 9999px, 95px, 0);
          }
          70% {
            clip: rect(57px, 9999px, 21px, 0);
          }
          75% {
            clip: rect(67px, 9999px, 23px, 0);
          }
          80% {
            clip: rect(13px, 9999px, 67px, 0);
          }
          85% {
            clip: rect(36px, 9999px, 98px, 0);
          }
          90% {
            clip: rect(72px, 9999px, 94px, 0);
          }
          95% {
            clip: rect(49px, 9999px, 59px, 0);
          }
          100% {
            clip: rect(11px, 9999px, 11px, 0);
          }
        }
      `}</style>
    </div>
  )
}