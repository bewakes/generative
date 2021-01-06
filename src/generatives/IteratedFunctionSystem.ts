import { randomChoice, runNTimes } from '../utils';

const Sketch = ( sketch ) => {
    const w = 800, h = 800;
    const nIters = 1000;
    const A = -1.5;
    const B = 2.1;
    const C = 3.5;
    const D = -3;

    sketch.setup = () => {
        sketch.createCanvas(w, h);
        sketch.background(0);
    };

    const serpinski = (pt) => {
        const [x, y] = pt;
        const x2 = x/2, y2 = y/2;
        const choices = [
            [x2, y2],
            [x2 + 0.5 * w, y2 + 0.86 * h],
            [x2 + w, y2]
        ];
        sketch.point(...pt);
        const choice = sketch.random(choices);
        return choice;
    };

    const deJong = (pt) => {
        const [x, y] = pt;
        const f = 2;
        sketch.point(w/f + x*w/f, h/f + y*h/f);
        const ff = 1;

        return [
            Math.sin(y * A/ff) - Math.cos((B + Math.sin(sketch.frameCount/100)) * x/ff),
            Math.sin(x * (C + Math.cos(sketch.frameCount/1000))/ff) - Math.cos(D * y / ff),
        ];
    };

    sketch.draw = () => {
        sketch.background(0);
        sketch.stroke(255);
        const p = [1, 1];
        runNTimes(deJong, nIters, p);
    };
};


export default Sketch;
