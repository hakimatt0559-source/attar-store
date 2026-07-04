import { supabase, isSupabaseConfigured } from "./supabaseClient";

// ------------------------------------------------------------------
// بيانات وهمية (mock) عشان الموقع يشتغل ويتعرض حتى قبل ربط قاعدة البيانات
// لما تربط Supabase، هذا الملف هيسحب البيانات الحقيقية تلقائياً بدل الوهمية
// ------------------------------------------------------------------

export const CATEGORIES = [
  { id: "all", name: "الكل", icon: "✨" },
  { id: "oils", name: "زيوت أصلية", icon: "🫒" },
  { id: "herbs", name: "أعشاب طبيعية", icon: "🌿" },
  { id: "spices", name: "توابل", icon: "🌶️" },
  { id: "preserves", name: "معلبات", icon: "🍯" },
];

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "شامبو ثوم الأكر",
    name_latin: "Shampoo Diva",
    price: 350,
    category_id: "oils",
    rating: 4.5,
    stock: 12,
    description: "شامبو ثوم الأكر لإنبات وتقوية الشعر، يناسب جميع أنواع الشعر.",
    image_emoji: "🧴",
    featured: false,
  },
  {
    id: "2",
    name: "زيت النمل",
    name_latin: "Huile pour épilation",
    price: 500,
    category_id: "oils",
    rating: 4.8,
    stock: 8,
    description: "زيت لمنع نمو الشعر، طبيعي 100%، لبشرة ناعمة ومشرقة.",
    image_emoji: "🫙",
    featured: false,
  },
  {
    id: "3",
    name: "دهن النعناع",
    name_latin: "Menthe Sauvage",
    price: 500,
    category_id: "preserves",
    rating: 4.6,
    stock: 15,
    description: "دهن النعناع البري، مفيد للتدليك وتخفيف الآلام.",
    image_emoji: "🌿",
    featured: false,
  },
  {
    id: "4",
    name: "دهن النعام",
    name_latin: "Huile Naâm",
    price: 450,
    category_id: "preserves",
    rating: 4.7,
    stock: 6,
    description: "دهن النعام الطبيعي الأصلي.",
    image_emoji: "🪶",
    featured: false,
  },
  {
    id: "5",
    name: "كريمة كورى",
    name_latin: "Crème Goury",
    price: 1000,
    category_id: "oils",
    rating: 4.9,
    stock: 20,
    description: "منتوج كوري كامل: كريم وصابون عطارة مغنية الشطية.",
    image_emoji: "🧴",
    featured: true,
  },
];

/** يرجع كل المنتجات (حقيقية لو Supabase متصل، أو وهمية لو لسه لأ) */
export async function getProducts() {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error);
      return MOCK_PRODUCTS;
    }
    return data;
  }
  return MOCK_PRODUCTS;
}

/** يرجع منتج واحد بالـ id */
export async function getProductById(id) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching product:", error);
      return MOCK_PRODUCTS.find((p) => p.id === id) || null;
    }
    return data;
  }
  return MOCK_PRODUCTS.find((p) => p.id === id) || null;
}

/**
 * الخوارزمية: يرجع منتجات "قد يعجبك أيضاً" بناءً على نفس التصنيف
 * (لاحقاً ممكن نطورها لتاخد في الاعتبار الأكثر مبيعاً أو تفضيلات الزبون)
 */
export async function getSimilarProducts(product, limit = 4) {
  const all = await getProducts();
  return all
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, limit);
}

/** يرجع المنتجات المميزة (عروض اليوم) */
export async function getFeaturedProduct() {
  const all = await getProducts();
  return all.find((p) => p.featured) || all[0];
}
