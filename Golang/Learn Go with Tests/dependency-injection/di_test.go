package main

import (
	"bytes"
	"testing"
)

// The &buffer passes a pointer to the buffer. Since bytes.Buffer implements io.Writer
// Greet can write text into it instead of printing to the terminal.
func TestGreet(t *testing.T) {
	buffer := bytes.Buffer{}
	Greet(&buffer, "Chris")

	got := buffer.String()
	want := "Hello, Chris"

	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}
