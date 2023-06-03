package main

// type keyword in Go is the base interface for all data types in Go
// can be used for structs, interface, or even function
type bill struct {
	name  string
	items map[string]float64
	tip   float64
}

// example of type keyword
// type reworded_int int
// var x reworded_int = 10

// make new bills
func newBill(name string) bill {
	b := bill{
		// the name gets changed due to the passed argument
		// the items and tip are hardcoded to 0
		name:  name,
		// the curly braces are empty map
		items: map[string]float64{},
		tip:   0,
	}
	return b
}