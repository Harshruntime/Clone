'use client';

import HomeBanner from '@/components/Home/HomeBanner';
import IconFlow from '@/components/Home/IconFlow';
import Product from '@/components/Home/Product';
import VideoBanner from '@/components/Home/VideoBanner';
import Developer from '@/components/Home/Developer';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <VideoBanner />
      <IconFlow />
      <Product title={'Antigravity CLI'} desc={'The lightweight, fast, terminal-first surface to work with Antigravity agents. Run autonomous coding agents, execute shell commands directly, and manage background subagents all from your keyboard.'} image={'/1.png'} />
      <Product title={'Antigravity SDK'} desc={`Prototype custom agents leveraging Antigravity's harness with minimal code. Simple Python scripts to iterate on agentic applications, automate software engineering tasks, and run evaluations on top of the Antigravity agent harness.`} image={'/2.png'} />
      <Product title={'Antigravity IDE'} desc={'The fully-featured, agentic IDE. Complete with the agent manager, artifacts, and a deep understanding of your codebase.'} video={'/video.mp4'} />
      <Developer />
    </>
  );
}
