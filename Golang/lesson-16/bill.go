package main

import "fmt"

type bill struct {
	name  string
	items map[string]float64
	tip   float64
}

// make new bills
func newBill(name string) bill {
	b := bill{
		name:  name,
		items: map[string]float64{"pie": 5.99, "cake": 3.99},
		tip:   0,
	}
	return b
}

// receiver function (receive the bill object with variable b)
// in the main.go you can define mybill.format() since the function
// is associated with the bill object
func (b bill) format() string {
	formatted_string := "Bill breakdown:\n"
	var total float64 = 0

	// list items
	for key, value := range b.items {
		// -25 are spaces
		// if its +25 the spaces would be to the left
		formatted_string += fmt.Sprintf("%-25v ...$%v \n", key+":", value)
		total += value
	}
	// string total is substituted at %-25v, then the total value is at the %0.2F
	formatted_string += fmt.Sprintf("%-25v ...$%0.2F", "total:", total)
	return formatted_string
}