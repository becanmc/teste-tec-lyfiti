import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import type { TaskInput } from "@/types/task";

interface TaskFormProps {
  onSubmit: (task: TaskInput) => Promise<void>;
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
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
          />
          <Textarea
            placeholder="Descrição da tarefa..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <Button
            type="submit"
            disabled={!title.trim() || !description.trim()}
            className="w-full gap-2"
          >
            <Plus className="h-4 w-4" />
            Adicionar Tarefa
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
