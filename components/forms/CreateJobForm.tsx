"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Switch } from "../ui/switch"
import { toast } from "sonner"

const jobSchema = z.object({
  jobTitle: z.string().min(3, {
    message: "Job title must be at least 3 characters.",
  }),
  companyName: z.string().min(3, {
    message: "Company name must be at least 3 characters.",
  }),
  companyWebsite: z.string().url({ message: "Invalid website URL." }),
  companyXAccount: z.string().optional(),
  companyLocation: z.string().min(3, {
    message: "Company location must be at least 3 characters.",
  }),
  location: z.string().min(3, {
    message: "Job location must be at least 3 characters.",
  }),
  jobDescription: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
  companyDescription: z.string().min(10, {
    message: "Company description must be at least 10 characters.",
  }),
  employmentType: z.string().min(3, {
    message: "Employment type must be at least 3 characters.",
  }),
  salaryFrom: z.number().min(0, {
    message: "Salary must be at least 0.",
  }),
  salaryTo: z.number().min(0, {
    message: "Salary must be at least 0.",
  }),
  benefits: z.array(z.string()).optional(),
  companyLogo: z.string().url({ message: "Invalid logo URL." }),
  listingDuration: z.number().min(7).max(90),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]),
})

interface iAppProps {
  companyName: string
  companyWebsite: string
  companyXAccount: string | null
  companyLocation: string
  companyAbout: string
  companyLogo: string
}

export function CreateJobForm({
  companyAbout,
  companyLocation,
  companyLogo,
  companyName,
  companyXAccount,
  companyWebsite,
}: iAppProps) {
  const router = useRouter()
  const [isRemote, setIsRemote] = useState(false)

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      benefits: [],
      companyDescription: companyAbout,
      companyLocation: companyLocation,
      companyName: companyName,
      companyWebsite: companyWebsite,
      companyXAccount: companyXAccount || "",
      employmentType: "",
      jobDescription: "",
      jobTitle: "",
      location: "",
      salaryFrom: 0,
      salaryTo: 0,
      companyLogo: companyLogo,
      listingDuration: 30,
      status: "ACTIVE",
    },
  })

  function onSubmit(values: z.infer<typeof jobSchema>) {
    console.log(values)
    toast.success("Job created!", {
      description: "Your job has been created successfully.",
    })
    router.push("/")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job title</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Corp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company website</FormLabel>
              <FormControl>
                <Input placeholder="https://acme.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyXAccount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company X account (optional)</FormLabel>
              <FormControl>
                <Input placeholder="@acme" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company location</FormLabel>
              <FormControl>
                <Input placeholder="San Francisco, CA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job location</FormLabel>
              <FormControl>
                <Input placeholder={isRemote ? "Remote" : "San Francisco, CA"} {...field} disabled={isRemote} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
          <Switch id="remote" onCheckedChange={() => setIsRemote(!isRemote)} />
          <label
            htmlFor="remote"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remote
          </label>
        </div>
        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job description</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a detailed job description" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company description</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a detailed company description" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employmentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employment type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FULL_TIME">Full-time</SelectItem>
                  <SelectItem value="PART_TIME">Part-time</SelectItem>
                  <SelectItem value="CONTRACT">Contract</SelectItem>
                  <SelectItem value="TEMPORARY">Temporary</SelectItem>
                  <SelectItem value="INTERN">Intern</SelectItem>
                  <SelectItem value="VOLUNTEER">Volunteer</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Salary Range</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="salaryFrom"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Salary from</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="30000"
                          {...field}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryTo"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Salary to</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="100000"
                          {...field}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value))
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Benefits</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2">
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="health"
                          checked={field.value?.includes("health")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), "health"])
                              : field.onChange(field.value?.filter((value) => value !== "health"))
                          }}
                        />
                        <label
                          htmlFor="health"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Health insurance
                        </label>
                      </div>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="dental"
                          checked={field.value?.includes("dental")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), "dental"])
                              : field.onChange(field.value?.filter((value) => value !== "dental"))
                          }}
                        />
                        <label
                          htmlFor="dental"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Dental insurance
                        </label>
                      </div>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vision"
                          checked={field.value?.includes("vision")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), "vision"])
                              : field.onChange(field.value?.filter((value) => value !== "vision"))
                          }}
                        />
                        <label
                          htmlFor="vision"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Vision insurance
                        </label>
                      </div>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="paidTimeOff"
                          checked={field.value?.includes("paidTimeOff")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), "paidTimeOff"])
                              : field.onChange(field.value?.filter((value) => value !== "paidTimeOff"))
                          }}
                        />
                        <label
                          htmlFor="paidTimeOff"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Paid time off
                        </label>
                      </div>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="401k"
                          checked={field.value?.includes("401k")}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...(field.value || []), "401k"])
                              : field.onChange(field.value?.filter((value) => value !== "401k"))
                          }}
                        />
                        <label
                          htmlFor="401k"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          401k
                        </label>
                      </div>
                    )
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Listing Duration</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="listingDuration"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Listing Duration</FormLabel>
                    <FormControl>
                      <Slider
                        defaultValue={[field.value || 30]}
                        max={90}
                        min={7}
                        step={7}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">{field.value} days</p>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button type="submit">Create job</Button>
      </form>
    </Form>
  )
}
