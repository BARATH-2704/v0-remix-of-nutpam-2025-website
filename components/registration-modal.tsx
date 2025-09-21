"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-context"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { X, Plus, Minus, Sparkles } from "lucide-react"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  teamName: string
  teamLeader: string
  teamLeaderEmail: string
  problemStatement: string
  teamMembers: string[]
}

interface FormErrors {
  teamName?: string
  teamLeader?: string
  teamLeaderEmail?: string
  problemStatement?: string
  teamMembers?: string
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    teamName: "",
    teamLeader: "",
    teamLeaderEmail: "",
    problemStatement: "",
    teamMembers: ["", ""],
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const steps = [
    { title: "Team Info", description: "Basic team information" },
    { title: "Problem Statement", description: "Choose your challenge" },
    { title: "Team Members", description: "Add your team members" },
    { title: "Review", description: "Confirm your registration" },
  ]

  const problemStatements = t("registration.problemStatements") as string[]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      // Reset form when modal closes
      setCurrentStep(0)
      setShowSuccess(false)
      setFormData({
        teamName: "",
        teamLeader: "",
        teamLeaderEmail: "",
        problemStatement: "",
        teamMembers: ["", ""],
      })
      setErrors({})
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    switch (step) {
      case 0:
        if (!formData.teamName.trim()) newErrors.teamName = t("registration.validation.required")
        if (!formData.teamLeader.trim()) newErrors.teamLeader = t("registration.validation.required")
        if (!formData.teamLeaderEmail.trim()) {
          newErrors.teamLeaderEmail = t("registration.validation.required")
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.teamLeaderEmail)) {
          newErrors.teamLeaderEmail = t("registration.validation.email")
        }
        break
      case 1:
        if (!formData.problemStatement) newErrors.problemStatement = t("registration.validation.required")
        break
      case 2:
        const validMembers = formData.teamMembers.filter((member) => member.trim())
        if (validMembers.length < 2) {
          newErrors.teamMembers = t("registration.validation.minMembers")
        } else if (validMembers.length > 3) {
          newErrors.teamMembers = t("registration.validation.maxMembers")
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const addTeamMember = () => {
    if (formData.teamMembers.length < 3) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: [...prev.teamMembers, ""],
      }))
    }
  }

  const removeTeamMember = (index: number) => {
    if (formData.teamMembers.length > 2) {
      setFormData((prev) => ({
        ...prev,
        teamMembers: prev.teamMembers.filter((_, i) => i !== index),
      }))
    }
  }

  const updateTeamMember = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) => (i === index ? value : member)),
    }))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          teamMembers: formData.teamMembers.filter((member) => member.trim()),
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        createSuccessAnimation()
      } else {
        throw new Error("Registration failed")
      }
    } catch (error) {
      // Fallback to localStorage for demo
      localStorage.setItem("nutpam-registration", JSON.stringify(formData))
      setShowSuccess(true)
      createSuccessAnimation()
    } finally {
      setIsSubmitting(false)
    }
  }

  const createSuccessAnimation = () => {
    // Create confetti-like sparks
    for (let i = 0; i < 20; i++) {
      const spark = document.createElement("div")
      spark.className = "fixed pointer-events-none z-50"
      spark.innerHTML = `<div class="w-2 h-2 bg-primary rounded-full animate-ping"></div>`
      spark.style.left = Math.random() * window.innerWidth + "px"
      spark.style.top = Math.random() * window.innerHeight + "px"

      document.body.appendChild(spark)

      setTimeout(() => {
        if (document.body.contains(spark)) {
          document.body.removeChild(spark)
        }
      }, 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card/90 backdrop-blur-sm border border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-orbitron font-bold text-primary">{t("registration.title")}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {steps[currentStep].title} - {steps[currentStep].description}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={index} className={`flex items-center ${index < steps.length - 1 ? "flex-1" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-gradient-to-r from-primary to-secondary text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all duration-300 ${
                      index < currentStep ? "bg-gradient-to-r from-primary to-secondary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {showSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-primary mb-2">{t("registration.success")}</h3>
              <p className="text-muted-foreground mb-6">{t("registration.successMessage")}</p>
              <Button onClick={onClose} className="bg-gradient-to-r from-primary to-secondary text-background">
                Close
              </Button>
            </div>
          ) : (
            <>
              {/* Step 0: Team Info */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="teamName" className="text-foreground">
                      {t("registration.teamName")}
                    </Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, teamName: e.target.value }))}
                      className="mt-2"
                      placeholder="Enter your team name"
                    />
                    {errors.teamName && <p className="text-destructive text-sm mt-1">{errors.teamName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="teamLeader" className="text-foreground">
                      {t("registration.teamLeader")}
                    </Label>
                    <Input
                      id="teamLeader"
                      value={formData.teamLeader}
                      onChange={(e) => setFormData((prev) => ({ ...prev, teamLeader: e.target.value }))}
                      className="mt-2"
                      placeholder="Enter team leader name"
                    />
                    {errors.teamLeader && <p className="text-destructive text-sm mt-1">{errors.teamLeader}</p>}
                  </div>

                  <div>
                    <Label htmlFor="teamLeaderEmail" className="text-foreground">
                      {t("registration.teamLeaderEmail")}
                    </Label>
                    <Input
                      id="teamLeaderEmail"
                      type="email"
                      value={formData.teamLeaderEmail}
                      onChange={(e) => setFormData((prev) => ({ ...prev, teamLeaderEmail: e.target.value }))}
                      className="mt-2"
                      placeholder="Enter email address"
                    />
                    {errors.teamLeaderEmail && (
                      <p className="text-destructive text-sm mt-1">{errors.teamLeaderEmail}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 1: Problem Statement */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-foreground">{t("registration.problemStatement")}</Label>
                    <Select
                      value={formData.problemStatement}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, problemStatement: value }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose a problem statement" />
                      </SelectTrigger>
                      <SelectContent>
                        {problemStatements.map((statement, index) => (
                          <SelectItem key={index} value={statement}>
                            {statement}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.problemStatement && (
                      <p className="text-destructive text-sm mt-1">{errors.problemStatement}</p>
                    )}
                  </div>

                  <div className="bg-muted/20 rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-2">Problem Statement Details</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose the challenge that interests your team the most. Each problem statement will have specific
                      requirements and judging criteria that will be revealed during the event.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Team Members */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-foreground">{t("registration.teamMembers")}</Label>
                    <p className="text-sm text-muted-foreground mt-1">Add 2-3 team members (including team leader)</p>
                  </div>

                  <div className="space-y-4">
                    {formData.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Input
                          value={member}
                          onChange={(e) => updateTeamMember(index, e.target.value)}
                          placeholder={`Team member ${index + 1}`}
                          className="flex-1"
                        />
                        {formData.teamMembers.length > 2 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeTeamMember(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}

                    {formData.teamMembers.length < 3 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addTeamMember}
                        className="w-full border-dashed border-primary text-primary hover:bg-primary/10 bg-transparent"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {t("registration.addMember")}
                      </Button>
                    )}

                    {errors.teamMembers && <p className="text-destructive text-sm">{errors.teamMembers}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-orbitron font-bold text-primary">Review Your Registration</h3>

                  <div className="space-y-4">
                    <div className="bg-muted/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Team Information</h4>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Team Name:</span> {formData.teamName}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Team Leader:</span> {formData.teamLeader}
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground">Email:</span> {formData.teamLeaderEmail}
                      </p>
                    </div>

                    <div className="bg-muted/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Problem Statement</h4>
                      <p className="text-sm text-primary">{formData.problemStatement}</p>
                    </div>

                    <div className="bg-muted/20 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Team Members</h4>
                      <ul className="text-sm space-y-1">
                        {formData.teamMembers
                          .filter((member) => member.trim())
                          .map((member, index) => (
                            <li key={index}>
                              {index + 1}. {member}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!showSuccess && (
          <div className="flex items-center justify-between p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="text-muted-foreground bg-transparent"
            >
              Previous
            </Button>

            <div className="flex gap-3">
              {currentStep < steps.length - 1 ? (
                <Button onClick={nextStep} className="bg-gradient-to-r from-primary to-secondary text-background">
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-primary to-secondary text-background"
                >
                  {isSubmitting ? "Registering..." : t("registration.submit")}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
