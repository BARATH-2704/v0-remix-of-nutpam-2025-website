export async function POST(request: Request) {
  try {
    const body = await request.json()

    const { teamName, teamLeaderName, teamLeaderEmail, teamLeaderPhone, teamSize, members, problemTrack } = body

    if (!teamName || !teamLeaderName || !teamLeaderEmail || !teamLeaderPhone || !teamSize || !problemTrack) {
      return Response.json({ success: false, errors: { general: "Missing required fields" } }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(teamLeaderEmail)) {
      return Response.json({ success: false, errors: { teamLeaderEmail: "Invalid email format" } }, { status: 400 })
    }

    // Validate phone format
    const phoneRegex = /^[+]?[\d\s\-()]{10,15}$/
    if (!phoneRegex.test(teamLeaderPhone.replace(/\s/g, ""))) {
      return Response.json({ success: false, errors: { teamLeaderPhone: "Invalid phone format" } }, { status: 400 })
    }

    // Validate team size
    const teamSizeNum = Number.parseInt(teamSize)
    if (teamSizeNum < 2 || teamSizeNum > 3) {
      return Response.json({ success: false, errors: { teamSize: "Team must have 2-3 members" } }, { status: 400 })
    }

    // Validate member details
    const expectedMemberCount = teamSizeNum - 1
    if (members.length !== expectedMemberCount) {
      return Response.json({ success: false, errors: { members: "Invalid member count" } }, { status: 400 })
    }

    // Validate each member's details
    for (let i = 0; i < members.length; i++) {
      const member = members[i]
      if (!member.name || !member.email || !member.phone) {
        return Response.json(
          { success: false, errors: { members: `Member ${i + 2} details incomplete` } },
          { status: 400 },
        )
      }
      if (!emailRegex.test(member.email)) {
        return Response.json(
          { success: false, errors: { members: `Member ${i + 2} has invalid email` } },
          { status: 400 },
        )
      }
      if (!phoneRegex.test(member.phone.replace(/\s/g, ""))) {
        return Response.json(
          { success: false, errors: { members: `Member ${i + 2} has invalid phone` } },
          { status: 400 },
        )
      }
    }

    // Generate unique team ID
    const teamId = `nutpam-2025-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`

    try {
      // Prepare data for Google Apps Script
      const timestamp = new Date().toISOString()
      const formData = new FormData()

      formData.append("timestamp", timestamp)
      formData.append("teamId", teamId)
      formData.append("teamName", teamName)
      formData.append("teamLeaderName", teamLeaderName)
      formData.append("teamLeaderEmail", teamLeaderEmail)
      formData.append("teamLeaderPhone", teamLeaderPhone)
      formData.append("teamSize", teamSize.toString())
      formData.append("member2Name", members[0]?.name || "")
      formData.append("member2Email", members[0]?.email || "")
      formData.append("member2Phone", members[0]?.phone || "")
      formData.append("member3Name", members[1]?.name || "")
      formData.append("member3Email", members[1]?.email || "")
      formData.append("member3Phone", members[1]?.phone || "")
      formData.append("problemTrack", problemTrack)

      // You need to create a Google Apps Script web app and replace this URL
      // Instructions are provided in the setup guide
      const APPS_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        console.error("Failed to update Google Sheets via Apps Script:", response.status)
        // Continue with registration even if sheets update fails
      } else {
        console.log("Successfully updated Google Sheets via Apps Script")
      }
    } catch (sheetsError) {
      console.error("Google Sheets integration error:", sheetsError)
      // Don't fail the registration if sheets update fails
    }

    // Log registration for debugging
    console.log("Registration received:", {
      teamId,
      teamName,
      teamLeaderName,
      teamLeaderEmail,
      teamLeaderPhone,
      teamSize,
      members,
      problemTrack,
      timestamp: new Date().toISOString(),
    })

    return Response.json({
      success: true,
      message: "Registration received successfully",
      teamId,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return Response.json({ success: false, errors: { general: "Internal server error" } }, { status: 500 })
  }
}
