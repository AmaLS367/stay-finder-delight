import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Users, MapPin, X, Printer, Search } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { toast } from "@/components/ui/sonner";
import { useBookings } from "@/hooks/useBookings";
import { formatPrice, formatDateRange, formatGuests } from "@/lib/formatters";

export default function Trips() {
  const { upcomingBookings, pastBookings, cancelBooking } = useBookings();
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const bookings = tab === "upcoming" ? upcomingBookings : pastBookings;

  const handlePrint = (bookingId: string) => {
    const booking = [...upcomingBookings, ...pastBookings].find((b) => b.id === bookingId);
    if (!booking) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      toast.error("Popup blocked. Allow popups to print the receipt.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Booking Receipt - StayFinder</title>
        <style>
          body { font-family: system-ui, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; }
          h1 { font-size: 24px; margin-bottom: 8px; }
          .subtitle { color: #666; margin-bottom: 32px; }
          .section { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #eee; }
          .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
          .label { color: #666; }
          .total { font-size: 20px; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Booking Receipt</h1>
        <p class="subtitle">StayFinder</p>
        <div class="section">
          <h2>${booking.listing.title}</h2>
          <p>${booking.listing.city}, ${booking.listing.country}</p>
        </div>
        <div class="section">
          <div class="row"><span class="label">Check-in</span><span>${booking.checkIn}</span></div>
          <div class="row"><span class="label">Check-out</span><span>${booking.checkOut}</span></div>
          <div class="row"><span class="label">Guests</span><span>${booking.guests}</span></div>
          <div class="row"><span class="label">Status</span><span>${booking.status}</span></div>
        </div>
        <div class="row total"><span>Total</span><span>${formatPrice(booking.totalPrice)}</span></div>
        <p style="margin-top: 40px; color: #999; font-size: 12px;">Booking ID: ${booking.id}</p>
      </body>
      </html>
    `);
    printWindow.document.close();

    const triggerPrint = () => {
      try {
        printWindow.focus();
        printWindow.print();
      } catch {
        toast.error("Print failed");
      }
    };

    printWindow.onload = () => {
      triggerPrint();
    };

    window.setTimeout(() => {
      triggerPrint();
    }, 250);
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-8">My trips</h1>

        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setTab("upcoming")}
            className={`pb-3 px-1 font-medium transition-colors ${
              tab === "upcoming"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground"
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setTab("past")}
            className={`pb-3 px-1 font-medium transition-colors ${
              tab === "past"
                ? "text-foreground border-b-2 border-foreground"
                : "text-muted-foreground"
            }`}
          >
            Past ({pastBookings.length})
          </button>
        </div>

        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-border bg-card"
              >
                <Link to={`/listing/${booking.listingId}`} className="shrink-0">
                  <img
                    src={booking.listing.images[0]}
                    alt={booking.listing.title}
                    className="w-full md:w-48 h-32 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/listing/${booking.listingId}`}
                        className="font-semibold text-lg hover:underline"
                      >
                        {booking.listing.title}
                      </Link>
                      <p className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                        <MapPin className="h-4 w-4" />
                        {booking.listing.city}, {booking.listing.country}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDateRange(booking.checkIn, booking.checkOut)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {formatGuests(booking.guests)}
                    </span>
                    <span className="font-semibold">{formatPrice(booking.totalPrice)}</span>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handlePrint(booking.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <Printer className="h-4 w-4" /> Receipt
                    </button>
                    {tab === "upcoming" && booking.status !== "cancelled" && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <X className="h-4 w-4" /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg font-medium mb-2">
              {tab === "upcoming" ? "No upcoming trips" : "No past trips"}
            </p>
            <p className="text-muted-foreground mb-6">
              {tab === "upcoming"
                ? "Time to plan your next adventure!"
                : "Your travel history will appear here"}
            </p>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Search className="h-4 w-4" /> Start searching
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
