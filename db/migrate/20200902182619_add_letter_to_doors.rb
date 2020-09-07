class AddLetterToDoors < ActiveRecord::Migration[5.2]
  def change
    add_column :doors, :letter, :string
  end
end
