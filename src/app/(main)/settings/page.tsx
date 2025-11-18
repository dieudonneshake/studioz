
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/store/auth";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { toast } = useToast();

  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your account details have been saved.",
    });
  };

  return (
    <div className="container mx-auto max-w-3xl p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Settings</h1>
      
      <div className="space-y-8">
        {isAuthenticated && user && (
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <Button onClick={handleUpdateProfile}>Update Profile</Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="theme">Theme</Label>
                    <p className="text-sm text-muted-foreground">Select a light or dark theme.</p>
                </div>
                <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {isAuthenticated && (
           <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="new-video-notifications">New Videos</Label>
                  <p className="text-sm text-muted-foreground">Notify me when a subscribed channel uploads a new video.</p>
                </div>
                <Switch id="new-video-notifications" defaultChecked />
              </div>
               <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="recommendation-notifications">Recommendations</Label>
                  <p className="text-sm text-muted-foreground">Notify me about recommended videos and content.</p>
                </div>
                <Switch id="recommendation-notifications" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
