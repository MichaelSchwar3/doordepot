class Order < ApplicationRecord
  validates :order_number, uniqueness: true
  belongs_to :account

  has_many :door_listings
end