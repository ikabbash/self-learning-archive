package main

import "fmt"

func main() {
	mybill := newBill("Hamada's bill")

	fmt.Println(mybill.format())
}