
"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { type User } from "@/lib/types";
import { useFirestore } from "@/firebase";
import { MoreHorizontal } from "lucide-react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

interface UserActionsMenuProps {
  user: User;
}

export function UserActionsMenu({ user }: UserActionsMenuProps) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<"delete" | "approve" | "reject" | null>(null);

  const handleAction = async () => {
    if (!dialogAction) return;

    const userDocRef = doc(firestore, "users", user.id);

    try {
      switch (dialogAction) {
        case "delete":
          await deleteDoc(userDocRef);
          toast({ title: "User Removed", description: `${user.name} has been deleted.` });
          break;
        case "approve":
          await updateDoc(userDocRef, { status: "approved" });
          toast({ title: "Teacher Approved", description: `${user.name} has been approved.` });
          break;
        case "reject":
          await updateDoc(userDocRef, { status: "rejected" });
          toast({ title: "Teacher Rejected", description: `${user.name} has been rejected.` });
          break;
      }
    } catch (error) {
      console.error(`Error performing action: ${dialogAction}`, error);
      toast({ variant: "destructive", title: "Error", description: "An error occurred. Please try again." });
    } finally {
        setIsDialogOpen(false);
        setDialogAction(null);
    }
  };
  
  const getDialogContent = () => {
    switch (dialogAction) {
      case "delete":
        return {
          title: "Are you sure?",
          description: `This will permanently delete the user "${user.name}" and all their associated data. This action cannot be undone.`,
          actionText: "Delete",
        };
      case "approve":
        return {
          title: "Approve Teacher?",
          description: `This will approve ${user.name} and allow them to start creating content.`,
          actionText: "Approve",
        };
      case "reject":
        return {
          title: "Reject Teacher?",
          description: `This will reject the application for ${user.name}.`,
          actionText: "Reject",
        };
      default:
        return null;
    }
  };

  const currentDialog = getDialogContent();

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit User</DropdownMenuItem>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuSeparator />
          {user.role === 'teacher' && user.status === 'pending' && (
            <>
              <DropdownMenuItem onClick={() => { setDialogAction("approve"); setIsDialogOpen(true); }}>Approve</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setDialogAction("reject"); setIsDialogOpen(true); }} className="text-yellow-600">Reject</DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem onClick={() => { setDialogAction("delete"); setIsDialogOpen(true); }} className="text-destructive">
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {currentDialog && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{currentDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {currentDialog.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>{currentDialog.actionText}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
