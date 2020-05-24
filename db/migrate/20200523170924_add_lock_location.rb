class AddLockLocation < ActiveRecord::Migration[5.2]
  def change
    add_column :doors, :lock_location, :float
  end
end
