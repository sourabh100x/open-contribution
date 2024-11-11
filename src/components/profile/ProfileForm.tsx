"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/extensions/multi-select";
import { addProject } from "@/actions/main";

const formSchema = z.object({
  title: z.string(),
  github_repo_url: z.string(),
  description: z.string(),
  contact_email: z.string(),
  project_stage: z.string(),
  contribution_needs: z.array(z.string()),
  tech_stack: z.array(z.string()),
  tags: z.array(z.string()),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tech_stack: ["python"],
      contribution_needs: ["frontend"],
      tags: ["chatbot"],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      
      
      const res = await addProject(values)
      console.log(res)
      
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full text-gray-900 mt-5 p-6 bg-gray-100 rounded-lg shadow-sm"
      >
        <div className="grid grid-cols-12 my-3 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Project Title</FormLabel>
                  <FormControl>
                    <Input className="bg-gray-200" placeholder="Concise project title..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="github_repo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Public GitHub URL</FormLabel>
                  <FormControl>
                    <Input className="bg-gray-200" placeholder="GitHub URL..." type="string" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">Project Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief project description"
                  className="resize-none bg-gray-200"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 my-3 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="project_stage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Project Stage</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="tool_for_community">Tool for Community</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 my-3 gap-4">
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="tech_stack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Select Framework</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-lg"
                    >
                      <MultiSelectorTrigger className="bg-gray-200">
                        <MultiSelectorInput className="bg-gray-200" placeholder="Select languages" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorItem value={"typescript"}>TypeScript</MultiSelectorItem>
                        <MultiSelectorItem value={"react"}>React</MultiSelectorItem>
                        <MultiSelectorItem value={"nextjs"}>Next.js</MultiSelectorItem>
                        <MultiSelectorItem value={"nodejs"}>Node.js</MultiSelectorItem>
                        <MultiSelectorItem value={"django"}>Django</MultiSelectorItem>
                        <MultiSelectorItem value={"flask"}>Flask</MultiSelectorItem>
                        <MultiSelectorItem value={"mongodb"}>MongoDB</MultiSelectorItem>
                        <MultiSelectorItem value={"graphql"}>GraphQL</MultiSelectorItem>
                        <MultiSelectorItem value={"postgresql"}>PostgreSQL</MultiSelectorItem>
                        <MultiSelectorItem value={"tailwindcss"}>Tailwind CSS</MultiSelectorItem>
                        <MultiSelectorItem value={"docker"}>Docker</MultiSelectorItem>
                        <MultiSelectorItem value={"kubernetes"}>Kubernetes</MultiSelectorItem>
                        <MultiSelectorItem value={"firebase"}>Firebase</MultiSelectorItem>
                        <MultiSelectorItem value={"redis"}>Redis</MultiSelectorItem>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-1">
            <FormField
              control={form.control}
              name="contribution_needs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Contribution Needs</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-lg"
                    >
                      <MultiSelectorTrigger className="bg-gray-200">
                        <MultiSelectorInput className="bg-gray-200" placeholder="Contribution needs" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                        <MultiSelectorItem value={"frontend"}>Frontend</MultiSelectorItem>
                        <MultiSelectorItem value={"backend"}>Backend</MultiSelectorItem>
                        <MultiSelectorItem value={"devops"}>Devops</MultiSelectorItem>
                        <MultiSelectorItem value={"ai-integration"}>Ai integration</MultiSelectorItem>
                          <MultiSelectorItem value={"graphic-design"}>Graphic Design</MultiSelectorItem>
                          <MultiSelectorItem value={"content-writing"}>Content Writing</MultiSelectorItem>
                          <MultiSelectorItem value={"marketing"}>Marketing</MultiSelectorItem>
                          <MultiSelectorItem value={"seo-optimization"}>SEO Optimization</MultiSelectorItem>
                          <MultiSelectorItem value={"ui-ux-design"}>UI/UX Design</MultiSelectorItem>
                          <MultiSelectorItem value={"graphic-design"}>Graphic Design</MultiSelectorItem>
                          <MultiSelectorItem value={"content-writing"}>Content Writing</MultiSelectorItem>
                          <MultiSelectorItem value={"marketing"}>Marketing</MultiSelectorItem>
                          <MultiSelectorItem value={"seo-optimization"}>SEO Optimization</MultiSelectorItem>
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-1">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Project Tags</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                      loop
                      className="max-w-lg"
                    >
                      <MultiSelectorTrigger className="bg-gray-200">
                        <MultiSelectorInput className="bg-gray-200" placeholder="Project tags" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          <MultiSelectorItem value={"chatbot"}>Chatbot Development</MultiSelectorItem>
                          <MultiSelectorItem value={"ai-integration"}>AI Integration</MultiSelectorItem>
                          <MultiSelectorItem value={"dev-ops"}>DevOps</MultiSelectorItem>
                          <MultiSelectorItem value={"cli-tools"}>Cli tools</MultiSelectorItem>
                          <MultiSelectorItem value={"game-devlopment"}>game Development</MultiSelectorItem>
                          <MultiSelectorItem value={"mobile-development"}>mobile Development</MultiSelectorItem>
                          <MultiSelectorItem value={"web-development"}>web Development</MultiSelectorItem>
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Contact Email</FormLabel>
                  <FormControl>
                    <Input className="bg-gray-200" placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
