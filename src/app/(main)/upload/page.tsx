
"use client";

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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { curricula, levels, subjects } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  shortSummary: z.string().min(10, { message: "Summary must be at least 10 characters." }),
  curriculum: z.string({ required_error: "Please select a curriculum." }),
  grade: z.string({ required_error: "Please select a grade." }),
  subject: z.string({ required_error: "Please select a subject." }),
  unit: z.string().optional(),
  videoFile: z.any().refine(val => val.length > 0, "Please upload a video file."),
  notesFile: z.any().refine(val => val.length > 0, "Please upload a notes file (PDF/DOCX)."),
  thumbnailFile: z.any().optional(),
});

export default function UploadPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      shortSummary: "",
      unit: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Processing Upload",
      description: "Your content is being uploaded and the AI quiz is being generated. This may take a moment.",
    });

    // Simulate upload and AI processing
    setTimeout(() => {
        toast({
            title: "Upload Successful!",
            description: "Your lesson is now live and the quiz has been generated.",
        });
        router.push("/dashboard");
    }, 3000);
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Upload New Lesson</CardTitle>
          <CardDescription>Fill out the details below to add a new video lesson to your channel.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Lesson Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Introduction to Quantum Mechanics" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Provide a detailed description of what this lesson covers..." {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="shortSummary"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Short Summary</FormLabel>
                        <FormControl>
                            <Textarea placeholder="A brief summary for video previews..." {...field} rows={2} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FormField
                            control={form.control}
                            name="curriculum"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Curriculum</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select curriculum" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {curricula.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="grade"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Grade Level</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select grade" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {levels.map(l => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select subject" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Unit / Chapter (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Chapter 3: Forces" {...field} />
                            </FormControl>
                            <FormDescription>Group this lesson into a unit or chapter.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-6">
                    <FormField
                    control={form.control}
                    name="videoFile"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                        <FormLabel>Lesson Video</FormLabel>
                        <FormControl>
                            <Input type="file" accept="video/mp4,video/quicktime" onChange={(e) => onChange(e.target.files)} {...rest} />
                        </FormControl>
                        <FormDescription>Upload the main lesson video file (MP4, MOV).</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="notesFile"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                        <FormLabel>Lesson Notes (Mandatory for AI Quiz)</FormLabel>
                        <FormControl>
                            <Input type="file" accept=".pdf,.docx" onChange={(e) => onChange(e.target.files)} {...rest} />
                        </FormControl>
                        <FormDescription>Upload the lesson notes (PDF, DOCX). The AI will use this to generate a quiz.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="thumbnailFile"
                    render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                        <FormLabel>Thumbnail Image (Optional)</FormLabel>
                        <FormControl>
                            <Input type="file" accept="image/jpeg,image/png" onChange={(e) => onChange(e.target.files)} {...rest} />
                        </FormControl>
                        <FormDescription>Upload a custom thumbnail for your video.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
              </div>

              <div className="flex justify-end pt-8">
                <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                  <UploadCloud className="mr-2 h-5 w-5" />
                  {form.formState.isSubmitting ? 'Uploading...' : 'Upload & Generate Quiz'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
