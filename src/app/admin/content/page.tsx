
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { videos } from "@/lib/data";
import { ContentTable } from "./content-table";

export default function AdminContentManagementPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold tracking-tight font-headline">Content Management</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Platform Content</CardTitle>
          <CardDescription>Review, approve, or remove any video, notes, or quiz across the platform.</CardDescription>
        </CardHeader>
        <CardContent>
            <ContentTable videos={videos} />
        </CardContent>
      </Card>
    </main>
  );
}
