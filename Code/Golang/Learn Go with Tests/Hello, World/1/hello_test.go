package main

import "testing"

func TestHello(t *testing.T) { // t is the name of the parameter, *testing.T is the type of the parameter
	// testing.T is a struct provided by Go’s testing package
	got := Hello("Chris")  // store value of hello function
	want := "Hello, Chris" // the goal

	if got != want {
		t.Errorf("got %q want %q", got, want) // t.Errorf is used to report the failure, a method
	}
}
