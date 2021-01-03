import React from 'react';
import ReactDOM from 'react-dom';

import p5 from 'p5';

import './style.scss';

const randRange = (x, y) => {
    const r = Math.random();
    return x + parseInt(r * (y - x));
};

const Sketch = ( sketch ) => {
    let x = 100;
    let y = 100;
    let w = 800, h = 800;

    sketch.setup = () => {
        sketch.createCanvas(w, h);
        sketch.noStroke();
    };

    const numCircles = 5000;
    const circles = [...Array(numCircles)].map(x => [randRange(0, w), randRange(0, h)]);
    const rads = [...Array(numCircles)].map(x => randRange(5, 12));

    sketch.draw = () => {
        sketch.background(0);
        sketch.fill(255, 40);
        circles.map((c, i) => sketch.ellipse(...c, rads[i]));
    };
};

const genItems = {
    tiles: undefined,
    circles: undefined,
    recursive: undefined,
};


const App: React.FC = () => {
    const p5ref = React.useRef(null);
    React.useEffect(() => {
        new p5(Sketch, p5ref.current);
    }, []);
    return (
        <>
            <div className="navbar">
                <h2>Generative</h2>
            </div>
            <div className="main">
                <div className="sidepane">
                { Object.keys(genItems).map(
                    x => (
                        <span className="menu-item" onClick={() => {}}>{x}</span>
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
