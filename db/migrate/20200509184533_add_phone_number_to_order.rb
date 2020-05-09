class AddPhoneNumberToOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :phone_number, :string, null: false
  end
end
