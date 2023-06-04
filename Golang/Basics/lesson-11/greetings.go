// without it, variables and functions won't be able to be shared
// this means the programs are both part of the same package
package main

import "fmt"

var points = []int{20, 90, 21}

func sayHello(n string) {
	fmt.Println("Hello", n)
}