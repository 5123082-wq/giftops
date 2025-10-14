import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './card.module.css';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article';
  children: ReactNode;
};

export function Card({ as: Component = 'div', className, children, ...props }: CardProps) {
  return (
    <Component className={clsx(styles.card, className)} {...props}>
      {children}
    </Component>
  );
}
