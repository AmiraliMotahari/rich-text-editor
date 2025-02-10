"use client";

import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  //? Optionally log the error to an error reporting service
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center gap-6 px-6 py-12 text-center md:gap-8 md:px-8 md:py-24">
      <div className="rounded-full bg-destructive/10 p-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Something went wrong!
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
          We apologize for the inconvenience. Our team has been notified and is
          working to fix the issue.
        </p>
        {process.env.NODE_ENV === "development" ? (
          <div className="mx-auto max-w-[800px] overflow-auto rounded-lg bg-muted p-4 text-left">
            <pre className="text-sm">{error.message}</pre>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row">
        <Button onClick={() => reset()}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button asChild variant="outline">
          <Link href={"/"}>Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
