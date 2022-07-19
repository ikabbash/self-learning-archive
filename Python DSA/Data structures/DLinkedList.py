# Difference: there's a tail node and in SLinkedList
# whenever inserting new node has to be at the beginning

class Node:
    def __init__(self, data):
        self.data = data
        # pointers / references
        self.next = None
        self.previous = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def insert_end(self, data):
        new_node = Node(data)
        # list is empty
        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.previous = self.tail
            self.tail.next = new_node
            # update the tail node to be the new node
            self.tail = new_node
    
    
    def traverse_forward(self):
        actual_node = self.head
        while actual_node is not None:
            print(actual_node.data)
            actual_node = actual_node.next
    
    def traverse_backward(self):
        actual_node = self.tail
        while actual_node is not None:
            print(actual_node.data)
            actual_node = actual_node.previous


    # def insert_beginning(self, data):
    #     new_node = Node(data)
    #     # list is empty
    #     if self.head is None:
    #         self.head = new_node
    #         self.tail = new_node
    #     else:
    #         new_node.next = self.head
    #         self.head.next = new_node
    #         # update the tail node to be the new node
    #         self.head = new_node

#_________________________________________________________________________________________#

dlist = DoublyLinkedList()
dlist.insert_end(10)
dlist.insert_end(21)
dlist.insert_end("Adam")
dlist.insert_end(True)

dlist.traverse_forward()

# print("-----------\n")

# dlist.insert_beginning("Test")
# dlist.traverse_forward()