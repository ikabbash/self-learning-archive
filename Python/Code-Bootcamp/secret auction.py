# travel_log = [
#     {
#         "country": "France",
#         "visits": 12,
#         "cities": ["Paris", "Lille", "Dijon"]
#     },
#     {
#         "country": "Germany",
#         "visits": 5,
#         "cities": ["Berlin", "Hamburg", "Stuttgart"]
#     },
# ]
# # 🚨 Do NOT change the code above

# # TODO: Write the function that will allow new countries
# # to be added to the travel_log. 👇


# def add_new_country(name, visit_count, cities_visited):
#     # Mistake: don't try to shove data directly or connect directly, you always need a WAY to put things into.
#     new_country = {}
#     new_country["country"] = name
#     new_country["visits"] = visit_count
#     new_country["cities"] = cities_visited
#     travel_log.append(new_country)


# add_new_country("Russia", 2, ["Moscow", "Saint Petersburg"])

# print(travel_log)

logo = '''
                         ___________
                         \         /
                          )_______(
                          |"""""""|_.-._,.---------.,_.-._
                          |       | | |               | | ''-.
                          |       |_| |_             _| |_..-'
                          |_______| '-' `'---------'` '-'
                          )"""""""(
                         /_________\\
                       .-------------.
                      /_______________\\
'''
print(logo)
print("\n\n Welcome to the secret auction house, place your bids!\n\n")

bids = {}
bidding_flag = False

while bidding_flag == False:
    Name = input("Bidder's name: ")
    Bid = int(input("Bidder's price: $ "))

    bids[Name] = Bid

    flag = input("Is there another bidder? (type yes or no) ")
    if flag == "yes":
        bidding_flag = False
        # clear()
    else:
        bidding_flag = True

highest = 0
for key in bids:
    if bids[key] > highest:
        highest = bids[key]
        winner = key
print(f"And the bid winner is: {winner} with {highest}$")
