import cn from "classnames";

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export default function Anchor({ children, className, ...rest }: AnchorProps) {
  const baseClasses = "text-blue-600 dark:text-blue-400";
  return (
    <a className={cn(baseClasses, className)} {...rest}>
      {children}
    </a>
  );
}
