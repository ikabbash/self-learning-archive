package main

import "fmt"

func main() {
	age := 24
	fmt.Print("By the time I'm writing this, I'm \n", age, " years old.")
	fmt.Println(" Don't mind me just another line")

	// formatting strings (Printf)
	fmt.Printf("Age is put %v here instead, maybe here %v too.\n", age, age)
	// %q puts quotes around the variable, only for strings
	// %T prints the type of the variable
	// %f to output floats, to round it: %0.1f

	// save formatted strings
	var str = fmt.Sprintf("Oh look, the number is %v again", age)
	fmt.Print("The saved str: ", str)
}