import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "../components/BottomNav";
import ProductCard from "../components/ProductCard";
import { getProductById, getSimilarProducts } from "../lib/products";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProductById(id).then(async (p) => {
      if (!mounted) return;
      setProduct(p);
      if (p) {
        const relatedProducts = await getSimilarProducts(p);
        if (mounted) setSimilar(relatedProducts);
      }
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen max-w-md mx-auto flex items-center justify-center bg-cream">
        <p className="text-muted text-sm">جارٍ التحميل...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen max-w-md mx-auto flex flex-col items-center justify-center bg-cream px-6 text-center">
        <p className="text-ink font-semibold mb-2">المنتج غير موجود</p>
        <Link to="/" className="text-orange text-sm font-medium">
          العودة للرئيسية ←
        </Link>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={product.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="min-h-screen max-w-md mx-auto pb-28 bg-cream"
      >
        {/* صورة المنتج */}
        <div className="relative h-80 flex items-center justify-center text-8xl bg-card">
          <Link
            to="/"
            className="absolute top-5 right-4 w-11 h-11 rounded-full bg-white/90 flex items-center justify-center z-10"
            aria-label="رجوع"
          >
            ←
          </Link>
          <span>{product.image_emoji}</span>
        </div>

        <div className="px-4 mt-5">
          <p className="text-xs font-medium text-green">
            {product.category_id === "oils" && "زيوت أصلية"}
            {product.category_id === "herbs" && "أعشاب طبيعية"}
            {product.category_id === "spices" && "توابل"}
            {product.category_id === "preserves" && "معلبات"}
          </p>
          <h1 className="font-display font-extrabold text-3xl text-ink mt-2">
            {product.name}
          </h1>
          <p className="font-latin text-sm text-mutedLight mt-1">
            {product.name_latin}
          </p>
          <p className="font-display font-black text-4xl text-orange mt-4">
            {product.price} <span className="text-lg font-normal">د.ج</span>
          </p>
          <p className="text-ink/80 text-sm mt-4 leading-relaxed">
            {product.description}
          </p>

          {/* الكمية */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink mb-2">الكمية</p>
            <div className="inline-flex items-center gap-4 bg-white rounded-full px-5 py-3 shadow-warm">
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="text-orange text-lg font-bold"
                aria-label="زيادة الكمية"
              >
                +
              </button>
              <span className="font-semibold text-ink w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-orange text-lg font-bold"
                aria-label="تقليل الكمية"
              >
                −
              </button>
            </div>
          </div>

          {/* مميزات */}
          <div className="grid grid-cols-2 gap-3 mt-6 text-xs text-ink/70">
            <div className="flex items-center gap-2">💵 دفع عند الاستلام</div>
            <div className="flex items-center gap-2">🚚 توصيل 58 ولاية</div>
            <div className="flex items-center gap-2">🛡️ ضمان الجودة</div>
            <div className="flex items-center gap-2">🌿 طبيعي 100٪</div>
          </div>
        </div>

        {/* منتجات مشابهة - الخوارزمية */}
        {similar.length > 0 && (
          <div className="mt-10">
            <h3 className="font-display font-extrabold text-xl text-ink px-4 mb-3">
              قد يعجبك أيضاً
            </h3>
            <div className="grid grid-cols-2 gap-3 px-4">
              {similar.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* زر الشراء الثابت */}
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-30">
          <button className="w-full bg-orange text-white font-bold py-4 rounded-full shadow-warmLg flex items-center justify-center gap-2">
            ← اشترِ الآن · {product.price * quantity} د.ج
          </button>
        </div>

        <BottomNav />
      </motion.div>
    </AnimatePresence>
  );
}
