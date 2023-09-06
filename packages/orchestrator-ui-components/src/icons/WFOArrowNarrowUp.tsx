import React, { FC } from 'react';
import { WFOIconProps } from './WFOIconProps';

export const WFOArrowNarrowUp: FC<WFOIconProps> = ({
    width = 16,
    height = 20,
    color = '#000000',
}) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 16 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>icon/arrow-narrow-up</title>
        <g
            id="Symbols"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
        >
            <g id="icon/arrow-narrow-up" fill={color}>
                <path
                    d="M4.29289,9.70711 C3.90237,9.31658 3.90237,8.68342 4.29289,8.29289 L7.29289,5.29289 C7.68342,4.90237 8.3166,4.90237 8.7071,5.29289 L11.7071,8.29289 C12.0976,8.68342 12.0976,9.31658 11.7071,9.70711 C11.3166,10.09763 10.6834,10.09763 10.2929,9.70711 L9,8.41421 L9,14 C9,14.5523 8.5523,15 8,15 C7.44772,15 7,14.5523 7,14 L7,8.41421 L5.70711,9.70711 C5.31658,10.09763 4.68342,10.09763 4.29289,9.70711 Z"
                    id="Path"
                ></path>
            </g>
        </g>
    </svg>
);