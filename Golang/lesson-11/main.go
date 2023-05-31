package main

import (
	"fmt"
)

// if a variable is created here it can be used on the other program
// Don't declare the variable inside the main function or it won't be accessible

func main() {
	sayHello("there")
	for _, v := range points {
		fmt.Println(v)
	}
	// for the program to run the compiler has to run both programs
	// in the terminal type go run main.go greetings.go
}