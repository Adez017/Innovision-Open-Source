"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Desktop navigation component for logged-in users and landing page.
 */
const DesktopNav = ({
  user,
  createMenuItems,
  learnMenuItems,
  moreMenuItems,
  landingNavItems,
  isActiveLink,
}) => {
  return (
    <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
      {user ? (
        // Logged in users - show ALL 11 nav items with icons only
        <div className="flex items-center gap-0.5 px-2 py-1.5 rounded-full border border-border/50 bg-card/80 backdrop-blur-md shadow-sm">
          {[...createMenuItems, ...learnMenuItems, ...moreMenuItems].map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 rounded-full font-light ${isActiveLink(item.href) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted hover:text-foreground'}`}
                  >
                    <item.icon className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-popover border-border">
                <p className="font-light text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground font-light">{item.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      ) : (
        // Landing page nav - pill style buttons with text
        <div className="flex items-center gap-0.5 px-2 py-1.5 rounded-full border border-border/50 bg-card/80 backdrop-blur-md shadow-sm">
          {landingNavItems.map((item) => (
            <Button
              key={item.id || item.href}
              variant="ghost"
              size="sm"
              asChild={!!item.href}
              onClick={() => {
                if (item.id) {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-sm font-light text-foreground hover:bg-muted hover:text-foreground rounded-full h-8 px-4 transition-colors"
            >
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span className="cursor-pointer">{item.label}</span>
              )}
            </Button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default DesktopNav;
