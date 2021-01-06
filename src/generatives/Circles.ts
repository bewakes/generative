import { randRange } from '../utils';


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

export default Sketch;
