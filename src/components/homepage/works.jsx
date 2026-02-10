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
								Artificial Intelligence Engineer
							</div>
							<div className="work-duration">Feb 2025 - Present</div>
						</div>

						<div className="work">
							<div className="work-title">Cloudly IO</div>
							<div className="work-subtitle">
								AI/ML Research Intern
							</div>
							<div className="work-duration">Aug 2024 - Jan 2025</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
