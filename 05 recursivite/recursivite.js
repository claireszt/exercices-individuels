const sum1 = (array) => {
    return array.reduce((a,b) => a+b, 0)
}


const sum2 = (array) => {
    if (array.length > 0) {
        return (array[0] + sum2(array.slice(1, array.length)))
    }
    else {
        return 0
    }
}

// const f = (...) => {
//     if (...)
//       f()
//     else
//       ...
// }

// sum1:
//   | [] -> acc = 0
//   | head :: tail -> (acc + head) + sum1(tail)

const factorial = (num) => {
    if (num === 0) {
        return 1
    }
    else {
        return num * factorial(num-1)
    }
}

const fibonacci = (x) => {
    if (x < 2) {
        return x
    }
    else {
        return fibonacci(x-1) + fibonacci(x-2)
    }
}


let numbers = [3]

// etape 1
console.log(sum1(numbers))
// etape 2
console.log(sum2(numbers))
// etape 3
console.log(factorial(3));
// etape 4
console.log(fibonacci(2))