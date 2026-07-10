export const SITE = {
  name: "Menon Pranto",
  fullName: "Khandaker Menon Zaman Pranto",
  title: "Menon Pranto · AI/ML Engineer",
  tagline: "AI/ML Engineer · O-RAN & 5G Networks",
  email: "menonpranto@gmail.com",
  gaId: "G-1LHQG831M9",
  socials: {
    github: "https://github.com/WaterMenon09",
    linkedin: "https://www.linkedin.com/in/menon-pranto-9789871a1",
    leetcode: "https://leetcode.com/u/WaterMenon",
  },
  heroBio: {
    doc: "I build self-optimizing 5G networks with reinforcement learning.",
    fields: [
      ["role", '"AI/ML Engineer @ Cloudly IO"'],
      ["work", '"core contributor, Maveric (Linux Foundation)"'],
      ["focus", '["reinforcement learning", "Bayesian digital twins", "O-RAN"]'],
      ["open_to", '"AI/ML engineer roles — research track"'],
      ["location", '"Dhaka, Bangladesh (UTC+6)"'],
    ] as const,
  },
  homeIntro:
    "AI/ML Engineer at Cloudly IO and core contributor to Maveric (Linux Foundation Connectivity). I build production reinforcement-learning agents and Bayesian digital twins for AI-native 5G/6G networks — including the end-to-end PPO-based MRO pipeline, which I re-architected from linear to multi-threaded for a 45–55% runtime reduction, and a vectorized handover protocol that runs 5.5× faster on ARM and 18× on Intel. Started in data annotation and QA, learned what good training data looks like from the ground up, and now ship end-to-end ML pipelines from data sim through xApp/rApp deployment.",
  aboutParagraphs: [
    "I'm an AI/ML Engineer at Cloudly IO and a core contributor to Maveric, the Linux Foundation Connectivity platform for AI-native RAN optimization. My work spans the stack: I built the end-to-end MRO rApp pipeline (PPO-based, re-architected from linear to multi-threaded for a 45–55% runtime cut), hardened the Bayesian digital twin engine's caching and Kafka layers, wrote the 3GPP-compliant golden topology generators in the data simulator, and added observability across all five platform services plus the gateway's admin log plane.",
    "Working day-to-day across the CloudlyNet AI platform, I also know its LangGraph multi-agent copilot architecture well.",
    "I started my career in data annotation and QA, which taught me what production-grade training data actually looks like before I moved into ML engineering. When I'm not at the terminal, I'm reading research — the long-term goal is a role at an AI research lab.",
  ],
} as const;
