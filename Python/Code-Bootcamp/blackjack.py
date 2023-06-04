import random

from sympy import true

logo = """
.------.            _     _            _    _            _
|A_  _ |.          | |   | |          | |  (_)          | |
|( \/ ).-----.     | |__ | | __ _  ___| | ___  __ _  ___| | __
| \  /|K /\  |     | '_ \| |/ _` |/ __| |/ / |/ _` |/ __| |/ /
|  \/ | /  \ |     | |_) | | (_| | (__|   <| | (_| | (__|   <
`-----| \  / |     |_.__/|_|\__,_|\___|_|\_\ |\__,_|\___|_|\_\\
      |  \/ K|                            _/ |
      `------'                           |__/
"""
print(logo)


def deal_card():
    # returns a random card
    cards = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    card = random.choice(cards)
    return card


# Hint 5: Deal the user and computer 2 cards each using deal_card() and append().
user_cards = []
computer_cards = []

for i in range(2):  # each will have 2 cards
    user_cards.append(deal_card())
    computer_cards.append(deal_card())
# print(user_cards)
# print(sum(user_cards))

# Create a function called calculate_score()
def calculate_score(cards):
    if sum(cards) == 21 and len(cards) == 2:
        return 0
    
    if 11 in cards and sum(cards) > 21:
        cards.remove(11)
        cards.append(1)

    return sum(cards)

def compare(user_score, computer_score):
    if user_score == computer_score:
        print("Draw")
    elif computer_score == 0:
        print("Computer has blackjack")
    elif user_score == 0:
        print("You have blackjack")
    elif computer_score > 21:
        print("Computer went over 21, you win")
    elif user_score > 21:
        print("You went over 21, you lose")
    elif user_score > computer_score:
        print("You have higher score, you win")
    else:
        print("computer has higher score, you lose")


user_score = calculate_score(user_cards)
computer_score = calculate_score(computer_cards)
print(f"You have a score of: {user_score} would you like to draw? Type 'y' or 'n' ")

if input() == "y":
    user_cards.append(deal_card())
    user_score = calculate_score(user_cards)
    computer_score = calculate_score(computer_cards)
    print(f"Your score: {user_score}\nComputer score: {computer_score}\n")
    compare(user_score, computer_score)
else:
    user_score = calculate_score(user_cards)
    computer_score = calculate_score(computer_cards)
    print(f"Your score: {user_score}\nComputer score: {computer_score}\n")
    compare(user_score, computer_score)
