"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-context"
import CountUp from "react-countup"

export default function Home() {
  const [language, setLanguage] = useState<"en" | "ta">("en")
  const [activeSection, setActiveSection] = useState("overview")
  const [registrationStep, setRegistrationStep] = useState(1)
  const [formData, setFormData] = useState({
    teamName: "",
    teamLeaderName: "",
    teamLeaderEmail: "",
    teamLeaderPhone: "",
    teamSize: "",
    members: [] as Array<{ name: string; email: string; phone: string }>,
    problemTrack: "",
    experience: "",
    expectations: "",
    dietaryRestrictions: "",
    tshirtSize: "",
  })
  const { theme, toggleTheme } = useTheme()

  const blocks =
    language === "en"
      ? [
          { letter: "N", color: "from-blue-600 via-blue-700 to-blue-800" },
          { letter: "U", color: "from-gray-600 via-gray-700 to-gray-800" },
          { letter: "T", color: "from-indigo-600 via-indigo-700 to-indigo-800" },
          { letter: "P", color: "from-zinc-600 via-zinc-700 to-zinc-800" },
          { letter: "A", color: "from-slate-500 via-slate-600 to-slate-700" },
          { letter: "M", color: "from-blue-500 via-blue-600 to-blue-700" },
        ]
      : [
          { letter: "நு", color: "from-blue-600 via-blue-700 to-blue-800" },
          { letter: "ட்", color: "from-gray-600 via-gray-700 to-gray-800" },
          { letter: "ப", color: "from-indigo-600 via-indigo-700 to-indigo-800" },
          { letter: "ம்", color: "from-zinc-600 via-zinc-700 to-zinc-800" },
        ]

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ta" : "en"))
  }

  const navItems = [
    { id: "overview", label: language === "en" ? "Overview" : "கண்ணோட்டம்" },
    { id: "timeline", label: language === "en" ? "Timeline" : "காலவரிசை" },
    { id: "problem-statement", label: language === "en" ? "Problem Statement" : "பிரச்சனை அறிக்கை" },
    { id: "registration", label: language === "en" ? "Registration" : "பதிவு" },
    { id: "contact", label: language === "en" ? "Contact" : "தொடர்பு" },
  ]

  const registrationSteps = [
    { id: 1, title: language === "en" ? "Team Info" : "குழு தகவல்" },
    { id: 2, title: language === "en" ? "Team Members" : "குழு உறுப்பினர்கள்" },
    { id: 3, title: language === "en" ? "Track Selection" : "பாதை தேர்வு" },
    { id: 4, title: language === "en" ? "Review" : "மதிப்பாய்வு" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleMemberChange = (index: number, field: string, value: string) => {
    const newMembers = [...formData.members]
    if (!newMembers[index]) {
      newMembers[index] = { name: "", email: "", phone: "" }
    }
    newMembers[index] = { ...newMembers[index], [field]: value }
    setFormData((prev) => ({ ...prev, members: newMembers }))
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[+]?[\d\s\-$$$$]{10,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  }

  const nextStep = () => {
    if (registrationStep === 1) {
      if (
        !formData.teamName ||
        !formData.teamLeaderName ||
        !formData.teamLeaderEmail ||
        !formData.teamLeaderPhone ||
        !formData.teamSize
      ) {
        alert(language === "en" ? "Please fill in all required fields" : "தயவுசெய்து அனிவார்ய புலங்களை நிரப்பவும்")
        return
      }
      if (!validateEmail(formData.teamLeaderEmail)) {
        alert(language === "en" ? "Please enter a valid email address" : "தயவுசெய்து சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்")
        return
      }
      if (!validatePhone(formData.teamLeaderPhone)) {
        alert(
          language === "en"
            ? "Please enter a valid phone number (10-15 digits)"
            : "தயவுசெய்து சரியான தொலைபேசி எண்ணை உள்ளிடவும் (10-15 இலக்கங்கள்)",
        )
        return
      }
    } else if (registrationStep === 2) {
      const memberCount = Number.parseInt(formData.teamSize) - 1 || 0
      for (let i = 0; i < memberCount; i++) {
        if (!formData.members[i]?.name || !formData.members[i]?.email || !formData.members[i]?.phone) {
          alert(
            language === "en"
              ? "Please fill in all team member details"
              : "தயவுசெய்து அனைத்து குழு உறுப்பினர் விவரங்களையும் நிரப்பவும்",
          )
          return
        }
        if (!validateEmail(formData.members[i].email)) {
          alert(
            language === "en"
              ? `Please enter a valid email address for Member ${i + 2}`
              : `உறுப்பினர் ${i + 2} க்கு சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்`,
          )
          return
        }
        if (!validatePhone(formData.members[i].phone)) {
          alert(
            language === "en"
              ? `Please enter a valid phone number for Member ${i + 2}`
              : `உறுப்பினர் ${i + 2} க்கு சரியான தொலைபேசி எண்ணை உள்ளிடவும்`,
          )
          return
        }
      }
    } else if (registrationStep === 3) {
      if (!formData.problemTrack) {
        alert(language === "en" ? "Please select a problem statement" : "தயவுசெய்து ஒரு பிரச்சனை அறிக்கையை தேர்ந்தெடுக்கவும்")
        return
      }
    }

    if (registrationStep < 4) {
      setRegistrationStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep((prev) => prev - 1)
    }
  }

  const handleSubmitRegistration = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert(language === "en" ? "Registration submitted successfully!" : "பதிவு வெற்றிகரமாக சமர்பிக்கப்பட்டது!")
        setRegistrationStep(1)
        setActiveSection("overview")
        // Reset form
        setFormData({
          teamName: "",
          teamLeaderName: "",
          teamLeaderEmail: "",
          teamLeaderPhone: "",
          teamSize: "",
          members: [],
          problemTrack: "",
          experience: "",
          expectations: "",
          dietaryRestrictions: "",
          tshirtSize: "",
        })
      } else {
        throw new Error("Registration failed")
      }
    } catch (error) {
      alert(language === "en" ? "Registration failed. Please try again." : "பதிவு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.")
    }
  }

  const renderStepContent = () => {
    switch (registrationStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "en" ? "Team Name" : "குழு பெயர்"} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.teamName}
                onChange={(e) => handleInputChange("teamName", e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder={language === "en" ? "Enter your team name" : "உங்கள் குழு பெயரை உள்ளிடவும்"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "en" ? "Team Leader Name" : "குழு தலைவர் பெயர்"} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.teamLeaderName}
                onChange={(e) => handleInputChange("teamLeaderName", e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder={language === "en" ? "Enter team leader name" : "குழு தலைவர் பெயரை உள்ளிடவும்"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "en" ? "Team Leader Email" : "குழு தலைவர் மின்னஞ்சல்"} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.teamLeaderEmail}
                onChange={(e) => handleInputChange("teamLeaderEmail", e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder={language === "en" ? "Enter email address" : "மின்னஞ்சல் முகவரியை உள்ளிடவும்"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "en" ? "Team Leader Phone" : "குழு தலைவர் தொலைபேசி"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.teamLeaderPhone}
                onChange={(e) => handleInputChange("teamLeaderPhone", e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                placeholder={language === "en" ? "Enter phone number" : "தொலைபேசி எண்ணை உள்ளிடவும்"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {language === "en" ? "Team Size (2-3 members)" : "குழு அளவு (2-3 உறுப்பினர்கள்)"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.teamSize}
                onChange={(e) => handleInputChange("teamSize", e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              >
                <option value="">{language === "en" ? "Select team size" : "குழு அளவை தேர்ந்தெடுக்கவும்"}</option>
                <option value="2">2 {language === "en" ? "members" : "உறுப்பினர்கள்"}</option>
                <option value="3">3 {language === "en" ? "members" : "உறுப்பினர்கள்"}</option>
              </select>
            </div>
          </div>
        )
      case 2:
        const memberCount = Number.parseInt(formData.teamSize) - 1 || 0
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === "en" ? "Add Team Members" : "குழு உறுப்பினர்களை சேர்க்கவும்"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "en"
                  ? `Add ${memberCount} additional team member${memberCount !== 1 ? "s" : ""}`
                  : `${memberCount} கூடுதல் குழு உறுப்பினர்${memberCount !== 1 ? "கள்" : ""}ஐ சேர்க்கவும்`}
              </p>
            </div>
            {Array.from({ length: memberCount }, (_, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                <h4 className="font-medium text-foreground">
                  {language === "en" ? `Member ${index + 2}` : `உறுப்பினர் ${index + 2}`}
                </h4>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {language === "en" ? "Name" : "பெயர்"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.members[index]?.name || ""}
                    onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder={language === "en" ? "Enter member name" : "உறுப்பினர் பெயரை உள்ளிடவும்"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {language === "en" ? "Email" : "மின்னஞ்சல்"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.members[index]?.email || ""}
                    onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder={language === "en" ? "Enter email address" : "மின்னஞ்சல் முகவரியை உள்ளிடவும்"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {language === "en" ? "Phone" : "தொலைபேசி"} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.members[index]?.phone || ""}
                    onChange={(e) => handleMemberChange(index, "phone", e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    placeholder={language === "en" ? "Enter phone number" : "தொலைபேசி எண்ணை உள்ளிடவும்"}
                  />
                </div>
              </div>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === "en" ? "Select Problem Statement" : "பிரச்சனை அறிக்கையை தேர்ந்தெடுக்கவும்"}{" "}
                <span className="text-red-500">*</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "en"
                  ? "Choose the problem statement your team wants to work on"
                  : "உங்கள் குழு வேலை செய்ய விரும்பும் பிரச்சனை அறிக்கையை தேர்ந்தெடுக்கவும்"}
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "sentiment-analysis",
                  title: language === "en" ? "Sentiment Analysis of Tamil Tweets" : "தமிழ் ட்வீட்களின் உணர்வு பகுப்பாய்வு",
                  description:
                    language === "en"
                      ? "Develop an NLP model to classify Tamil tweets as positive, negative, or neutral. Enable social media monitoring by detecting abusive language, misinformation, or trends."
                      : "தமிழ் ட்வீட்களை நேர்மறை, எதிர்மறை அல்லது நடுநிலை என வகைப்படுத்த NLP மாதிரியை உருவாக்கவும். தவறான மொழி, தவறான தகவல் அல்லது போக்குகளைக் கண்டறிந்து சமூக ஊடக கண்காணிப்பை செயல்படுத்தவும்.",
                },
                {
                  id: "educational-app",
                  title: language === "en" ? "Tamil Educational App for Children" : "குழந்தைகளுக்கான தமிழ் கல்வி ஆப்",
                  description:
                    language === "en"
                      ? "Create an interactive app to teach Tamil alphabets, words, and rhymes with audio-visual aids. Include fun exercises like word-building, sentence-making, and fill-in-the-blanks for engagement."
                      : "ஆடியோ-விஷுவல் உதவிகளுடன் தமிழ் எழுத்துக்கள், சொற்கள் மற்றும் பாடல்களைக் கற்பிக்க ஊடாடும் ஆப்பை உருவாக்கவும். ஈடுபாட்டிற்காக சொல்-கட்டுமானம், வாக்கியம்-உருவாக்கம் மற்றும் நிரப்புதல் போன்ற வேடிக்கையான பயிற்சிகளை சேர்க்கவும்.",
                },
                {
                  id: "agri-chatbot",
                  title: language === "en" ? "Tamil Agri Support Chatbot" : "தமிழ் விவசாய ஆதரவு சாட்பாட்",
                  description:
                    language === "en"
                      ? "Build a chatbot in Tamil that provides crop disease diagnosis and farming advice. Enable image-based crop analysis, nutrient deficiency detection, and remedies via AI."
                      : "பயிர் நோய் கண்டறிதல் மற்றும் விவசாய ஆலோசனை வழங்கும் தமிழில் சாட்பாட்டை உருவாக்கவும். படம் அடிப்படையிலான பயிர் பகுப்பாய்வு, ஊட்டச்சத்து குறைபாடு கண்டறிதல் மற்றும் AI மூலம் தீர்வுகளை செயல்படுத்தவும்.",
                },
                {
                  id: "disaster-alert",
                  title: language === "en" ? "Disaster Alert System in Tamil" : "தமிழில் பேரிடர் எச்சரிக்கை அமைப்பு",
                  description:
                    language === "en"
                      ? "Design a real-time disaster alert system that sends warnings in Tamil via app, SMS, and social media. Integrate government APIs to ensure accurate alerts for floods, earthquakes, and other emergencies."
                      : "ஆப், SMS மற்றும் சமூக ஊடகங்கள் வழியாக தமிழில் எச்சரிக்கைகளை அனுப்பும் நிகழ்நேர பேரிடர் எச்சரிக்கை அமைப்பை வடிவமைக்கவும். வெள்ளம், நிலநடுக்கம் மற்றும் பிற அவசரநிலைகளுக்கு துல்லியமான எச்சரிக்கைகளை உறுதிசெய்ய அரசு API களை ஒருங்கிணைக்கவும்.",
                },
                {
                  id: "ocr-system",
                  title:
                    language === "en"
                      ? "OCR System for Handwritten Tamil Documents"
                      : "கையெழுத்து தமிழ் ஆவணங்களுக்கான OCR அமைப்பு",
                  description:
                    language === "en"
                      ? "Develop an OCR tool to convert handwritten Tamil text and signboards into digital text. Enhance accessibility with accurate recognition of messy handwriting and text-to-speech support."
                      : "கையெழுத்து தமிழ் உரை மற்றும் பலகைகளை டிஜிட்டல் உரையாக மாற்ற OCR கருவியை உருவாக்கவும். குழப்பமான கையெழுத்தின் துல்லியமான அங்கீகாரம் மற்றும் உரையிலிருந்து பேச்சு ஆதரவுடன் அணுகலை மேம்படுத்தவும்.",
                },
                {
                  id: "ancient-scripts",
                  title:
                    language === "en"
                      ? "Recognizing Ancient Tamil Scripts (like Brahmi)"
                      : "பண்டைய தமிழ் எழுத்துக்களை அங்கீகரித்தல் (பிராமி போன்றவை)",
                  description:
                    language === "en"
                      ? "Create an AI model to recognize Brahmi and other ancient Tamil scripts from inscriptions. Translate and map them into modern Tamil with real-time AR-based visualization."
                      : "கல்வெட்டுகளிலிருந்து பிராமி மற்றும் பிற பண்டைய தமிழ் எழுத்துக்களை அங்கீகரிக்க AI மாதிரியை உருவாக்கவும். நிகழ்நேர AR அடிப்படையிலான காட்சிப்படுத்தலுடன் அவற்றை நவீன தமிழில் மொழிபெயர்த்து வரைபடமாக்கவும்.",
                },
                {
                  id: "decipher-inscriptions",
                  title:
                    language === "en" ? "Decipher Ancient Tamil Inscriptions" : "பண்டைய தமிழ் கல்வெட்டுகளை புரிந்துகொள்ளுதல்",
                  description:
                    language === "en"
                      ? "Build an AI/ML system to scan and interpret ancient Tamil inscriptions into readable modern Tamil. Enable historians and researchers with a digital tool for preserving and translating heritage texts."
                      : "பண்டைய தமிழ் கல்வெட்டுகளை ஸ்கேன் செய்து படிக்கக்கூடிய நவீன தமிழாக விளக்க AI/ML அமைப்பை உருவாக்கவும். பாரம்பரிய உரைகளைப் பாதுகாத்து மொழிபெயர்ப்பதற்கான டிஜிட்டல் கருவியுடன் வரலாற்றாசிரியர்கள் மற்றும் ஆராய்ச்சியாளர்களை செயல்படுத்தவும்.",
                },
                {
                  id: "voice-bot",
                  title:
                    language === "en"
                      ? "Tamil Voice Bot for Government Welfare Services"
                      : "அரசு நலன்புரி சேவைகளுக்கான தமிழ் குரல் பாட்",
                  description:
                    language === "en"
                      ? "Develop a voice-enabled chatbot in Tamil to guide citizens about government schemes, eligibility, and application processes. Ensure accessibility for rural and less literate populations through natural Tamil speech interaction."
                      : "அரசு திட்டங்கள், தகுதி மற்றும் விண்ணப்ப செயல்முறைகள் பற்றி குடிமக்களுக்கு வழிகாட்ட தமிழில் குரல்-செயல்படுத்தப்பட்ட சாட்பாட்டை உருவாக்கவும். இயற்கையான தமிழ் பேச்சு தொடர்பு மூலம் கிராமப்புற மற்றும் குறைந்த கல்வியறிவு மக்களுக்கான அணுகலை உறுதிசெய்யவும்.",
                },
                {
                  id: "fake-news-detection",
                  title:
                    language === "en" ? "Detect Fake News in Tamil Language" : "தமிழ் மொழியில் போலி செய்திகளைக் கண்டறிதல்",
                  description:
                    language === "en"
                      ? "Build an AI system to identify and flag misinformation or fake news in Tamil text, audio, and social media posts. Provide real-time verification by cross-checking with trusted news sources and fact-checking databases."
                      : "தமிழ் உரை, ஆடியோ மற்றும் சமூக ஊடக இடுகைகளில் தவறான தகவல் அல்லது போலி செய்திகளை அடையாளம் காணவும் கொடியிடவும் AI அமைப்பை உருவாக்கவும். நம்பகமான செய்தி ஆதாரங்கள் மற்றும் உண்மை சரிபார்ப்பு தரவுத்தளங்களுடன் குறுக்கு சரிபார்ப்பு மூலம் நிகழ்நேர சரிபார்ப்பை வழங்கவும்.",
                },
                {
                  id: "movie-trends",
                  title: language === "en" ? "Trends in Tamil Movie Industry" : "தமிழ் திரைப்படத் துறையின் போக்குகள்",
                  description:
                    language === "en"
                      ? "Analyze shifts in Tamil cinema genres, box-office performance, and audience sentiment over the decades using data analytics. Build a visualization dashboard to uncover cultural, social, and economic influences on Tamil film trends."
                      : "தரவு பகுப்பாய்வைப் பயன்படுத்தி தமிழ் சினிமா வகைகள், பாக்ஸ் ஆபிஸ் செயல்திறன் மற்றும் பார்வையாளர்களின் உணர்வுகளில் பல தசாப்தங்களாக ஏற்பட்ட மாற்றங்களை பகுப்பாய்வு செய்யவும். தமிழ் திரைப்பட போக்குகளில் கலாச்சார, சமூக மற்றும் பொருளாதார தாக்கங்களை வெளிப்படுத்த காட்சிப்படுத்தல் டாஷ்போர்டை உருவாக்கவும்.",
                },
              ].map((problem) => (
                <div
                  key={problem.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="problemStatement"
                      value={problem.id}
                      required
                      checked={formData.problemTrack === problem.id}
                      onChange={(e) => handleInputChange("problemTrack", e.target.value)}
                      className="mt-1 w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{problem.title}</h4>
                      <p className="text-sm text-muted-foreground">{problem.description}</p>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === "en" ? "Review Your Registration" : "உங்கள் பதிவை மதிப்பாய்வு செய்யுங்கள்"}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {language === "en" ? "Team Information" : "குழு தகவல்"}
                </h4>
                <p>
                  <strong>{language === "en" ? "Team Name:" : "குழு பெயர்:"}</strong> {formData.teamName}
                </p>
                <p>
                  <strong>{language === "en" ? "Leader:" : "தலைவர்:"}</strong> {formData.teamLeaderName}
                </p>
                <p>
                  <strong>{language === "en" ? "Email:" : "மின்னஞ்சல்:"}</strong> {formData.teamLeaderEmail}
                </p>
                <p>
                  <strong>{language === "en" ? "Phone:" : "தொலைபேசி:"}</strong> {formData.teamLeaderPhone}
                </p>
                <p>
                  <strong>{language === "en" ? "Team Size:" : "குழு அளவு:"}</strong> {formData.teamSize}
                </p>
              </div>
              {formData.members.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    {language === "en" ? "Team Members" : "குழு உறுப்பினர்கள்"}
                  </h4>
                  {formData.members.map((member, index) => (
                    <div key={index} className="mb-2">
                      <p>
                        <strong>{language === "en" ? `Member ${index + 2}:` : `உறுப்பினர் ${index + 2}:`}</strong>{" "}
                        {member.name} ({member.email})
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {language === "en" ? "Preferences" : "விருப்பங்கள்"}
                </h4>
                <p>
                  <strong>{language === "en" ? "Track:" : "பாதை:"}</strong> {formData.problemTrack}
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const problemStatements = [
    {
      id: 1,
      title: {
        en: "Sentiment Analysis of Tamil Tweets",
        ta: "தமிழ் ட்வீட்களின் உணர்வு பகுப்பாய்வு",
      },
      description: {
        en: "Develop an NLP model to classify Tamil tweets as positive, negative, or neutral. Enable social media monitoring by detecting abusive language, misinformation, or trends.",
        ta: "தமிழ் ட்வீட்களை நேர்மறை, எதிர்மறை அல்லது நடுநிலை என வகைப்படுத்த NLP மாதிரியை உருவாக்கவும். தவறான மொழி, தவறான தகவல் அல்லது போக்குகளைக் கண்டறிந்து சமூக ஊடக கண்காணிப்பை செயல்படுத்தவும்.",
      },
    },
    {
      id: 2,
      title: {
        en: "Tamil Educational App for Children",
        ta: "குழந்தைகளுக்கான தமிழ் கல்வி பயன்பாடு",
      },
      description: {
        en: "Create an interactive app to teach Tamil alphabets, words, and rhymes with audio-visual aids. Include fun exercises like word-building, sentence-making, and fill-in-the-blanks for engagement.",
        ta: "ஆடியோ-விஷுவல் உதவிகளுடன் தமிழ் எழுத்துக்கள், சொற்கள் மற்றும் பாடல்களைக் கற்பிக்க ஊடாடும் பயன்பாட்டை உருவாக்கவும். ஈடுபாட்டிற்காக சொல்-கட்டுமானம், வாக்கியம்-உருவாக்கம் மற்றும் நிரப்புதல் போன்ற வேடிக்கையான பயிற்சிகளை சேர்க்கவும்.",
      },
    },
    {
      id: 3,
      title: {
        en: "Tamil Agri Support Chatbot",
        ta: "தமிழ் விவசாய ஆதரவு சாட்பாட்",
      },
      description: {
        en: "Build a chatbot in Tamil that provides crop disease diagnosis and farming advice. Enable image-based crop analysis, nutrient deficiency detection, and remedies via AI.",
        ta: "பயிர் நோய் கண்டறிதல் மற்றும் விவசாய ஆலோசனை வழங்கும் தமிழில் சாட்பாட்டை உருவாக்கவும். AI மூலம் படம் அடிப்படையிலான பயிர் பகுப்பாய்வு, ஊட்டச்சத்து குறைபாடு கண்டறிதல் மற்றும் தீர்வுகளை செயல்படுத்தவும்.",
      },
    },
    {
      id: 4,
      title: {
        en: "Disaster Alert System in Tamil",
        ta: "தமிழில் பேரிடர் எச்சரிக்கை அமைப்பு",
      },
      description: {
        en: "Design a real-time disaster alert system that sends warnings in Tamil via app, SMS, and social media. Integrate government APIs to ensure accurate alerts for floods, earthquakes, and other emergencies.",
        ta: "பயன்பாடு, SMS மற்றும் சமூக ஊடகங்கள் வழியாக தமிழில் எச்சரிக்கைகளை அனுப்பும் நிகழ்நேர பேரிடர் எச்சரிக்கை அமைப்பை வடிவமைக்கவும். வெள்ளம், நிலநடுக்கம் மற்றும் பிற அவசரநிலைகளுக்கு துல்லியமான எச்சரிக்கைகளை உறுதிசெய்ய அரசு APIகளை ஒருங்கிணைக்கவும்.",
      },
    },
    {
      id: 5,
      title: {
        en: "OCR System for Handwritten Tamil Documents",
        ta: "கையெழுத்து தமிழ் ஆவணங்களுக்கான OCR அமைப்பு",
      },
      description: {
        en: "Develop an OCR tool to convert handwritten Tamil text and signboards into digital text. Enhance accessibility with accurate recognition of messy handwriting and text-to-speech support.",
        ta: "கையெழுத்து தமிழ் உரை மற்றும் பலகைகளை டிஜிட்டல் உரையாக மாற்ற OCR கருவியை உருவாக்கவும். குழப்பமான கையெழுத்தின் துல்லியமான அங்கீகாரம் மற்றும் உரை-க்கு-பேச்சு ஆதரவுடன் அணுகலை மேம்படுத்தவும்.",
      },
    },
    {
      id: 6,
      title: {
        en: "Recognizing Ancient Tamil Scripts (like Brahmi)",
        ta: "பண்டைய தமிழ் எழுத்துக்களை அங்கீகரித்தல் (பிராமி போன்றவை)",
      },
      description: {
        en: "Create an AI model to recognize Brahmi and other ancient Tamil scripts from inscriptions. Translate and map them into modern Tamil with real-time AR-based visualization.",
        ta: "கல்வெட்டுகளிலிருந்து பிராமி மற்றும் பிற பண்டைய தமிழ் எழுத்துக்களை அங்கீகரிக்க AI மாதிரியை உருவாக்கவும். நிகழ்நேர AR அடிப்படையிலான காட்சிப்படுத்தலுடன் அவற்றை நவீன தமிழில் மொழிபெயர்த்து வரைபடமாக்கவும்.",
      },
    },
    {
      id: 7,
      title: {
        en: "Decipher Ancient Tamil Inscriptions",
        ta: "பண்டைய தமிழ் கல்வெட்டுகளை புரிந்துகொள்ளுதல்",
      },
      description: {
        en: "Build an AI/ML system to scan and interpret ancient Tamil inscriptions into readable modern Tamil. Enable historians and researchers with a digital tool for preserving and translating heritage texts.",
        ta: "பண்டைய தமிழ் கல்வெட்டுகளை ஸ்கேன் செய்து படிக்கக்கூடிய நவீன தமிழாக விளக்க AI/ML அமைப்பை உருவாக்கவும். பாரம்பரிய உரைகளைப் பாதுகாத்து மொழிபெயர்ப்பதற்கான டிஜிட்டல் கருவியுடன் வரலாற்றாசிரியர்கள் மற்றும் ஆராய்ச்சியாளர்களை செயல்படுத்தவும்.",
      },
    },
    {
      id: 8,
      title: {
        en: "Tamil Voice Bot for Government Welfare Services",
        ta: "அரசு நலன்புரி சேவைகளுக்கான தமிழ் குரல் பாட்",
      },
      description: {
        en: "Develop a voice-enabled chatbot in Tamil to guide citizens about government schemes, eligibility, and application processes. Ensure accessibility for rural and less literate populations through natural Tamil speech interaction.",
        ta: "அரசு திட்டங்கள், தகுதி மற்றும் விண்ணப்ப செயல்முறைகள் பற்றி குடிமக்களுக்கு வழிகாட்ட தமிழில் குரல்-செயல்படுத்தப்பட்ட சாட்பாட்டை உருவாக்கவும். இயற்கையான தமிழ் பேச்சு தொடர்பு மூலம் கிராமப்புற மற்றும் குறைந்த கல்வியறிவு மக்களுக்கு அணுகலை உறுதிசெய்யவும்.",
      },
    },
    {
      id: 9,
      title: {
        en: "Detect Fake News in Tamil Language",
        ta: "தமிழ் மொழியில் போலி செய்திகளைக் கண்டறிதல்",
      },
      description: {
        en: "Build an AI system to identify and flag misinformation or fake news in Tamil text, audio, and social media posts. Provide real-time verification by cross-checking with trusted news sources and fact-checking databases.",
        ta: "தமிழ் உரை, ஆடியோ மற்றும் சமூக ஊடக இடுகைகளில் தவறான தகவல் அல்லது போலி செய்திகளை அடையாளம் கண்டு கொடியிட AI அமைப்பை உருவாக்கவும். நம்பகமான செய்தி ஆதாரங்கள் மற்றும் உண்மை சரிபார்ப்பு தரவுத்தளங்களுடன் குறுக்கு சரிபார்ப்பு மூலம் நிகழ்நேர சரிபார்ப்பை வழங்கவும்.",
      },
    },
    {
      id: 10,
      title: {
        en: "Trends in Tamil Movie Industry",
        ta: "தமிழ் திரைப்பட துறையின் போக்குகள்",
      },
      description: {
        en: "Analyze shifts in Tamil cinema genres, box-office performance, and audience sentiment over the decades using data analytics. Build a visualization dashboard to uncover cultural, social, and economic influences on Tamil film trends.",
        ta: "தரவு பகுப்பாய்வைப் பயன்படுத்தி தமிழ் சினிமா வகைகள், பாக்ஸ் ஆபிஸ் செயல்திறன் மற்றும் பார்வையாளர்களின் உணர்வுகளில் பல தசாப்தங்களாக ஏற்பட்ட மாற்றங்களை பகுப்பாய்வு செய்யவும். தமிழ் திரைப்பட போக்குகளில் கலாச்சார, சமூக மற்றும் பொருளாதார தாக்கங்களை வெளிப்படுத்த காட்சிப்படுத்தல் டாஷ்போர்டை உருவாக்கவும்.",
      },
    },
    {
      id: 11,
      title: {
        en: "Tamil Grammatical Error Detection",
        ta: "தமிழ் இலக்கண பிழை கண்டறிதல்",
      },
      description: {
        en: "Develop a system that automatically identifies and highlights grammatical errors in Tamil text. This includes detecting incorrect word order, tense usage, spelling inconsistencies, and morphological errors, while suggesting possible corrections to improve accuracy in Tamil writing.",
        ta: "தமிழ் உரையில் இலக்கண பிழைகளை தானாகவே அடையாளம் கண்டு முன்னிலைப்படுத்தும் அமைப்பை உருவாக்கவும். இதில் தவறான சொல் வரிசை, காலம் பயன்பாடு, எழுத்துப்பிழைகள் மற்றும் உருவவியல் பிழைகளைக் கண்டறிதல் அடங்கும், தமிழ் எழுத்தில் துல்லியத்தை மேம்படுத்த சாத்தியமான திருத்தங்களை பரிந்துரைக்கும்.",
      },
    },
    {
      id: 12,
      title: {
        en: "Genre Classification of Tamil Songs (Lyrics-Based)",
        ta: "தமிழ் பாடல்களின் வகை வகைப்பாடு (பாடல் வரிகள் அடிப்படையில்)",
      },
      description: {
        en: "Create a model that classifies Tamil songs into genres (e.g., devotional, folk, romantic, patriotic, cinematic) based on their lyrics. The system will analyze linguistic features, vocabulary, and semantic patterns to determine the most likely genre.",
        ta: "பாடல் வரிகளின் அடிப்படையில் தமிழ் பாடல்களை வகைகளாக (எ.கா., பக்தி, நாட்டுப்புற, காதல், தேசபக்தி, சினிமா) வகைப்படுத்தும் மாதிரியை உருவாக்கவும். மிகவும் சாத்தியமான வகையை தீர்மானிக்க மொழியியல் அம்சங்கள், சொல்லகராதி மற்றும் அர்த்த வடிவங்களை அமைப்பு பகுப்பாய்வு செய்யும்.",
      },
    },
    {
      id: 13,
      title: {
        en: "Tamil Automatic Text Summarization",
        ta: "தமிழ் தானியங்கி உரை சுருக்கம்",
      },
      description: {
        en: "Build a tool that generates concise summaries of Tamil text documents. The system should extract key information, maintain contextual meaning, and produce grammatically coherent summaries to aid quick reading and comprehension.",
        ta: "தமிழ் உரை ஆவணங்களின் சுருக்கமான சுருக்கங்களை உருவாக்கும் கருவியை உருவாக்கவும். அமைப்பு முக்கிய தகவலை பிரித்தெடுக்க, சூழல் அர்த்தத்தை பராமரிக்க மற்றும் விரைவான வாசிப்பு மற்றும் புரிதலுக்கு உதவ இலக்கண ரீதியாக ஒத்திசைவான சுருக்கங்களை உருவாக்க வேண்டும்.",
      },
    },
    {
      id: 14,
      title: {
        en: "Tamil Automatic Speech Recognition (ASR)",
        ta: "தமிழ் தானியங்கி பேச்சு அங்கீகாரம் (ASR)",
      },
      description: {
        en: "Develop an ASR system capable of converting spoken Tamil into written text. It should handle diverse dialects, accents, and variations in pronunciation, enabling applications like voice assistants, transcription, and accessibility tools.",
        ta: "பேசப்படும் தமிழை எழுதப்பட்ட உரையாக மாற்றும் திறன் கொண்ட ASR அமைப்பை உருவாக்கவும். இது பல்வேறு பேச்சுவழக்குகள், உச்சரிப்புகள் மற்றும் உச்சரிப்பு மாறுபாடுகளை கையாள வேண்டும், குரல் உதவியாளர்கள், படியெடுத்தல் மற்றும் அணுகல் கருவிகள் போன்ற பயன்பாடுகளை செயல்படுத்த வேண்டும்.",
      },
    },
    {
      id: 15,
      title: {
        en: "District-wise Agriculture Crop Prediction",
        ta: "மாவட்ட வாரியாக விவசாய பயிர் முன்னறிவிப்பு",
      },
      description: {
        en: "Design a predictive model to forecast suitable crops for cultivation in different districts of Tamil Nadu. The system will use historical data, soil conditions, weather patterns, and rainfall to provide farmers with crop recommendations for better yield.",
        ta: "தமிழ்நாட்டின் பல்வேறு மாவட்டங்களில் சாகுபடிக்கு ஏற்ற பயிர்களை முன்னறிவிக்க முன்னறிவிப்பு மாதிரியை வடிவமைக்கவும். வரலாற்று தரவு, மண் நிலைமைகள், வானிலை வடிவங்கள் மற்றும் மழைப்பொழிவைப் பயன்படுத்தி விவசாயிகளுக்கு சிறந்த விளைச்சலுக்கான பயிர் பரிந்துரைகளை வழங்கும்.",
      },
    },
    {
      id: 16,
      title: {
        en: "Tamil Nadu District-wise Industrial Growth Prediction",
        ta: "தமிழ்நாடு மாவட்ட வாரியாக தொழில்துறை வளர்ச்சி முன்னறிவிப்பு",
      },
      description: {
        en: "Create a machine learning model to predict industrial growth trends across Tamil Nadu districts. The system will analyze factors such as employment rates, infrastructure, government policies, and resource availability to forecast future industrial development.",
        ta: "தமிழ்நாடு மாவட்டங்கள் முழுவதும் தொழில்துறை வளர்ச்சி போக்குகளை முன்னறிவிக்க இயந்திர கற்றல் மாதிரியை உருவாக்கவும். வேலைவாய்ப்பு விகிதங்கள், உள்கட்டமைப்பு, அரசு கொள்கைகள் மற்றும் வள கிடைக்கும் தன்மை போன்ற காரணிகளை பகுப்பாய்வு செய்து எதிர்கால தொழில்துறை வளர்ச்சியை முன்னறிவிக்கும்.",
      },
    },
    {
      id: 17,
      title: {
        en: "Tamil Nadu Folk Song Genre Classification",
        ta: "தமிழ்நாடு நாட்டுப்புற பாடல் வகை வகைப்பாடு",
      },
      description: {
        en: "Build a system that classifies Tamil folk songs into sub-genres (e.g., Kavadi Chindu, Villu Paatu, Thevaram, Oppari) based on their lyrical content, rhythm, and cultural context. This helps preserve and digitize Tamil folk heritage.",
        ta: "பாடல் வரிகள், தாளம் மற்றும் கலாச்சார சூழலின் அடிப்படையில் தமிழ் நாட்டுப்புற பாடல்களை துணை வகைகளாக (எ.கா., காவடி சிந்து, வில்லுப்பாட்டு, தேவாரம், ஒப்பாரி) வகைப்படுத்தும் அமைப்பை உருவாக்கவும். இது தமிழ் நாட்டுப்புற பாரம்பரியத்தை பாதுகாக்கவும் டிஜிட்டல்மயமாக்கவும் உதவுகிறது.",
      },
    },
    {
      id: 18,
      title: {
        en: "Automatic Tamil Travel Guide Chatbot",
        ta: "தானியங்கி தமிழ் பயண வழிகாட்டி சாட்பாட்",
      },
      description: {
        en: "Develop a chatbot that interacts with users in Tamil, offering personalized travel guidance for Tamil Nadu. The chatbot can recommend tourist spots, cultural sites, local foods, and travel itineraries based on user preferences.",
        ta: "தமிழ்நாட்டிற்கான தனிப்பயனாக்கப்பட்ட பயண வழிகாட்டுதலை வழங்கி, பயனர்களுடன் தமிழில் தொடர்பு கொள்ளும் சாட்பாட்டை உருவாக்கவும். பயனர் விருப்பங்களின் அடிப்படையில் சுற்றுலா இடங்கள், கலாச்சார தளங்கள், உள்ளூர் உணவுகள் மற்றும் பயண திட்டங்களை சாட்பாட் பரிந்துரைக்கலாம்.",
      },
    },
    {
      id: 19,
      title: {
        en: "Recognition of Tamil Kingdom Sculpture Styles",
        ta: "தமிழ் அரசு சிற்ப பாணிகளின் அங்கீகாரம்",
      },
      description: {
        en: "Create an image recognition system that identifies and classifies sculptures from different Tamil kingdoms (e.g., Chola, Pandya, Pallava). The system will analyze stylistic features, iconography, and artistic patterns to attribute sculptures to their respective dynasties.",
        ta: "பல்வேறு தமிழ் அரசுகளின் (எ.கா., சோழர், பாண்டியர், பல்லவர்) சிற்பங்களை அடையாளம் கண்டு வகைப்படுத்தும் படம் அங்கீகார அமைப்பை உருவாக்கவும். பாணி அம்சங்கள், உருவவியல் மற்றும் கலை வடிவங்களை பகுப்பாய்வு செய்து சிற்பங்களை அந்தந்த வம்சங்களுக்கு கூறும்.",
      },
    },
  ]

  const renderStep = () => {
    switch (
      registrationStep // Changed from currentStep to registrationStep
    ) {
      case 0: // This case is not used in the original code, but kept for potential future use or if it was intended to be the first step.
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {language === "en" ? "Welcome to NUTPAM 2025" : "NUTPAM 2025 க்கு வரவேற்கிறோம்"}
              </h2>
              <p className="text-muted-foreground">
                {language === "en"
                  ? "Tamil Hackathon - Innovating for Tamil Heritage"
                  : "தமிழ் ஹேக்கத்தான் - தமிழ் பாரம்பரியத்திற்கான புதுமை"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-primary mb-2">
                  <CountUp end={19} duration={2} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Problem Statements" : "பிரச்சனை அறிக்கைகள்"}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-primary mb-2">
                  <CountUp end={48} duration={2} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Hours to Code" : "குறியீட்டு மணிநேரங்கள்"}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-primary mb-2">
                  <CountUp end={100} duration={2} />+
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Teams Expected" : "எதிர்பார்க்கப்படும் குழுக்கள்"}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-primary mb-2">
                  <CountUp end={50000} duration={2} />+
                </div>
                <p className="text-sm text-muted-foreground">{language === "en" ? "Prize Pool" : "பரிசு தொகை"}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={() => setRegistrationStep(1)} // Changed from setCurrentStep(1)
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
              >
                {language === "en" ? "Start Registration" : "பதிவைத் தொடங்கவும்"}
              </Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-foreground">
                {language === "en" ? "Review Your Registration" : "உங்கள் பதிவை மதிப்பாய்வு செய்யுங்கள்"}
              </h3>
            </div>
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {language === "en" ? "Team Information" : "குழு தகவல்"}
                </h4>
                <p>
                  <strong>{language === "en" ? "Team Name:" : "குழு பெயர்:"}</strong> {formData.teamName}
                </p>
                <p>
                  <strong>{language === "en" ? "Leader:" : "தலைவர்:"}</strong> {formData.teamLeaderName}
                </p>
                <p>
                  <strong>{language === "en" ? "Email:" : "மின்னஞ்சல்:"}</strong> {formData.teamLeaderEmail}
                </p>
                <p>
                  <strong>{language === "en" ? "Phone:" : "தொலைபேசி:"}</strong> {formData.teamLeaderPhone}
                </p>
                <p>
                  <strong>{language === "en" ? "Team Size:" : "குழு அளவு:"}</strong> {formData.teamSize}
                </p>
              </div>
              {formData.members.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    {language === "en" ? "Team Members" : "குழு உறுப்பினர்கள்"}
                  </h4>
                  {formData.members.map((member, index) => (
                    <div key={index} className="mb-2">
                      <p>
                        <strong>{language === "en" ? `Member ${index + 2}:` : `உறுப்பினர் ${index + 2}:`}</strong>{" "}
                        {member.name} ({member.email})
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">
                  {language === "en" ? "Preferences" : "விருப்பங்கள்"}
                </h4>
                <p>
                  <strong>{language === "en" ? "Track:" : "பாதை:"}</strong> {formData.problemTrack}
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderProblemStatements = () => {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {language === "en" ? "Problem Statements" : "பிரச்சனை அறிக்கைகள்"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "Choose from 19 exciting challenges focused on Tamil language, culture, and technology innovation."
              : "தமிழ் மொழி, கலாச்சாரம் மற்றும் தொழில்நுட்ப புதுமையை மையமாகக் கொண்ட 19 உற்சாகமான சவால்களில் இருந்து தேர்வு செய்யுங்கள்."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemStatements.map((problem) => (
            <div
              key={problem.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {problem.id}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {problem.title[language]}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                {problem.description[language]}
              </p>

              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  <span className="mr-2">●</span>
                  {language === "en" ? "AI/ML Challenge" : "AI/ML சவால்"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      <header className="relative z-10 bg-card/90 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/paavendhar-logo.jpeg"
              alt="Paavendhar Bharathidaasan Tamil Literary Association Logo"
              className="w-24 h-24 object-contain rounded-lg shadow-md"
            />
          </div>

          <div className="hidden md:block text-sm font-mono">
            <span className="text-primary">&lt;date&gt;</span>
            <span className="text-foreground mx-2">September 22, 2025</span>
            <span className="text-primary">&lt;/date&gt;</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleTheme} className="text-xs bg-transparent">
              {theme === "light" ? "🌙" : "☀️"}
            </Button>
            <Button variant="outline" size="sm" onClick={toggleLanguage} className="text-xs bg-transparent">
              {language === "en" ? "தமிழ்" : "English"}
            </Button>
          </div>
        </div>
      </header>

      {activeSection === "overview" && (
        <div className="relative z-10 pt-16 pb-32 px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
              <div className="space-y-8">
                <div className="flex justify-center lg:justify-start mb-8">
                  <div className="relative">
                    <img
                      src="/images/brain-circuit.jpeg"
                      alt="AI Brain Circuit Logo"
                      className="w-32 h-32 object-contain rounded-full shadow-lg animate-pulse"
                      style={{
                        filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
                        animation: "float 3s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-none">
                    {language === "en" ? "NUTPAM" : "நுட்பம்"}
                  </h1>
                  <h2 className="text-6xl lg:text-8xl xl:text-9xl font-bold text-foreground leading-none">
                    {language === "en" ? "2025" : "2025"}
                  </h2>
                  <p className="text-lg text-muted-foreground mt-4 font-medium">September 22, 2025</p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setActiveSection("registration")}
                    className="bg-foreground hover:bg-foreground/90 text-background px-6 py-3 text-base font-medium"
                  >
                    {language === "en" ? "Register Now" : "பதிவு செய்யுங்கள்"}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="space-y-3 max-w-md mx-auto lg:mx-0 lg:ml-auto">
                  {/* First row - NUTPAM or நுட்பம் */}
                  <div className="flex justify-center gap-3">
                    {blocks.map((block, index) => (
                      <div
                        key={`${block.letter}-${index}`}
                        onClick={toggleLanguage}
                        className="relative cursor-pointer group"
                      >
                        <div
                          style={{
                            width: "88px",
                            height: "88px",
                            fontSize: "2.8rem",
                            fontFamily: "'Inter', Arial, sans-serif",
                            fontWeight: 900,
                            color: "#23242c",
                            background: "#f6f8fc",
                            margin: "0 5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "22px 28px 21px 19px / 22px 17px 28px 26px",
                            border: "2.8px solid #222",
                            boxShadow: `
                              6px 9px 0 0 #222,
                              0 2.5px 0 0 #fff inset,
                              0 7px 22px rgba(0, 0, 0, 0.07)
                            `,
                            position: "relative",
                            transition: "box-shadow 0.2s",
                            backgroundClip: "padding-box",
                            cursor: "pointer",
                            transform: "skew(-7deg, -2deg) rotateZ(-2deg)",
                          }}
                          onMouseDown={(e) => {
                            e.currentTarget.style.boxShadow = `
                              0 2px 0 0 #222,
                              0 1px 6px rgba(0,0,0,0.12)
                            `
                            e.currentTarget.style.transform = "scale(0.97) skew(-5deg, -2deg) rotateZ(-1deg)"
                          }}
                          onMouseUp={(e) => {
                            e.currentTarget.style.boxShadow = `
                              6px 9px 0 0 #222,
                              0 2.5px 0 0 #fff inset,
                              0 7px 22px rgba(0,0,0,0.07)
                            `
                            e.currentTarget.style.transform = "skew(-7deg, -2deg) rotateZ(-2deg)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = `
                              6px 9px 0 0 #222,
                              0 2.5px 0 0 #fff inset,
                              0 7px 22px rgba(0,0,0,0.07)
                            `
                            e.currentTarget.style.transform = "skew(-7deg, -2deg) rotateZ(-2deg)"
                          }}
                        >
                          <span className="relative z-10 select-none font-bold tracking-wide">{block.letter}</span>

                          {/* Side element for 3D effect */}
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: "-15px",
                              height: "15px",
                              background: "rgba(220, 220, 220, 0.7)",
                              borderTop: "1.8px solid #1b1b1b",
                              zIndex: 1,
                              borderRadius: "0 0 21px 17px",
                              boxShadow: "0 7px 18px rgba(0,0,0,0.08)",
                              pointerEvents: "none",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Second row - decorative keys */}
                  <div className="flex justify-center gap-3 opacity-60">
                    {[
                      { letter: "2", color: "from-slate-600 via-slate-700 to-slate-800" },
                      { letter: "0", color: "from-blue-600 via-blue-700 to-blue-800" },
                      { letter: "2", color: "from-gray-600 via-gray-700 to-gray-800" },
                      { letter: "5", color: "from-indigo-600 via-indigo-700 to-indigo-800" },
                    ].map((block, index) => (
                      <div key={`year-${index}`} className="relative">
                        <div
                          style={{
                            width: "66px",
                            height: "66px",
                            fontSize: "2.2rem",
                            fontFamily: "'Inter', Arial, sans-serif",
                            fontWeight: 900,
                            color: "#23242c",
                            background: "#f6f8fc",
                            margin: "0 3px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "18px 22px 17px 15px / 18px 14px 22px 20px",
                            border: "2.2px solid #222",
                            boxShadow: `
                              5px 7px 0 0 #222,
                              0 2px 0 0 #fff inset,
                              0 5px 16px rgba(0, 0, 0, 0.06)
                            `,
                            position: "relative",
                            transition: "box-shadow 0.2s",
                            backgroundClip: "padding-box",
                            transform: "skew(-6deg, -1.5deg) rotateZ(-1.5deg)",
                          }}
                        >
                          <span className="relative z-10 select-none font-bold">{block.letter}</span>

                          {/* Side element for smaller keys */}
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: "-12px",
                              height: "12px",
                              background: "rgba(220, 220, 220, 0.6)",
                              borderTop: "1.5px solid #1b1b1b",
                              zIndex: 1,
                              borderRadius: "0 0 17px 14px",
                              boxShadow: "0 5px 14px rgba(0,0,0,0.06)",
                              pointerEvents: "none",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "timeline" && (
        <div className="relative z-10 pt-16 pb-32 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
              {language === "en" ? "Event Timeline" : "நிகழ்வு காலவரிசை"}
            </h2>
            <div className="mb-6 text-center">
              <p className="text-lg text-muted-foreground">
                {language === "en"
                  ? "1 Day Workshop + Hackathon • September 22nd, 2025"
                  : "1 நாள் பட்டறை + ஹேக்கத்தான் • செப்டம்பர் 22, 2025"}
              </p>
            </div>
            <div className="space-y-8">
              {[
                {
                  time: "9:00 AM",
                  event: language === "en" ? "NoCodeML Workshop" : "NoCodeML பட்டறை",
                  desc:
                    language === "en"
                      ? "Learn machine learning without coding - hands-on workshop"
                      : "கோடிங் இல்லாமல் இயந்திர கற்றல் - நடைமுறை பட்டறை",
                },
                {
                  time: "11:00 AM",
                  event: language === "en" ? "Problem Statements Disclosure" : "பிரச்சனை அறிக்கைகள் வெளியீடு",
                  desc:
                    language === "en"
                      ? "Official announcement of hackathon challenges and tracks"
                      : "ஹேக்கத்தான் சவால்கள் மற்றும் பாதைகளின் அதிகாரப்பூர்வ அறிவிப்பு",
                },
                {
                  time: "12:00 PM",
                  event: language === "en" ? "Hackathon Starts" : "ஹேக்கத்தான் தொடக்கம்",
                  desc:
                    language === "en"
                      ? "Teams begin working on their innovative solutions"
                      : "குழுக்கள் தங்கள் புதுமையான தீர்வுகளில் வேலை செய்யத் தொடக்குகின்றன",
                },
                {
                  time: "2:00 PM",
                  event: language === "en" ? "Level 1 Review" : "நிலை 1 மதிப்பாய்வு",
                  desc:
                    language === "en"
                      ? "First checkpoint - progress evaluation and mentor feedback"
                      : "முதல் சோதனைப் புள்ளி - முன்னேற்ற மதிப்பீடு மற்றும் வழிகாட்டி கருத்து",
                },
                {
                  time: "4:00 PM",
                  event: language === "en" ? "Final Review" : "இறுதி மதிப்பாய்வு",
                  desc:
                    language === "en"
                      ? "Final project presentations and judging begins"
                      : "இறுதி திட்ட விளக்கக்காட்சிகள் மற்றும் நடுவர் மதிப்பீடு தொடக்கம்",
                },
                {
                  time: "5:30 PM",
                  event: language === "en" ? "Winners Announcement" : "வெற்றியாளர்கள் அறிவிப்பு",
                  desc:
                    language === "en"
                      ? "Award ceremony and celebration of innovative solutions"
                      : "விருது வழங்கும் விழா மற்றும் புதுமையான தீர்வுகளின் கொண்டாட்டம்",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold text-sm min-w-[100px] text-center">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.event}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === "problem-statement" && (
        <div className="relative z-10 pt-16 pb-32 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
              {language === "en" ? "Problem Statements" : "பிரச்சனை அறிக்கைகள்"}
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12">
              {language === "en"
                ? "Choose from these exciting Tamil hackathon challenges"
                : "இந்த அற்புதமான தமிழ் ஹேக்கத்தான் சவால்களில் இருந்து தேர்ந்தெடுக்கவும்"}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: "Sentiment Analysis of Tamil Tweets",
                  description:
                    "Develop an NLP model to classify Tamil tweets as positive, negative, or neutral. Enable social media monitoring by detecting abusive language, misinformation, or trends.",
                },
                {
                  id: 2,
                  title: "Tamil Educational App for Children",
                  description:
                    "Create an interactive app to teach Tamil alphabets, words, and rhymes with audio-visual aids. Include fun exercises like word-building, sentence-making, and fill-in-the-blanks for engagement.",
                },
                {
                  id: 3,
                  title: "Tamil Agri Support Chatbot",
                  description:
                    "Build a chatbot in Tamil that provides crop disease diagnosis and farming advice. Enable image-based crop analysis, nutrient deficiency detection, and remedies via AI.",
                },
                {
                  id: 4,
                  title: "Disaster Alert System in Tamil",
                  description:
                    "Design a real-time disaster alert system that sends warnings in Tamil via app, SMS, and social media. Integrate government APIs to ensure accurate alerts for floods, earthquakes, and other emergencies.",
                },
                {
                  id: 5,
                  title: "OCR System for Handwritten Tamil Documents",
                  description:
                    "Develop an OCR tool to convert handwritten Tamil text and signboards into digital text. Enhance accessibility with accurate recognition of messy handwriting and text-to-speech support.",
                },
                {
                  id: 6,
                  title: "Recognizing Ancient Tamil Scripts (like Brahmi)",
                  description:
                    "Create an AI model to recognize Brahmi and other ancient Tamil scripts from inscriptions. Translate and map them into modern Tamil with real-time AR-based visualization.",
                },
                {
                  id: 7,
                  title: "Decipher Ancient Tamil Inscriptions",
                  description:
                    "Build an AI/ML system to scan and interpret ancient Tamil inscriptions into readable modern Tamil. Enable historians and researchers with a digital tool for preserving and translating heritage texts.",
                },
                {
                  id: 8,
                  title: "Tamil Voice Bot for Government Welfare Services",
                  description:
                    "Develop a voice-enabled chatbot in Tamil to guide citizens about government schemes, eligibility, and application processes. Ensure accessibility for rural and less literate populations through natural Tamil speech interaction.",
                },
                {
                  id: 9,
                  title: "Detect Fake News in Tamil Language",
                  description:
                    "Build an AI system to identify and flag misinformation or fake news in Tamil text, audio, and social media posts. Provide real-time verification by cross-checking with trusted news sources and fact-checking databases.",
                },
                {
                  id: 10,
                  title: "Trends in Tamil Movie Industry",
                  description:
                    "Analyze shifts in Tamil cinema genres, box-office performance, and audience sentiment over the decades using data analytics. Build a visualization dashboard to uncover cultural, social, and economic influences on Tamil film trends.",
                },
                {
                  id: 11,
                  title: "Tamil Grammatical Error Detection",
                  description:
                    "Develop a system that automatically identifies and highlights grammatical errors in Tamil text. This includes detecting incorrect word order, tense usage, spelling inconsistencies, and morphological errors, while suggesting possible corrections to improve accuracy in Tamil writing.",
                },
                {
                  id: 12,
                  title: "Genre Classification of Tamil Songs (Lyrics-Based)",
                  description:
                    "Create a model that classifies Tamil songs into genres (e.g., devotional, folk, romantic, patriotic, cinematic) based on their lyrics. The system will analyze linguistic features, vocabulary, and semantic patterns to determine the most likely genre.",
                },
                {
                  id: 13,
                  title: "Tamil Automatic Text Summarization",
                  description:
                    "Build a tool that generates concise summaries of Tamil text documents. The system should extract key information, maintain contextual meaning, and produce grammatically coherent summaries to aid quick reading and comprehension.",
                },
                {
                  id: 14,
                  title: "Tamil Automatic Speech Recognition (ASR)",
                  description:
                    "Develop an ASR system capable of converting spoken Tamil into written text. It should handle diverse dialects, accents, and variations in pronunciation, enabling applications like voice assistants, transcription, and accessibility tools.",
                },
                {
                  id: 15,
                  title: "District-wise Agriculture Crop Prediction",
                  description:
                    "Design a predictive model to forecast suitable crops for cultivation in different districts of Tamil Nadu. The system will use historical data, soil conditions, weather patterns, and rainfall to provide farmers with crop recommendations for better yield.",
                },
                {
                  id: 16,
                  title: "Tamil Nadu District-wise Industrial Growth Prediction",
                  description:
                    "Create a machine learning model to predict industrial growth trends across Tamil Nadu districts. The system will analyze factors such as employment rates, infrastructure, government policies, and resource availability to forecast future industrial development.",
                },
                {
                  id: 17,
                  title: "Tamil Nadu Folk Song Genre Classification",
                  description:
                    "Build a system that classifies Tamil folk songs into sub-genres (e.g., Kavadi Chindu, Villu Paatu, Thevaram, Oppari) based on their lyrical content, rhythm, and cultural context. This helps preserve and digitize Tamil folk heritage.",
                },
                {
                  id: 18,
                  title: "Automatic Tamil Travel Guide Chatbot",
                  description:
                    "Develop a chatbot that interacts with users in Tamil, offering personalized travel guidance for Tamil Nadu. The chatbot can recommend tourist spots, cultural sites, local foods, and travel itineraries based on user preferences.",
                },
                {
                  id: 19,
                  title: "Recognition of Tamil Kingdom Sculpture Styles",
                  description:
                    "Create an image recognition system that identifies and classifies sculptures from different Tamil kingdoms (e.g., Chola, Pandya, Pallava). The system will analyze stylistic features, iconography, and artistic patterns to attribute sculptures to their respective dynasties.",
                },
              ].map((problem) => (
                <div
                  key={problem.id}
                  className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-background font-bold text-sm group-hover:scale-110 transition-transform">
                      {problem.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {problem.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span>AI/ML Challenge</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === "registration" && (
        <div className="relative z-10 pt-16 pb-32 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
              {language === "en" ? "Registration" : "பதிவு"}
            </h2>

            {/* Stepper */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-8">
                {registrationSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                      ${
                        registrationStep >= step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground border-2 border-muted-foreground"
                      }
                    `}
                    >
                      {registrationStep > step.id ? "✓" : step.id}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p
                        className={`text-sm font-medium ${
                          registrationStep >= step.id ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </p>
                    </div>
                    {index < registrationSteps.length - 1 && (
                      <div
                        className={`
                        w-12 sm:w-24 h-0.5 mx-4
                        ${registrationStep > step.id ? "bg-primary" : "bg-muted"}
                      `}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
              {renderStepContent()}

              <div className="flex justify-between mt-8">
                <Button
                  onClick={prevStep}
                  disabled={registrationStep === 1}
                  variant="outline"
                  className="px-6 bg-transparent"
                >
                  {language === "en" ? "Previous" : "முந்தைய"}
                </Button>

                {registrationStep < 4 ? (
                  <Button onClick={nextStep} className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
                    {language === "en" ? "Next" : "அடுத்து"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitRegistration}
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                  >
                    {language === "en" ? "Submit Registration" : "பதிவை சமர்பிக்கவும்"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "contact" && (
        <div className="relative z-10 pt-16 pb-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img
                  src="/images/brain-circuit.jpeg"
                  alt="AI Brain Circuit Logo"
                  className="w-24 h-24 object-contain rounded-full shadow-lg"
                  style={{
                    filter: "drop-shadow(0 0 15px rgba(59, 130, 246, 0.4))",
                    animation: "float 4s ease-in-out infinite, pulse 2s ease-in-out infinite alternate",
                  }}
                />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
              {language === "en" ? "Contact Us" : "எங்களை தொடர்பு கொள்ளுங்கள்"}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {language === "en" ? "Event Organizers" : "நிகழ்வு ஏற்பாடாளர்கள்"}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        N
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Nikshitha R</p>
                        <p className="text-sm text-muted-foreground">9789219638</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-bold">
                        H
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Hirtish E</p>
                        <p className="text-sm text-muted-foreground">6385049749</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{language === "en" ? "Venue" : "இடம்"}</h3>
                  <p className="text-muted-foreground">
                    {language === "en" ? "CDMM 213, VIT VELLORE" : "CDMM 213, VIT வேலூர்"}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {language === "en" ? "Follow Us" : "எங்களை பின்தொடருங்கள்"}
                  </h3>
                  <a
                    href="https://www.instagram.com/vitu.tla/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    @vitu.tla
                  </a>
                </div>
              </div>

              <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {language === "en" ? "Event Information" : "நிகழ்வு தகவல்"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {language === "en" ? "Date & Time" : "தேதி மற்றும் நேரம்"}
                    </h4>
                    <p className="text-muted-foreground">September 22, 2025</p>
                    <p className="text-muted-foreground">9:00 AM - 6:00 PM</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {language === "en" ? "Registration" : "பதிவு"}
                    </h4>
                    <p className="text-muted-foreground">
                      {language === "en" ? "Team size: 2-3 members" : "குழு அளவு: 2-3 உறுப்பினர்கள்"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{language === "en" ? "Format" : "வடிவம்"}</h4>
                    <p className="text-muted-foreground">
                      {language === "en" ? "Workshop + Hackathon" : "பட்டறை + ஹேக்கத்தான்"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id)
                  if (item.id === "registration") {
                    setRegistrationStep(1)
                  }
                }}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </main>
  )
}
