
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/store/auth";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your account details have been saved.",
    });
  };
  
  const handleSaveChanges = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${section} settings have been updated.`,
    });
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Settings</h1>
      
      <div className="space-y-12">
        
        {isAuthenticated && user && (
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your public profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue={`@${user.name.split(' ').join('').toLowerCase()}`} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell us a little about yourself" defaultValue={user.bio} />
              </div>
              <Button onClick={() => handleSaveChanges('Profile')}>Save Changes</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                    <Label htmlFor="theme">Theme</Label>
                    <p className="text-sm text-muted-foreground">Select a light, dark, or system theme.</p>
                </div>
                <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {isAuthenticated && (
           <>
            <Card>
                <CardHeader>
                    <CardTitle>Playback</CardTitle>
                    <CardDescription>Manage your video playback experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <Label htmlFor="autoplay">Autoplay</Label>
                      <p className="text-sm text-muted-foreground">Automatically play the next video.</p>
                    </div>
                    <Switch id="autoplay" defaultChecked />
                  </div>
                   <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <Label htmlFor="video-quality">Default Video Quality</Label>
                      <p className="text-sm text-muted-foreground">Choose the default quality for video playback.</p>
                    </div>
                     <Select defaultValue="auto">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="auto">Auto</SelectItem>
                            <SelectItem value="1080p">1080p</SelectItem>
                            <SelectItem value="720p">720p</SelectItem>
                            <SelectItem value="480p">480p</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                    <Label htmlFor="new-video-notifications">New Videos</Label>
                    <p className="text-sm text-muted-foreground">From channels you subscribe to.</p>
                    </div>
                    <Switch id="new-video-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                    <Label htmlFor="recommendation-notifications">Recommendations</Label>
                    <p className="text-sm text-muted-foreground">Personalized video recommendations.</p>
                    </div>
                    <Switch id="recommendation-notifications" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                    <Label htmlFor="comments-notifications">Comments & Replies</Label>
                    <p className="text-sm text-muted-foreground">When someone replies to your comments.</p>
                    </div>
                    <Switch id="comments-notifications" defaultChecked/>
                </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Data & Privacy</CardTitle>
                    <CardDescription>Manage your data and privacy settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button variant="outline" onClick={() => toast({title: "Coming Soon!", description: "This feature is under development."})}>Manage Watch History</Button>
                    <Button variant="outline" onClick={() => toast({title: "Request Sent", description: "Your data export will be ready in 24 hours."})}>Download Your Data</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account & Security</CardTitle>
                    <CardDescription>Manage your account security and data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} readOnly />
                  </div>
                  <div>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </CardContent>
                <CardContent>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => toast({variant: "destructive", title: "Account Deletion Requested"})}>
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <p className="text-xs text-muted-foreground mt-2">Permanently delete your account and all associated data.</p>
                </CardContent>
            </Card>
           </>
        )}
      </div>
    </div>
  );
}

    