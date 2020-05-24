class AddCsLocation < ActiveRecord::Migration[5.2]
  def change
    add_column :doors, :cs_location, :float
  end
end
