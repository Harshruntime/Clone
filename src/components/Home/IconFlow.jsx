"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IconFlow() {
    const containerRef = useRef(null);
    const flowRef = useRef(null);

    const baseIcons = ["⌘", ">_", "↵", "⊞", "⌥", "⇧", "✦", "⚡︎"];
    const icons = [...baseIcons, ...baseIcons, ...baseIcons];

    useLayoutEffect(() => {
        if (!containerRef.current || !flowRef.current) return;

        const items = containerRef.current.querySelectorAll(".wave-item");
        let autoPhase = 0;

        // Pure auto vertical wave floating (Very slow, smooth timing)
        const updateWave = () => {
            autoPhase += 0.010; // Very slow timing
            items.forEach((item, i) => {
                const totalPhase = i * 0.35 + autoPhase;
                const y = Math.sin(totalPhase) * 40;
                const rotate = Math.cos(totalPhase) * 10;
                const scale = 1 + Math.sin(totalPhase) * 0.05;
                gsap.set(item, { y, rotate, scale });
            });
        };

        gsap.ticker.add(updateWave);

        const ctx = gsap.context(() => {
            gsap.to(flowRef.current, {
                x: "-35%",
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                },
            });
        }, containerRef);

        return () => {
            gsap.ticker.remove(updateWave);
            ctx.revert();
        };
    }, []);

    return (
        <>
            <section
                ref={containerRef}
                className="flex items-center overflow-hidden w-full py-20"
            >
                <div ref={flowRef} className="flex gap-6 items-center shrink-0 w-max">
                    {icons.map((icon, index) => (
                        <div
                            key={index}
                            className="
                                wave-item
                                flex
                                h-[110px]
                                w-[110px]
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-gray-200/90
                                bg-[#fafafd]
                                shadow-sm
                                backdrop-blur-sm
                                transition-shadow
                                duration-300
                                hover:shadow-lg
                            "
                        >
                            <span className="text-3xl font-mono text-gray-800 font-bold select-none">
                                {icon}
                            </span>
                        </div>
                    ))}
                </div>
            </section>
            <div className="px-20 py-20">
                <p className="text-black text-[54px] max-w-4xl leading-12">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat maxime consequuntur animi tenetur aliquam quis amet totam !
                </p>
            </div>
        </>
    );
}
