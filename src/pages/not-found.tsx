import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <AlertCircle className="h-8 w-8 text-gold" style={{ color: "hsl(38 88% 48%)" }} />
          <h1 className="font-serif text-3xl font-bold text-foreground">404 — Page Not Found</h1>
        </div>
        <p className="text-muted-foreground font-light">
          The page you're looking for doesn't exist.{" "}
          <a href="/" className="text-primary underline hover:text-gold transition-colors">Return Home</a>
        </p>
      </div>
    </div>
  );
}
