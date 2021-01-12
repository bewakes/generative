interface Vec2Interface {
    x: number;
    y: number;
}

export class Vec2 implements Vec2Interface {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.sub = this.sub.bind(this);
        this.add = this.add.bind(this);
        this.mul = this.mul.bind(this);
        this.div = this.div.bind(this);
        this.length = this.length.bind(this);
    }

    sub(v: Vec2) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    add(v: Vec2) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    mul(f: number) {
        return new Vec2(this.x*f, this.y*f);
    }

    div(f: number) {
        return new Vec2(this.x/f, this.y/f);
    }

    length(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.pow(dx*dx, dy*dy, 0.5);
    }
};

export const vec2 = (x: number, y: number) => new Vec2(x, y);


export const parameterizedLine = <T>(p1: T, p2: T) => {
    return (t: number) => {
        const diff = p2.sub(p1);
        return p1.add(diff.mul(t));
    };
}
