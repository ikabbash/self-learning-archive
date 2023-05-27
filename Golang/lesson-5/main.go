package main

import "fmt"

func main() {
	// array is curly braces, size is defined on both sides in square brackets
	// array length is fixed
	// var ages [3]int = [3]int{20, 25, 30} // if added another will result in error
	// short hand version:
	var ages = [3]int{20, 25, 30}
	// len() for array length
	fmt.Println(ages, len(ages))

	// slices are arrays similar to JS or Python
	// can add elements/change size
	var scores = []int{100, 50, 60}
	// you create new slice when appending
	scores = append(scores, 85)
	fmt.Println(scores, len(scores))

	// slice ranges (20 is excluded)
	rangeOne := ages[1:3]
	fmt.Println((rangeOne))
	// [2:] from the third position till the very end
}