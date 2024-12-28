import React from 'react';

// Example of a Higher-Order Component (HOC)
const PageLayout = (WrappedComponent) => {
    // Return a functional component
    return (props) => {
        return (
            <div className="flex flex-row">
                <WrappedComponent {...props} />
            </div>
        );
    };
};

export default PageLayout;
