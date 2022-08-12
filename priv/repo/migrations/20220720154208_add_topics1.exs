defmodule Discuss.Repo.Migrations.AddTopics1 do
  use Ecto.Migration

  def change do
    create table1(:topics) do
      add :title, :string
  end
end
