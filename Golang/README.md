# Golang Notes

- [Packages and Modules](#packages-and-modules)
- [Testing](#testing)
- [Variables and Data Types](#variables-and-data-types)
- [Arrays and Slices](#arrays-and-slices)
- [Strings and Runes](#strings-and-runes)
- [Structs and Methods](#structs-and-methods)
- [Interfaces](#interfaces)
- [Pointers](#pointers)
- [Goroutines and Channels](#goroutines-and-channels)
- [Generics](#generics)
- [fmt Package](#fmt-package)
- [tips](#tips)

## Packages and Modules
- A package is a folder that contains a bunch of go files, a bunch of packages is known as a module, defined by a `go.mod` file.
- You can view Go's packages documentations using `go doc package-name` (e.g., `go doc fmt`).

## Testing
- Go's built-in support for unit testing makes it easier to test as you go, [check it out](https://go.dev/doc/tutorial/add-a-test).
    - Check [this article](https://blog.jetbrains.com/go/2022/11/22/comprehensive-guide-to-testing-in-go/) to see testing examples in Go.
- Test Driven Development (TDD) discipline: Write a failing test, make the compiler pass, run the test, write enough code to make the test pass, refactor.
- In Go, test functions must start with `Test` followed by a capitalized name (like `TestHello`) and take a single parameter of type `*testing.T` which provides methods for reporting test failures and logging.
    - The Go testing framework automatically handles dependencies between files in the same package. When you run `go test`, it compiles all `.go` files in the package (package main for example) and links them together into a single test binary. So if you have `hello_test.go` and `hello.go` part of the same package, they are linked and can access each other's functions.
    - Test files need to be with a name like `xxx_test.go`, the test function must start with the word `Test`, and test function takes one argument only `t *testing.T`.
- Subtests allow you to group and run related test cases (using `t.Run` for example).
    - A benefit of this approach is you can set up shared code that can be used in the other tests.
    ```go
    t.Run("saying hello to people", func(t *testing.T) {
		got := Hello("Chris")
		want := "Hello, Chris"

		if got != want {
			t.Errorf("got %q want %q", got, want)
		}
	})
    ```
- `t.Helper()` marks a function as a test helper. When a test fails, the error message will point to the line in the test function rather than inside the helper function, making debugging easier.
- [Testable Examples in Go](https://go.dev/blog/examples)

## Variables and Data Types
- `int16` is a 16-bit signed integer with a range from -32,768 to 32,767. If you try to add 1 to 32,767 (the maximum value for `int16`), it will overflow, wrapping around to the minimum value, -32,768, due to how binary arithmetic works in fixed-size integers. This is called integer overflow.
    
    ```go
    var x int16 = 32767
    x = x + 1 // x becomes -32768
    ```
    
    - `int32`: A 32-bit signed integer with a range from -2,147,483,648 to 2,147,483,647.
    - `int64`: A 64-bit signed integer with a range from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807.
    - `uint16`: A 16-bit unsigned integer with a range from 0 to 65,535.
    - `float32`: A 32-bit floating-point number with a range of approximately ±1.18e-38 to ±3.4e38 and a precision of about 6-7 decimal digits.
- You can initialize two variables in the same line with the following:
    
    ```go
    var1, var2 := 1, 2
    ```

## Arrays and Slices
- Array is a fixed-size collection of elements of the same type, with its length being part of its type (e.g., [3]int), making it inflexible but efficient for fixed data. Array is also contiguous in memory.
    
    ```go
    var intArr [3]int32 // [3] is the fixed size
    
    // you'll notice that it increments by 4
    fmt.Println(&intArr[0]) // 0x14000122004
    fmt.Println(&intArr[1]) // 0x14000122008
    fmt.Println(&intArr[2]) // 0x1400012200c
    ```
    
- Slice is a flexible, dynamically-sized view into an array or a portion of an array, allowing for easy resizing and manipulation of sequences of elements (basically arrays with additional functionalities).
    
    ```go
    // declaration
    var intSlice []int32 = []int32{4, 5, 6}
    fmt.Printf("The length is %v with capacity %v", len(intSlice), cap(intSlice))
    
    intSlice = append(intSlice, 7)
    fmt.Printf("\nThe length is %v with capacity %v\n", len(intSlice), cap(intSlice))
    ```
    
    - `len(intSlice)` returns the **length** (number of elements) of the slice, which is `3`.
    - `cap(intSlice)` returns the **capacity** (number of elements the underlying array can hold), which is also `3` in this case.
    - After appending, the length becomes `4`, and the capacity may increase (e.g., to `6`) if the underlying array needs to be reallocated to accommodate the new element.
        - The capacity doubles to **6** after appending to ensure efficient memory usage and minimize reallocations, balancing performance and memory overhead.
        - If you tried to print the index `[4]` you’ll get out of range error because nothing is assigned in it.
    - We can specify the length of the slice as well as optionally specify the capacity of the slice. By default, the capacity will just be the length of the slice.
        - You may want to specify the capacity if you have a rough idea of how many values you're going to need to hold, this avoids your program having to reallocate the underlying array when it needs to store more values which can have pretty large impact on performance. Reallocation of arrays can slow things down.

## Strings and Runes
- Strings are presented as binary numbers in computers, one way of doing this was ASCII encoding where each letter got its own ASCII value. In Go, strings are encoded in UTF-8 even for cases like special characters, Chinese letters or emojis. Non-ASCII characters use 2 or more bytes.
    - Example for word `résumé`:
        
        ```go
        func main() {
        	var myString = "résumé"
        	for i, r := range myString {
        		fmt.Printf("Index: %d, Rune: %c\n", i, r)
        	}
        }
        
        /* output:
        Index: 0, Rune: r
        Index: 1, Rune: é
        Index: 3, Rune: s
        Index: 4, Rune: u
        Index: 5, Rune: m
        Index: 6, Rune: é */
        
        // Iterating over the string (returns runes and their starting indices)
        	for i, v := range myString {
        		fmt.Println(i, v)
        	}
        /* output:
        0 114
        1 233
        3 115
        4 117
        5 109
        6 233 */
        ```
        
        - You'll notice that special characters have taken two extra indexes (there is even index 7 after index 6), because the `é` character is two bytes.
            
            ```go
            		r         é                    s         u        m        é
            [01110010, 11000011, 10101001, 01110011, 01110101, 01101101, 11000011, 10101001]
            ```
            
        - The reason why index `1` is 233 is because the `range` keyword knows that its a 2 bytes character so it decodes correctly to 233 (the bytes in the screenshot above).
        - An easier way to deal with iterating and indexing strings is to cast them to an array of runes for such case (runes are just an alias for `int32`).
            
            ```go
            func main() {
            	var myString = []rune("résumé")
            	for i, v := range myString {
            		fmt.Println(i, v)
            	}
            }
            
            /* output:
            0 114
            1 233
            2 115
            3 117
            4 109
            5 233 */
            ```
            
        - Check [this](https://youtu.be/8uiZC0l4Ajw) part of the video for more.
    - When you're dealing with strings in Go you're dealing with a value whose underlying representation is an array of bytes.
    - You should use runes when you need to work with individual characters in a string and handle text that includes characters from different languages, including non-ASCII characters.

## Structs and Methods
- Struct is a user-defined type that groups together fields (variables) of different types.
    
    ```go
    package main
    import "fmt"
    
    type gasEngine struct {
        mpg       uint8
        gallons   uint8
        ownerInfo owner // you can also just type owner and you would have name owner
    }
    
    type owner struct {
        name string
    }
    
    func main() {
        var myEngine gasEngine = gasEngine{25, 15, owner{"Alex"}}
        fmt.Println(myEngine.mpg, myEngine.gallons, myEngine.ownerInfo.name)
    }
    ```
    
    - Structs can also be defined like this but they wouldn’t be reusable in this case.
        
        ```go
        package main
        import "fmt"
        
        func main() {
        	var myEngine = struct {
        		mpg     uint8
        		gallons uint8
        	}{25, 15}
        
        	fmt.Println(myEngine.mpg, myEngine.gallons)
        }
        ```
        
- Methods are functions that are associated with a specific type, such as a struct. They allow you to define behavior for instances of that type. Methods are similar to functions but have a receiver, which ties them to a particular type.
    
    ```go
    package main
    
    import "fmt"
    
    // Define a struct
    type Rectangle struct {
        Width  float64
        Height float64
    }
    
    // Define a method for the Rectangle struct
    func (r Rectangle) Area() float64 {
        return r.Width * r.Height
    }
    
    // Define another method with a pointer receiver
    func (r *Rectangle) Scale(factor float64) {
        r.Width *= factor
        r.Height *= factor
    }
    
    func main() {
        // Create an instance of Rectangle
        rect := Rectangle{Width: 10, Height: 5}
    
        // Call the Area method
        fmt.Println("Area:", rect.Area()) // Output: Area: 50
    
        // Call the Scale method
        rect.Scale(2)
        fmt.Println("Scaled Width:", rect.Width) // Output: Scaled Width: 20
        fmt.Println("Scaled Height:", rect.Height) // Output: Scaled Height: 10
    }
    ```

## Interfaces
- Interface defines method signatures, allowing methods to accept any type that implements them, enabling flexibility and polymorphism. For example, instead of creating a method that calculates area for each struct shape, you can have a generalized one.
    
    ```go
    package main
    
    import (
        "fmt"
        "math"
    )
    
    // Without Interface
    type Rectangle struct {
        Width  float64
        Height float64
    }
    
    type Circle struct {
        Radius float64
    }
    
    // Separate function for Rectangle
    func CalculateRectangleArea(r Rectangle) float64 {
        return r.Width * r.Height
    }
    
    // Separate function for Circle
    func CalculateCircleArea(c Circle) float64 {
        return math.Pi * c.Radius * c.Radius
    }
    
    // With Interface (Solution)
    type Shape interface {
        Area() float64
    }
    
    // Implement Shape interface for Rectangle
    func (r Rectangle) Area() float64 {
        return r.Width * r.Height
    }
    
    // Implement Shape interface for Circle
    func (c Circle) Area() float64 {
        return math.Pi * c.Radius * c.Radius
    }
    
    // Single function that works with any Shape
    func PrintArea(s Shape) {
        fmt.Println("Area:", s.Area())
    }
    
    func main() {
        rect := Rectangle{Width: 10, Height: 5}
        circle := Circle{Radius: 7}
    
        // Without Interface: Separate functions for each type
        fmt.Println("Without Interface:")
        fmt.Println("Rectangle Area:", CalculateRectangleArea(rect)) // Output: 50
        fmt.Println("Circle Area:", CalculateCircleArea(circle))     // Output: 153.93804002589985
    
        // With Interface: Single function for any Shape
        fmt.Println("\nWith Interface:")
        PrintArea(rect)   // Output: Area: 50
        PrintArea(circle) // Output: Area: 153.93804002589985
    }
    ```
    
    - Use cases:
        - Abstraction: Defines what a type should do without specifying how, promoting modularity.
        - Polymorphism: Enables functions to work with multiple types that satisfy the interface.
        - Decoupling: Reduces dependencies between components, making code easier to maintain.
        - Testing: Simplifies unit testing by allowing mock implementations of dependencies.

## Pointers
- Pointer is a variable that stores the memory address of another variable.
    - Asterisk is used to declare a pointer type and de-reference a pointer, ampersand is used to obtain the memory address of a variable.
    - Pointers are used to efficiently share or modify data without copying it, and to directly access or update the original value of a variable.
    - When you copy a slice in Go, both the original and the copy share the same value, so modifying one affects the other. That's because slices contain pointers to an underlying array under the hood.
        
        ```go
        func main() {
            var slice = []int32{1, 2, 3}
            var sliceCopy = slice
            sliceCopy[2] = 4
            fmt.Println(slice) // [1, 2, 4]
            fmt.Println(sliceCopy) // [1, 2, 4]
        }
        ```
        
- Using pointers avoids copying data, saving memory and enhancing performance by directly accessing and modifying the original variable. Example below demonstrates that each array have different memory address.
    
    ```go
    package main
    
    import (
        "fmt"
    )
    
    func main() {
        var thing1 = [5]float64{1, 2, 3, 4, 5}
        fmt.Printf("\nThe memory location of the thing1 array is: %p", &thing1)
    
        var result [5]float64 = square(thing1)
    
        fmt.Printf("\nThe result is: %v", result)
        fmt.Printf("\nThe value of thing1 is: %v", thing1)
    }
    
    // Accept the array by value (creates a copy)
    func square(thing2 [5]float64) [5]float64 {
        fmt.Printf("\nThe memory location of the thing2 array is: %p", &thing2)
        for i := range thing2 {
            thing2[i] = thing2[i] * thing2[i] // Modifies the copy, not the original
        }
        return thing2 // Returns the modified copy
    }
    ```
    
    - The better example from the one above using pointer is modifying thing2 without affecting thing1 so they’ll have same memory address (same array) instead of double memory usage (two separate arrays).
        
        ```go
        package main
        
        import (
            "fmt"
        )
        
        func main() {
            var thing1 = [5]float64{1, 2, 3, 4, 5}
            fmt.Printf("\nThe memory location of the thing1 array is: %p", &thing1)
        
            // Pass a pointer to the array
            var result [5]float64 = square(&thing1)
        
            fmt.Printf("\nThe result is: %v", result)
            fmt.Printf("\nThe value of thing1 is: %v", thing1)
        }
        
        // Accept a pointer to the array and return a new array
        func square(thing2 *[5]float64) [5]float64 {
            fmt.Printf("\nThe memory location of the thing2 array is: %p", thing2)
            for i := range thing2 {
                thing2[i] = thing2[i] * thing2[i] // Modify the original array
            }
            return *thing2 // Return a copy of the modified array
        }
        ```

## Goroutines and Channels
- Goroutines are a way to launch multiple functions and have them execute concurrently.
    - Concurrency is not the same as parallel execution. Concurrency is about dealing with multiple tasks at the same time, while parallel execution is about performing multiple tasks at the same time using multiple resources.
    - Goroutines are created using the `go` keyword followed by a function call.
- Channels are the pipes that connect concurrent goroutines. You can send values into channels from one goroutine and receive those values into another goroutine.
    - Channels are used for synchronization, data sharing between goroutines, and pipeline patterns (chaining goroutines together).
    - Use channels for: Communication between goroutines, synchronize goroutines (e.g., wait for a task to complete), implement producer-consumer patterns or pipelines.
    - Channels are thread-safe and prevent race conditions.

## Generics
- Generics allow you to write reusable, type-safe functions and data structures that work with multiple types. Generics solve the problem of writing duplicate code for different types.
    - For example, you would write a function for `int`, then the same function but for `float32`, and so on. Generics solves the need to not write the same function for different types (check [this](https://youtu.be/8uiZC0l4Ajw?t=3197) for example).
    - Use generics when you need to write reusable logic that works with multiple types.

## fmt Package
- `fmt` package provides several functions for printing output, and each supports format specifiers (the `%` things) to control how values are formatted.
    - `Println` prints values to the console or standard output, separated by spaces, and adds a newline character at the end. Does not print formatted outputs.
    - `Printf` prints formatted text to the console or standard output based on a format string and corresponding arguments using specifiers.
    - `Fprintf` writes formatted text to a specific output stream, such as a file, based on a format string and corresponding arguments.
    - `Sprint` returns a string containing the text without printing, usually a variable saves the output.
    - `Sprintf` same thing, but just for formatted strings.
- `Println` and `Printf` are used for immediate output to the console, while `Fprintf` is used for writing formatted text to a specific output stream. `Sprint` and `Sprintf` are used for generating formatted text as a string without immediate output.
    - Check [the doc](https://pkg.go.dev/fmt) for more.

## Tips
- When you have lots of `if` statements checking a particular value it is common to use a `switch` statement instead.
- You can use a single `const` that has many variables in it.
    ```go
    // This
    const (
	spanish = "Spanish"
	french  = "French"

	englishHelloPrefix = "Hello, "
	spanishHelloPrefix = "Hola, "
	frenchHelloPrefix  = "Bonjour, "
    )

    // Instead of this
    const spanish = "Spanish"
    const french = "French"
    const englishHelloPrefix = "Hello, "
    const spanishHelloPrefix = "Hola, "
    const frenchHelloPrefix = "Bonjour, "
    ```
- You can unify arguments of the same type when defining functions. Rather rather than having `(x int, y int)` you can shorten it to `(x, y int)`.