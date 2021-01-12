import { zip, runNTimes } from '../utils';
import { vec2, Vec2, parameterizedLine } from '../utils/geometry';

const Sketch = ( s ) => {
    let w = 1000, h = 800;
    let r = s.random()*100000;
    let shiftFactor = 0.05;
    let NTIMES = 60;
    const STARTSTROKE = 30;
    const dStroke = (255 - STARTSTROKE) / NTIMES;
    let initStroke: number;

    s.setup = () => {
        s.createCanvas(w, h);
        s.background(0);
    };

    s.draw = () => {
        s.background(0);
        s.strokeWeight(1.5);
        s.randomSeed(r);
        s.noFill();
        const t = [vec2(3, 3), vec2(3, h-3), vec2(w-3, h-3), vec2(w-3, 3)];
        const tgls = triangulateNTimes(t, 3);

        tgls.forEach(tgl => {
            initStroke = STARTSTROKE;
            runNTimes(
                (t) => {
                    s.stroke(initStroke);
                    renderClosedLine(t);
                    initStroke += dStroke;
                    return nextIter(t)
                },
                NTIMES,
                tgl
            );
        });
    };

    const renderClosedLine = (points: Array<Vec2>) => {
        s.beginShape();
        points.map(p => s.vertex(p.x, p.y));
        s.endShape(s.CLOSE);
    };

    const nextIter = (points: Array<Vec2>) => {
        const pairs = zip(points, [...points.slice(1), points[0]]);
        return pairs.map(x => parameterizedLine(...x)(shiftFactor));
    };

    const randPointInTriangle = (points: [Vec2, Vec2, Vec2]) => {
        const [start, a, b] = points;
        const f1 = 0.25 + s.random() * 0.5; // get around midpoint
        const pointInAB = parameterizedLine(a, b)(f1);
        const f2 = 0.25 + s.random() * 0.5; // get around midpoint
        return parameterizedLine(start, pointInAB)(f2);
    }

    const getPolygonTriangles = (points: Vec2[]) => {
        const triangles = [];
        for(let x=1; x<points.length-1; x++) {
            triangles.push([points[0], points[x], points[x+1]]);
        }
        return triangles;
    };

    const triangulate = (points: Array<Vec2>) => {
        // Generate a random point lying within the points
        if(points.length < 3) return [points];
        let internalPoint = vec2(0, 0);
        if(points.length == 3) {
            internalPoint = randPointInTriangle(points as [Vec2, Vec2, Vec2]);
        } else {
            const triangles = getPolygonTriangles(points);
            internalPoint = triangles.map(randPointInTriangle).reduce(
                (acc, pt) => acc.add(pt.div(triangles.length)),
                vec2(0, 0)
            );
        }
        const pairs = zip(points, [...points.slice(1), points[0]]);
        return pairs.map(pair => [...pair, internalPoint]);
    };

    const triangulateNTimes = (points: Array<Vec2>, n: number) => {
        if(n == 0) {
            return [points];
        }
        return triangulate(points).map(tgl => triangulateNTimes(tgl, n-1)).flat();
    }
};

export default Sketch;
