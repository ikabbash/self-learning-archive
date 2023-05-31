package main

import (
	"fmt"
	"math"
)

// s is the variable name
func sayGreeting(s string) {
	fmt.Printf("Hello %v \n", s)
}

// name type slice, functions can also be passed in as arguments
// the f function must take a string
func cycleNames(name []string, passed_function func(string)) {
	for _, v := range name {
		// the passed function must take a string
		passed_function(v)
	}
}

// what's written next to the function is the return type
// otherwise the return would result in an error without it
func circleArea(radius float64) float64 {
	return math.Pi * radius * radius
}

func main() {
	cycleNames([]string{"hambola", "hamboksha", "hamada"}, sayGreeting)
	area1 := circleArea(5)
	fmt.Printf("%0.3F",area1)
}