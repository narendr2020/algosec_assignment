(function(){
  function validatorFactory(){
    const defaultValidWords = ['I','have','a', 'car'];
    let wordsMap = new Map();
    
    const setValidWords = function(){
      defaultValidWords.forEach((function(data){
        wordsMap.set(data,1)
      }));
    };

    const getValidWords = function(){ // Returns the List of all valid words 
      return defaultValidWords;
    };

    const validWord = function(word){
        return wordsMap.get(word)
    }

    const validateScrambleWords = function(str1 , str2){ // Validate scrambled words
      let mp = new Map();
      const isScrambledString = function(str1,str2){ 
             // Checking length of str1 and str2 if not same then not a scrambled
              if (str1.length != str2.length) {
                  return false;
              }

              let n = str1.length;

              // Checking string length if string length 0 then this is scrambled
              if (n == 0) {
                  return true;
              }

              // Comparing both strings if both strings are equal then its scarmbled
              if (str1 == str2) {
                  return true;
              }
              // Check for the condition of anagram
              let str1Copy = str1, str2Copy = str2;
              let t1 = str1Copy.split('')
              let t2 = str2Copy.split('')
              t1.sort();
              t2.sort();
              str1Copy = t1.join("");
              str2Copy = t2.join("");

              // Shorting and comparing
              if (str1Copy != str2Copy) {
                  return false;
              }

              // make key of type string for search in map
              let key = (str1 + " " + str2);
              // checking if both string are before calculated or not
              // if calculated means find in map then return it's
              // value
              if (mp.has(key)) {
                  return mp[key];
              }

              // declaring flag variable to store result
              let flag = false;

              for (let i = 1; i < n; i++) {

                  // Check if str2[0...i] is a scrambled
                  // string of str1[0...i] and if str2[i+1...n]
                  // is a scrambled string of str1[i+1...n]
                  if (isScrambledString(str1.substring(0, i), str2.substring(0, i))
                      && isScrambledString(str1.substring(i, n),
                                    str2.substring(i, n))) {
                      flag = true;
                      return true;
                  }

                  // Check if str2[0...i] is a scrambled
                  // string of str1[n-i...n] and str2[i+1...n]
                  // is a scramble string of str1[0...n-i-1]
                  if (isScrambledString(str1.substring(0, i), str2.substring(n - i, n))
                      && isScrambledString(str1.substring(i, n),
                                    str2.substring(0, n - i))) {
                      flag = true;
                      return true;
                  }
              }

              // add key & flag value to map (store for future use)
              // so next time no required to calculate it again
              mp[key] = flag;

              // If none of the above conditions are satisfied
              return false;
          }
       return isScrambledString(str1 , str2);   
    };

    const validateScrambledLongText = function(longString){
         let wordList = longString.split(" ") // Converting string into arrayList by spliting on spaces
         let result = false; 
         for(let i=0;i<wordList.length;i++){ // Looping through all words in given sentence
            try {
                wordsMap.forEach(function(val,key){ // Looping through all valid words in defaultValidWords
                 result = validateScrambleWords(key,wordList[i]) // Validating if the word is scrambled 
                 if(result){
                       throw new Error(); // If result is true Break the loop and exit for next word in given sentenc
                  }
              })
            }
            catch (e) {}
            
             if(!result){
                 result = false;
                 break; // If not valid scrambled word return false from here and break loop
             }
         }

         return  result;
    }

    // 
    const validateStringWithNoSpace = function(string){
       const result = string.split('').reduce(function (prev, cur) {
          var value = (prev.temp) ? prev.temp + cur : cur,
            found = validWord(value); // Checking if the concatenated string is valid or not
          if (found) { // if valid string, push word in words[] 
              prev.words.push(value);
              prev.temp = ''; // Resetting  back to empty string
          } else {
              prev.temp = prev.temp + cur;
          }
          return prev;
      }, { words: [], temp: ''});
      return result.words.join('').length === string.length; // Finally checking the originalString with newString with valid words
    };

    setValidWords();

    return {
      getValidWords,
      validateScrambleWords,
      validateScrambledLongText,
      validateStringWithNoSpace
    }

  }

  let validator = validatorFactory();
  // Get List of valid words
  console.log('List of valid words',validator.getValidWords());
  
  // #1 Unit Test Case 1 : Validate Non scarmbled sentance i.e. 'I have a car'
  console.log('Validate Non scarmbled sentence',validator.validateScrambledLongText('I have a car')); // Returns True
  
  // #2 Unit Test Case 1 : Validate  scarmbled sentance i.e. 'I hvae a cra'
  console.log('Validate  scarmbled sentance',validator.validateScrambledLongText('I hvae a cra')); // Returns True
  
  // #3 Unit Test Case 1 : Validate  invalid scarmbled sentance i.e. 'Ih ave aacr'
  console.log('Validate  invalid scarmbled sentence',validator.validateScrambledLongText('Ih ave aacr')); // Returns False
  
  // #4 Unit Test Case 1 : Validate  invalid scarmbled sentance i.e. 'I mgv'
  console.log('Validate  invalid scarmbled sentence',validator.validateScrambledLongText('I mgv')); // Returns False
  
  // #5 Test Case 2 : Sentence has no spaces between the words - Valid case i.e. 'Ihaveacar'
  console.log('Validate  Sentence with no spaces (valid case)',validator.validateStringWithNoSpace('Ihaveacar')); // Returs True
  
  // #6 Test Case 2 : Sentence has no spaces between the words - InValid case i.e. 'Ihaveacat'
  console.log('Validate Sentence with no spaces (invalid case)',validator.validateStringWithNoSpace('Ihaveacat')); // Returs False
 
}());