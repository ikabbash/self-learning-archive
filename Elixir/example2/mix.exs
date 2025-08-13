defmodule Example2.MixProject do
  use Mix.Project

  def project do
    [
      app: :example2,
      version: "0.1.0",
      elixir: "~> 1.18",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      # tells Mix which module to start as your application’s entry point when you run it.
      # this expects you to have a corresponding Example2 module (usually in lib/example2.ex) that implements the Application behaviour
      mod: {Example2, []},
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
    ]
  end
end
