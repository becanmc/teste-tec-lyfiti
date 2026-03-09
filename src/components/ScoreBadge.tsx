import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  label: string;
}

const getScoreColor = (score: number) => {
  if (score >= 8) return "bg-score-critical/10 text-score-critical border-score-critical/20";
  if (score >= 6) return "bg-score-high/10 text-score-high border-score-high/20";
  if (score >= 4) return "bg-score-medium/10 text-score-medium border-score-medium/20";
  return "bg-score-low/10 text-score-low border-score-low/20";
};

const ScoreBadge = ({ score, label }: ScoreBadgeProps) => {
  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-mono font-medium", getScoreColor(score))}>
      <span className="text-[10px] uppercase tracking-wider opacity-70">{label}</span>
      <span className="font-semibold">{score}</span>
    </div>
  );
};

export default ScoreBadge;
