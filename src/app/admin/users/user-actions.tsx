
"use client";

import { Button } from "@/components/ui/button";
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
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/auth";
import { type User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserActionsProps {
  user: User;
}

export function UserActionsMenu({ user }: UserActionsProps) {
  const { updateUserStatus, removeUser } = useAuthStore();
  const { toast } = useToast();
  const router = useRouter(); // To refresh data after action
  const [dialogAction, setDialogAction] = useState<"delete" | null>(null);

  const handleUpdateStatus = (status: 'approved' | 'pending' | 'rejected') => {
    updateUserStatus(user.id, status);
    toast({
      title: "User Status Updated",
      description: `${user.name}'s status has been changed to ${status}.`,
    });
    router.refresh();
  };
  
  const handleDeleteUser = () => {
      removeUser(user.id);
      toast({
        title: "User Deleted",
        description: `${user.name} has been removed from the system.`,
      });
      setDialogAction(null);
      router.refresh();
  };

  return (
    <>
      <AlertDialog open={!!dialogAction} onOpenChange={(open) => !open && setDialogAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user account for {user.name} and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          {user.role === 'teacher' && user.status === 'pending' && <DropdownMenuItem onClick={() => handleUpdateStatus('approved')}>Approve</DropdownMenuItem>}
          {user.role === 'teacher' && user.status === 'approved' && <DropdownMenuItem onClick={() => handleUpdateStatus('rejected')}>Suspend</DropdownMenuItem>}
          {user.role === 'student' && <DropdownMenuItem>View Progress</DropdownMenuItem>}
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-destructive" onClick={() => setDialogAction("delete")}>Delete</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function UserActions() {
    return <Button>Add New User</Button>;
}
