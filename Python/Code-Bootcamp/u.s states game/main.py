import csv

with open("Day25 - U.S States Game/weather_data.csv") as data_file:
    data = csv.reader(data_file)
    temperatures = []

    for row in data:
        temperatures.append(row[1])

print(temperatures)
