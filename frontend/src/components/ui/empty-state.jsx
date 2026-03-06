// Shared empty state component
import { Button } from "@/components/ui/button";

export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center ${className}`} data-testid="empty-state">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-600">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6 h-10 rounded-lg" data-testid="empty-state-action">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

// Loading skeleton component
export const LoadingSkeleton = ({ count = 1, height = "h-24", className = "" }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse rounded-xl bg-slate-200 ${height} ${className}`}
          data-testid="loading-skeleton"
        />
      ))}
    </>
  );
};

// Metric card skeleton
export const MetricCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm" data-testid="metric-card-skeleton">
      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-8 w-32 animate-pulse rounded bg-slate-200" />
      <div className="mt-2 h-3 w-40 animate-pulse rounded bg-slate-200" />
    </div>
  );
};

// Table skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200" data-testid="table-skeleton">
      <div className="bg-slate-50 p-4">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="h-4 w-20 animate-pulse rounded bg-slate-300" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-slate-200 bg-white">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="h-4 animate-pulse rounded bg-slate-200" style={{ width: `${60 + Math.random() * 40}%` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
