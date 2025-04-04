package main

// variables must be used, otherwise an error is triggered
import "fmt"

func main() {
	// string
	var nameOne string = "Hello"
	// string can also be defined this way
	var nameTwo = "World"
	// for future use, doesn't have a value
	var nameThree string
	fmt.Println(nameOne, nameTwo, nameThree);

	// another way to declare variable
	// can't be used outside of the function
	nameFour := "Short hand version"
	fmt.Println(nameFour)

	// integers
	var intOne int = 21
	var intTwo = 24
	intThree := 30
	fmt.Println(intOne, intTwo, intThree)

	// bits and memory
	// imagine it like binary, int8 can't take more than 128
	var numOne int8 = 127
	// uint numbers can't be negative
	// uint8 can go up to 255 because it doesn't include negative numbers
	var numTwo uint8 = 255
	fmt.Println(numOne, numTwo)

	// for floats, bit sizes have to be defined
	var floatOne float32 = 255524678213455555555555.55555
	// float64 is used for the most time because it has higher precision
	fmt.Println(floatOne)
	// when doing short hand variables for floats, by default its float64
}