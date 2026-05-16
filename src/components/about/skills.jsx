import React from "react";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/skills.css";

const SKILL_GROUPS = [
	{
		label: "Languages",
		items: ["Python", "C/C++", "Java", "SQL"],
	},
	{
		label: "ML / Deep Learning",
		items: [
			"PyTorch",
			"TensorFlow",
			"scikit-learn",
			"Stable-Baselines3",
			"GPyTorch",
			"NumPy",
			"Pandas",
		],
	},
	{
		label: "LLM & Agents",
		items: [
			"LangGraph",
			"LangChain",
			"fastmcp / MCP",
			"pgvector",
			"RAG",
			"Claude API",
		],
	},
	{
		label: "Backend & Infra",
		items: [
			"FastAPI",
			"Kafka",
			"Docker",
			"Kubernetes",
			"AWS (EKS, S3, Cognito)",
			"PostgreSQL",
			"Redis",
			"MongoDB",
		],
	},
	{
		label: "Observability",
		items: ["OpenTelemetry", "Prometheus"],
	},
	{
		label: "Specialized",
		items: [
			"O-RAN",
			"3GPP",
			"Bayesian Digital Twins",
			"Reinforcement Learning (PPO)",
			"xApp / rApp",
		],
	},
];

const Skills = () => {
	return (
		<div className="skills">
			<Card
				icon={faCode}
				title="Skills"
				body={
					<div className="skills-body">
						{SKILL_GROUPS.map((group) => (
							<div className="skill-group" key={group.label}>
								<div className="skill-group-label">
									{group.label}
								</div>
								<div className="skill-tags">
									{group.items.map((item) => (
										<span className="skill-tag" key={item}>
											{item}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				}
			/>
		</div>
	);
};

export default Skills;
