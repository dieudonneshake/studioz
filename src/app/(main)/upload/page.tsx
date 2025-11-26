
"use client";

import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2, UploadCloud } from "lucide-react";
import { generateQuizzesFromNotes } from "@/ai/flows/generate-quizzes-from-notes";
import { CreatableSelect } from "@/components/creatable-select";
import { useFirestore, useCollection, useMemoFirebase, useUser, useStorage } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { type Curriculum, type Level, type Subject } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

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

// Helper to read file as text
const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
    });
};

export default function UploadPage() {
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const storage = useStorage();
  const { user } = useUser();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');


  const curriculaQuery = useMemoFirebase(() => collection(firestore, 'curricula'), [firestore]);
  const levelsQuery = useMemoFirebase(() => collection(firestore, 'levels'), [firestore]);
  const subjectsQuery = useMemoFirebase(() => collection(firestore, 'subjects'), [firestore]);
  
  const { data: curricula, isLoading: isLoadingCurricula } = useCollection<Curriculum>(curriculaQuery);
  const { data: levels, isLoading: isLoadingLevels } = useCollection<Level>(levelsQuery);
  const { data: subjects, isLoading: isLoadingSubjects } = useCollection<Subject>(subjectsQuery);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      shortSummary: "",
      unit: "",
    },
  });

  const uploadFile = (file: File, path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({ variant: "destructive", title: "Not Authenticated", description: "You must be logged in to upload content." });
        return;
    }
    
    setIsUploading(true);

    try {
        // --- 1. Upload Files ---
        setUploadStatus("Uploading video...");
        const videoFile = values.videoFile[0];
        const videoPath = `videos/${user.uid}/${Date.now()}_${videoFile.name}`;
        const videoUrl = await uploadFile(videoFile, videoPath);

        let thumbnailUrl = '/placeholder.png';
        if (values.thumbnailFile && values.thumbnailFile.length > 0) {
            setUploadStatus("Uploading thumbnail...");
            setUploadProgress(0);
            const thumbnailFile = values.thumbnailFile[0];
            const thumbnailPath = `thumbnails/${user.uid}/${Date.now()}_${thumbnailFile.name}`;
            thumbnailUrl = await uploadFile(thumbnailFile, thumbnailPath);
        }
        
        // --- 2. Process Notes & Generate Quiz ---
        setUploadStatus("Generating AI quiz...");
        const notesFile = values.notesFile[0];
        let quizData = null;
        let notesText = '';

        if (notesFile) {
            notesText = await readFileAsText(notesFile);
            const levelName = levels?.find(l => l.id === values.grade)?.name || 'default level';

            quizData = await generateQuizzesFromNotes({
                notesText,
                level: levelName,
            });
        }
        
        // --- 3. Save to Firestore ---
        setUploadStatus("Finalizing lesson...");
        const videoDuration = await new Promise<number>(resolve => {
            const videoElement = document.createElement('video');
            videoElement.preload = 'metadata';
            videoElement.onloadedmetadata = () => {
                window.URL.revokeObjectURL(videoElement.src);
                resolve(videoElement.duration);
            }
            videoElement.src = URL.createObjectURL(videoFile);
        });

        const newVideoRef = await addDoc(collection(firestore, 'videos'), {
            title: values.title,
            description: values.description,
            shortSummary: values.shortSummary,
            uploaded_by: user.uid,
            thumbnail_path: thumbnailUrl,
            video_url: videoUrl,
            duration_seconds: videoDuration,
            views_count: 0,
            created_at: serverTimestamp(),
            curriculum: curricula?.find(c => c.id === values.curriculum)?.name,
            level: levels?.find(l => l.id === values.grade)?.name,
            subject: subjects?.find(s => s.id === values.subject)?.name,
            unit: values.unit || '',
            privacy: 'public'
        });

        if (notesText) {
             await addDoc(collection(firestore, `videos/${newVideoRef.id}/notes`), {
                textExtracted: notesText,
                uploadedBy: user.uid,
                createdAt: serverTimestamp(),
                videoId: newVideoRef.id
             });
        }
        if (quizData) {
             await addDoc(collection(firestore, `videos/${newVideoRef.id}/quizzes`), {
                questions: quizData.questions,
                generatedBy: 'ai',
                createdAt: serverTimestamp(),
                videoId: newVideoRef.id
             });
        }

        toast({
            title: "Upload Successful!",
            description: "Your lesson is now live and the quiz has been generated.",
        });
        router.push("/dashboard");

    } catch(error) {
        console.error("Error during upload:", error);
        toast({
            variant: "destructive",
            title: "Upload Error",
            description: "There was a problem uploading your content. Please check the console and try again.",
        });
    } finally {
        setIsUploading(false);
        setUploadProgress(0);
        setUploadStatus('');
    }
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Upload New Lesson</CardTitle>
          <CardDescription>Fill out the details below to add a new video lesson to your channel.</CardDescription>
        </CardHeader>
        <CardContent>
            {isUploading ? (
                 <div className="flex flex-col items-center justify-center gap-4 min-h-[400px]">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <h3 className="text-xl font-semibold">{uploadStatus}</h3>
                    <p className="text-muted-foreground">{Math.round(uploadProgress)}% complete</p>
                    <Progress value={uploadProgress} className="w-full max-w-md" />
                 </div>
            ) : (
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
                                    <CreatableSelect
                                        field={field}
                                        options={curricula ?? []}
                                        placeholder="Select curriculum"
                                        createLabel="Create new curriculum"
                                        onCreate={async (name) => {
                                            const newCurriculumRef = await addDoc(collection(firestore, 'curricula'), { name, description: `User-created curriculum: ${name}` });
                                            field.onChange(newCurriculumRef.id);
                                        }}
                                    />
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
                                     <CreatableSelect
                                        field={field}
                                        options={levels ?? []}
                                        placeholder="Select grade"
                                        createLabel="Create new grade level"
                                        onCreate={async (name) => {
                                            const newLevelRef = await addDoc(collection(firestore, 'levels'), { name });
                                            field.onChange(newLevelRef.id);
                                        }}
                                    />
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
                                 <CreatableSelect
                                    field={field}
                                    options={subjects ?? []}
                                    placeholder="Select subject"
                                    createLabel="Create new subject"
                                    onCreate={async (name) => {
                                        const newSubjectRef = await addDoc(collection(firestore, 'subjects'), { name });
                                        field.onChange(newSubjectRef.id);
                                    }}
                                />
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
                            <Input type="file" accept=".pdf,.docx,.txt" onChange={(e) => onChange(e.target.files)} {...rest} />
                        </FormControl>
                        <FormDescription>Upload the lesson notes (PDF, DOCX, TXT). The AI will use this to generate a quiz.</FormDescription>
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
                  {form.formState.isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                  <UploadCloud className="mr-2 h-5 w-5" />
                  {form.formState.isSubmitting ? 'Uploading...' : 'Upload & Generate Quiz'}
                </Button>
              </div>
            </form>
          </Form>
        )}
        </CardContent>
      </Card>
    </div>
  );
}
