import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[600px] flex-col items-center justify-center gap-6 px-6 py-12 text-center md:gap-8 md:px-8 md:py-24">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold tracking-tighter text-primary">
          404
        </h1>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          Page Not Found
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or deleted.
        </p>
      </div>
      <div className="flex flex-col gap-2 min-[400px]:flex-row">
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="mt-4">
        <Link
          href="/services"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          View Our Services
        </Link>
      </div>
    </div>
  );
}
