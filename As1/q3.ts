type Circle = {
    kind: "circle";
    radius: number;
};

type Rectangle = {
    kind: "rectangle";
    width: number;
    height: number;
};

// Create a type Shape that contains the properties of either Circle or Rectangle
type Shape = Circle | Rectangle

// Create a function calculateArea that takes a Shape as a parameter and returns its area
function calculateArea (input: Shape): number {
    if (input.kind === "circle") {
        return Math.PI*input.radius**2;
    } else {
        return input.height * input.width
    }
}

// Test cases, do not modify
const circle: Shape = { kind: "circle", radius: 5 };
const rectangle: Shape = { kind: "rectangle", width: 4, height: 6 };
console.log(calculateArea(circle));
console.log(calculateArea(rectangle));