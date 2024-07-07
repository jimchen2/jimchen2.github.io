import useBackgroundChange from "../hooks/useBackgroundChange";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { background1, background2, activeIndex } = useBackgroundChange();

  const activeBackground = activeIndex === 1 ? background1 : background2;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          backgroundImage: `url(${activeBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}