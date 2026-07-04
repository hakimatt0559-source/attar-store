import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/product/${product.id}`}
        className="block bg-card rounded-2xl overflow-hidden shadow-warm"
      >
        <div className="relative h-32 flex items-center justify-center text-5xl bg-cream">
          <span>{product.image_emoji}</span>
          <span className="absolute top-2 left-2 text-white text-xs font-bold px-2.5 py-1 rounded-full bg-orange">
            {product.price} د.ج
          </span>
          <button
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-sm"
            onClick={(e) => e.preventDefault()}
            aria-label="أضف للمفضلة"
          >
            ♡
          </button>
        </div>
        <div className="p-3">
          <p className="font-semibold text-sm leading-tight text-ink">
            {product.name}
          </p>
          <p className="font-latin text-[10px] mt-0.5 text-mutedLight">
            {product.name_latin}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-muted">
              {product.category_id}
            </span>
            <span className="flex items-center gap-0.5 text-[11px] font-semibold text-orange-dark">
              ★ {product.rating}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-[11px] font-medium text-green">
            <span className="w-1.5 h-1.5 rounded-full bg-green" />
            {product.stock > 0 ? "متوفر" : "غير متوفر"}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
