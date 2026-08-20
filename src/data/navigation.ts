export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Articles", href: "/articles" },
  { label: "Exploring", href: "/exploring" },
  { label: "Contact", href: "/contact" },
];

export const navCTA = {
  label: "Let's Connect",
  href: "/contact",
};
