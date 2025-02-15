// assuming test case gives the correct key sequence
function getNestedValue(obj: any, key: string): unknown {
    // Implement the function here
    // Use type guards to check if obj is an object and has the key
    // Use type assertion if necessary
    
    // Step 1: Check if obj is a non-null object
    if (typeof obj !== "object" || obj === null) {
    return undefined;
    }

    // Step 2: Split the key string into an array of keys
    const keys = key.split(".");

    // Step 3: Initialize result with obj and traverse
    let result: any = obj;

    for (const k of keys) {
    // Step 4: Check if result is an object and contains the key
    if (typeof result === "object" && result !== null && k in result) {
        result = result[k]; // Move deeper into the object
    } else {
        return undefined; 
    }
    }

    // Step 5: Return the found value
    return result;
}

// Test cases, do not modify
const testObj = { a: { b: { c: 42 } } };
console.log(getNestedValue(testObj, "a.b.c")); // Should print: 42
console.log(getNestedValue(testObj, "x.y.z")); // Should print: undefined
console.log(getNestedValue(null, "a.b.c")); // Should print: undefined

  