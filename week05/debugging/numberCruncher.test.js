test('factors of 12', () => {
    expect(factorsOf(12)).toEqual([1,2,3,4,6,12]);
});

'use strict';

// function factorsOf(n) {
// const factors = [];
//     for (let i=1; i < n ; i++) {
//         if (n/i === Math.floor(n/i)){
//         factors.push(i);
//         }
// }
//     return factors;
// }

// function factorsOf(n) {
//     const factors = [];
//     for (let i=1; i <= n ; i++) { // change on this line
//         if (n/i === Math.floor(n/i)){
//         factors.push(i);
//         }
//     }
//     return factors;
// }

function factorsOf(n) {
    if(Number.isNaN(Number(n))) {
        throw new RangeError('Argument Error: Value must be an integer');
    }
    if(n < 0) {
        throw new RangeError('Argument Error: Number must be positive');
    }
    if(!Number.isInteger(n)) {
        throw new RangeError('Argument Error: Number must be an integer');
    }
    const factors = [];
    for (let i=1 , max = Math.sqrt(n); i <= max ; i++) {
        if (n%i === 0){
        factors.push(i,n/i);
        }
    }
    return factors.sort((a,b) => a - b);
}

test('2 is prime', () => {
    expect(isPrime(2)).toBe(true);
});

test('10 is not prime', () => {
    expect(isPrime(10)).not.toBe(true);
});

function isPrime(n) {
    try{
        return factorsOf(n).length === 2;
    } catch(error) {
        return false;
    }
    }

    it('should throw an exception for non-numerical data', () => {
        expect(factorsOf('twelve').toThrow();
    });
    
    it('should throw an exception for negative numbers', () => {
        expect(() => factorsOf(-2)).toThrow();
    });
    
    it('should throw an exception for non-integer numbers', () => {
        expect(() => factorsOf(3.14159)).toThrow();
    });

    test('non-numerical data returns not prime', () => {
        expect(isPrime('two')).toBe(false);
    });
    
    test('non-integer numbers return not prime', () => {
        expect(isPrime(1.2)).toBe(false);
    });
    
    test('negative numbers return not prime', () => {
        expect(isPrime(-1)).toBe(false);
    });


