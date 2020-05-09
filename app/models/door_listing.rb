class DoorListing < ApplicationRecord
  validates :skid_up, :deliver, :date_required, presence: true

  belongs_to :order
end