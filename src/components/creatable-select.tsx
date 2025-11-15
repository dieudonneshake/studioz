
"use client";

import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { FormControl } from "./ui/form";

interface CreatableSelectProps {
  field: ControllerRenderProps<any, string>;
  options: { id: string; name: string }[];
  placeholder: string;
  createLabel: string;
  onCreate: (name: string) => Promise<void>;
}

export function CreatableSelect({
  field,
  options,
  placeholder,
  createLabel,
  onCreate,
}: CreatableSelectProps) {
  const [open, setOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleValueChange = (value: string) => {
    if (value === "create-new") {
      setOpen(true);
    } else {
      field.onChange(value);
    }
  };

  const handleCreate = async () => {
    if (newItemName.trim()) {
        setIsCreating(true);
        await onCreate(newItemName.trim());
        setNewItemName("");
        setOpen(false);
        setIsCreating(false);
    }
  };

  return (
    <>
      <Select onValueChange={handleValueChange} value={field.value}>
        <FormControl>
            <SelectTrigger>
            <SelectValue placeholder={placeholder} />
            </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
          <SelectItem value="create-new">
            <div className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>{createLabel}</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{createLabel}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isCreating}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
