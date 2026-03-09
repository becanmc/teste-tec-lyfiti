import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import type { TaskInput } from "@/types/task";

interface TaskFormProps {
  onSubmit: (task: TaskInput) => Promise<void>;
  isLoading: boolean;
}

const TaskForm = ({ onSubmit, isLoading }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    await onSubmit({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Nova Tarefa</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Título da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
          <Textarea
            placeholder="Descrição da tarefa..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            rows={3}
          />
          <Button type="submit" disabled={isLoading || !title.trim() || !description.trim()} className="w-full">
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Plus />
            )}
            {isLoading ? "Analisando..." : "Adicionar Tarefa"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
