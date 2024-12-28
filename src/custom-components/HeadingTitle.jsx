import React from 'react';

const HeadingTitle = ({ content, color = 'black' }) => {
    return (
        <h1
            className={`text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-6xl`}
            style={{ color }}
        >
            {content}
        </h1>
    );
};

export default HeadingTitle;
