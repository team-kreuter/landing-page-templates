interface BadgeProps {
  text: string;
}

export function Badge({ text }: BadgeProps) {
  return (
    <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary-dark">
      {text}
    </span>
  );
}
