/** Production admin portals shown in the home-page dashboard showcase. Screenshots have customer details blurred. */
export type Dashboard = {
  name: string;
  product: string;
  summary: string;
  modules: string[];
  /** Live portal (login page) — omitted when the product isn't public yet. */
  url?: string;
  /** Text in the mock browser address bar. */
  host: string;
  image: string;
  /** Case study on /work, when there is one. */
  slug?: string;
  /** How tenants are isolated — set for the multi-tenant SaaS products. */
  tenancy?: string;
  tint: string;
};

export const DASHBOARDS: Dashboard[] = [
  {
    name: "Vellay Console",
    product: "Sports venue SaaS",
    summary:
      "Venue owners run every court from one console — live bookings, payments, cancellations and revenue per sport and facility.",
    modules: ["Bookings", "Calendar", "Live view", "Finance", "Leagues", "Marketing"],
    url: "https://portal.vellay.pro/app/bookings",
    host: "portal.vellay.pro",
    image: "/images/dashboards/vellay-console.webp",
    slug: "vellay",
    tenancy: "Every venue is its own tenant — owners switch between venues they manage",
    tint: "#4f6bff",
  },
  {
    name: "Zallo.ai Client Portal",
    product: "AI receptionist SaaS",
    summary:
      "Clinics see how their AI receptionist performs — calls answered, bookings made and missed calls — then manage SMS, calendar, intake forms and the pipeline.",
    modules: ["Call analytics", "SMS inbox", "AI setup", "Calendar", "Intake forms", "Pipeline"],
    url: "https://client-portal.zallo.ai/dashboard",
    host: "client-portal.zallo.ai",
    image: "/images/dashboards/zallo-portal.webp",
    slug: "zallo",
    tenancy: "Every clinic is its own tenant, with its own locations, calls and contacts",
    tint: "#6f9c84",
  },
  {
    name: "ManpowerHub",
    product: "Manpower agency SaaS · live with Rukn Al Rayan",
    summary:
      "Rukn Al Rayan, a UAE manpower contractor, runs on ManpowerHub: sales pipeline, clients, enquiries and quotations, plus workers, deployments, timesheets and attendance.",
    modules: ["Pipeline", "Clients", "Quotations", "Workers", "Deployments", "Timesheets"],
    url: "https://erp.ruknalrayan.com/signin",
    host: "erp.ruknalrayan.com",
    image: "/images/dashboards/rukn-erp.webp",
    slug: "manpowerhub",
    tenancy: "Each agency is its own tenant on its own domain — Rukn Al Rayan is one of them",
    tint: "#3d5bbf",
  },
  {
    name: "OSTELLO",
    product: "Hostel operations SaaS",
    summary:
      "Hostel operators see every branch at a glance — beds, occupancy, receivables, waitlist and maintenance — with modules for finance, kitchen, transport and HR.",
    modules: ["Occupancy", "Leads & applications", "Finance", "Kitchen & mess", "Transport", "People & HR"],
    host: "ostello · branch operations",
    image: "/images/dashboards/ostello-ops.webp",
    slug: "ostello",
    tenancy: "Each operator is its own tenant, with branches switched from the top bar",
    tint: "#b07a5a",
  },
  {
    name: "Atlantic Wholesale Ops",
    product: "Phone wholesale back office",
    summary:
      "Staff track graded stock by IMEI, suppliers and purchase orders, unpaid invoices, returns and shipments — with the day’s numbers on the first screen.",
    modules: ["Stock by grade", "Purchase orders", "Invoices", "Returns / RMA", "Shipments", "IMEI search"],
    url: "https://dashboard.atlanticdevicessolutions.co.uk/",
    host: "dashboard.atlanticdevicessolutions.co.uk",
    image: "/images/dashboards/atlantic-ops.webp",
    slug: "atlantic-devices",
    tint: "#6c63ff",
  },
];
