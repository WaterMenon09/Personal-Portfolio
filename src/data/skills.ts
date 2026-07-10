export const SKILLS = [
  { group: "languages", items: ["Python", "C/C++", "Java", "JavaScript", "SQL"] },
  { group: "ML & RL", items: ["PyTorch", "TensorFlow", "scikit-learn", "Stable-Baselines3", "GPyTorch", "NumPy", "Pandas"] },
  { group: "LLM & agents", items: ["LangGraph", "LangChain", "MCP / fastmcp", "pgvector", "RAG", "Claude API"] },
  { group: "infra & data", items: ["FastAPI", "Kafka", "Docker", "Kubernetes", "AWS (EKS · S3 · Cognito)", "PostgreSQL", "Redis", "MongoDB", "Prometheus", "OpenTelemetry"] },
  { group: "domain", items: ["O-RAN", "3GPP", "Bayesian digital twins", "RL / PPO", "xApp / rApp"] },
] as const;
