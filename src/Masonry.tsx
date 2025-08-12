import { useCallback, useEffect, useMemo, useRef, useState, Children } from 'react';
import type { ReactNode } from 'react';

type Breakpoints = Record<number, number>;

export type MasonryProps = {
    defaultColumns?: number;
    breakpoints?: Breakpoints;
    gap?: number | string;
    className?: string;
    children: ReactNode;
};

const Masonry = ({
    defaultColumns = 4,
    breakpoints = { 480: 1, 768: 2, 1024: 3, 1440: 4 },
    gap = '1.6rem',
    className,
    children,
}: MasonryProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState(defaultColumns);

    // Sort breakpoints once so they are evaluated in ascending width order
    const sortedBreakpoints = useMemo(
        () =>
            Object.entries(breakpoints)
                .map(([bp, cols]) => [+bp, cols])
                .sort((a, b) => a[0] - b[0]),
        [breakpoints]
    );

    // Given a container width, find the matching column count
    const getColumnsForWidth = useCallback(
        (width: number) => {
            let cols = defaultColumns;

            for (const [bp, colCount] of sortedBreakpoints) {
                if (width >= bp) cols = colCount;
            }
            return cols;
        },
        [sortedBreakpoints, defaultColumns]
    );

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // ResizeObserver: adjusts column count dynamically when container width changes
        const observer = new ResizeObserver(([entry]) => {
            setColumns((prevCols) => {
                const newCols = getColumnsForWidth(entry.contentRect.width);
                return newCols !== prevCols ? newCols : prevCols;
            });
        });

        observer.observe(container);
        return () => observer.disconnect();
    }, [getColumnsForWidth]);

    // Distribute children into column arrays (round-robin style)
    const columnedChildren = useMemo(() => {
        const cols: ReactNode[][] = Array.from({ length: columns }, () => []);

        Children.forEach(children, (child, idx) => {
            cols[idx % columns].push(child);
        });
        return cols;
    }, [children, columns]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ display: 'flex', gap }}
        >
            {columnedChildren.map((col, idx) => (
                <div
                    key={idx}
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap,
                    }}
                >
                    {col}
                </div>
            ))}
        </div>
    );
};

export default Masonry;
