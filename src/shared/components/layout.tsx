import { Link, useRouter } from "@tanstack/react-router";
import { Heart, Home, User } from "lucide-react";
import { useFavoritesStore } from "../stores/favorites";
import { Button } from "../../components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { favorites } = useFavoritesStore();

  return (
    <div className="min-h-screen bg-background ">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/"
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Rick & Morty
            </Link>

            <nav className="flex items-center gap-2 flex-wrap">
              <Button
                variant="ghost"
                onClick={() => router.navigate({ to: "/" })}
                className="flex items-center gap-2 text-sm"
              >
                <Home className="h-4 w-4" />
                Characters
              </Button>

              <Button
                variant="ghost"
                onClick={() => router.navigate({ to: "/favorites" })}
                className="flex items-center gap-2 relative text-sm"
              >
                <Heart className="h-4 w-4" />
                Favorites
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
