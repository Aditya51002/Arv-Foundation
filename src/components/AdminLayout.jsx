import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/admin" },
  { label: "Drives", to: "/admin/drives" },
  { label: "Gallery", to: "/admin/gallery" },
  { label: "Page Sections", to: "/admin/sections" },
  { label: "Internship Applications", to: "/admin/internships" },
  { label: "Partnership Requests", to: "/admin/partnerships" },
  { label: "Contributions", to: "/admin/contributions" },
];

const AdminLayout = ({ title, subtitle, onLogout, children }) => {
  return (
    <div className="admin-shell mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-3 pb-4">
      <div className="admin-layout">
        <aside className="admin-sidebar admin-sidebar-fixed glass-card border border-white/10 rounded-2xl p-5">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Admin</p>
            <h2 className="text-lg font-semibold">Control Panel</h2>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-white/15 text-white border border-white/15"
                      : "text-white/70 hover:bg-white/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="admin-content">
          <div className="admin-content-scroll flex flex-col gap-6">
            <header className="glass-card border border-white/10 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/15 transition"
              >
                Logout
              </button>
            </header>

            <div className="admin-page-body space-y-6 pb-8">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;
