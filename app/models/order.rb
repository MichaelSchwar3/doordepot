class Order < ApplicationRecord
  validates :order_number, uniqueness: true
  belongs_to :account
end