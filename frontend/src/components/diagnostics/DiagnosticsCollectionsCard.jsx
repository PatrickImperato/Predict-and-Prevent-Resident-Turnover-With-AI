import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DiagnosticsCollectionsCard = ({ collections }) => {
  const rows = Object.entries(collections?.collection_counts || {});

  return (
    <Card className="happyco-card" data-testid="diagnostics-collections-card">
      <CardHeader>
        <CardTitle className="text-xl tracking-[-0.02em]">Collection counts</CardTitle>
        <CardDescription>
          Bound database counts with dataset warnings surfaced explicitly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border border-border/80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Collection</TableHead>
                <TableHead className="text-right">Count</TableHead>
                <TableHead className="text-right">Missing datasetId</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(([name, count]) => (
                <TableRow key={name}>
                  <TableCell className="font-medium text-foreground" data-testid={`diagnostics-collection-${name}-name`}>
                    {name}
                  </TableCell>
                  <TableCell className="text-right font-mono text-foreground" data-testid={`diagnostics-collection-${name}-count`}>
                    {count}
                  </TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground" data-testid={`diagnostics-collection-${name}-missing-dataset`}>
                    {collections?.missing_dataset_id_counts?.[name] ?? 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="rounded-xl border border-border/80 bg-muted/40 p-4 text-sm text-muted-foreground" data-testid="diagnostics-collections-seed-health">
          Seed health status: <span className="font-medium text-foreground">{collections?.seed_health || "—"}</span>
        </div>
      </CardContent>
    </Card>
  );
};
