class AddElevationsToDoors < ActiveRecord::Migration[5.2]
  def change
    add_column :doors, :elevation_height, :integer
    add_column :doors, :elevation_width, :integer
    add_column :doors, :glass, :boolean, default: false
    add_column :doors, :molding, :boolean, default: false
    add_column :doors, :kit, :boolean, default: false
    add_column :doors, :prime, :boolean, default: false
    add_column :doors, :glass_by, :string
    add_column :doors, :molding_by, :string
    add_column :doors, :kit_by, :string
    add_column :doors, :sheet_notes, :string
  end
end
