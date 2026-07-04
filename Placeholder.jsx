import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function Placeholder({ title }) {
  return (
    <div className="min-h-screen max-w-md mx-auto pb-28 bg-cream">
      <Header />
      <div className="flex flex-col items-center justify-center mt-20 px-6 text-center">
        <p className="font-display font-extrabold text-xl text-ink mb-2">
          {title}
        </p>
        <p className="text-sm text-muted">هذه الصفحة قيد الإنشاء، سنبنيها في الخطوة القادمة.</p>
      </div>
      <BottomNav />
    </div>
  );
}
