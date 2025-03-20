package main

// more concise
import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

// if you hovered over reader in createBill its a pointer
func getInput (prompt string, reader * bufio.Reader) (string, error) {
	fmt.Print(prompt)
	input, err := reader.ReadString('\n')

	return strings.TrimSpace(input), err
}

func createBill() bill {
	// reader is a pointer
	reader := bufio.NewReader(os.Stdin)
	// much better than the one in main.go
	name, _ := getInput("Create a new bill name: ", reader)

	fmt.Print("Create a new bill name: ")
	name = strings.TrimSpace(name)
	// assign with the object
	b := newBill(name)
	fmt.Println("Created the bill - ", b.name)
	return b
}

func promptOptions(b bill) {
	reader := bufio.NewReader(os.Stdin)
	opt, _ := getInput("Choose option (a - add item, s - save bill, t - add tip) ", reader)
	fmt.Println(opt)

}

func main() {
	mybill := createBill()
	promptOptions(mybill)
	fmt.Println(mybill)
}