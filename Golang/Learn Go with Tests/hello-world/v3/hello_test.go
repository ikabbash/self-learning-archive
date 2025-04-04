package main

import "testing"

func TestHello(t *testing.T) {
	// subtest
	t.Run("saying hello to people", func(t *testing.T) {
		got := Hello("Chris", "English")
		want := "Hello, Chris"
		assertCorrectMessage(t, got, want)
	})

	t.Run("empty string defaults to 'world'", func(t *testing.T) {
		got := Hello("", "")
		want := "Hello, World"
		assertCorrectMessage(t, got, want)
	})

	t.Run("in Spanish", func(t *testing.T) {
		got := Hello("Elodie", "Spanish")
		want := "Hola, Elodie"
		assertCorrectMessage(t, got, want)
	})

	t.Run("in French", func(t *testing.T) {
		got := Hello("Hamada", "French")
		want := "Bonjour, Hamada"
		assertCorrectMessage(t, got, want)
	})

}

// helper function
// t testing.TB: An interface that allows the function to work with both *testing.T (for tests) and *testing.B (for benchmarks)
func assertCorrectMessage(t testing.TB, got, want string) {
	t.Helper() // marks function as helper
	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}
