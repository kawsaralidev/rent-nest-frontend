import { Card, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: number;
  description?: string;
}

const DashboardCard = ({ title, value, description }: DashboardCardProps) => {
  return (
    <Card className="rounded-2xl border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md w-full">
      <CardContent className="p-6">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          {value}
        </h2>

        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
