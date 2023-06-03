package main

import "fmt"

// structs pointers are automatically dereferenced
type bill struct {
	name  string
	items map[string]float64
	tip   float64
}

// make new bills
func newBill(name string) bill {
	b := bill{
		name:  name,
		// values will be added using pointers
		items: map[string]float64{},
		tip:   0,
	}
	return b
}

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

	formatted_string += fmt.Sprintf("%-25v ...$%0.2F \n", "tip:", b.tip)
	
	// string total is substituted at %-25v, then the total value is at the %0.2F
	formatted_string += fmt.Sprintf("%-25v ...$%0.2F \n", "total:", total+b.tip)
	return formatted_string
}

// update tip
func (b *bill) updateTip(tip float64) {
	// to dereference: (*b). but Go already dereferences automatically
	b.tip = tip
}

// add an item to the bill using pointer
// note: instead of making copies of value pass pointers for memory efficiency
func (b *bill) addItem(name string, price float64) {
	b.items[name] = price
}