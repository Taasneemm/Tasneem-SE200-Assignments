// Create the Car type
type Car = {
    make: string;
    model: string;
};

// Create the Electric type
type Electric = {
    batteryLife: number;
};

// Create the ElectricCar type
type ElectricCar = Car & Electric

// Create the printElectricCarInfo function
function printElectricCarInfo(inputParam: ElectricCar): void {
    console.log(`Make: ${inputParam.make}, Model: ${inputParam.model}, Battery Life: ${inputParam.batteryLife} miles`) 
}

// Test case, do not modify
const teslaModelS: ElectricCar = {
    make: "Tesla",
    model: "Model S",
    batteryLife: 400
};

printElectricCarInfo(teslaModelS); // "Make: Tesla, Model: Model S, Battery Life: 400 miles" 