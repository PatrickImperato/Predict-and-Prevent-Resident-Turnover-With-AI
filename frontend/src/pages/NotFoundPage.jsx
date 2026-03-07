import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/badge";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <AlertCircle className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground">
          Page Not Found
        </h1>
        
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="h-11 rounded-lg px-6 text-[15px]">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
