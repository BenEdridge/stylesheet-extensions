import Transform from "@root/props/transform";

import Length from "@root/values/length";
import Scalar from "@root/values/scalar";

test("property name", () => {
    const transform = new Transform([
        { fn: "translateX", args: [new Length(13, "px")] }
    ]);

    expect(transform.name).toBe("transform");
});

test("single transform", () => {
    const transform = new Transform([
        { fn: "translateX", args: [new Length(13, "px")] }
    ]);

    expect(transform.getValue({ densityDivisor: 1 })).toBe("translateX(13px)");
});

test("multiple filters", () => {
    const transform = new Transform([
        { fn: "translateX", args: [new Length(13, "px")] },
        { fn: "scaleY", args: [new Scalar(0.3)] }
    ]);

    expect(transform.getValue({ densityDivisor: 1 })).toBe("translateX(13px) scaleY(0.3)");
});

test("equality check", () => {
    const transform = new Transform([
        { fn: "translateX", args: [new Length(13, "px")] }
    ]);
    const other = new Transform([
        { fn: "translateX", args: [new Length(13, "px")] }
    ]);

    expect(transform.equals(other)).toBe(true);
});

test("equality check (different filters)", () => {
    const transform = new Transform([
        { fn: "translateX", args: [new Length(13, "px")] },
        { fn: "scaleY", args: [new Scalar(0.3)] }
    ]);
    const other = new Transform([
        { fn: "translateX", args: [new Length(13, "px")] }
    ]);

    expect(transform.equals(other)).toBe(false);
});

test("equality check (same filters in differing order)", () => {
    const transform = new Transform([
        { fn: "translateX", args: [new Length(13, "px")] },
        { fn: "scaleY", args: [new Scalar(0.3)] }
    ]);
    const other = new Transform([
        { fn: "scaleY", args: [new Scalar(0.3)] },
        { fn: "translateX", args: [new Length(13, "px")] }
    ]);

    expect(transform.equals(other)).toBe(true);
});