import React from "react";
import { useParams } from "react-router-dom";

const CourseSections = ( course ) => {
    const {sectionId} = useParams();
    const section = course.sections.find((sec) => sec.id === sectionId);
    console.log(section);
    if (!section){
        return <div> Section Not Found </div>;
    }

    return (
        <div className="section-details-container">
            <h1>{section.heading}</h1>
            <p>Duration: {section.duration} minutes</p>
            <ul className="list-unstyled">
                {section.videos.map((video, index) => (
                    <li key={index}>
                        <a href={video.url} target="_blank" rel="noopener noreferrer">
                            {video.title} - {video.duration} minutes
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseSections;