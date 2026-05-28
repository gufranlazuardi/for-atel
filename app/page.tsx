import LandingPage from "@/components/LandingPage";

export default function Home() {
  return (
    <>
      {/* Door panels — live in root so they persist across route changes */}
      <div className="door-left">
        <div className="door-shine" />
      </div>
      <div className="door-right">
        <div className="door-shine" />
      </div>
      <LandingPage />
    </>
  );
}
