package main

import "fmt"

func main() {
	mybill := newBill("Hamada's bill")

	mybill.updateTip(10)
	mybill.addItem("onion soup", 4.59)

	fmt.Println(mybill.format())
}