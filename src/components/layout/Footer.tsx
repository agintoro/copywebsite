import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm select-none">
            D
          </div>
          <div className="leading-none">
            <p className="font-bold text-sm tracking-wider uppercase">DRIVN</p>
            <p className="text-[10px] text-muted-foreground">Tracing Coffee To Its Soul</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {[
            { href: "/processes", label: "Processes" },
            { href: "/#lots", label: "Lots" },
            { href: "/quality", label: "Quality" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com/drivacoffee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            @drivacoffee
          </a>
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Driva Coffee
          </span>
        </div>
      </div>
    </footer>
  );
}
