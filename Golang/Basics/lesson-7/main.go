package main

import (
	"fmt"
)

func main() {
	// loop #1, while loop
	x:= 0
	for x < 5 {
		fmt.Println("value of x in 1st loop is: ", x)
		x++
	}
	println("=======")

	// loop #2, declaring i
	for i := 0; i < 5; i++ {
		fmt.Println("value of i in 2nd loop is: ", i)
	}
	println("=======")

	// loop #3, cycle the string
	letters := []string{"a", "b", "c", "d"}
	for i := 0; i < len(letters); i++ {
		fmt.Println("3rd loop: ", letters[i])
	}
	println("=======")

	// loop #4, cycle through the string, similar to for in
	for index, value := range letters {
		// index must be used
		fmt.Printf("4th loop, index %v is %v\n", index, value)
	}
	// in case not wanting to use the index, replace it with _
	// for _, value := range letters {
	// 	// same can be appleid for value
	// 	fmt.Printf("4th loop, index is %v\n", value)
	// }
	println("=======")

	// loop #5 infinite loop
	// sum := 0
	// for {
	// 	sum ++
	// }
	// fmt.Println(sum) // never reached

	// NOTE: there are keywords such as break and continue for loops
}