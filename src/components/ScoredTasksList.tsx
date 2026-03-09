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
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      const aTotal = (a.urgencyScore || 0) + (a.impactScore || 0);
      const bTotal = (b.urgencyScore || 0) + (b.impactScore || 0);
      return bTotal - aTotal;
    });

  const topTask = scoredTasks.find((t) => !t.isCompleted);

  return (
    <Card>
      <CardHeader className="pb-3 space-y-1.5">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Análise de Prioridade
        </CardTitle>
        {topTask && (
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold">Recomendação:</span>{" "}
            comece por{" "}
            <span className="font-medium">
              {topTask.title}
            </span>{" "}
            e siga a ordem abaixo.
          </p>
        )}
      </CardHeader>
      <CardContent className="pb-4">
        {scoredTasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Adicione tarefas para ver a análise de prioridade.
          </p>
        ) : (
          <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3">
            {(() => {
              const pendingTasks = scoredTasks.filter((t) => !t.isCompleted);
              const completedTasks = scoredTasks.filter((t) => t.isCompleted);

              return (
                <>
                  {pendingTasks.map((task, index) => {
                    const total = (task.urgencyScore || 0) + (task.impactScore || 0);

                    return (
                      <div
                        key={task.id}
                        className="rounded-lg border bg-card p-4 space-y-2 transition-all hover:shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-semibold">
                                {index + 1}
                              </span>
                              <h3 className="font-medium text-sm leading-tight line-clamp-2">
                                {task.title}
                              </h3>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-1">
                              Score combinado:{" "}
                              <span className="font-mono font-semibold">{total}</span>
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <div className="flex gap-1.5">
                              <ScoreBadge score={task.urgencyScore!} label="URG" />
                              <ScoreBadge score={task.impactScore!} label="IMP" />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                      </div>
                    );
                  })}
                  {completedTasks.length > 0 && (
                    <>
                      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-3 pb-2">
                        Concluídas ({completedTasks.length})
                      </div>
                      <div className="space-y-2">
                        {completedTasks.map((task) => {
                          const total = (task.urgencyScore || 0) + (task.impactScore || 0);

                          return (
                            <div
                              key={task.id}
                              className="rounded-lg border bg-completed border-completed text-completed-foreground p-4 space-y-2 transition-all opacity-60"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-sm leading-tight line-clamp-2 line-through">
                                      {task.title}
                                    </h3>
                                  </div>
                                  <p className="text-[11px] text-muted-foreground mt-1">
                                    Score combinado:{" "}
                                    <span className="font-mono font-semibold">{total}</span>
                                  </p>
                                </div>
                                <div className="flex flex-col items-end gap-1 shrink-0">
                                  <div className="flex gap-1.5">
                                    <ScoreBadge score={task.urgencyScore!} label="URG" />
                                    <ScoreBadge score={task.impactScore!} label="IMP" />
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {task.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScoredTasksList;
