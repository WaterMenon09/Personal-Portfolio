const INFO = {
	main: {
		title: "Menon Pranto · AI/ML Engineer",
		name: "Menon Pranto.",
		email: "menonpranto@gmail.com",
		logo: process.env.PUBLIC_URL + "/logo.png",
	},

	socials: {
		github: "https://github.com/WaterMenon09",
		linkedin: "https://www.linkedin.com/in/menon-pranto-9789871a1",
		leetcode: "https://leetcode.com/u/WaterMenon",
		facebook: "https://www.facebook.com/menon.pranto",
	},

	homepage: {
		title: "AI/ML Engineer · O-RAN & 5G Networks",
		description:
			"AI/ML Engineer at Cloudly IO and core contributor to Maveric (Linux Foundation Connectivity, Meta-backed, Nvidia-partnered). I build production reinforcement-learning agents and Bayesian digital twins for AI-native 5G/6G networks—including a PPO-based MRO that cut handover ping-pong by 45–55% on real-world traces, and a vectorized handover protocol that runs 5.5× faster on ARM and 18× on Intel. Started in data annotation and QA, learned what good training data looks like from the ground up, and now ship end-to-end ML pipelines from data sim through xApp/rApp deployment.",
	},

	about: {
		title: "Menon Pranto. I build AI-native networks from Bangladesh.",
		description:
			"I’m an AI/ML Engineer at Cloudly IO and a core contributor to Maveric, the Linux Foundation Connectivity platform for AI-native RAN optimization (backed by Meta, partnered with Nvidia). My work spans the full ML stack—I own the Bayesian digital twin engine, the 3GPP-compliant data simulator, and the PPO-based rApp service that cut handover ping-pong by 45–55%. I also contribute to Cloudly Copilot, a LangGraph multi-agent platform with pgvector RAG and an MCP server. I started my career in data annotation and QA, which taught me what production-grade training data actually looks like before moving into ML engineering. When I’m not at the terminal, I’m interested in research—the long-term goal is a role at an AI research lab.",
	},

	projects: [
		{
			title: "Maveric · rApp Service",
			description:
				"Reinforcement-learning service for self-optimizing 5G/6G networks. PPO agents trained on real-world signal traces cut handover ping-pong by 45–55%. Unified RL harness across MRO, CCO, Energy Saving, and Load Balancing rApps with day-scope evaluation, guardrail KPIs, and a 3-tier inference cache.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View on GitHub",
			link: "https://github.com/lf-connectivity/maveric",
		},

		{
			title: "Maveric · Data Simulator",
			description:
				"3GPP-compliant golden topology generator powering all Maveric rApps. Hata/UMa/UMi path loss, Gauss-Markov mobility (4 UE velocity classes), ECI computation, 6-stage PM ingestion pipeline, Kafka producer with async S3 uploads, and multi-tenant feature-flag support.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View on GitHub",
			link: "https://github.com/lf-connectivity/maveric",
		},

		{
			title: "Maveric · Bayesian Digital Twin Engine",
			description:
				"GPyTorch Gaussian-process engine for RF propagation prediction. Async FastAPI with Kafka-backed training, partition-aware exact-offset commits, 3-tier cache (Redis → MongoDB → Postgres), S3 artifact hydration with auto-rotating AWS credentials, and Prometheus-instrumented training histograms.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View on GitHub",
			link: "https://github.com/lf-connectivity/maveric",
		},

		{
			title: "Cloudly Copilot",
			description:
				"LangGraph multi-agent platform with Debugger, DataGen, and Reactive agents. Hybrid RAG using sentence-transformers + pgvector on Postgres + BM25 ranking. fastmcp MCP server (SSE-based) exposes data-gen, training, and inference tools with tenant-scoped RBAC.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View on GitHub",
			link: "https://github.com/WaterMenon09",
		},

		{
			title: "MalwareSentinel",
			description:
				"RL-based adaptive firewall with real-time malware detection. Learns from network activity and shares collaborative threat intelligence across devices. Designed the ML models and integrated cloud infrastructure for fast, adaptive, device-specific protection.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png",
			linkText: "View Project",
			link: "https://github.com/WaterMenon09/MalwareSentinal",
		},

		{
			title: "VolleyballReferee",
			description:
				"Zero-dependency PWA for volleyball referees and scorekeepers. Tracks scores, rotations, substitutions, timeouts, and libero usage in real time with automatic rule enforcement. Built with vanilla JavaScript.",
			logo: "https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png",
			linkText: "View Project",
			link: "https://github.com/WaterMenon09/VolleyballReferee",
		},
	],
};

export default INFO;
