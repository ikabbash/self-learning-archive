package main

import "fmt"

// NOTE: variable is copied when its passed as an argument
// func updateName(s_var string) {
// be sure to make the function accept pointers by adding * asterisk
	func updateName(s_var *string) {
	// without pointer it would be a local copy
	*s_var = "wedge"
}

func main() {
	// original value
	name := "tifa"

	// for the old function without pointer
	// updateName(name)
	// value will be updated
	updateName(&name)

	fmt.Println(name)

	// to get location of a variable is with & ampersand symbol
	fmt.Println("Memory address of name is: ", &name)

	// or store pointer LOCATION into a variable
	// although take note that memory_name itself has a memory adress
	// since its another variable now
	memory_name := &name
	fmt.Println(memory_name)
	// memory address of memory_name
	fmt.Println(&memory_name)
	// to get the value of a pointer, use * asterisk  symbol
	fmt.Println(*memory_name)


	// summary
	// asterisk is used to declare a pointer type and dereference a pointer
	// ampersand is used to obtain the memory address of a variable
}