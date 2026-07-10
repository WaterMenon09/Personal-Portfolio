export interface Project {
  title: string;
  blurb: string;
  glyph: string;
  badge: { label: string; tone: "ok" | "warn" | "info" };
  tags: string[];
  href: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Maveric · rApp Service",
    blurb:
      "Reinforcement-learning service for self-optimizing 5G/6G networks. I built the MRO module end-to-end and re-architected the training pipeline from linear to multi-threaded, cutting runtime by 45–55%. Unified RL harness across MRO, CCO, Energy Saving, and Load Balancing rApps.",
    glyph: "⟳",
    badge: { label: "▲ 45–55% runtime cut", tone: "ok" },
    tags: ["python", "pytorch", "ppo", "o-ran"],
    href: "https://github.com/lf-connectivity/maveric",
  },
  {
    title: "Maveric · Data Simulator",
    blurb:
      "Golden topology generator powering Maveric's rApps. I wrote the 3GPP-compliant golden generators — Hata/UMa/UMi path loss, Gauss-Markov mobility across four UE velocity classes, and ECI computation.",
    glyph: "≋",
    badge: { label: "◆ 3GPP-compliant", tone: "info" },
    tags: ["python", "numpy", "3gpp", "kafka"],
    href: "https://github.com/lf-connectivity/maveric",
  },
  {
    title: "Maveric · Bayesian Digital Twin",
    blurb:
      "GPyTorch Gaussian-process engine for RF propagation prediction. I hardened the serving layer: 3-tier cache (Redis → MongoDB → Postgres), partition-aware exact-offset Kafka commits, and Prometheus-instrumented training histograms.",
    glyph: "σ",
    badge: { label: "◆ 3-tier cache", tone: "info" },
    tags: ["python", "gpytorch", "fastapi", "redis"],
    href: "https://github.com/lf-connectivity/maveric",
  },
  {
    title: "MalwareSentinel",
    blurb:
      "RL-based adaptive firewall with real-time malware detection. Learns from network activity and shares collaborative threat intelligence across devices — ML models and cloud integration designed for fast, device-specific protection.",
    glyph: "⊘",
    badge: { label: "▲ adaptive RL firewall", tone: "warn" },
    tags: ["python", "rl", "security"],
    href: "https://github.com/WaterMenon09/MalwareSentinal",
  },
  {
    title: "Facial Emotion Recognition",
    blurb:
      "Seven-class facial-emotion classifier fine-tuned on FER2013 — ResNet backbone with class-weighted loss for imbalance, test-time augmentation, and multi-GPU training over NCCL.",
    glyph: ":)",
    badge: { label: "◆ 7-class ResNet", tone: "info" },
    tags: ["python", "pytorch", "resnet"],
    href: "https://github.com/WaterMenon09/Facial-Emotion-Recognition",
  },
  {
    title: "VolleyballReferee",
    blurb:
      "Zero-dependency PWA for volleyball referees and scorekeepers. Tracks scores, rotations, substitutions, timeouts, and libero usage in real time with automatic rule enforcement. Vanilla JavaScript.",
    glyph: "0:0",
    badge: { label: "▲ zero dependencies", tone: "ok" },
    tags: ["javascript", "pwa"],
    href: "https://github.com/WaterMenon09/VolleyballReferee",
  },
];
