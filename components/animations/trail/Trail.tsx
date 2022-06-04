import React from "react";

import { animated, useTrail } from "react-spring"

interface IProps {
    open: boolean;
    onStart?: () => void;
    onEnd?: () => void;
    onCloseEnd?: () => void;
    children: any;
}

let a = 0;

export default function Trail(props: IProps) {

    const items = React.Children.toArray(props.children);
    const trail = useTrail(items.length, {
        config: {
            mass: 5,
            tension: 2000,
            friction: 200
        },
        opacity: props.open ? 1 : 0,
        x: props.open ? 0 : 20,
        from: {
            opacity: 0,
            x: 20
        },
        onStart: () => {
            
            if(props.onStart !== undefined) {
                props.onStart();
            }

            a = 0;

        },
        onResolve: () => {

            // if (++a === 2) {

            //     if (props.onEnd !== undefined) {
            //         if (!props.open) {
            //             props.onEnd();
            //         }
            //     }

            //     if (props.onCloseEnd !== undefined) {
            //         if (!props.open) {
            //             props.onCloseEnd();
            //         }
            //     }

            //     a = 0;
            // }
        }
    });

    return (
        <React.Fragment>
            {
                trail.map(({ ...style }, index) => (
                    <animated.div
                        key={index}
                        style={style}
                    >
                        {
                            items[index]
                        }
                    </animated.div>
                ))
            }
        </React.Fragment>
    )
}