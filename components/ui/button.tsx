'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';

import styles from './button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline' | 'ghost';
  asChild?: boolean;
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'solid', className, asChild, children, ...props },
  ref
) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={clsx(styles.button, styles[variant], className)}
      {...props}
      ref={ref as never}
    >
      {children}
    </Comp>
  );
});
