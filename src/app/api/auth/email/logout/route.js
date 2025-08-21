import responseHelper from "@/lib/responseHelper";

export async function POST(req) {
  try {
    // Agar aap session/cookies handle kar rahe ho to yahan clear kar do
    // e.g., res.cookies.set('token', '', { maxAge: 0 });

    return responseHelper.success({}, "Logged out successfully");
  } catch (err) {
    console.error("Logout error:", err);
    return responseHelper.serverError("Logout failed");
  }
}

// Agar koi aur method call kare
export function GET() {
  return responseHelper.methodNotAllowed();
}
