import { inngest } from "@/app/utils/inngest/client";
import { handleJobExpiration, sendPeriodicJobListinngs } from "@/app/utils/inngest/functions";
import { serve } from "inngest/next";
import { send } from "process";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [handleJobExpiration, sendPeriodicJobListinngs],
});
