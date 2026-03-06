import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "happyco-cookie-choice";

export const CookieNoticeBar = ({ notice }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = window.localStorage.getItem(STORAGE_KEY);
    setVisible(!choice);
  }, []);

  if (!visible) {
    return null;
  }

  const handleChoice = (value) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-3xl border border-border/80 bg-card/95 p-4 shadow-[var(--shadow-hard)] backdrop-blur" data-testid="cookie-notice-bar">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-[var(--font-heading)] text-base font-semibold tracking-[-0.02em] text-foreground" data-testid="cookie-notice-title">
            {notice?.title || "Privacy & Activity Logging"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground" data-testid="cookie-notice-body">
            {notice?.body || "We log IP addresses and activity for security and reliability purposes."}{" "}
            <Link className="font-medium text-primary hover:underline" data-testid="cookie-notice-link" to={notice?.linkHref || "/legal#privacy-notice"}>
              {notice?.linkLabel || "Learn more"}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="rounded-full"
            data-testid="cookie-notice-decline-button"
            onClick={() => handleChoice("declined")}
            type="button"
            variant="outline"
          >
            Decline
          </Button>
          <Button
            className="rounded-full"
            data-testid="cookie-notice-accept-button"
            onClick={() => handleChoice("accepted")}
            type="button"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};
