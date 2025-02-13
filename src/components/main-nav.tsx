'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Package, ShoppingCart, Boxes, CreditCard, Settings, Menu } from 'lucide-react';

const MainNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: '/',
      label: 'Dashboard',
      icon: Package,
    },
    {
      href: '/inventory',
      label: 'Inventory',
      icon: Boxes,
    },
    {
      href: '/orders',
      label: 'Orders',
      icon: ShoppingCart,
    },
    {
      href: '/billing',
      label: 'Billing',
      icon: CreditCard,
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <div className="hidden items-center space-x-4 md:flex lg:space-x-6">
        {routes.map((route) => (
          <Button
            key={route.href}
            variant="ghost"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === route.href ? 'bg-muted text-primary' : 'text-muted-foreground',
            )}
            asChild
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
              <div className="flex flex-col space-y-4">
                {routes.map((route) => (
                  <Button
                    key={route.href}
                    variant="ghost"
                    className={cn(
                      'justify-start',
                      pathname === route.href ? 'bg-muted text-primary' : 'text-muted-foreground',
                    )}
                    asChild
                  >
                    <Link href={route.href}>
                      <route.icon className="mr-2 h-4 w-4" />
                      {route.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default MainNav;
