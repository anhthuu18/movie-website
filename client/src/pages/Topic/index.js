import { useEffect, useRef } from "react";
import MovieTopicGrid from "~/components/layout/components/Movies/MovieTopicGrid";

function Topic() {
    const contentRef = useRef(null);
    useEffect(() => {
        // Auto scroll khi component được render
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);
    return (
        <div ref={contentRef}>
            <MovieTopicGrid showAll={true} title="Chủ đề" />
        </div>
    );
}

export default Topic;