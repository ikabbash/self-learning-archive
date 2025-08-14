# Elixir Notes

> Code written while following along with [this Elixir course](https://youtu.be/-lgtb-YSUWE?si=j6PeifwLtPYBgE6o).

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
- [Hex](https://hex.pm/) is Elixir’s package manager for finding, installing, and publishing libraries and dependencies.
- To install packages in Elixir, add them to the deps list in your `mix.exs` file and then run:
    ```
    mix deps.get
    ```
    - Once you’ve added the package to `mix.exs` and run `mix deps.get`, you can use it by adding `alias package_name` to the code.
        - Some libraries don’t require an alias, just call their functions directly.
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
- When you see `start/2` it means a _function_ named _start_ that takes _two_ arguments.

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