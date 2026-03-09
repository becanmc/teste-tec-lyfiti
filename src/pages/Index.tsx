import { useState, useCallback } from "react";
import { toast } from "sonner";
import TaskForm from "@/components/TaskForm";
import ScoredTasksList from "@/components/ScoredTasksList";
import TodoList from "@/components/TodoList";
import TaskCompletionChart from "../components/TaskCompletionChart";
import ContextPanel from "@/components/ContextPanel";
import type { Task, TaskInput } from "@/types/task";
import type { ContextEntry } from "@/types/context";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contexts, setContexts] = useState<ContextEntry[]>([]);

  const scoreTask = useCallback(
    (id: string, input: TaskInput, currentContexts: ContextEntry[]) => {
      const serializedContexts = currentContexts.map((ctx) => ({
        key: ctx.key,
        content: ctx.content,
      }));

      supabase.functions
        .invoke("score-task", {
          body: {
            title: input.title,
            description: input.description,
            contexts: serializedContexts,
          },
        })
        .then(({ data, error }) => {
          if (error) {
            throw error;
          }

          const urgency = data?.urgency ?? 5;
          const impact = data?.impact ?? 5;

          setTasks((prev) =>
            prev.map((task) =>
              task.id === id
                ? {
                    ...task,
                    urgencyScore: urgency,
                    impactScore: impact,
                    isScoring: false,
                  }
                : task,
            ),
          );

          toast.success(`Tarefa analisada: Urgência ${urgency}, Impacto ${impact}`);
        })
        .catch((err) => {
          console.error("Scoring error:", err);
          toast.error("Erro ao analisar tarefa. Scores padrão aplicados.");
          setTasks((prev) =>
            prev.map((task) =>
              task.id === id
                ? {
                    ...task,
                    urgencyScore: 5,
                    impactScore: 5,
                    isScoring: false,
                  }
                : task,
            ),
          );
        });
    },
    [],
  );

  const handleAddTask = useCallback(
    async (input: TaskInput) => {
      const id = crypto.randomUUID();

      const newTask: Task = {
        id,
        title: input.title,
        description: input.description,
        urgencyScore: null,
        impactScore: null,
        isCompleted: false,
        createdAt: new Date(),
        isScoring: true,
      };

      setTasks((prev) => [newTask, ...prev]);
      scoreTask(id, input, contexts);
    },
    [scoreTask, contexts],
  );

  const handleToggle = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t)),
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleEdit = useCallback(
    (id: string, updates: Pick<Task, "title" | "description">) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                ...updates,
                urgencyScore: null,
                impactScore: null,
                isScoring: true,
              }
            : t,
        ),
      );

      scoreTask(id, { title: updates.title, description: updates.description }, contexts);
    },
    [scoreTask, contexts],
  );

  const handleAddContext = useCallback((key: string, content: string) => {
    setContexts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        key,
        content,
      },
    ]);
  }, []);

  const handleDeleteContext = useCallback((id: string) => {
    setContexts((prev) => prev.filter((ctx) => ctx.id !== id));
  }, []);

  const handleUpdateContext = useCallback((id: string, key: string, content: string) => {
    setContexts((prev) =>
      prev.map((ctx) =>
        ctx.id === id
          ? {
              ...ctx,
              key,
              content,
            }
          : ctx,
      ),
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Task Prioritizer</h1>
            <p className="text-sm text-muted-foreground">
              Categorize tarefas por urgência e impacto com IA
            </p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Sparkles className="h-4 w-4 text-primary" />
                Contexto da IA
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader className="mb-4">
                <SheetTitle>Contexto para IA</SheetTitle>
                <SheetDescription>
                  Adicione e gerencie o contexto pessoal que a IA usa para priorizar suas tarefas.
                </SheetDescription>
              </SheetHeader>
              <div className="h-full overflow-y-auto pb-10">
                <ContextPanel
                  contexts={contexts}
                  onAdd={handleAddContext}
                  onDelete={handleDeleteContext}
                  onUpdate={handleUpdateContext}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TaskForm onSubmit={handleAddTask} />
            <ScoredTasksList tasks={tasks} />
          </div>
          <div>
            <div className="lg:sticky lg:top-24 space-y-4">
              <TodoList
                tasks={tasks}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
              <TaskCompletionChart tasks={tasks} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
