import type { ReactNode } from 'react';
import { Cursor } from '@/components/atoms/Cursor';
import { ScrollProgress } from '@/components/atoms/ScrollProgress';
import { SmoothScroll } from './SmoothScroll';
import { Nav } from '@/components/molecules/Nav';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>{children}</main>
    </>
  );
}
