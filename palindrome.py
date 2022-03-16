str1 = "madam"
str2 = "hello"
num = 1234


def palindrome1(str):

    if str == str[::-1]:
        return True
    return False

###############################


def reverse(data):
    # Convert data to a list so we can iterate through it
    data = list(data)
    start_index = 0
    end_index = len(data)-1

    while end_index > start_index:
        data[start_index], data[end_index] = data[end_index], data[start_index]
        start_index = start_index + 1
        end_index = end_index - 1

    # The Data is a list type, we joined it with a string to convert it to a string
    return ''.join(data)


def palindrome2(str):
    reversed = reverse(str)
    if str == reversed:
        return True
    return False


print(palindrome1(num))
print(palindrome2(str1))
