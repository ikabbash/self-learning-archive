package main

import "fmt"

func updateName(x string) string {
	x = "wedge"
	return x
}

func updateMenu(y map[string]float64) {
	y["coffee"] = 2.99
}

func main() {
	// group A types -> strings, ints, bools, floats, arrays, structs
	// non-pointer wrapper values
	name := "tifa"

	// there has to be name = func() for value to be updated
	// here is passing by value
	// name could also be updated by reference using pointers without redeclaring it
	name = updateName(name)

	fmt.Println(name)

	// group B types -> slices, maps, functions
	// pointer wrapper values
	menu := map[string]float64{
		"pie":       5.95,
		"ice cream": 3.99,
	}

	// here is passing by reference, so group B is pass by reference
	// coffee is added to the list
	updateMenu(menu)
	fmt.Println(menu)
}