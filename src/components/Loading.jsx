import React from 'react';

function Loading() {
    return (
        <div className="loading-container fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <span className="loading loading-bars loading-xs text-primary"></span>
            <span className="loading loading-bars loading-sm text-secondary"></span>
            <span className="loading loading-bars loading-md text-accent"></span>
            <span className="loading loading-bars loading-lg text-neutral"></span>
        </div>
    );
}

export default Loading;