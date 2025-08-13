defmodule Example4Test do
  use ExUnit.Case
  doctest Example4

  test "greets the world" do
    assert Example4.hello() == :world
  end
end
