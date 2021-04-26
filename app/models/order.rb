class Order < ApplicationRecord
  validates :order_number, uniqueness: true
  belongs_to :account

  has_many :door_listings
  has_many :frame_listings

  has_many :doors, through: :door_listings, source: :doors
end