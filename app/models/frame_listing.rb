class FrameListing < ApplicationRecord
  validates :page_number, presence: true

  belongs_to :order

  has_many :frames
end