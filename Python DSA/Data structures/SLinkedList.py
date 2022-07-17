from cgi import print_environ, print_environ_usage
from dataclasses import dataclass
from os import link

class Node:
    def __init__(self, data):
        self.data = data
        self.nextNode = None # At the beginning there's none


class LinkedList:
    def __init__(self):
        # first node of the Linked list
        self.head = None # Linked list is empty at the beginning
        self.numOfNodes = 0 # No items in the Linked List
    
    # complexity O(1)
    def insert_start(self, data):
        self.numOfNodes += 1 ###
        # instantiate
        new_node = Node(data)
        if not self.head: # There is no head which's None
            self.head = new_node
        else: # Linked list is not empty, insert next
            new_node.nextNode = self.head
            self.head = new_node # the head
    # EXAMPLE: we first insert 10, then 10 would point towards null which's None, 10 is the first node
    # Then we insert 4, 4 is the new head node, and going to point to node 10

    # complexity O(n), linear
    def insert_end(self, data):
        self.numOfNodes += 1
        new_node = Node(data)

        actual_node = self.head # the beginning
        while actual_node.nextNode is not None:
            # iterate from head node till the next node is null then that's the end
            actual_node = actual_node.nextNode
        actual_node.nextNode = new_node # then instantiate
    
    # O(1)
    def size_of_list(self):
        return self.numOfNodes
    
    # print all nodes, O(n)
    def traverse(self):
        # store reference
        actual_node = self.head
        while actual_node is not None:
            # print(actual_node) prints hex location
            print(actual_node.data)
            actual_node = actual_node.nextNode
    
    def remove(self, data):
        # Linked list is empty, doesn't contain any items
        if self.head is None:
            return
        
        # pointer at the beginning
        actual_node = self.head
        previous_node = None # null <- node -> null

        # the loop will stop when the actual node detects the data then it stores the data
        while actual_node is not None and actual_node.data != data:
            previous_node = actual_node
            actual_node = actual_node.nextNode
        
        # item is not in the list
        if actual_node is None:
            return
        
        # update number of nodes
        self.numOfNodes -= 1
        
        # the target is in the head node, remove
        if previous_node is None:
            self.head = actual_node.nextNode # new head is the next node
        else:
            # remove and update the reference
            previous_node.nextNode = actual_node.nextNode
        # EXAMPLE: 10 -> -7 -> 12 -> null
        # target: 12, previous node: -7, therefore: 10 -> -7 -> null


    # additional notes: main concept of the single linked lists is the head node

    #                       Linked list         Array
    # search                    O(n)             O(1)
    # insert at start           O(1)             O(n)
    # insert at end             O(n)             O(n)
    # waste of space            O(n)              0

    # applications: low level memory management (like in C)
    # ALT+Tab in windows, photo viewer, blockchains

#_________________________________________________________________________________________#

linkedlist = LinkedList()
linkedlist.insert_start(4)
linkedlist.insert_start(3)
linkedlist.insert_start(7)
linkedlist.insert_end(10)

linkedlist.remove(7)
linkedlist.traverse()
print("number of nodes are: ", linkedlist.size_of_list())