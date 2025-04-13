package iteration

import "strings"

const repeatCount = 5

// The code that is commented is another way to concatenate strings, but it is slower. About 100ns of difference on average.
func Repeat(character string) string {
	// var repeated string
	var repeated strings.Builder
	for i := 0; i < repeatCount; i++ {
		// repeated += character
		repeated.WriteString(character)
	}
	// return repeated
	return repeated.String()
}
