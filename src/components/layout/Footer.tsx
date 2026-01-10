import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-bold mb-4">
              <MapPin className="h-5 w-5 text-accent" />
              <span>StayFinder</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Find your perfect stay anywhere in the world.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/search?location=Paris" className="hover:text-foreground">
                  Paris
                </Link>
              </li>
              <li>
                <Link to="/search?location=London" className="hover:text-foreground">
                  London
                </Link>
              </li>
              <li>
                <Link to="/search?location=Amsterdam" className="hover:text-foreground">
                  Amsterdam
                </Link>
              </li>
              <li>
                <Link to="/search?location=Barcelona" className="hover:text-foreground">
                  Barcelona
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="hover:text-foreground cursor-pointer">Help Center</span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">Safety</span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">Cancellation</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="hover:text-foreground cursor-pointer">About</span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">Careers</span>
              </li>
              <li>
                <span className="hover:text-foreground cursor-pointer">Press</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} StayFinder. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
