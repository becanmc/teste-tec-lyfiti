import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Task } from "@/types/task";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

interface TaskCompletionChartProps {
  tasks: Task[];
}

const TaskCompletionChart = ({ tasks }: TaskCompletionChartProps) => {
  const done = tasks.filter((t) => t.isCompleted).length;
  const todo = tasks.length - done;

  const hasData = done > 0 || todo > 0;

  const data = [
    { name: "Concluídas", value: done },
    { name: "Pendentes", value: todo },
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-primary" />
          Resumo de Progresso
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Adicione tarefas para ver o gráfico de concluídas vs pendentes.
          </p>
        ) : (
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  <Cell key="done" fill="#22c55e" />{/* verde */}
                  <Cell key="todo" fill="#eab308" />{/* amarelo */}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCompletionChart;

