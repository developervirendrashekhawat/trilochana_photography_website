import { Briefcase, Mountain, Package, User } from "lucide-react";
import type { Service } from "@/content/services";

const icons = { briefcase: Briefcase, user: User, package: Package, mountain: Mountain };

export function ServiceIcon({ name, className }: { name: Service["icon"]; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden strokeWidth={1.4} className={className} />;
}
