package main

import (
	"fmt"
	"log"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/hello" {
		http.Error(w, "404 Not Found", http.StatusNotFound)
		return
	}
	if r.Method != "GET" {
		http.Error(w, "Method is not supported for this route", http.StatusNotFound)
		return
	}
	fmt.Fprintf(w, "Greetings!")
}

func formHandler(w http.ResponseWriter, r *http.Request) {
	// initialize err variable then check if its equal to nil or not, if not then it parses
	if err := r.ParseForm(); err != nil {
		fmt.Fprintf(w, "ParseForm() err: %v", err)
		return
	}

	fmt.Fprintf(w, "POST request successful")
	// form values that are in the form.html file (name ="address")
	name := r.FormValue("name")
	address := r.FormValue("address")
	// w the http response, Fprintf takes format string then sends it to a stream/file
	fmt.Fprintf(w, "Name = %s\n", name)
	fmt.Fprintf(w, "Address = %s\n", address)
}

func main() {
	// serve the html files
	fileServer := http.FileServer(http.Dir("./static"))

	// routes and their functions
	http.Handle("/", fileServer)
	http.HandleFunc("/form", formHandler)
	http.HandleFunc("/hello", helloHandler)

	fmt.Printf("Starting server at port 8080\n")
	// creates the server, listen to all network interface:8080
	// nil is the handler value which means the server will use the default ServeMux handler
	// for server to start the err should equal to nil
	if err := http.ListenAndServe(":8080", nil); err !=nil {
		log.Fatal(err)
	}
}