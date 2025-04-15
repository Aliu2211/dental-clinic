import { type NextRequest, NextResponse } from "next/server"
import { findUserByCredentials, signToken, setAuthCookie } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Find user by credentials
    const user = findUserByCredentials(email, password)

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Create JWT token
    const token = await signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    })

    // Set auth cookie
    setAuthCookie(token)

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
    console.error("Login error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
