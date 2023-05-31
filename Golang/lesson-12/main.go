package main

import (
	"fmt"
)

func main() {
	// maps are a data type, between Python's dictionaries and Javascript's JSON
	// all the keys in a single map must have the same type so all the values
	// there could be a map where keys are all integers and values are all strings
	
	// all keys will be string, all values will be float64
	menu := map[string]float64 {
		"soup": 4.99,
		"pie": 7.99,
		"salad": 6.99, // comma must be included in last key
	}

	fmt.Println(menu)
	fmt.Println(menu["pie"])

	// looping maps
	for key, value := range menu {
		fmt.Println(key, "-", value)
	}

	// ints as key type
	phonebook := map[int]string{
		19875139: "hambola",
		68729311: "hamboksha",
		11823501: "hamada",
	}
	fmt.Println(phonebook)
	fmt.Println(phonebook[19875139])

	// updating item inside map
	phonebook[68729311] = "harambe"
	// if added any other type than string will result in error
	fmt.Println(phonebook)

	// NOTE: if you noticed the keys printed are sorted from lowest to highest
	// its because in Go 1.12+ the keys are sorted automatically 
	// it allows the testing of map values easily.

}