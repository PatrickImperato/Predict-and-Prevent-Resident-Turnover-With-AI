import { Link } from "react-router-dom";

export const PublicFooter = () => {
  return (
    <footer className="border-t border-border/70 bg-card/70 backdrop-blur" data-testid="public-footer">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-5 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-medium text-foreground">HappyCo Concierge Preview</p>
          <p className="mt-1">Prospect-facing demo environment for Tala Partners and HappyCo.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="hover:text-foreground" data-testid="public-footer-legal-link" to="/legal">
            Legal notice
          </Link>
          <Link className="hover:text-foreground" data-testid="public-footer-privacy-link" to="/legal#privacy-notice">
            Privacy & activity logging
          </Link>
          <Link className="hover:text-foreground" data-testid="public-footer-cookie-link" to="/legal#cookie-notice">
            Cookie notice
          </Link>
        </div>
      </div>
    </footer>
  );
};
