import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-4 pt-5 pb-3 sticky top-0 z-20 bg-cream">
      <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-display font-bold text-lg bg-orange">
        ٤
      </div>
      <Link to="/" className="text-center">
        <p className="font-display font-extrabold text-lg text-ink">
          عطارة مغنية الشطية
        </p>
        <p className="font-latin text-[11px] tracking-wide text-muted">
          NATURAL ATTARA STORE
        </p>
      </Link>
      <Link
        to="/cart"
        className="w-11 h-11 rounded-full flex items-center justify-center bg-card shadow-warm"
      >
        <span className="text-ink">🛍️</span>
      </Link>
    </div>
  );
}
