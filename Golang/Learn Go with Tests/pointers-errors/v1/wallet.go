package main

import "fmt"

type Bitcoin int

type Wallet struct {
	balance Bitcoin
}

// Stringer is a built-in Go interface from the fmt package.
// Any type that has a String() string method satisfies it.
// The fmt package automatically calls String() when you use %s to format that type.
type Stringer interface {
	String() string
}

func (w *Wallet) Deposit(amount Bitcoin) {
	w.balance += amount
}

func (w *Wallet) Balance() Bitcoin {
	return w.balance
}

// String implements the Stringer interface for Bitcoin.
// Without this, you cannot use %s to format a Bitcoin value —
// fmt doesn't know how to turn a Bitcoin (which is just an int) into a string.
func (b Bitcoin) String() string {
	return fmt.Sprintf("%d BTC", b)
}
