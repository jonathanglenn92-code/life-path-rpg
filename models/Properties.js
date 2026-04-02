// Properties.js

class Property {
    constructor(type, price, maintenanceCost, appreciationRate) {
        this.type = type;
        this.price = price;
        this.maintenanceCost = maintenanceCost;
        this.appreciationRate = appreciationRate;
    }

    calculateValue(years) {
        return this.price * Math.pow((1 + this.appreciationRate), years);
    }
}

class House extends Property {
    constructor(price, maintenanceCost, appreciationRate) {
        super('House', price, maintenanceCost, appreciationRate);
    }
}

class Car extends Property {
    constructor(price, maintenanceCost, depreciationRate) {
        super('Car', price, maintenanceCost, -depreciationRate);
    }
}

class Business extends Property {
    constructor(price, maintenanceCost, appreciationRate) {
        super('Business', price, maintenanceCost, appreciationRate);
    }
}

// Example of usage:
const house = new House(300000, 1500, 0.03);
const car = new Car(20000, 500, 0.15);
const business = new Business(500000, 10000, 0.05);

console.log(house.calculateValue(5));  // Value after 5 years
console.log(car.calculateValue(5));     // Value after 5 years
console.log(business.calculateValue(5)); // Value after 5 years