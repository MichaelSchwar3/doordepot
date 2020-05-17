class DoorListing < ApplicationRecord
  validates :date_required, presence: true

  belongs_to :order

  has_one :doors
end