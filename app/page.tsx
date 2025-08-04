"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  Target,
  BarChart3,
  User,
  Moon,
  Sun,
  Music,
  MapPin,
  Calendar,
  Award,
  HelpCircle,
  Star,
  Lightbulb,
  Menu,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function AncientUniversityPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [audioTourActive, setAudioTourActive] = useState(false)
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [showGreeting, setShowGreeting] = useState(false)
  const [userName, setUserName] = useState("")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [visitorCount, setVisitorCount] = useState(0)
  const [pageViews, setPageViews] = useState(0)

  const quizData = [
    {
      question: "What was the pass rate for Takshashila's entrance exam?",
      options: ["50%", "30%", "70%", "90%"],
      correct: 1,
    },
    {
      question: "How many manuscripts were in Nalanda's library?",
      options: ["1 million", "5 million", "9 million", "12 million"],
      correct: 2,
    },
    {
      question: "Who was Buddha's personal physician from Takshashila?",
      options: ["Panini", "Chanakya", "Jivaka", "Nagarjuna"],
      correct: 2,
    },
    {
      question: "In which century was Nalanda founded?",
      options: ["3rd century CE", "5th century CE", "7th century CE", "9th century CE"],
      correct: 1,
    },
    {
      question: "What does 'Dharma Gunj' mean?",
      options: ["House of Wisdom", "Mountain of Truth", "Sea of Knowledge", "Temple of Learning"],
      correct: 1,
    },
  ]

  const storySlides = [
    {
      title: "Nalanda: The Lost Lighthouse of Knowledge",
      content:
        "Imagine a place where wisdom glows brighter than the lanterns that guide monks along moonlit lotus ponds. Nalanda rises from the twilight: an ancient city of red-brick monasteries, their walls warmed by soft candlelight, their corridors alive with the gentle hush of footsteps and dreams.",
    },
    {
      title: "A World Ahead of Its Time",
      content:
        "Travel back to a dawn few can fathom: the year 427 CE. Nalanda is already bustling with over 10,000 students, its sprawling campus alive with libraries, laboratories, and lush gardens.",
    },
    {
      title: "Architectural Marvel",
      content:
        "Peer inside the living heart of Nalanda—a marvel built not just of stone, but of vision. Eight grand compounds unfold in an elegant dance: towering temples touched by morning prayers, lecture halls echoing with debate, nine-storey libraries brimming with treasures.",
    },
  ]

  // Initialize theme and other effects
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    } else if (prefersDark) {
      setDarkMode(true)
    }
  }, [])

  // Apply theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  useEffect(() => {
    // Initialize visitor counter
    const initVisitorCounter = () => {
      const sessionCount = sessionStorage.getItem("currentSession") || 0
      let totalVisitors = Number.parseInt(localStorage.getItem("totalVisitors") || "0")
      let totalPageViews = Number.parseInt(localStorage.getItem("totalPageViews") || "0")

      totalPageViews += 1
      localStorage.setItem("totalPageViews", totalPageViews.toString())

      if (!sessionCount) {
        totalVisitors += 1
        sessionStorage.setItem("currentSession", "1")
        localStorage.setItem("totalVisitors", totalVisitors.toString())
      }

      setVisitorCount(totalVisitors)
      setPageViews(totalPageViews)
    }

    initVisitorCounter()

    // Check first visit
    const hasVisited = localStorage.getItem("hasVisited")
    if (!hasVisited) {
      setTimeout(() => setShowGreeting(true), 1000)
      localStorage.setItem("hasVisited", "true")
    } else {
      const savedName = localStorage.getItem("userName")
      if (savedName) {
        setUserName(savedName)
      }
    }
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const handleQuizAnswer = (selectedIndex: number) => {
    const isCorrect = selectedIndex === quizData[currentQuizQuestion].correct
    if (isCorrect) {
      setQuizScore((prev) => prev + 1)
    }

    setTimeout(() => {
      if (currentQuizQuestion < quizData.length - 1) {
        setCurrentQuizQuestion((prev) => prev + 1)
      } else {
        // Show results
        alert(`Quiz completed! You scored ${quizScore + (isCorrect ? 1 : 0)} out of ${quizData.length}`)
      }
    }, 1500)
  }

  const restartQuiz = () => {
    setCurrentQuizQuestion(0)
    setQuizScore(0)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % storySlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + storySlides.length) % storySlides.length)
  }

  const handleUserNameSubmit = (name: string) => {
    setUserName(name)
    localStorage.setItem("userName", name)
    setShowGreeting(false)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-slate-800 to-gray-900"
          : "bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-100"
      } relative`}
    >
      {/* Ancient Pattern Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-300 ${
          darkMode ? "opacity-10" : "opacity-5"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23${darkMode ? "fbbf24" : "d4af37"}' fillOpacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 backdrop-blur-md border-b z-50 shadow-lg transition-colors duration-300 ${
          darkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-amber-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
             <div className="flex items-center space-x-3">
      <img
        src="/logos/new.png"
        alt="Logo"
        className="h-10 w-auto "
      />
      <h1
        className={`text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
          darkMode ? "from-yellow-400 to-orange-400" : "from-amber-600 to-orange-600"
        }`}
              >
                Ancient Universities
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                onClick={() => scrollToSection("home")}
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-4 py-2"
              >
                <MapPin className="w-4 h-4 mr-1" />
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("takshashila")}
                className={`rounded-full px-4 transition-colors duration-300 ${
                  darkMode ? "text-yellow-400 hover:bg-gray-800" : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                <BookOpen className="w-4 h-4 mr-1" />
                Takshashila
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("nalanda")}
                className={`rounded-full px-4 transition-colors duration-300 ${
                  darkMode ? "text-yellow-400 hover:bg-gray-800" : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Nalanda
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("timeline")}
                className={`rounded-full px-4 transition-colors duration-300 ${
                  darkMode ? "text-yellow-400 hover:bg-gray-800" : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                <Calendar className="w-4 h-4 mr-1" />
                Timeline
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("quiz")}
                className="text-pink-600 hover:bg-pink-100 dark:hover:bg-pink-900/20 rounded-full px-4"
              >
                <Award className="w-4 h-4 mr-1" />
                Quiz
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("legacy")}
                className={`rounded-full px-4 transition-colors duration-300 ${
                  darkMode ? "text-yellow-400 hover:bg-gray-800" : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                <Star className="w-4 h-4 mr-1" />
                Legacy
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollToSection("faq")}
                className={`rounded-full px-4 transition-colors duration-300 ${
                  darkMode ? "text-yellow-400 hover:bg-gray-800" : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                FAQ
              </Button>
              <Button
                variant="outline"
                onClick={() => setAudioTourActive(!audioTourActive)}
                className={`rounded-full px-4 transition-colors duration-300 ${
                  darkMode
                    ? "border-purple-400 text-purple-400 hover:bg-purple-900/20 bg-transparent"
                    : "border-purple-300 text-purple-600 hover:bg-purple-50 bg-transparent"
                }`}
              >
                <Music className="w-4 h-4 mr-1" />
                Audio Tour
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="bg-teal-600 text-white rounded-full hover:bg-teal-700 ml-2 transition-all duration-300"
              onClick={toggleTheme}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className={`md:hidden border-t py-4 transition-colors duration-300 ${
                darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-amber-200"
              }`}
            >
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" onClick={() => scrollToSection("home")} className="justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Home
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("takshashila")} className="justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Takshashila
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("nalanda")} className="justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Nalanda
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("timeline")} className="justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Timeline
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("quiz")} className="justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Quiz
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("legacy")} className="justify-start">
                  <Star className="w-4 h-4 mr-2" />
                  Legacy
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("faq")} className="justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  FAQ
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <div
            className={`w-full h-full transition-colors duration-300 ${
              darkMode
                ? "bg-gradient-to-br from-gray-900/40 via-slate-800/50 to-gray-900/40"
                : "bg-gradient-to-br from-amber-900/20 via-orange-800/30 to-red-900/20"
            }`}
          />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
            }}
          />
        </div>

        {/* Overlay */}
        <div
          className={`absolute inset-0 z-10 transition-colors duration-300 ${
            darkMode ? "bg-gradient-to-r from-black/80 to-black/60" : "bg-gradient-to-r from-black/60 to-black/40"
          }`}
        />

        {/* Content */}
        <div className="relative z-20 text-center text-white max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <div
              className={`inline-flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full mb-6 transition-colors duration-300 ${
                darkMode ? "bg-white/10 border border-white/20" : "bg-white/20"
              }`}
            >
              <span className="text-2xl">🕉️</span>
              <span className="font-medium">Sacred Knowledge Awaits</span>
            </div>
          </div>

          <h1
            className={`text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent leading-tight transition-colors duration-300 ${
              darkMode ? "from-yellow-300 via-orange-300 to-red-300" : "from-yellow-300 via-orange-400 to-red-400"
            }`}
          >
            {userName ? `Welcome ${userName}!` : "Ancient India's"}
          </h1>
          <h2
            className={`text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r bg-clip-text text-transparent transition-colors duration-300 ${
              darkMode ? "from-yellow-300 via-orange-300 to-red-300" : "from-yellow-300 via-orange-400 to-red-400"
            }`}
          >
            Educational Marvels
          </h2>
          <p
            className={`text-xl md:text-2xl mb-8 font-medium transition-colors duration-300 ${
              darkMode ? "text-yellow-200" : "text-amber-100"
            }`}
          >
            Where Knowledge Knew No Boundaries
          </p>
          <p
            className={`text-lg mb-12 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-200"
            }`}
          >
            Journey back to a time when two magnificent universities attracted scholars from across the globe,
            revolutionizing education and shaping the intellectual foundations of the world.
          </p>
          <Button
            size="lg"
            onClick={() => scrollToSection("takshashila")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            Begin Journey
          </Button>
        </div>
      </section>

      {/* University Comparison */}
      <section
        className={`py-20 px-4 transition-colors duration-300 ${
          darkMode ? "bg-gradient-to-r from-gray-800 to-slate-800" : "bg-gradient-to-r from-amber-50 to-orange-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Takshashila */}
            <Card
              className={`backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90 border-amber-200"
              }`}
              onClick={() => scrollToSection("takshashila")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle
                  className={`text-xl mb-2 transition-colors duration-300 ${
                    darkMode ? "text-yellow-400" : "text-amber-800"
                  }`}
                >
                  तक्षशिला (Takshashila)
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={`transition-colors duration-300 ${
                    darkMode ? "bg-gray-700 text-yellow-300" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  6th century BCE - 5th century CE
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-3xl font-bold text-yellow-600">68</div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Courses
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-600">30%</div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Pass Rate
                    </div>
                  </div>
                </div>
                <Badge className="bg-yellow-500 text-white mb-4">World's First</Badge>
                <p className={`text-sm transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  World's first university
                </p>
              </CardContent>
            </Card>

            {/* AND Connector */}
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">AND</span>
              </div>
            </div>

            {/* Nalanda */}
            <Card
              className={`backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90 border-blue-200"
              }`}
              onClick={() => scrollToSection("nalanda")}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle
                  className={`text-xl mb-2 transition-colors duration-300 ${
                    darkMode ? "text-yellow-400" : "text-amber-800"
                  }`}
                >
                  नालंदा (Nalanda)
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={`transition-colors duration-300 ${
                    darkMode ? "bg-gray-700 text-blue-300" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  5th century CE - 12th century CE
                </Badge>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-3xl font-bold text-yellow-600">10K</div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Students
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-600">9M</div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Books
                    </div>
                  </div>
                </div>
                <Badge className="bg-blue-500 text-white mb-4">First Residential</Badge>
                <p className={`text-sm transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  First residential university
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Takshashila Section */}
      <section
        id="takshashila"
        className={`py-20 px-4 transition-colors duration-300 ${
          darkMode ? "bg-gradient-to-br from-gray-900 to-slate-900" : "bg-gradient-to-br from-orange-50 to-amber-100"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-colors duration-300 ${
                darkMode ? "bg-orange-900/30 border border-orange-700" : "bg-orange-100"
              }`}
            >
              <BookOpen
                className={`w-5 h-5 transition-colors duration-300 ${darkMode ? "text-orange-400" : "text-orange-600"}`}
              />
              <span
                className={`font-medium transition-colors duration-300 ${
                  darkMode ? "text-orange-400" : "text-orange-600"
                }`}
              >
                The Pioneer
              </span>
            </div>
            <h1
              className={`text-4xl md:text-6xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-yellow-400" : "text-amber-800"
              }`}
            >
              तक्षशिला - विश्व का प्रथम विश्वविद्यालय
            </h1>
            <h2
              className={`text-2xl md:text-3xl mb-6 transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              (Takshashila - World's First University)
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Where Knowledge Began Its Journey
            </p>
          </div>

          {/* Why It Matters */}
          <Card className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white shadow-xl mb-16">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-teal-800" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">Why It Matters</h3>
                  <p className="text-lg leading-relaxed">
                    Takshashila established the very concept of <strong>higher education</strong>, creating the template
                    for universities that would follow centuries later. These institutions didn't just teach
                    subjects—they created a culture of inquiry, debate, and intellectual excellence that shaped the
                    foundations of human knowledge.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Explore Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card
              className={`backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90 border-amber-200"
              }`}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle
                  className={`text-xl mb-2 transition-colors duration-300 ${
                    darkMode ? "text-yellow-400" : "text-amber-800"
                  }`}
                >
                  Rigorous Admission
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p
                  className={`mb-6 leading-relaxed transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Only the most dedicated scholars could pass the legendary entrance examinations, ensuring the highest
                  standards of academic excellence.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">Discover More</Button>
              </CardContent>
            </Card>

            <Card
              className={`backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90 border-amber-200"
              }`}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle
                  className={`text-xl mb-2 transition-colors duration-300 ${
                    darkMode ? "text-yellow-400" : "text-amber-800"
                  }`}
                >
                  Revolutionary Curriculum
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p
                  className={`mb-6 leading-relaxed transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  68 different courses spanning medicine, politics, arts, and sciences, creating a comprehensive
                  educational experience.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">Explore Subjects</Button>
              </CardContent>
            </Card>

            <Card
              className={`backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90 border-amber-200"
              }`}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle
                  className={`text-xl mb-2 transition-colors duration-300 ${
                    darkMode ? "text-yellow-400" : "text-amber-800"
                  }`}
                >
                  Legendary Scholars
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p
                  className={`mb-6 leading-relaxed transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Meet the brilliant minds who shaped civilizations and whose teachings continue to influence the world
                  today.
                </p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">Meet Scholars</Button>
              </CardContent>
            </Card>
          </div>

          {/* Did You Know */}
          <div className="mb-16">
            <h3
              className={`text-3xl font-bold mb-8 text-center transition-colors duration-300 ${
                darkMode ? "text-yellow-400" : "text-amber-800"
              }`}
            >
              Did You Know?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card
                className={`hover:shadow-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-700"
                    : "bg-gradient-to-br from-green-50 to-emerald-100 border-green-200"
                }`}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className={`font-semibold transition-colors duration-300 ${
                        darkMode ? "text-green-300" : "text-green-800"
                      }`}
                    >
                      Jivaka's Impossible Test
                    </h4>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      Revolutionary medical practices
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`hover:shadow-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-700"
                    : "bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200"
                }`}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className={`font-semibold transition-colors duration-300 ${
                        darkMode ? "text-blue-300" : "text-blue-800"
                      }`}
                    >
                      Silk Road Connection
                    </h4>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      Global knowledge exchange
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`hover:shadow-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-br from-purple-900/50 to-violet-900/50 border-purple-700"
                    : "bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200"
                }`}
              >
                <CardContent className="p-6 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4
                      className={`font-semibold transition-colors duration-300 ${
                        darkMode ? "text-purple-300" : "text-purple-800"
                      }`}
                    >
                      International Students
                    </h4>
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        darkMode ? "text-purple-400" : "text-purple-600"
                      }`}
                    >
                      Scholars from across Asia
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Meet the Legends */}
          <div>
            <h3
              className={`text-4xl font-bold mb-12 text-center transition-colors duration-300 ${
                darkMode ? "text-yellow-400" : "text-amber-800"
              }`}
            >
              Meet the Legends
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Panini */}
              <Card
                className={`backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90 border-amber-200"
                }`}
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle
                    className={`text-xl transition-colors duration-300 ${
                      darkMode ? "text-yellow-400" : "text-amber-800"
                    }`}
                  >
                    पाणिनि (Panini)
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className={`transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-700 text-yellow-300 border-yellow-600"
                        : "bg-yellow-100 text-yellow-800 border-yellow-300"
                    }`}
                  >
                    Grammar & Linguistics
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p
                    className={`mb-4 leading-relaxed transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Creator of Ashtadhyayi - 4,000 rules that revolutionized language study
                  </p>
                  <div className="flex justify-center space-x-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">4,000</div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Rules
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">Grammar</div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Pioneer
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Chanakya */}
              <Card
                className={`backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90 border-amber-200"
                }`}
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle
                    className={`text-xl transition-colors duration-300 ${
                      darkMode ? "text-yellow-400" : "text-amber-800"
                    }`}
                  >
                    चाणक्य (Chanakya)
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className={`transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-700 text-yellow-300 border-yellow-600"
                        : "bg-yellow-100 text-yellow-800 border-yellow-300"
                    }`}
                  >
                    Political Science
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p
                    className={`mb-4 leading-relaxed transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Master strategist who wrote Arthashastra, shaping the Mauryan Empire
                  </p>
                  <div className="flex justify-center space-x-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">Arthashastra</div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Masterwork
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">Political</div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Genius
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Jivaka */}
              <Card
                className={`backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90 border-amber-200"
                }`}
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle
                    className={`text-xl transition-colors duration-300 ${
                      darkMode ? "text-yellow-400" : "text-amber-800"
                    }`}
                  >
                    जीवक (Jivaka)
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className={`transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-700 text-yellow-300 border-yellow-600"
                        : "bg-yellow-100 text-yellow-800 border-yellow-300"
                    }`}
                  >
                    Medicine & Surgery
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p
                    className={`mb-4 leading-relaxed transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Buddha's physician who revolutionized ancient medical practice
                  </p>
                  <div className="flex justify-center space-x-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">Buddha's</div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Doctor
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">Surgery</div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Pioneer
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white rounded-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Nalanda Section */}
      <section
        id="nalanda"
        className={`py-20 px-4 transition-colors duration-300 ${
          darkMode ? "bg-gradient-to-br from-slate-900 to-gray-900" : "bg-gradient-to-br from-blue-50 to-cyan-100"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-colors duration-300 ${
                darkMode ? "bg-blue-900/30 border border-blue-700" : "bg-blue-100"
              }`}
            >
              <BarChart3
                className={`w-5 h-5 transition-colors duration-300 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
              />
              <span
                className={`font-medium transition-colors duration-300 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
              >
                The Pinnacle
              </span>
            </div>
            <h1
              className={`text-4xl md:text-6xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-yellow-400" : "text-amber-800"
              }`}
            >
              नालंदा — विश्व का प्रथम आवासीय विश्वविद्यालय
            </h1>
            <h2
              className={`text-2xl md:text-3xl mb-6 transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              (Nalanda - World's First Residential University)
            </h2>
            <p
              className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Where Knowledge Reached Its Zenith
            </p>
          </div>

          {/* Story Slider */}
          <div className="mb-16">
            <h3
              className={`text-3xl font-bold mb-8 text-center transition-colors duration-300 ${
                darkMode ? "text-yellow-400" : "text-amber-800"
              }`}
            >
              🏛️ Nalanda: A Journey in Pictures
            </h3>
            <Card
              className={`backdrop-blur-sm shadow-xl transition-colors duration-300 ${
                darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90"
              }`}
            >
              <CardContent className="p-8">
                <div className="relative">
                  <div className="text-center mb-6">
                    <div
                      className={`w-full h-64 rounded-lg mb-4 flex items-center justify-center transition-colors duration-300 ${
                        darkMode
                          ? "bg-gradient-to-br from-amber-800 to-orange-900"
                          : "bg-gradient-to-br from-amber-200 to-orange-300"
                      }`}
                    >
                      <span className="text-6xl">🏛️</span>
                    </div>
                    <h4
                      className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                        darkMode ? "text-yellow-400" : "text-amber-800"
                      }`}
                    >
                      {storySlides[currentSlide].title}
                    </h4>
                    <p
                      className={`leading-relaxed max-w-3xl mx-auto transition-colors duration-300 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {storySlides[currentSlide].content}
                    </p>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full bg-transparent">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full bg-transparent">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Library Story */}
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-800" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Legendary Library</h3>
                  <div className="grid md:grid-cols-3 gap-8 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">9,000,000</div>
                      <div className="text-sm opacity-80">Manuscripts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">3</div>
                      <div className="text-sm opacity-80">Months Burning</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">9</div>
                      <div className="text-sm opacity-80">Stories High</div>
                    </div>
                  </div>
                  <p className="text-lg leading-relaxed">
                    The "Dharma Ganj" (Mountain of Truth) wasn't just a library—it was humanity's greatest treasure
                    trove of knowledge.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        className={`py-20 px-4 transition-colors duration-300 ${
          darkMode ? "bg-gradient-to-br from-gray-900 to-slate-900" : "bg-gradient-to-br from-amber-50 to-orange-100"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-yellow-400" : "text-amber-800"
              }`}
            >
              📅 Timeline of Excellence
            </h2>
            <p className={`text-xl transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Click on any era to explore
            </p>
          </div>

          <div className="relative">
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full transition-colors duration-300 ${
                darkMode
                  ? "bg-gradient-to-b from-yellow-400 to-orange-400"
                  : "bg-gradient-to-b from-amber-400 to-orange-500"
              }`}
            ></div>

            <div className="space-y-12">
              {[
                { year: "600 BCE", title: "Takshashila Founded", icon: "🏛️", side: "left" },
                { year: "400 BCE", title: "Panini's Grammar", icon: "📜", side: "right" },
                { year: "350 BCE", title: "Chanakya's Arthashastra", icon: "⚖️", side: "left" },
                { year: "427 CE", title: "Nalanda Founded", icon: "🏛️", side: "right" },
                { year: "630 CE", title: "Xuanzang's Visit", icon: "🇨🇳", side: "left" },
                { year: "1193 CE", title: "Tragic Destruction", icon: "💥", side: "right" },
              ].map((event, index) => (
                <div key={index} className={`flex items-center ${event.side === "right" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-1/2 ${event.side === "right" ? "pl-8" : "pr-8"}`}>
                    <Card
                      className={`backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                        darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{event.icon}</div>
                          <div>
                            <h4
                              className={`text-xl font-bold transition-colors duration-300 ${
                                darkMode ? "text-yellow-400" : "text-amber-800"
                              }`}
                            >
                              {event.title}
                            </h4>
                            <p
                              className={`font-medium transition-colors duration-300 ${
                                darkMode ? "text-yellow-500" : "text-amber-600"
                              }`}
                            >
                              {event.year}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-4 shadow-lg z-10 transition-colors duration-300 ${
                      darkMode ? "bg-yellow-400 border-gray-800" : "bg-amber-500 border-white"
                    }`}
                  ></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section
        id="quiz"
        className={`py-20 px-4 transition-colors duration-300 ${
          darkMode
            ? "bg-gradient-to-br from-purple-900/50 to-pink-900/50"
            : "bg-gradient-to-br from-pink-50 to-purple-100"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-yellow-400" : "text-amber-800"
              }`}
            >
              🧠 Test Your Knowledge
            </h2>
            <p className={`text-xl transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              How much do you know about ancient universities?
            </p>
          </div>

          <Card
            className={`backdrop-blur-sm shadow-xl transition-colors duration-300 ${
              darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90"
            }`}
          >
            <CardContent className="p-8">
              <div className="mb-8">
                <div
                  className={`w-full rounded-full h-2 mb-4 transition-colors duration-300 ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuizQuestion + 1) / quizData.length) * 100}%` }}
                  ></div>
                </div>
                <p
                  className={`text-center transition-colors duration-300 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Question {currentQuizQuestion + 1} of {quizData.length}
                </p>
              </div>

              <div className="text-center mb-8">
                <h3
                  className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {quizData[currentQuizQuestion].question}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {quizData[currentQuizQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`p-4 h-auto text-left transition-all duration-300 bg-transparent ${
                        darkMode ? "hover:bg-purple-900/30 border-gray-600 text-gray-200" : "hover:bg-purple-50"
                      }`}
                      onClick={() => handleQuizAnswer(index)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button onClick={restartQuiz} variant="outline">
                  Restart Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Legacy Section */}
      <section
        id="legacy"
        className={`py-20 px-4 text-white transition-colors duration-300 ${
          darkMode ? "bg-gradient-to-r from-gray-800 to-slate-800" : "bg-gradient-to-r from-amber-600 to-orange-600"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🌟 Eternal Legacy</h2>
            <p className="text-xl opacity-90">How These Ancient Universities Shape Our World Today</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: "🏛️",
                title: "University Model",
                desc: "The residential university system pioneered by Nalanda became the foundation for Oxford, Cambridge, and modern universities worldwide.",
              },
              {
                icon: "🌍",
                title: "International Education",
                desc: "The tradition of students traveling across continents for education began at these ancient centers of learning.",
              },
              {
                icon: "💭",
                title: "Debate Culture",
                desc: "The emphasis on intellectual discourse and debate continues to be a cornerstone of academic institutions.",
              },
              {
                icon: "👨‍🏫",
                title: "Mentorship",
                desc: "The guru-shishya tradition of individual mentorship influenced tutorial systems worldwide.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-4">🔄 Modern Revival</h3>
              <p className="text-lg mb-6 opacity-90">
                In 2014, the modern Nalanda University was established in Bihar, India, with support from 18 nations,
                reviving the ancient tradition of international scholarship and learning.
              </p>
              <Button
                size="lg"
                className="bg-white text-amber-600 hover:bg-gray-100"
                onClick={() => window.open("https://nalandauniv.edu.in/", "_blank")}
              >
                Visit New Nalanda
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className={`py-20 px-4 transition-colors duration-300 ${
          darkMode ? "bg-gradient-to-br from-gray-900 to-slate-900" : "bg-gradient-to-br from-amber-50 to-orange-100"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-yellow-400" : "text-amber-800"
              }`}
            >
              ❓ Frequently Asked Questions
            </h2>
            <p className={`text-xl transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Deep questions about ancient Indian universities
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What were the secret admission criteria at Takshashila that historians rarely discuss?",
                answer:
                  "Beyond intellectual prowess, candidates had to demonstrate physical endurance through a 7-day wilderness survival test, prove their commitment by memorizing 1,000 Sanskrit verses, and show emotional maturity by resolving a staged conflict between senior students. Only those who passed all three phases could enter.",
              },
              {
                question: "Did women study at these ancient universities?",
                answer:
                  "Yes! While often overlooked, both Takshashila and Nalanda had female scholars. Notable examples include Lilavati (mathematics), Gargi Vachaknavi (philosophy), and several Chinese nuns who studied Buddhist philosophy at Nalanda. They often taught in specialized women's sections of the universities.",
              },
              {
                question: "How did these universities manage to operate for centuries without charging fees?",
                answer:
                  "Nalanda received endowments from over 200 villages, generated income from international trade routes, had royal patronage from multiple dynasties, and operated extensive agricultural lands. Students also contributed through labor - copying manuscripts, teaching junior students, and managing university operations.",
              },
              {
                question: "What specific knowledge was permanently lost when Nalanda's library burned?",
                answer:
                  "Among the irreplaceable losses were: complete works on metallurgy and chemistry, detailed astronomical calculations predicting eclipses for 1000 years, comprehensive medical texts on surgery and anatomy, and the complete diplomatic correspondence between Indian and Central Asian kingdoms spanning 300 years.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className={`backdrop-blur-sm shadow-lg transition-colors duration-300 ${
                  darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90"
                }`}
              >
                <CardContent className="p-6">
                  <h3
                    className={`text-lg font-bold mb-3 transition-colors duration-300 ${
                      darkMode ? "text-yellow-400" : "text-amber-800"
                    }`}
                  >
                    {faq.question}
                  </h3>
                  <p
                    className={`leading-relaxed transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-16 transition-colors duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-gray-900 to-slate-900 text-white"
            : "bg-gradient-to-r from-amber-800 to-orange-800 text-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
                <div className="text-2xl">🪷</div>
                <span className="text-xl font-bold">Ancient Universities</span>
              </div>
              <p className={`mb-4 transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-amber-200"}`}>
                Preserving the legacy of ancient wisdom for future generations
              </p>
              <p className={`text-sm transition-colors duration-300 ${darkMode ? "text-gray-400" : "text-amber-300"}`}>
                © 2024 Ancient Universities. Honoring the timeless pursuit of knowledge.
              </p>
            </div>

            <div className="flex space-x-8">
              <div className="text-center">
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    darkMode ? "bg-white/5" : "bg-white/10"
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <div>
                    <div className="text-xl font-bold">{visitorCount.toLocaleString()}</div>
                    <div
                      className={`text-xs transition-colors duration-300 ${
                        darkMode ? "text-gray-400" : "text-amber-200"
                      }`}
                    >
                      Total Visitors
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-300 ${
                    darkMode ? "bg-white/5" : "bg-white/10"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <div>
                    <div className="text-xl font-bold">{pageViews.toLocaleString()}</div>
                    <div
                      className={`text-xs transition-colors duration-300 ${
                        darkMode ? "text-gray-400" : "text-amber-200"
                      }`}
                    >
                      Page Views
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Audio Tour Player */}
      {audioTourActive && (
        <div
          className={`fixed bottom-6 right-6 backdrop-blur-sm border rounded-lg p-4 shadow-lg z-50 transition-colors duration-300 ${
            darkMode ? "bg-gray-800/90 border-gray-600" : "bg-white/90 border-amber-200"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Button size="icon" variant="ghost">
              <Play className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium">Audio Tour Active</span>
            <Button size="icon" variant="ghost" onClick={() => setAudioTourActive(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Greeting Modal */}
      {showGreeting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card
            className={`w-full max-w-md mx-4 transition-colors duration-300 ${
              darkMode ? "bg-gray-800 border-gray-600" : ""
            }`}
          >
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">👨‍🎓</div>
              <h3
                className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  darkMode ? "text-yellow-400" : "text-amber-800"
                }`}
              >
                Welcome, Future Scholar!
              </h3>
              <p className={`mb-6 transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                What name would you like our ancient scholars to call you?
              </p>
              <input
                type="text"
                placeholder="Enter your name"
                className={`w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors duration-300 ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "border-amber-200"
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const input = e.target as HTMLInputElement
                    handleUserNameSubmit(input.value.trim())
                  }
                }}
              />
              <div className="flex space-x-4">
                <Button
                  className="flex-1 bg-amber-600 hover:bg-amber-700"
                  onClick={() => {
                    const input = document.querySelector("input") as HTMLInputElement
                    handleUserNameSubmit(input?.value.trim() || "")
                  }}
                >
                  Begin Journey
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowGreeting(false)}>
                  Skip
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Music Toggle Button */}
      <Button
        className="fixed bottom-6 left-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg z-50"
        size="icon"
      >
        <Music className="w-5 h-5" />
      </Button>
    </div>
  )
}
