import { Badge } from "@/components/ui/badge";

export const EnvironmentBadge = ({ appEnv = "preview", dataTestId = "environment-badge" }) => {
  const isProduction = appEnv === "production";

  return (
    <Badge
      className={[
        "gap-2 rounded-full px-3 py-1 font-medium",
        isProduction
          ? "border border-slate-700 bg-slate-900 text-slate-50"
          : "border border-teal-200 bg-teal-50 text-teal-900",
      ].join(" ")}
      data-testid={dataTestId}
      variant="outline"
    >
      <span
        className={[
          "inline-flex h-2.5 w-2.5 rounded-full",
          isProduction ? "bg-amber-400" : "bg-teal-500",
        ].join(" ")}
      />
      {isProduction ? "Production" : "Preview"}
    </Badge>
  );
};
