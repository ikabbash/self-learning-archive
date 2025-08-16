# Elixir Notes

> Code written while following along with [this Elixir course](https://youtu.be/-lgtb-YSUWE?si=j6PeifwLtPYBgE6o).

Cheat sheet: https://devhints.io/elixir

## Basics
- Elixir is a functional, concurrent programming language built on the Erlang VM, designed for scalable and fault-tolerant applications. The Erlang VM (BEAM) is a virtual machine optimized for running concurrent, distributed, and fault-tolerant applications.
    - Elixir docs: https://elixir-lang.org/docs.html
- Installation: https://elixir-lang.org/install.html
- Functional programming is a style where functions are the main building blocks, there are no classes, objects, methods and properties, or mutable state, and programs rely on immutable data, pure functions, and function composition.
    ```
    String.length("Test") # Elixir
    "Test".length # NodeJS
    ```
    - Immutability means once a value is assigned, it cannot be changed, and any “modification” creates a new value instead.
        ```elixir
        iex(1)> list = [1, 2, 3]
        [1, 2, 3]
        iex(2)> list ++ [4, 5]
        [1, 2, 3, 4, 5]
        iex(3)> list # Here you'll notice that list haven't changed, to change you'll need to rebind like this: list = list ++ [4, 5]
        [1, 2, 3]
        ```
    - If we compare immutability with Javascript, you'll notice it's not mutable.
        ```js
        const array = [1, 2, 3]
        array.push(999)
        array // prints 1, 2, 3, 999
        ```
    - Watch this [video](https://youtu.be/fOyofP1__K0?si=dD78PLlyOpqhdI5N) for more.
- A module groups related code together, and functions are named blocks inside modules that perform specific tasks and can be called with arguments to produce results.
    - You could write two modules in the same file, but the convention with Elixir is one module per file.
- Elixir’s built-in tools let you format code (`mix format`), run tests (`mix test`), and generate documentation (`mix docs`) easily.
    - https://hexdocs.pm/ex_doc/Mix.Tasks.Docs.html
        - You'll need to add the `ex_doc` library first in the project.
    - https://hexdocs.pm/mix/Mix.Tasks.Test.html
    - https://hexdocs.pm/mix/main/Mix.Tasks.Format.html
- File extensions:
    - `.ex`: Compiled Elixir source files used for application modules and libraries.
    - `.exs`: Interpreted Elixir script files used for scripts, tests, or one-off tasks.
- IEx is Elixir’s interactive shell that lets you run Elixir code, test functions, and explore your application in real time.
- Mix is Elixir’s built-in build tool that helps you create projects, manage dependencies, compile code, run tests, and automate common development tasks.
- You can run a single Elixir file by using `elixir filename.exs`.
- OTP is an awesome set of tools and libraries that Elixir inherits from Erlang, a programming language on whose VM it runs. It gives you ready-made building blocks like:
    - Supervisors: Babysitters for your code that restart things if they fail.
    - GenServers: Workers that remember data and do tasks for you.
    - Application: A special module that knows how to start your program the OTP way.
        - An Application environment is a key-value store that holds runtime configuration for a specific OTP application.
- https://hexdocs.pm/elixir/1.18.4/Kernel.html
- [Hex](https://hex.pm/) is Elixir’s package manager for finding, installing, and publishing libraries and dependencies.
- To install packages in Elixir, add them to the deps list in your `mix.exs` file and then run:
    ```
    mix deps.get
    ```
    - Once you’ve added the package to `mix.exs` and run `mix deps.get`, you can use it by adding `alias package_name` to the code.
        - Some libraries don’t require an alias, just call their functions directly.
        - There is also `import` and can be used between your modules, check this [video](https://youtu.be/xSMn3eZOQXo?si=3uWwf3WYhgntzZzH) for a well detailed overview and best practices.
- Module attributes are values you attach to a module using the `@` symbol. They're similar to Javascript's `const`.
    ```elixir
    defmodule Example4 do
    use Application
    @x 5  # module attribute at the module level

    def start(_type, _args) do
        Example4.main()
        Supervisor.start_link([], strategy: :one_for_one)
    end

    def main do
        IO.puts(@x)
    end
    end
    ```
    - Note: They are created during compile time, not runtime.
    - `@moduledoc` is another module attribute used to store documentation for a module, typically multi-line string, and is read by tools like ExDoc.
        - [Video reference](https://youtu.be/Ys17oIOwHc0?si=g4vnQ0_gysL_M4-R).
- An **atom** is a constant whose name is its value (like `:ok` or `:error` or even `:hello`) and is best for labels, status flags, or keys in maps because comparisons are fast and memory-efficient. A **string** is text data (like `"hello"`) used for dynamic or user-facing content. Use atoms for fixed, known values and strings for anything that can change or comes from outside your code.
    - For atom to be more than one word, define it like this: `:"hello world"`
    - String doc: https://hexdocs.pm/elixir/main/String.html
    - Atom doc: https://hexdocs.pm/elixir/main/Atom.html
- The question mark ? before a character is used to get its ASCII (or Unicode) code point as an integer.
    ```
    IO.puts(?b)  # prints 98
    ```
- In Elixir, variables are dynamically typed. Meaning you don’t declare a type, the value determines it.
    ```elixir
    name = "Alice"   # string
    age = 30         # integer
    alive = true     # boolean
    ```
- Elixir is dynamically typed, meaning a variable’s type is determined by its value at runtime, which makes coding flexible but can cause runtime errors or slowdowns if incompatible types are used together.
- Division always returns a float.
    ```elixir
    IO.puts(10/2) # 5.0
    ```
    - There are no doubles, only floats in Elixir.
- Main ways you can debug Elixir code:
    - `IO.inspect`: Prints the value of a variable or expression, optionally with a label. Use it when you need quick, inline inspection
    - `dbg`: Prints both expression and result along with location context; when used in pipelines, it shows each step. Use it when you want richer debugging output.
    - `iex --dbg pry -S mix` lets you use `require IEx; IEx.pry()` in code to pause execution and interactively debug in the shell.
    - Watching this [video](https://youtu.be/3mSnjBKtruU?si=0SwoJZiIq_0kshwK) is recommended about debugging.

## Syntax
- `IO` is module name and `puts` is a function from that module that prints a string.
    ```elixir
    IO.puts("Hello!")
    ```
- A leading `_` in paramters within functions means the parameter is intentionally unused, preventing compiler warnings (such as variable is unused) while keeping the function signature intact.
    ```elixir
    def start(_type, _args) do
    ```
    - If you remove the underscores you'll get warnings when you compile.
- When you see `start/2` it means a _function_ named _start_ that takes _two_ arguments. This is called function’s arity which is the number of arguments it takes, written as `function_name/arity` (e.g., `map/2`).
    - You can have functions within a module have the same name but different arities, it doesn't make them the same function, each is a different function instead due to different arity.
        ```elixir
        defmodule Example do
        def greet(), do: "Hello!"
        def greet(name), do: "Hello, #{name}!"
        end

        Example.greet()      # "Hello!"
        Example.greet("Sam") # "Hello, Sam!"
        ```
        - Here you have `greet/0` and `greet/1`
- Private function is defined with `defp` (instead of `def`), can only be called within its module, and is used for internal helper logic not exposed as part of the public API. You can't even call it within IEx.
- Compound types are data structures that group multiple values together, such as lists, tuples, maps, and keyword lists.
    - Tuples: fixed-size, ordered collections: `{1, :ok, "hi"}`
    - Lists: linked lists, good for prepending: `[1, 2, 3]`
    - Maps: key-value pairs: `%{name: "Alice", age: 30}`
    - Keyword lists: special lists of tuples with atom keys: `[a: 1, b: 2]`
    - Date structs : immutable date values, e.g. `~D[2025-08-13]`
    - Note: You can’t directly print compound types with `IO.puts` because it only handles strings; use `IO.inspect` instead.
- Lists are linked, flexible, and good for prepending, while tuples are fixed-size, faster for access, and better for grouping fixed data.
- The `!` at the end of functions raises an error on failure instead of returning a tuple, and is used when you want to skip explicit error handling. Basically it's a caution that something could draw an error.
    ```elixir
    Date.new(2025, 13, 1)   # returns {:error, :invalid_date}
    Date.new!(2025, 13, 1)  # raises an ArgumentError
    ```
- Pattern matching lets you match and destructure values, often used to assign variables or extract data.
    ```elixir
    {a, b, c} = {1, 2, 3}
    IO.inspect(a)  # 1
    IO.inspect(b)  # 2
    IO.inspect(c)  # 3
    ```
    ```elixir
    user1 = {"Hamada", :gold} # Tuple
    {name, membership} = user1
    IO.puts("#{name} has a #{membership} membership.")
    ```
- Guards are extra conditions you can add to function clauses, case expressions, cond, etc., to control pattern matching more precisely.
    ```elixir
    def classify(x) when is_integer(x) and x > 0, do: :positive
    def classify(x) when is_integer(x) and x < 0, do: :negative
    def classify(0), do: :zero
    ```
- Elixir doesn’t have traditional loops; it uses recursion or enumeration functions like `Enum.each`, `Enum.map`, or `Stream` to iterate over collections.
    - `Enum.each` is a function that iterates over a collection and runs a given function for side effects, like printing, but it doesn’t return a new collection.
        ```elixir
        users = [
            {"Caleb", :gold},
            {"Carrie", :silver},
            {"John", :bronze}
        ]

        Enum.each(users, fn {name, membership} -> IO.puts("#{name} has a #{membership} membership.")
        end)
        ```
- This code demonstrates using structs, nested data, and Enum.each to iterate and print formatted information.
    ```elixir
    gold_membership = %Membership{type: :gold, price: 25}
    silver_membership = %Membership{type: :silver, price: 20}
    bronze_membership = %Membership{type: :bronze, price: 15}
    _none_membership = %Membership{type: :none, price: 0} # Hidden with `_` because its unused

    users = [
    %User{name: "Caleb", membership: gold_membership},
    %User{name: "Kayla", membership: gold_membership},
    %User{name: "Carrie", membership: silver_membership},
    %User{name: "John", membership: bronze_membership}
    ]

    Enum.each(users, fn %User{name: name, membership: membership} ->
    IO.puts("#{name} has a #{membership.type} membership paying #{membership.price}.")
    end)
    ```
- Pipe operator `|>` is used to pass the result of one expression as the first argument to the next function. It makes code more readable and expressive, especially when chaining multiple function calls.
    ```elixir
    "hello world"
    |> String.upcase()
    |> String.split()
    |> Enum.reverse()
    ```
    - Use pipe operator when you have two more functions called, don't overuse it.
- You can take user input in Elixir using the code below.
    ```elixir
    input = IO.gets("Enter something: ") |> String.trim()
    ```
    - If pipe isn't used with `String.trim`, your input will have a new line character by default.
        ```elixir
        iex(10)> input = IO.gets("Enter something: ")
        Enter something: test
        "test\n"
        ```
- `case` is a pattern-matching control structure used to compare a value against multiple patterns and execute code based on the first match. An optional `_` pattern can handle all unmatched cases.
    ```elixir
    case IO.gets("Enter a number: ") |> String.trim() |> Integer.parse() do
    {n, _} when n > 0 -> 
        IO.puts("Positive number: #{n}")

    {n, _} when n < 0 -> 
        IO.puts("Negative number: #{n}")

    :error -> 
        IO.puts("That's not a valid number.")

    _ -> 
        IO.puts("Unhandled input.")
    end
    ```
- In Elixir, a comprehension is a concise way to generate, transform, and filter collections (lists, maps, binaries) using a single expression. It lets you loop and transform data in a single, readable expression.
    ```elixir
    numbers = [1, 2, 3, 4, 5]

    squares = for n <- numbers, n > 2, do: n * n
    IO.inspect(squares) 
    # [9, 16, 25]
    ```
    - You can also use conditions in comprehensions, example below filters data.
        ```elixir
        for x <- 1..5, x > 2, do: x
        # [3, 4, 5]
        ```
- An anonymous function is a function without a name, created using the `fn ... end` syntax.
    ```elixir
    square = fn x -> x * x end
    IO.puts(square.(5)) # outputs 25
    ```
    - The shorthand `&` syntax makes anonymous functions more concise. Used when you have a single simple expression.
        ```elixir
        square = &(&1 * &1)
        IO.puts(square.(5)) # outputs 25
        ```
        ```elixir
        numbers = ["1", "2", "3", "4", "5"]
        result = Enum.map(numbers, &String.to_integer/1) # equivalent to result = Enum.map(numbers, fn x -> String.to_integer(x) end)
        IO.inspect(result)
        ```
- `|` operator splits a list into head and tail during pattern matching: `[head | tail]`.
    ```elixir
    [head | tail] = [1, 2, 3, 4]
    # head = 1
    # tail = [2, 3, 4]

    [first, second | rest] = [1, 2, 3, 4, 5]
    # first = 1
    # second = 2  
    # rest = [3, 4, 5]
    ```

## Mix
- You can create a new Elixir project with `mix new project_name`.
- When you run mix new project_name, you typically get:
    - `mix.exs`: The project’s main configuration file (name, version, dependencies, compilation settings).
    - `.formatter.exs`: Code formatting configuration for mix format.
    - `lib/project_name.ex`: The main module file for your application code (where you'll be writing your code).
    - `test/test_helper.exs`: Script that sets up the test environment before running tests.
    - `test/project_name_test.exs`: Example test file for your main module.
- `mix compile` compiles your Elixir project’s source files (.ex) into Erlang bytecode (.beam files) so they can be executed by the Erlang VM.
    - When code is compiled, it’s translated from human-readable source into machine-readable bytecode stored in the `_build/` directory for the Erlang VM to execute.
- `iex -S mix` starts an IEx (interactive Elixir shell) session and loads your Mix project so you can run and test its code directly.
    - Example below when you create a new project, you basically activated the `hello` function.
        ```elixir
        iex(1)> Example1.hello
        :world
        ```
    - `Example1` is the module/project name (presuming you created the mix project using `mix new example1`).
    - **Note** that the output printed is a _return value_, while if you used `mix run -e "Example1.hello"` you'll get nothing in the output because as we mentioned, it's a return value. You'll have to modify the code if you want to _print_ the value.
- `mix run` compiles and executes your Elixir project, but if you run it again without changing any code, there won’t be output because it uses the cached compiled files in `_build/` and skips running unchanged code unless it’s explicitly part of the startup process. You can force it to run every time by using `mix run --force` or by passing an expression with `-e`.