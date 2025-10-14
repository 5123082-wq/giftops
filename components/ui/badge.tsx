import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './badge.module.css';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span className={clsx(styles.badge, className)} {...props}>
      {children}
    </span>
  );
}
