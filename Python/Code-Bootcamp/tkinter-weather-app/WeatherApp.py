import tkinter as tk
from typing import Text
from tkinter import *
from PIL import ImageTk, Image
import requests

HEIGHT = 400
WIDTH = 500
# api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}


def format_response(weather):
    try:
        name = weather['name']
        desc = weather['weather'][0]['description']
        temp = weather['main']['temp']

        final_str = str(name) + '\n' + str(desc) + '\n' + str(temp) + ' °C'
    except:
        final_str = 'There was a problem retrieving that information.'
    return final_str


def get_weather(city):
    weather_key = '61487d15854798837c17c24968c4084d'
    url = 'https://api.openweathermap.org/data/2.5/weather'
    params = {'APPID': weather_key, 'q': city, 'units': 'metric'}
    response = requests.get(url, params=params)
    weather = response.json()
    label['text'] = format_response(weather)


# Anything that we put in the app will be run between these two lines of code
root = tk.Tk()

# 5th, we created a canva that'll be in the root
canvas = tk.Canvas(root, height=HEIGHT, width=WIDTH)
canvas.pack()

img = ImageTk.PhotoImage(Image.open(
    "Python-Tkinter-Weather-App\landscape.png"))
background_label = tk.Label(root, image=img)
background_label.place(relwidth=1, relheight=1)

# 6th, a frame inside the canva
frame = tk.Frame(root, bg='lightgreen', bd=3)
frame.place(relx=0.5, rely=0.1, relwidth=0.75, relheight=0.1, anchor='n')
# relative x and relative y to center the frame, anchor='n' to set it in the middle

entry = tk.Entry(frame, bg='lightgray', font=40)
entry.place(relwidth=0.65, relheight=1)

button = tk.Button(frame, text="Get weather",
                   bg='crimson', command=lambda: get_weather(entry.get()))
# lambda is a inline function to store in memory while running to avoid missing input and get the current state
button.place(relx=0.7, relheight=1, relwidth=0.3)

lower_frame = tk.Frame(root, bg='lightgreen', bd=6)  # create another frame
lower_frame.place(relx=0.5, rely=0.25, relheight=0.6,
                  relwidth=0.75, anchor='n')

label = tk.Label(lower_frame, font=50)
label.place(relwidth=1, relheight=1)

root.mainloop()
# Anything that we put in the app will be run between these two lines of code
