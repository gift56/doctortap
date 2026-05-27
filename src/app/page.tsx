import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-bg-base px-6">
      <p className="font-mono text-sm text-text-muted">DoctorTap</p>
      <h1 className="text-2xl font-semibold text-text-primary">
        Doctor Tap WEBSITE
      </h1>
      <Button>Get started</Button>
    </div>
  );
}
