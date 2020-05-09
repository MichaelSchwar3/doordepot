class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.string :name, null: false
      t.timestamps
    end

    add_column :users, :account_id, :integer, null: false
    add_column :users, :role, :string, null: false
    add_index :users, :account_id
  end
end

