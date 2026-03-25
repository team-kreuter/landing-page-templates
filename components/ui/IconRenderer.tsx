import * as LucideIcons from "lucide-react";

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export function IconRenderer({ name, className = "", size = 24 }: IconRendererProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
}
