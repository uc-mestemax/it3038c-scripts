print ('')
print ('')
print ('**********Letter Counter**********')
print ('**********Alex Mestemaker**********')
print ('Welcome to the letter counter program!')
print ('')
theWord=input('Give me a SINGLE string to count the number of total letters, vowels, and consonants are in that word: ')

#Here I declared the list of vowels and consonants to later be used in the for loop to check for the number of times they appear.
vowels=['a', 'e', 'i', 'o', 'u']
consonants=['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z']
# I declared the variable for the number of characters 
numberOfVowels = 0
numberOfConsonants = 0
totalNumberOfLetters = 0
counter = 0
letters = 0


#If the word has spaces, the program yells at the user telling them it won't continue until it's a single word.
for letters in theWord:
        if letters == ' ':
            print ('This word has a space in it, please try again')
            theWord=list(input('Give me a SINGLE string to count the number of total letters, vowels, and consonants are in that word: '))
print(' ')
counter = 0 #resets the counter back to 0

# This is the second step to the problem, now that I have the word inputted, I use a for loop to go through every iteration (each letter) of the word, and checks for the total number of vowels.
while counter < 5:
    for letters in theWord:
        if letters == vowels[counter]:
            numberOfVowels = numberOfVowels + 1
            #print('The number of vowels has just increased!') Essentially, if the if statement is true, the function found a vowel, and incremented the numberOfVowels.  
    counter = counter + 1 #The counter is used for the next position in vowels array, to check for the next vowel.
        
print('The total number of vowels is ' + str(numberOfVowels))
print(' ')
counter = 0 #resets the counter back to 0

#Lastly, I counted the number of consonants, which works exactly the same way as above
while counter < 21: #I added this because I found that otherwise it only went to the array position that is equal to the max length of the word, and it didn't go through the entire array.
    for letters in theWord:
        if letters == consonants[counter]:
            numberOfConsonants = numberOfConsonants + 1
            #print('The number of consonants has just increased!') Essentially, if the if statement is true, the function found a consonant, and incremented the numberOfConsonants.  
    counter = counter + 1 #The counter is used for the next position in consonants array, to check for the next consonant.

print('The total number of consonants is ' + str(numberOfConsonants))
print(' ')



