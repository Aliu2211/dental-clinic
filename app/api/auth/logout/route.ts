import { type NextRequest, NextResponse } from "next/server"
import { clearAuthCookie } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    // Clear auth cookie
    clearAuthCookie()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
