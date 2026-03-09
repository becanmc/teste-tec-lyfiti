import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ScoreBadge from "@/components/ScoreBadge";
import type { Task } from "@/types/task";
import { BarChart3 } from "lucide-react";

interface ScoredTasksListProps {
  tasks: Task[];
}

const ScoredTasksList = ({ tasks }: ScoredTasksListProps) => {
  const scoredTasks = tasks
    .filter((t) => t.urgencyScore !== null && t.impactScore !== null)
    .sort((a, b) => {
      const aTotal = (a.urgencyScore || 0) + (a.impactScore || 0);
      const bTotal = (b.urgencyScore || 0) + (b.impactScore || 0);
      return bTotal - aTotal;
    });

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Análise de Prioridade
        </CardTitle>
      </CardHeader>
      <CardContent>
        {scoredTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Adicione tarefas para ver a análise de prioridade.
          </p>
        ) : (
          <div className="space-y-3">
            {scoredTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border bg-card p-4 space-y-2 transition-all hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-medium text-sm leading-tight">{task.title}</h3>
                  <div className="flex gap-1.5 shrink-0">
                    <ScoreBadge score={task.urgencyScore!} label="URG" />
                    <ScoreBadge score={task.impactScore!} label="IMP" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoredTasksList;
