import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, ListTodo } from "lucide-react";
import ScoreBadge from "@/components/ScoreBadge";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";

interface TodoListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
}

const TodoList = ({ tasks, onToggle }: TodoListProps) => {
  const pending = tasks.filter((t) => !t.isCompleted);
  const completed = tasks.filter((t) => t.isCompleted);

  return (
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
              <button
                key={task.id}
                onClick={() => onToggle(task.id)}
                className="w-full text-left rounded-lg border bg-card p-3 flex items-start gap-3 transition-all hover:shadow-sm hover:border-primary/30 group"
              >
                <Circle className="h-5 w-5 mt-0.5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{task.description}</p>
                  {task.urgencyScore !== null && task.impactScore !== null && (
                    <div className="flex gap-1.5 mt-2">
                      <ScoreBadge score={task.urgencyScore} label="URG" />
                      <ScoreBadge score={task.impactScore} label="IMP" />
                    </div>
                  )}
                </div>
              </button>
            ))}
            {completed.length > 0 && (
              <>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-3 pb-1">
                  Concluídas ({completed.length})
                </div>
                {completed.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => onToggle(task.id)}
                    className={cn(
                      "w-full text-left rounded-lg border p-3 flex items-start gap-3 transition-all",
                      "bg-completed border-completed text-completed-foreground"
                    )}
                  >
                    <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-score-low" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm line-through">{task.title}</p>
                      <p className="text-xs line-clamp-1 mt-0.5 opacity-60">{task.description}</p>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoList;
