import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, Plus, Pencil } from "lucide-react";
import type { TaskInput } from "@/types/task";
import type { Category } from "@/types/category";

interface TaskFormProps {
  onSubmit: (task: TaskInput) => Promise<void>;
  categories: Category[];
}

const TaskForm = ({ onSubmit, categories }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    await onSubmit({ title: title.trim(), description: description.trim(), categoryId: categoryId || undefined });
    setTitle("");
    setDescription("");
    setCategoryId("");
  };

  return (
    <Card>
      <CardHeader className={`pb-2 flex ${isCollapsed ? 'flex-col items-center gap-2' : 'flex-row items-center justify-between gap-2'}`}>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Nova Tarefa
        </CardTitle>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => setIsCollapsed((prev) => !prev)}
          aria-label={isCollapsed ? "Expandir formulário" : "Recolher formulário"}
        >
          {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="transition-all duration-300 ease-in-out">
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
            {categories.length > 0 && (
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhuma categoria</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
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
      )}
    </Card>
  );
};

export default TaskForm;
