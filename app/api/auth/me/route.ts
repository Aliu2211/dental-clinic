import { type NextRequest, NextResponse } from "next/server"
import { getAuthCookie, verifyToken, mockUsers } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // Get auth cookie
    const token = getAuthCookie()

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Find user by ID
    const user = mockUsers.find((u) => u.id === payload.id)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user data (excluding sensitive information)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profileImage: user.profileImage,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ error: "Authentication check failed" }, { status: 500 })
  }
}
