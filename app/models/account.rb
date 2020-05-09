class Account < ApplicationRecord
  validates :name, uniqueness: true
  has_many :users
  has_many :orders
end