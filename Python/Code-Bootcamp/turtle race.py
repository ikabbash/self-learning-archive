from turtle import Turtle, Screen
import random

screen = Screen()
screen.setup(500, 400)
user_bet = screen.textinput(title="Make your bet", prompt="Which turtle will win? Enter a color: ")
colors = ["red", "blue", "orange", "violet", "green"]
y_positions = [-70, -40, -10, 20, 50]
turtles = []

for ttl_index in range(0,5):
    ttl = Turtle(shape="turtle")
    ttl.penup()
    ttl.color(colors[ttl_index])
    ttl.goto(-230, y_positions[ttl_index])
    turtles.append(ttl)

race = True
if user_bet:
    race = True

while race:
    for turtle in turtles:
        if turtle.xcor() > 230:
            race = False
            winning_color = turtle.pencolor()
            if winning_color == user_bet:
                print("You've won")
            else:
                print("You've lost")
        rand_distance = random.randint(0, 10)
        turtle.forward(rand_distance)

screen.exitonclick()
