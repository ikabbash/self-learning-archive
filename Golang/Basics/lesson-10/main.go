package main

import (
	"fmt"
	"strings"
)

// two returns (string, string)
func getInitials(name string) (string, string) {
	upper_name := strings.ToUpper(name)
	split_names := strings.Split(upper_name, " ")

	// slice
	var initials []string
	for _, v := range split_names {
		// v is the slice/array, which contains the two names
		// initials will be equal the first letter of the two names
		initials = append(initials, v[:1])
	}

	if len(initials) > 1 {
		return initials[0], initials[1]
	}

	// if there's no second name, underscore is the return for the 2nd string
	return initials[0], "_"
}

func main() {
	first_name, second_name := getInitials("tifa lockhart")
	fmt.Println(first_name, second_name)

	first_name1, second_name1 := getInitials("tifa")
	fmt.Println(first_name1, second_name1)
}