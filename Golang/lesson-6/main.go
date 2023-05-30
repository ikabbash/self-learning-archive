package main

import (
	"fmt"
	"sort"
	"strings"
	// the standard library https://pkg.go.dev/std
)
func main() {
	greetings := "Hello there."

	// when typing strings, it can auto-type the package for you
	fmt.Println((strings.Contains(greetings, "Hello")))
	// the contains function returns true or false value
	// there's also strings.ReplaceAll, strings.ToUpper, etc..

	nums := []int{45, 20, 35, 21, 65, 50}
	// this method alters the original value
	sort.Ints(nums)
	fmt.Println(nums)
	// there's also sort.SearchInts, and if a number doesn't exist
	// it returns the size of the array+1
}