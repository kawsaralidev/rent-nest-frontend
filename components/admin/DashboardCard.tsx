import { Card, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: number;
}

const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 p-6">
        <p className="text-sm text-muted-foreground">{title}</p>

        <h2 className="text-4xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
