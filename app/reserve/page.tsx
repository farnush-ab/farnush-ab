import { ReservationForm } from "@/components/organisms/ReservationForm";

export const metadata = {
  title: "رزرو میز همکاری · دیزاین استیشن",
  description: "میز معماری شوروم پالادیوم را برای ۹۰ دقیقه رزرو کنید.",
};

export default function ReservePage() {
  return (
    <div className="pt-32">
      <ReservationForm />
    </div>
  );
}
