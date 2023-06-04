import random
from data import data


# print(data[1].get('name')) this outputs Cristiano Ronaldo
score = 0

def game():
    
    win_or_lose = True
    global score
    a = random.choice(data)
    b = random.choice(data)
    #print(f"Name: {a.get('name')}\tDescription: {a.get('description')}\tFrom: {a.get('country')}")

    while win_or_lose:

        print(f"Name: {a.get('name')}\nDescription: {a.get('description')}\nFrom: {a.get('country')}")
        print("VS")
        print(f"Name: {b.get('name')}\nDescription: {b.get('description')}\nFrom: {b.get('country')}\n")

        guess = input("Which has more followers? Type 'A' or 'B'\n")

        a_account = int(a.get('follower_count'))
        b_account = int(b.get('follower_count'))

        if a_account > b_account:
            answer = "A"
        else:
            answer = "B"
        
        if guess.capitalize() == answer:
            score+=1
            print(f"Correct, score is now {score}\n")
            a = b
            b = random.choice(data)
        else:
            win_or_lose = False
            print(f"Incorrect, exiting game with score: {score}")

game()
