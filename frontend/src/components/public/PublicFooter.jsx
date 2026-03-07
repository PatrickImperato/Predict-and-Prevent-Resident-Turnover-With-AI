import { Link } from "react-router-dom";

export const PublicFooter = () => {
  return (
    <footer className="border-t border-border/40 bg-background" data-testid="public-footer">
      <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">HappyCo Concierge</p>
            <p className="mt-1 text-xs text-muted-foreground">Prospect-facing demo environment</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <Link className="text-muted-foreground transition-colors hover:text-foreground" data-testid="public-footer-legal-link" to="/legal">
              Legal
            </Link>
            <Link className="text-muted-foreground transition-colors hover:text-foreground" data-testid="public-footer-privacy-link" to="/privacy">
              Privacy
            </Link>
          </div>
        </div>
      </div>
      {/* Copyright - Bottom Left Aligned */}
      <div className="mx-auto max-w-[1400px] px-6 pb-6 lg:px-8">
        <p className="text-xs text-muted-foreground/50 leading-relaxed">
          © Time Travel Media LLC. All rights reserved. Proprietary concept demonstration. HappyCo is a trademark of HappyCo, Inc.
        </p>
      </div>
    </footer>
  );
};
