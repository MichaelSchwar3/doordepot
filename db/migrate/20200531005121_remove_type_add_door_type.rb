class RemoveTypeAddDoorType < ActiveRecord::Migration[5.2]
  def change
    remove_column :doors, :type
    add_column :doors, :door_type, :string
  end
end
