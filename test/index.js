import {findCompletionContext} from "../src/helper_functions";

// TODO: learn testing in javscript
const test1 = findCompletionContext("sw", 2);
const test2 = findCompletionContext("sw ", 3);
const test3 = findCompletionContext("blabla s", 8);
const test4 = findCompletionContext("blabla()", 8);

console.log(
    test1 === "sw",
    test2 === "",
    test3 === "s",
    test4 === "",
);

