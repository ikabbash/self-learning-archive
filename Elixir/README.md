# Elixir Notes

> Code written while following along with [this Elixir course](https://youtu.be/-lgtb-YSUWE?si=j6PeifwLtPYBgE6o).

## Basics
- Elixir is a functional, concurrent programming language built on the Erlang VM, designed for scalable and fault-tolerant applications. The Erlang VM (BEAM) is a virtual machine optimized for running concurrent, distributed, and fault-tolerant applications.
- Installation: https://elixir-lang.org/install.html
- File extensions:
    - `.ex`: Compiled Elixir source files used for application modules and libraries.
    - `.exs`: Interpreted Elixir script files used for scripts, tests, or one-off tasks.
- IEx is Elixir’s interactive shell that lets you run Elixir code, test functions, and explore your application in real time.
- Mix is Elixir’s built-in build tool that helps you create projects, manage dependencies, compile code, run tests, and automate common development tasks.
- You can run a single Elixir file by using `elixir filename.exs`.

## Syntax
- `IO` is module name and `puts` is a function from that module that prints a string.
    ```elixir
    IO.puts("Hello!")
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