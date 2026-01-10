import { describe, it, expect } from "vitest";
import { addDays, format } from "date-fns";
import { getLocalTodayISODate, isUpcoming, isPast, generateICSContent } from "@/lib/dateUtils";

describe("dateUtils", () => {
  it("getLocalTodayISODate returns YYYY-MM-DD", () => {
    const value = getLocalTodayISODate();
    expect(value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("isUpcoming treats today as upcoming", () => {
    const today = getLocalTodayISODate();
    expect(isUpcoming(today)).toBe(true);
  });

  it("isUpcoming returns false for yesterday", () => {
    const yesterday = format(addDays(new Date(), -1), "yyyy-MM-dd");
    expect(isUpcoming(yesterday)).toBe(false);
  });

  it("isPast returns true for yesterday checkOut", () => {
    const yesterday = format(addDays(new Date(), -1), "yyyy-MM-dd");
    expect(isPast(yesterday)).toBe(true);
  });

  it("isPast returns false for today checkOut", () => {
    const today = getLocalTodayISODate();
    expect(isPast(today)).toBe(false);
  });

  it("generateICSContent produces DTSTAMP in UTC format and DATE values", () => {
    const checkIn = "2026-01-10";
    const checkOut = "2026-01-12";

    const content = generateICSContent("Test Stay", "Test City", checkIn, checkOut, "Line1\nLine2");

    const dtstampLine = content.split("\n").find((l) => l.startsWith("DTSTAMP:"));
    expect(dtstampLine).toBeTruthy();

    const dtstamp = dtstampLine!.replace("DTSTAMP:", "");
    expect(dtstamp).toMatch(/^\d{8}T\d{6}Z$/);

    expect(content).toContain("DTSTART;VALUE=DATE:20260110");
    expect(content).toContain("DTEND;VALUE=DATE:20260112");
    expect(content).toContain("DESCRIPTION:Line1\\nLine2");
  });
});
