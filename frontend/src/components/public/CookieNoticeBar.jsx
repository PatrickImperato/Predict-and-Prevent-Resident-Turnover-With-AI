import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "happyco-cookie-choice";

export const CookieNoticeBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = window.localStorage.getItem(STORAGE_KEY);
    setVisible(!choice);
  }, []);

  if (!visible) {
    return null;
  }

  const handleAccept = () => {
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-3 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 rounded-full border border-border/20 bg-background/30 px-5 py-2.5 backdrop-blur-xl shadow-sm" data-testid="cookie-notice-bar">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground/90" data-testid="cookie-notice-body">
          <span className="font-medium text-foreground/90">Privacy and activity logging</span> — We log IP and product activity for security and reliability.{" "}
          <Link className="font-medium text-primary/90 hover:underline" data-testid="cookie-notice-link" to="/privacy">
            Learn more
          </Link>
        </p>
        <Button
          className="h-7 rounded-full px-3.5 text-xs font-medium bg-primary/80 hover:bg-primary/70 shadow-none"
          data-testid="cookie-notice-accept-button"
          onClick={handleAccept}
          size="sm"
          type="button"
        >
          Accept
        </Button>
      </div>
    </div>
  );
};
