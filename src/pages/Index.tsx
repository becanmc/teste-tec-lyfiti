import { useState, useCallback } from "react";
import { toast } from "sonner";
import TaskForm from "@/components/TaskForm";
import ScoredTasksList from "@/components/ScoredTasksList";
import TodoList from "@/components/TodoList";
import type { Task, TaskInput } from "@/types/task";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTask = useCallback(async (input: TaskInput) => {
    setIsLoading(true);
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      urgencyScore: null,
      impactScore: null,
      isCompleted: false,
      createdAt: new Date(),
    };

    try {
      const { data, error } = await supabase.functions.invoke("score-task", {
        body: { title: input.title, description: input.description },
      });

      if (error) throw error;

      newTask.urgencyScore = data.urgency ?? 5;
      newTask.impactScore = data.impact ?? 5;
      toast.success(`Tarefa analisada: Urgência ${newTask.urgencyScore}, Impacto ${newTask.impactScore}`);
    } catch (err) {
      console.error("Scoring error:", err);
      toast.error("Erro ao analisar tarefa. Scores padrão aplicados.");
      newTask.urgencyScore = 5;
      newTask.impactScore = 5;
    }

    setTasks((prev) => [newTask, ...prev]);
    setIsLoading(false);
  }, []);

  const handleToggle = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold tracking-tight">Task Prioritizer</h1>
          <p className="text-sm text-muted-foreground">Categorize tarefas por urgência e impacto com IA</p>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TaskForm onSubmit={handleAddTask} isLoading={isLoading} />
            <ScoredTasksList tasks={tasks} />
          </div>
          <div>
            <div className="lg:sticky lg:top-24">
              <TodoList tasks={tasks} onToggle={handleToggle} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
