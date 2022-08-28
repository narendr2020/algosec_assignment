# Algosec_assignment

# String Validator for scrambled text and string without space

`let validator = validatorFactory();`
`// Get List of valid words
console.log('List of valid words',validator.getValidWords());`

`// #1 Unit Test Case 1 : Validate Non scarmbled sentance i.e. 'I have a car'
console.log('Validate Non scarmbled sentence',validator.validateScrambledLongText('I have a car')); // Returns True`

`// #2 Unit Test Case 1 : Validate  scarmbled sentance i.e. 'I hvae a cra'
console.log('Validate  scarmbled sentance',validator.validateScrambledLongText('I hvae a cra')); // Returns True`

`// #3 Unit Test Case 1 : Validate  invalid scarmbled sentance i.e. 'Ih ave aacr'
console.log('Validate  invalid scarmbled sentence',validator.validateScrambledLongText('Ih ave aacr')); // Returns False`

`// #4 Unit Test Case 1 : Validate  invalid scarmbled sentance i.e. 'I mgv'
console.log('Validate  invalid scarmbled sentence',validator.validateScrambledLongText('I mgv')); // Returns False`

`// #5 Test Case 2 : Sentence has no spaces between the words - Valid case i.e. 'Ihaveacar'
console.log('Validate  Sentence with no spaces (valid case)',validator.validateStringWithNoSpace('Ihaveacar')); // Returs True`

`// #6 Test Case 2 : Sentence has no spaces between the words - InValid case i.e. 'Ihaveacat'
console.log('Validate Sentence with no spaces (invalid case)',validator.validateStringWithNoSpace('Ihaveacat')); // Returs False`
