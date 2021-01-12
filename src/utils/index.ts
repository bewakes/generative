export const randRange = (x: number, y: number) => {
    const r = Math.random();
    return x + Math.floor(r * (y - x));
};

export const randomChoice = (arr: any[]) => {
    const ind = randRange(0, arr.length);
    return arr[ind];
};


export const runNTimes = (f: Function, n: number, v: any) => {
    const newF = (currVal: any, cnt: number) => {
        if (cnt == 0) return;
        else {
            const newval = f(currVal);
            return newF(newval, cnt - 1)
        }
    };

    return newF(v, n);
};

export const zip = (a: any[], b: any[]) : [any, any] => {
    const l = Math.min(a.length, b.length);
    return [...Array(l)].map((_, i) => [a[i], b[i]]) as [any, any];
};
