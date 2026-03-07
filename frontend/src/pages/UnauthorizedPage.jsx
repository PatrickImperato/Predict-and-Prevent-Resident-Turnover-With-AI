import { Link } from "react-router-dom";
import { ShieldOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <ShieldOff className="h-10 w-10 text-red-600" strokeWidth={1.5} />
          </div>
        </div>
        
        <h1 className="font-[var(--font-heading)] text-4xl font-semibold tracking-[-0.02em] text-foreground">
          Access Denied
        </h1>
        
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
          You don't have permission to access this page. Please sign in with the appropriate role.
        </p>
        
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline" className="h-11 rounded-lg px-6 text-[15px]">
            <Link to="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
