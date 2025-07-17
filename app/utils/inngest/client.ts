import { Inngest } from "inngest"

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "techignite-jobs",
  // Only use event key in production
  ...(process.env.NODE_ENV === "production" && {
    eventKey: process.env.INNGEST_EVENT_KEY,
  }),
})
