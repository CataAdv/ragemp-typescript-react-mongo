import { useMemo } from "react";

const GIF = "https://i.imgur.com/ZKTuLt6.gif";

export const Test = () => {
    const drops = useMemo(
        () =>
            Array.from({ length: 100 }).map(() => ({
                left: Math.random() * 100,
                size: 40 + Math.random() * 40,
                delay: Math.random() * 5,
                duration: 4 + Math.random() * 4,
            })),
        []
    );

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-[#a02ff050] flex items-center justify-center">
            <style>{`
                @keyframes kittyRain {
                    0% { transform: translateY(0); opacity: 0; }
                    10% { opacity: 1; }
                    100% { transform: translateY(120vh); opacity: 0; }
                }
            `}</style>

            <h1 className="z-10 text-3xl font-bold text-white">
                Hello World
            </h1>

            {drops.map((d, i) => (
                <img
                    key={i}
                    src={GIF}
                    className="pointer-events-none absolute"
                    style={{
                        top: "-80px",
                        left: `${d.left}%`,
                        width: `${d.size}px`,
                        animationName: "kittyRain",
                        animationTimingFunction: "linear",
                        animationIterationCount: "infinite",
                        animationDelay: `${d.delay}s`,
                        animationDuration: `${d.duration}s`,
                    }}
                />
            ))}
        </div>
    );
};
