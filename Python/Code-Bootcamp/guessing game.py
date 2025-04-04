import random

answer = random.randint(1,100)
attempts = 0

#print(f"Psst, the answer is: {answer}")

def check(guess):
    global attempts
    if guess == answer:
        print(f"Correct! {answer} is the answer!")
        exit(1)
    elif guess < answer and attempts != 0:
        attempts -= 1
        print(f"Too low, {attempts} attempts left!")
    elif guess > answer and attempts != 0:
        attempts -= 1
        print(f"Too high, {attempts} attempts left!")
    elif attempts == 0:
        print("You are out of attempts, you lost :(")
    else:
        print(f"Invalid input, {attempts} attempts left!")

def difficulty():
    global attempts
    difficulty = input("Welcome to the guessing game!\ntype 'easy' or 'hard' for difficulty: ")
    if difficulty == "hard":
        attempts = 5
        print(f"You have {attempts} attempts!")
    elif difficulty == "easy":
        attempts = 10
        print(f"You have {attempts} attempts!")
    else:
        print("Wrong input")
        exit(1)

def game():
    guess = int(input("Guess the number: "))
    check(guess)
    game()

difficulty()
game()
