"use client";
import Footer from "@/components/common/navbar/Footer";
import HomePage from "@/components/home";
import UpcomingEvent from "@/components/home/UpcomingEvent";
export default function Home() {
  return (
    <>
      <HomePage />
      <UpcomingEvent/>
      <Footer/>
    </>
  );
}
