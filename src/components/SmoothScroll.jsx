"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const updateFn = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateFn);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(updateFn);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
