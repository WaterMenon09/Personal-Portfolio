import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work"
				body={
					<div className="works-body">
						<div className="work">
							<div className="work-title">Cloudly IO</div>
							<div className="work-subtitle">
								AI/ML Engineer
							</div>
							<div className="work-duration">Feb 2025 – Present</div>
						</div>

						<div className="work">
							<div className="work-title">Cloudly IO</div>
							<div className="work-subtitle">
								AI/ML Research Intern
							</div>
							<div className="work-duration">Aug 2024 – Jan 2025</div>
						</div>

						<div className="work">
							<div className="work-title">Intelligent Machines</div>
							<div className="work-subtitle">
								Junior QA Analyst
							</div>
							<div className="work-duration">Oct 2020 – Mar 2022</div>
						</div>

						<div className="work">
							<div className="work-title">Intelligent Machines</div>
							<div className="work-subtitle">
								Annotation Team Lead
							</div>
							<div className="work-duration">Aug 2019 – Sep 2020</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
