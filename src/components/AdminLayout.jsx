import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, LogOut } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Drives", to: "/admin/drives" },
  { label: "Gallery", to: "/admin/gallery" },
  { label: "Content Editor", to: "/admin/content" },
  { label: "Internships", to: "/admin/internships" },
  { label: "Partnerships", to: "/admin/partnerships" },
  { label: "Contributions", to: "/admin/contributions" },
];

const AdminLayout = ({ title, subtitle, onLogout, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <div className="admin-shell mx-auto w-full max-w-[1400px] px-3 sm:px-6 lg:px-8 pt-2 pb-4">

      {/* ── Mobile Top Bar ── */}
      <div className="lg:hidden flex items-center justify-between glass-card border border-white/10 rounded-2xl px-4 py-3 mb-3">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 rounded-xl hover:bg-white/10 transition text-white/80"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-sm font-semibold truncate mx-2">{title}</h1>
        <button
          type="button"
          onClick={onLogout}
          className="p-2 -mr-2 rounded-xl hover:bg-white/10 transition text-white/60"
          aria-label="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[200]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside className="absolute left-0 top-0 bottom-0 w-[280px] max-w-[85vw] glass-card border-r border-white/10 p-5 flex flex-col animate-[slideInLeft_0.25s_ease]">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">Admin</p>
                <h2 className="text-lg font-semibold">Control Panel</h2>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 transition text-white/60"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-1.5 flex-1 overflow-y-auto -mr-2 pr-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin"}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                      isActive
                        ? "bg-white/15 text-white border border-white/15"
                        : "text-white/70 hover:bg-white/5 border border-transparent"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <button
              type="button"
              onClick={onLogout}
              className="mt-4 flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition w-full justify-center"
            >
              <LogOut size={16} /> Logout
            </button>
          </aside>
        </div>
      )}

      {/* ── Desktop Layout ── */}
      <div className="admin-layout">
        {/* Desktop Sidebar */}
        <aside className="admin-sidebar admin-sidebar-fixed glass-card border border-white/10 rounded-2xl p-5 hidden lg:block">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Admin</p>
            <h2 className="text-lg font-semibold">Control Panel</h2>
          </div>
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-white/15 text-white border border-white/15"
                      : "text-white/70 hover:bg-white/5 border border-transparent"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="admin-content">
          <div className="admin-content-scroll flex flex-col gap-4 sm:gap-6">
            {/* Desktop Header */}
            <header className="hidden lg:flex glass-card border border-white/10 rounded-2xl p-5 flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                {subtitle && <p className="text-sm text-white/70 mt-0.5">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
              >
                Logout
              </button>
            </header>

            {/* Mobile subtitle (title already in top bar) */}
            {subtitle && (
              <p className="lg:hidden text-xs text-white/50 -mt-1 px-1">{subtitle}</p>
            )}

            <div className="admin-page-body space-y-4 sm:space-y-6 pb-6 sm:pb-8">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
