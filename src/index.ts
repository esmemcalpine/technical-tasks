// npm run dev to run

/**
 * Check if the result for a given set of inputs is already cached.
 * If the result is found, return it.
 * Otherwise, calculate result, cache it, and return it.
*/

// takes in function of type T
// returns memoized version of it (decorater function)
const memoize = <T extends (...args: any[]) => any> (func: T): T => {
    const cache: Record<string, ReturnType<T>> = {};

    return ((...args: Parameters<T>): ReturnType<T> => {
      const key = args.toString();
      if (!(key in cache)) {
        cache[key] = func(...args);
      }
    //   console.log('cache: ',cache);
      return cache[key];
      
    }) as T;
};

// an expensive function call with one arg
const fibonacci = memoize((n: number): number => {
    if (n <= 1) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
});

// expensive call with more than one param/arg
const addNumbers = (num1: number, num2: number, num3: number) => {
    return num1 + num2 + num3;
}

// memoizing with multiple args
const memoAddNumbers = memoize(addNumbers);

console.log(memoAddNumbers(12,2,3));

console.log(fibonacci(5));
console.log(fibonacci(5));
console.log(fibonacci(15));



// convert numbers to roman numerals task
// works by subtracting  largest possible roman numeral value from the input num
// adds the equivalent roman numeral character to string until theres nothing left to subtract
const convertToRN = (number: number) => {

    // roman numerals can only go between 1 and 3999
    if (number < 1 || number > 3999) {
        return "Number must be a whole number between 1 and 3999";
    }

    // array of tuples
    // can't do record type since records expect the first element to be a string
    const romanNumerals: [number, string][] = [
        [1000, "M"],
        [900, "CM"],
        [500, "D"],
        [400, "CD"],
        [100, "C"],
        [90, "XC"],
        [50, "L"],
        [40, "XL"],
        [10, "X"],
        [9, "IX"],
        [5, "V"],
        [4, "IV"],
        [1, "I"],
    ];
    
    let result = "";
    let remaining = number;

    for (const [value, numeral] of romanNumerals) {
        while (remaining >= value) {
            result += numeral;
            remaining -= value;
        }
    }
    return result;
}

console.log(convertToRN(3999));
