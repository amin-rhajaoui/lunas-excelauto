import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FileSpreadsheet, Users, CalendarDays } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { fetchDashboardStats, type DashboardStats } from '../services/tarificationService';
import { formatEuro } from '../utils';
import { SHEET_COLORS } from '../lib/sheetColors';

const PIE_COLORS = [
  'hsl(221, 83%, 53%)',
  'hsl(142, 71%, 45%)',
  'hsl(47, 96%, 53%)',
  'hsl(0, 84%, 60%)',
  'hsl(262, 83%, 58%)',
  'hsl(199, 89%, 48%)',
];

const barChartConfig = {
  count: {
    label: 'Tarifications',
    color: 'hsl(221, 83%, 53%)',
  },
} satisfies ChartConfig;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch {
        toast.error('Erreur lors du chargement du dashboard');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Vue d'ensemble</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </Card>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <Skeleton className="h-64 w-full" />
          </Card>
          <Card className="p-6">
            <Skeleton className="h-64 w-full" />
          </Card>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const pieChartConfig = Object.fromEntries(
    stats.byClient.map((item, i) => [
      item.client,
      {
        label: item.client,
        color: PIE_COLORS[i % PIE_COLORS.length],
      },
    ])
  ) satisfies ChartConfig;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Vue d'ensemble des tarifications</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <FileSpreadsheet className="size-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total tarifications</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10">
              <Users className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Clients uniques</p>
              <p className="text-2xl font-bold">{stats.uniqueClients}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10">
              <CalendarDays className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ce mois-ci</p>
              <p className="text-2xl font-bold">{stats.thisMonth}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Bar Chart - By Month */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Tarifications par mois</h3>
          {stats.byMonth.length > 0 ? (
            <ChartContainer config={barChartConfig} className="h-64 w-full">
              <BarChart data={stats.byMonth}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Aucune donnee
            </div>
          )}
        </Card>

        {/* Pie Chart - By Client */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Repartition par client</h3>
          {stats.byClient.length > 0 ? (
            <ChartContainer config={pieChartConfig} className="h-64 w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="client" />} />
                <Pie
                  data={stats.byClient}
                  dataKey="count"
                  nameKey="client"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ client }) => client}
                >
                  {stats.byClient.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          ) : (
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              Aucune donnee
            </div>
          )}
        </Card>
      </div>

      {/* Recent Tarifications */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Tarifications recentes</h3>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Societe</TableHead>
                <TableHead>Projet</TableHead>
                <TableHead className="text-right">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.collection.dot}`} />
                    Collection
                  </span>
                </TableHead>
                <TableHead className="text-right">
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${SHEET_COLORS.presse.dot}`} />
                    Presse
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.recent.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Aucune tarification
                  </TableCell>
                </TableRow>
              ) : (
                stats.recent.map(row => (
                  <TableRow key={row.id}>
                    <TableCell className="whitespace-nowrap">{formatDate(row.created_at)}</TableCell>
                    <TableCell className="font-medium">{row.client}</TableCell>
                    <TableCell>
                      <Badge variant={row.societe === 'LUNAS' ? 'default' : 'secondary'}>
                        {row.societe}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.projet}</TableCell>
                    <TableCell className="text-right">
                      {row.prix_collection != null ? (
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold tabular-nums ${SHEET_COLORS.collection.badge}`}>
                          {formatEuro(row.prix_collection)}
                        </span>
                      ) : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.prix_presse != null ? (
                        <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-semibold tabular-nums ${SHEET_COLORS.presse.badge}`}>
                          {formatEuro(row.prix_presse)}
                        </span>
                      ) : '-'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
