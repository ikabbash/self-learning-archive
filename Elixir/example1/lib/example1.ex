defmodule Example1 do
  @moduledoc """
  Documentation for `Example1`.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Example1.hello()
      :world

  """
  def hello do
    :world # This is an atom, won't be displayed in the terminal if you tried `mix run -e "Example1.hello"`
  end
end
