import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/", icon: "🏠", label: "الرئيسية" },
  { to: "/categories", icon: "📦", label: "التصنيفات" },
  { to: "/orders", icon: "💬", label: "الطلبات" },
  { to: "/account", icon: "👤", label: "حسابي" },
];

export default function BottomNav() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-card rounded-full shadow-warmLg flex items-center justify-around py-3 px-2 z-30">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          className="flex flex-col items-center gap-1 px-2"
        >
          {({ isActive }) => (
            <>
              <span className={isActive ? "text-lg" : "text-lg opacity-40"}>
                {item.icon}
              </span>
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-orange" : "text-mutedLight"
                }`}
              >
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
