import { inngest } from "@/app/utils/inngest/client";
import {
  handleJobExpiration,
  sendPeriodicJobListinngs,
} from "@/app/utils/inngest/functions";
import { serve } from "inngest/next";

// ✅ Add console logs here
console.log("✅ Registered Inngest functions:");
console.log(" - handleJobExpiration");
console.log(" - sendPeriodicJobListinngs");

// ✅ Register the functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [handleJobExpiration, sendPeriodicJobListinngs],
});
