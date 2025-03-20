# Reverse list using another list and a for loop
def reverse21(T):
    Z = []
    for i in T:
        Z.append(T[-i])
    return Z

####################################


def reverse(nums):
    start_index = 0
    end_index = len(nums)-1  # -1 so it doesn't go out of range

    while end_index > start_index:
        #
        nums[start_index], nums[end_index] = nums[end_index], nums[start_index]
        start_index = start_index + 1
        end_index = end_index - 1
    return nums

####################################

# Reverse through slicing


def reverseList(A):
    print(A[::-1])

####################################


if __name__ == '__main__':

    A = [1, 2, 3, 4, 5, 6]

    print(reverse21(A))
    print(reverse(A))
    reverseList(A)  # Why isn't this working????
