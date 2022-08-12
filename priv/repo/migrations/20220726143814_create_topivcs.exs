defmodule Discuss.Repo.Migrations.CreateTopivcs do
  use Ecto.Migration

  def change do
    create table(:topivcs) do
      add :title, :string

      timestamps()
    end
  end
end
