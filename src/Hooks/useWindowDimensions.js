import React from 'react'

export default function useWindowDimensions() {

    const hasWindow = typeof window !== 'undefined';

    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
        width,
        height,
    };
}