import React, { useState } from 'react';
import project_text from "../text/project_text.json";

interface ImageItem {
    type: "image" | "video" | "component" | "audio";
    content?: string;
    component?: React.FC;
}

interface ProjectsProps {
    title: keyof typeof project_text;
    images: ImageItem[];
}

const Project_space: React.FC<ProjectsProps> = ({ title, images }) => {
    const text: string = project_text[title] ?? "";
    const [currentImage, setCurrentImage] = useState(0);

    const listLength = images.length;

    const nextImage = (forward: boolean) => {
        setCurrentImage((prev) =>
            forward
                ? (prev + 1) % listLength
                : (prev - 1 + listLength) % listLength
        );
    };

    const renderSegment = () => {
        const item = images[currentImage];

        switch (item.type) {
            case "image":
                return (
                    <img
                        key={currentImage}
                        src={item.content}
                        alt="project"
                        className="project_image"
                    />
                );

            case "video":
                return (
                    <video
                        key={currentImage}
                        src={item.content}
                        controls
                        playsInline
                        className="project_image"
                    />
                );

            case "audio":
                return (
                    <audio
                        controls
                        key={currentImage}
                        src={item.content}>
                    </audio>
                )

            case "component":
                if (item.component) {
                    const Component = item.component;
                    return <Component key={currentImage}/>;
                }
                return null;

            default:
                return null;
        }
    };

    return (
        <div className="project-space">
            <div className="project_title">
                <b>{title}</b>
            </div>

            <div className="image_slider">
                <button
                    hidden={listLength === 1}
                    className="left_button"
                    onClick={() => nextImage(false)}
                >
                    <i />
                </button>

                {renderSegment()}

                <button
                    hidden={listLength === 1}
                    className="right_button"
                    onClick={() => nextImage(true)}
                >
                    <i />
                </button>
            </div>

            <div className="project_description">{text}</div>
        </div>
    );
};

export default Project_space;
