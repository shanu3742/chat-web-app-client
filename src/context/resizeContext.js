//react import
import React, { createContext, useContext, useEffect, useState } from 'react';
//DEFAULT VALUE
const SMALL_SCREEN_WIDTH = 425;
const MEDIUM_SCREEN_WIDTH = 1024;
const LARGE_SCREEN_WIDTH = 1440;

const SMALL_SCREEN = 1;
const MEDIUM_SCREEN = 2;
const LARGE_SCREEN = 3;

const DEBOUNCE_TIME = 200;

//device type getter
const getDeviceType = (width) => {
    if (width <= SMALL_SCREEN_WIDTH) return SMALL_SCREEN;
    if (width <= MEDIUM_SCREEN_WIDTH) return MEDIUM_SCREEN;
    return LARGE_SCREEN;
};

// create context
const ResizeContext = createContext();
//context component
const ResizeProvider = ({ children }) => {
    const [deviceSize, setDeviceSize] = useState({
        size: window.innerWidth,
        deviceType: getDeviceType(window.innerWidth),
    });
//life cycle effect
    useEffect(() => {
        const updateDeviceSize = () => {
            const width = window.innerWidth;
            setDeviceSize({
                size: width,
                deviceType: getDeviceType(width),
            });
        };

        let timerId;
        const handleResize = () => {
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(updateDeviceSize, DEBOUNCE_TIME);
        };

        window.addEventListener('resize', handleResize);
       // updateDeviceSize();

        return () => {
            if (timerId) clearTimeout(timerId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <ResizeContext.Provider value={deviceSize}>
            {children}
        </ResizeContext.Provider>
    );
};
//context value getter
export const useResizeContext = () => {
    return useContext(ResizeContext);
};

export default ResizeProvider;

