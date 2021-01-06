import React from 'react';
import ReactDOM from 'react-dom';

import p5 from 'p5';

import Circles from './generatives/Circles';
import IFS from './generatives/IteratedFunctionSystem';

import './style.scss';


const genItems = {
    IFS: IFS,
    Circles: Circles,
    Recursive: undefined,
};


const App: React.FC = () => {
    const p5ref = React.useRef(null);
    const [p, setP] = React.useState();
    const [current, setCurrent] = React.useState<keyof (typeof genItems)>();

    React.useEffect(() => {
        if (genItems[current]) {
            if (p) {
                p.remove();
            }
            setP(new p5(genItems[current], p5ref.current));
        }
    }, [current]);
    return (
        <>
            <div className="navbar">
                <h2>Generative</h2>
            </div>
            <div className="main">
                <div className="sidepane">
                { Object.keys(genItems).map(
                    x => (
                        <span key={x} className="menu-item" onClick={() => setCurrent(x)}>{x}</span>
                    ))
                }
                </div>
                <div className="content">
                    <div ref={p5ref} />
                </div>
            </div>
        </>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById('app')
)
