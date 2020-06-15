class AddColumnsDoors < ActiveRecord::Migration[5.2]
  def change
    remove_column :doors, :height
    remove_column :doors, :width
    add_column :doors, :height_inches, :integer
    add_column :doors, :height_feet, :integer
    add_column :doors, :width_inches, :integer
    add_column :doors, :width_feet, :integer
    add_column :doors, :hinge_backset, :string
    add_column :doors, :hinge_size, :string
    add_column :doors, :hinge_width, :string
    add_column :doors, :lock_backset, :string
    add_column :doors, :lock_size_height_bot, :float
    add_column :doors, :lock_size_height_top, :float
    add_column :doors, :lock_size_width_bot, :float
    add_column :doors, :lock_size_width_top, :float
    add_column :doors, :top_cs_location, :float
    add_column :doors, :top_lock_location, :float
  end
end
