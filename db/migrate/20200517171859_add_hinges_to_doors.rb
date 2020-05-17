class AddHingesToDoors < ActiveRecord::Migration[5.2]
  def change
    add_column :doors, :first_hinge, :float
    add_column :doors, :second_hinge, :float
    add_column :doors, :third_hinge, :float
    add_column :doors, :fourth_hinge, :float
  end
end
