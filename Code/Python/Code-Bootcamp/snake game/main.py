from snake import Snake
from turtle import Screen
import time
from food import Food
from scoreboard import ScoreBoard

screen = Screen()
screen.setup(600, 600)
screen.bgcolor("black")
screen.title("Sneeek")
screen.tracer(0)


snake = Snake()
food = Food()
scoreboard = ScoreBoard()

screen.listen()
screen.onkey(snake.up, "w")
screen.onkey(snake.left, "a")
screen.onkey(snake.down, "s")
screen.onkey(snake.right, "d")

game_is_on = True
while game_is_on:
    screen.update()
    time.sleep(0.1)
    snake.move()

    #Detect food collision
    if snake.head.distance(food) < 15:
        food.refresh()
        snake.extend()
        scoreboard.increase_score()
    #Detect wall collision
    if snake.head.xcor() > 280 or snake.head.xcor() < -280 or snake.head.ycor() > 280 or snake.head.ycor() < -280:
        #game_is_on = False
        scoreboard.reset()
        snake.reset()
    #Detect tail collision
    for segment in snake.segments[1:]: #trick to avoid colision when the 2nd segment goes into place of the 1st
        if snake.head.distance(segment) < 10:
            #game_is_on = False
            scoreboard.reset()
            snake.reset()


screen.exitonclick()
