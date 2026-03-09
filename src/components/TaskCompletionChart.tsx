import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Task } from "@/types/task";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  done: {
    label: "Concluídas",
    color: "hsl(var(--chart-1))",
  },
  todo: {
    label: "Pendentes",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface TaskCompletionChartProps {
  tasks: Task[];
}

const TaskCompletionChart = ({ tasks }: TaskCompletionChartProps) => {
  const done = tasks.filter((t) => t.isCompleted).length;
  const todo = tasks.length - done;

  const data = [
    {
      name: "Tarefas",
      done,
      todo,
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Resumo de Progresso</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            Adicione tarefas para ver o gráfico de concluídas vs pendentes.
          </p>
        ) : (
          <ChartContainer config={chartConfig} className="w-full h-60">
            <BarChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <ChartTooltip cursor={{ fill: "hsl(var(--muted))" }} content={<ChartTooltipContent />} />
              <Bar dataKey="done" fill="var(--color-done)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="todo" fill="var(--color-todo)" radius={[0, 0, 4, 4]} />
              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCompletionChart;

