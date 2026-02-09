type Props = {
  label: string;
  href: string;
};

export default function NavItem({ label, href }: Props) {
  return (
    <a
      href={href}
      className="relative hover:text-white transition group"
    >
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
    </a>
  );
}
