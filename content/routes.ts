/** Planned destinations only. No detail-page content or route handlers are implemented. */
export const plannedServices = [
  { sourceId: 1121, title: "HVAC Contracting", href: "/hvac-contracting/" },
  { sourceId: 1209, title: "Civil and mechanical construction", href: "/civil-and-mechanical-construction/" },
  { sourceId: 1211, title: "Electrical and instrumentation", href: "/electrical-and-instrumentation/" },
  { sourceId: 1213, title: "Firefighting", href: "/firefighting/" },
  { sourceId: 1216, title: "MEP Design consultancy", href: "/mep-design-consultancy/" },
  { sourceId: 1218, title: "Fabrication", href: "/fabrication/" },
  { sourceId: 1220, title: "Flooring and landscaping", href: "/flooring-and-landscaping/" },
  { sourceId: 2406, title: "Testing and air balancing", href: "/testing-and-air-balancing/" },
  { sourceId: 2408, title: "Cleaning services", href: "/cleaning-services/" },
] as const;

export const plannedMainRoutes = {
  about: "/about-us/",
  services: "/services/",
  projects: "/projects/",
  contact: "/contact-us/",
} as const;

export const projectsSource = { sourceId: 2739, approval: "pending" } as const;
