class AddPageNumber < ActiveRecord::Migration[5.2]
  def change
    add_column :door_listings, :page_number, :integer, null: false
  end
end
