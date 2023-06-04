# import colorgram

# colors = colorgram.extract('Day18 - hirst painting/image.jpg', 30)
# rgb_colors = []
# for color in colors:
#     r = color.rgb.r
#     g = color.rgb.g
#     b = color.rgb.b
#     new_color = (r, g, b)
#     rgb_colors.append(new_color)
# print(rgb_colors)

import turtle as ttl
import random

color_list = [(202, 164, 110), (149, 75, 50), (222, 201, 136), (53, 93, 123), (170, 154, 41), (138, 31, 20), (134, 163, 184), (197, 92, 73), (47, 121, 86), (73, 43, 35), (145, 178, 149), (14, 98, 70), (232, 176, 165), (160, 142, 158), (54, 45, 50), (101, 75, 77), (183, 205, 171), (36, 60, 74), (19, 86, 89), (82, 148, 129), (147, 17, 19), (27, 68, 102), (12, 70, 64), (107, 127, 153), (176, 192, 208), (168, 99, 102)]

ttl.colormode(255)
tim = ttl.Turtle()
tim.speed("fastest")
tim.penup()
tim.hideturtle()

y=50
i=0
for x in range(0, 100):
    tim.dot(20, random.choice(color_list))
    tim.forward(50)
    i+=1
    if i == 10:
        tim.goto(0, y)
        i = 0
        y+=50
        if y == 550:
            break


screen = ttl.Screen()
screen.exitonclick()
