"use client";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

/**
 * Mobile navigation menu component.
 */
const MobileMenu = ({
  isOpen,
  setIsOpen,
  user,
  createMenuItems,
  learnMenuItems,
  moreMenuItems,
  landingNavItems,
  isActiveLink,
}) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 z-40"
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="absolute right-0 top-16 bottom-0 w-[85%] max-w-sm border-l border-border bg-background/95 backdrop-blur-xl overflow-y-auto"
          >
            <nav className="p-4 space-y-2">
              {user ? (
                <>
                  <p className="text-xs font-light text-muted-foreground uppercase tracking-wider px-2 mb-2">Create</p>
                  {createMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-light ${isActiveLink(item.href) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}

                  <p className="text-xs font-light text-muted-foreground uppercase tracking-wider px-2 mb-2 mt-4">Learn</p>
                  {learnMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-light ${isActiveLink(item.href) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}

                  <p className="text-xs font-light text-muted-foreground uppercase tracking-wider px-2 mb-2 mt-4">More</p>
                  {moreMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-light ${isActiveLink(item.href) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </>
              ) : (
                <>
                  {landingNavItems.map((item) => (
                    <button
                      key={item.id || item.href}
                      onClick={() => {
                        setIsOpen(false);
                        if (item.id) {
                          document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                        } else if (item.href) {
                          router.push(item.href);
                        }
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground w-full text-left font-light"
                    >
                      {item.label}
                    </button>
                  ))}
                </>
              )}
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
