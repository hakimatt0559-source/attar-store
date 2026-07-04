import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import ProductCard from "../components/ProductCard";
import { CATEGORIES, getProducts, getFeaturedProduct } from "../lib/products";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([getProducts(), getFeaturedProduct()]).then(
      ([allProducts, featuredProduct]) => {
        if (!mounted) return;
        setProducts(allProducts);
        setFeatured(featuredProduct);
        setLoading(false);
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category_id === activeCategory);

  return (
    <div className="min-h-screen max-w-md mx-auto pb-28 bg-cream">
      <Header />

      {/* شريط البحث */}
      <div className="px-4 mt-2">
        <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-warm">
          <span className="text-orange">⚙️</span>
          <input
            placeholder="ابحث عن منتج..."
            className="flex-1 bg-transparent outline-none text-sm text-right text-ink"
          />
          <span className="text-muted">🔍</span>
        </div>
      </div>

      {/* التصنيفات */}
      <div className="flex gap-3 px-4 mt-5 overflow-x-auto scrollbar-hide">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`flex flex-col items-center gap-1.5 shrink-0 transition-all duration-200 ${
              activeCategory === c.id ? "scale-105" : "opacity-70"
            }`}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-warm transition-all ${
                activeCategory === c.id ? "bg-orange" : "bg-card"
              }`}
            >
              {c.icon}
            </div>
            <span
              className={`text-xs font-medium ${
                activeCategory === c.id ? "text-orange" : "text-ink/70"
              }`}
            >
              {c.name}
            </span>
          </button>
        ))}
      </div>

      {/* عرض اليوم */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-4 mt-6 rounded-3xl p-5 shadow-warmLg relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #D9A441, #C8862E)" }}
        >
          <span className="inline-block bg-white/25 text-white text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
            عرض اليوم · خصم 20%
          </span>
          <h2 className="font-display font-extrabold text-2xl text-white mt-3">
            {featured.name}
          </h2>
          <p className="font-latin text-white/70 text-xs mt-0.5">
            {featured.name_latin}
          </p>
          <p className="text-white/85 text-sm mt-2 leading-relaxed">
            {featured.description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <p className="font-display font-black text-2xl text-white">
              {featured.price}{" "}
              <span className="text-sm font-normal">د.ج</span>
            </p>
            <Link
              to={`/product/${featured.id}`}
              className="bg-white text-sm font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 text-orange-dark"
            >
              اطلب الآن ←
            </Link>
          </div>
        </motion.div>
      )}

      {/* عنوان القسم */}
      <div className="flex items-center justify-between px-4 mt-8 mb-3">
        <button className="text-xs font-medium text-muted">عرض الكل ←</button>
        <div className="text-left">
          <p className="text-[11px] font-medium text-mutedLight">المختار لك</p>
          <h3 className="font-display font-extrabold text-xl text-ink">
            الأكثر طلباً
          </h3>
        </div>
      </div>

      {/* شبكة المنتجات */}
      {loading ? (
        <p className="text-center text-muted text-sm mt-6">جارٍ التحميل...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-muted text-sm mt-6">
          لا توجد منتجات في هذا التصنيف بعد.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4">
          {filteredProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
