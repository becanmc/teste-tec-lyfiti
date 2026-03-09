import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Circle, ListTodo, Pencil, Trash2, Loader2 } from "lucide-react";
import ScoreBadge from "@/components/ScoreBadge";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";
import type { Category } from "@/types/category";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TodoListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Pick<Task, "title" | "description" | "categoryId">) => void;
  onReorder: (tasks: Task[]) => void;
  categories: Category[];
}

const TodoList = ({ tasks, onToggle, onDelete, onEdit, onReorder, categories }: TodoListProps) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");

  const pending = tasks.filter(task => !task.isCompleted);
  const completed = tasks.filter(task => task.isCompleted);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = pending.findIndex((task) => task.id === active.id);
      const newIndex = pending.findIndex((task) => task.id === over.id);

      const reorderedPending = arrayMove(pending, oldIndex, newIndex).map((task, index) => ({
        ...task,
        order: index + 1,
      }));

      const allTasks = [...reorderedPending, ...completed];
      onReorder(allTasks);
    }
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditCategoryId(task.categoryId || "");
  };

  const closeEdit = () => {
    setEditingTask(null);
    setEditTitle("");
    setEditDescription("");
    setEditCategoryId("");
  };

  const handleSaveEdit = () => {
    if (!editingTask) return;
    if (!editTitle.trim() || !editDescription.trim()) return;

    onEdit(editingTask.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      categoryId: editCategoryId || undefined,
    });
    closeEdit();
  };

  const SortableItem = ({ task }: { task: Task }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: task.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "w-full rounded-lg border bg-card p-3 flex items-start gap-3 transition-all hover:shadow-sm hover:border-primary/30 group",
          isDragging && "opacity-50"
        )}
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
              {task.categoryId && (
                <div className="flex items-center gap-1 mt-1">
                  {(() => {
                    const category = categories.find(c => c.id === task.categoryId);
                    return category ? (
                      <>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-[10px] text-muted-foreground">{category.name}</span>
                      </>
                    ) : null;
                  })()}
                </div>
              )}
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
              <button
                type="button"
                {...attributes}
                {...listeners}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-grab active:cursor-grabbing"
                aria-label="Reordenar tarefa"
              >
                ⋮⋮
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
    );
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
            <>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={pending.map(t => t.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2">
                    {pending.map((task) => (
                      <SortableItem key={task.id} task={task} />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
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
            </>
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
            <Select value={editCategoryId} onValueChange={setEditCategoryId}>
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

