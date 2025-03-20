from turtle import Turtle
ALIGN = "center"
FONT = ("Courier", 80, "normal")
class ScoreBoard(Turtle):

    def __init__(self):
        super().__init__()
        self.lscore = 0
        self.rscore = 0
        self.color("white")
        self.penup()
        self.hideturtle()
        self.update_scoreboard()

    def l_point(self):
        self.lscore += 1
        self.update_scoreboard()

    def r_point(self):
        self.rscore += 1
        self.update_scoreboard()

    def update_scoreboard(self):
        self.clear()
        self.goto(-100, 200)
        self.write(self.lscore, align=ALIGN, font=FONT)
        self.goto(100, 200)
        self.write(self.rscore, align=ALIGN, font=FONT)
