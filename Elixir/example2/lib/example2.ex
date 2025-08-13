defmodule Example2 do # starts defining a module named Example2
  use Application # tells Elixir that your module is an OTP application

  def start(_type, _args) do # start function when the app boots
      IO.puts(Example2.hello()) # calls hello function in the same module
      Supervisor.start_link([], strategy: :one_for_one) # supervisor is a special process in Elixir that watches over other processes
      # [] is the list of child processes to supervise (here it’s empty).
      # strategy: :one_for_one means if a child process crashes, the supervisor will restart only that one
  end # ends the start function

  def hello do
      :world
  end # ends hellow function
end # ends module definition
