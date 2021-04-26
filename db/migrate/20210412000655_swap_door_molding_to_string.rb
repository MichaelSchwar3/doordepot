class SwapDoorMoldingToString < ActiveRecord::Migration[5.2]
  def change
    remove_column :doors, :molding
    add_column :doors, :molding, :string
  end
end
