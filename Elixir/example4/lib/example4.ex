defmodule Example4 do
  use Application

  def start(_type, _args) do
      Example4.main()
      Supervisor.start_link([], strategy: :one_for_one)
  end

  def main do
      name = "Hamada"
      status = Enum.random([:gold, :silver])

      if status === :gold do
        IO.puts("Welcome, #{name}.")
      else
        IO.puts("Leave.")
      end
  end
end
