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
							<div className="work-title">Intelligent Machines</div>
							<div className="work-subtitle">
								Junior Quality Assurance Analyst
							</div>
							<div className="work-duration">Oct 2020 - Mar 2022</div>
						</div>

						<div className="work">
							<div className="work-title">Intelligent Machines</div>
							<div className="work-subtitle">
								Annotation Team Lead
							</div>
							<div className="work-duration">Aug 2019 - Sept 2020</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;
