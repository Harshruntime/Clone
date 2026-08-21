"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoBanner() {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(containerRef.current, {
                width: '100%',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'top 20',
                    animate: 'ease-out',
                    scrub: 1,
                },
            });
        }, containerRef);
        return () => ctx.revert();
    }, [])

    return (
        <section className="flex min-h-screen items-start justify-center pt-20">
            <div ref={containerRef} className="h-[40rem] w-[30rem] overflow-hidden bg-black rounded-4xl" >
                <div className="flex h-full items-center justify-center text-4xl text-white">
                    Content
                </div>
            </div>
        </section>
    );
}