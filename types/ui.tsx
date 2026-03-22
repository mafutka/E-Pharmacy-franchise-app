export type InputProps = {
  label?: string;
  error?: string;
  variant?: "input" | "textarea" | "select";
  options?: { label: string; value: string }[];
  className?: string;
  children: React.ReactNode;
}