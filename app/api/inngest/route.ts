import { inngest } from "@/app/utils/inngest/client"
import { handleJobExpiration, sendPeriodicJobListinngs } from "@/app/utils/inngest/functions"
import { serve } from "inngest/next"

console.log("✅ Registered Inngest functions:")
console.log(" - handleJobExpiration")
console.log(" - sendPeriodicJobListinngs")

// Register the functions with conditional signing key
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [handleJobExpiration, sendPeriodicJobListinngs],
  // Only use signing key in production
  ...(process.env.NODE_ENV === "production" && {
    signingKey: process.env.INNGEST_SIGNING_KEY,
  }),
})
