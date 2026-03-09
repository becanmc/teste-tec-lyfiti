import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Circle, ListTodo, Pencil, Trash2, Loader2 } from "lucide-react";
import ScoreBadge from "@/components/ScoreBadge";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";

interface TodoListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Pick<Task, "title" | "description">) => void;
}

const TodoList = ({ tasks, onToggle, onDelete, onEdit }: TodoListProps) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const pending = tasks.filter((t) => !t.isCompleted);
  const completed = tasks.filter((t) => t.isCompleted);

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const closeEdit = () => {
    setEditingTask(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleSaveEdit = () => {
    if (!editingTask) return;
    if (!editTitle.trim() || !editDescription.trim()) return;

    onEdit(editingTask.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    closeEdit();
  };

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-primary" />
            To-Do
            {pending.length > 0 && (
              <span className="ml-auto text-xs font-mono bg-primary/10 text-primary rounded-full px-2 py-0.5">
                {pending.length}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhuma tarefa ainda.
            </p>
          ) : (
            <div className="space-y-2">
              {pending.map((task) => (
                <div
                  key={task.id}
                  className="w-full rounded-lg border bg-card p-3 flex items-start gap-3 transition-all hover:shadow-sm hover:border-primary/30 group"
                >
                  <button
                    type="button"
                    onClick={() => onToggle(task.id)}
                    className="mt-0.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
                    aria-label="Marcar como concluída"
                  >
                    <Circle className="h-5 w-5" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm">{task.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {task.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        <button
                          type="button"
                          onClick={() => openEdit(task)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          aria-label="Editar tarefa"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(task.id)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                          aria-label="Excluir tarefa"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    {task.urgencyScore !== null && task.impactScore !== null && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <ScoreBadge score={task.urgencyScore} label="URG" />
                        <ScoreBadge score={task.impactScore} label="IMP" />
                        {task.isScoring && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            reavaliando...
                          </span>
                        )}
                      </div>
                    )}
                    {task.urgencyScore === null ||
                      (task.impactScore === null && task.isScoring && (
                        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-muted-foreground">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          analisando prioridade com IA...
                        </div>
                      ))}
                  </div>
                </div>
              ))}
              {completed.length > 0 && (
                <>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-3 pb-1">
                    Concluídas ({completed.length})
                  </div>
                  {completed.map((task) => (
                    <div
                      key={task.id}
                      className={cn(
                        "w-full rounded-lg border p-3 flex items-start gap-3 transition-all",
                        "bg-completed border-completed text-completed-foreground",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => onToggle(task.id)}
                        className="mt-0.5 shrink-0 text-score-low"
                        aria-label="Marcar como pendente"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm line-through">{task.title}</p>
                        <p className="text-xs line-clamp-1 mt-0.5 opacity-60">{task.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDelete(task.id)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border bg-background/60 text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                        aria-label="Excluir tarefa"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!editingTask} onOpenChange={(open) => !open && closeEdit()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar tarefa</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Input
              placeholder="Título da tarefa"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <Textarea
              placeholder="Descrição da tarefa..."
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={closeEdit}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editTitle.trim() || !editDescription.trim()}>
              Salvar e reavaliar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TodoList;

