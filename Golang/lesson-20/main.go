package main

// more concise
import (
	"bufio"
	"fmt"
	"os"
	"strconv"
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
	
	// if opt's value is a, s, t, or none of the above
	switch opt {
	case "a":
		name, _ := getInput("Item name: ", reader)
		price, _ := getInput("Item price: ", reader)
		// when passing to bill.go the strings need to be converted to float
		// second argument is float64. If the string has text error will trigger
		price_float, err := strconv.ParseFloat(price, 64)
		if err != nil {
			fmt.Println("The price must be a number")
			promptOptions(b)
		}
		b.addItem(name, price_float)
		fmt.Println("Item added - ", name, price)
		promptOptions(b)
	
	case "s":
		fmt.Println("You chose save the bill ", b)
	
	case "t":
		tip, _ := getInput("Enter tip amount ($): ", reader)
		tip_float, err := strconv.ParseFloat(tip, 64)
		if err != nil {
			fmt.Println("The tip must be a number")
			promptOptions(b)
		}
		b.updateTip(tip_float)
		fmt.Println("Tip added - ", tip)
		promptOptions(b)
	
	default:
		fmt.Println("Invalid option. ")
		// recursive
		promptOptions(b)
	}

}

func main() {
	mybill := createBill()
	promptOptions(mybill)
	//fmt.Println(mybill)
}