import { useState, useCallback } from "react";
import { toast } from "sonner";
import TaskForm from "@/components/TaskForm";
import ScoredTasksList from "@/components/ScoredTasksList";
import TodoList from "@/components/TodoList";
import TaskCompletionChart from "../components/TaskCompletionChart";
import type { Task, TaskInput } from "@/types/task";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const scoreTask = useCallback((id: string, input: TaskInput) => {
    supabase.functions
      .invoke("score-task", {
        body: { title: input.title, description: input.description },
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
  }, []);

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
      scoreTask(id, input);
    },
    [scoreTask],
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

      scoreTask(id, { title: updates.title, description: updates.description });
    },
    [scoreTask],
  );

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
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TaskForm onSubmit={handleAddTask} />
            <TaskCompletionChart tasks={tasks} />
            <ScoredTasksList tasks={tasks} />
          </div>
          <div>
            <div className="lg:sticky lg:top-24">
              <TodoList
                tasks={tasks}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
