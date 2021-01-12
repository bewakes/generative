import { randRange } from '../utils';


const Sketch = ( s ) => {
    let x = 100;
    let y = 100;
    let w = 800, h = 800;

    s.setup = () => {
        s.createCanvas(w, h);
        s.noStroke();
    };

    const numCircles = 5000;
    const circles = [...Array(numCircles)].map(x => [randRange(0, w), randRange(0, h)]);
    const rads = [...Array(numCircles)].map(x => randRange(5, 12));

    s.draw = () => {
        s.background(0);
        s.fill(255, 40);
        circles.map((c, i) => s.ellipse(...c, rads[i]));
    };
};

export default Sketch;
