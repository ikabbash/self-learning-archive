package main

import (
	"testing"
)

func TestWallet(t *testing.T) {

	wallet := Wallet{}

	wallet.Deposit(Bitcoin(10))

	got := wallet.Balance()

	want := Bitcoin(10)

	if got != want {
		// %s works here because Bitcoin implements the Stringer interface (has a String() method).
		// If you remove that method, you must switch %s to %d (integer) or %v (any type).
		t.Errorf("got %s want %s", got, want)
	}
}
