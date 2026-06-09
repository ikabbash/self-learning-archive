package main

import "testing"

type Shape interface {
	Area() float64
}

func TestArea(t *testing.T) {

	// creates a slice named areaTests with an anonymous struct type and with three elements
	// So basically a slice of structs, where each struct has `shape` of type `Shape` (interface) and `want` of type `float64`
	areaTests := []struct {
		name    string
		shape   Shape
		hasArea float64
	}{
		{name: "Rectangle", shape: Rectangle{Width: 12, Height: 6}, hasArea: 72.0},
		{name: "Circle", shape: Circle{Radius: 10}, hasArea: 314.1592653589793},
		{name: "Triangle", shape: Triangle{Base: 12, Height: 6}, hasArea: 36.0},
	}

	for _, tt := range areaTests {
		// using tt.name from the case to use it as the `t.Run` test name.
		// You can execute `go test -run TestArea/Rectangle` since `t.Run` created a subtest with the name Rectangle
		t.Run(tt.name, func(t *testing.T) {
			got := tt.shape.Area()
			if got != tt.hasArea {
				t.Errorf("%#v got %g want %g", tt.shape, got, tt.hasArea)
			}
		})

	}

}
