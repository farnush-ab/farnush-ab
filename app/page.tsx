import { PageShell } from '@/components/shells/PageShell';
import { HeroInspect } from '@/components/organisms/HeroInspect';
import { ReservationWidget } from '@/components/organisms/ReservationWidget';
import { Footer } from '@/components/organisms/Footer';

export default function HomePage() {
  return (
    <PageShell>
      <HeroInspect />
      <ReservationWidget />
      <Footer />
    </PageShell>
  );
}
