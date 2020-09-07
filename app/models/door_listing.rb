class DoorListing < ApplicationRecord
  validates :page_number, presence: true

  belongs_to :order

  has_many :doors
end