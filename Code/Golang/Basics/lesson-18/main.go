package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func createBill() bill {
	// NewReader to read information
	// Stdin meaning the terminal
	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Create a new bill name: ")
	// originally its name, err, the method used returns multiple values
	// means we want to read after pressing a specific character, this case is the enter button
	name, _ := reader.ReadString('\n')
	// delete any empty space
	name = strings.TrimSpace(name)

	// assign with the object
	b := newBill(name)
	fmt.Println("Created the bill - ", b.name)
	return b
}

func main() {
	mybill := createBill()
	fmt.Println(mybill)
}