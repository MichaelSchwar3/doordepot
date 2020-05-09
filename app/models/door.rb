class Door < ApplicationRecord

  belongs_to :door_listing

  TYPES = [
    '20 Flush',
    '20 Vision',
    '20 Panel',
    '20 Louver',
    '20 Misc',
    '18 Flush',
    '18 Vision',
    '18 Panel',
    '18 Louver',
    '18 Misc.',
    '16 Flush',
    '16 Vision',
  ].freeze

  CONSTRUCTIONS = [
    'Honeycomb',
    'Ribbed',
    'Polystyrene',
    'N.Y.C.',
    'Solid',
  ].freeze

  HINGES = [
    'Hinge Prep',
    'F/M Continuous',
    'H/S Construction',
    'F/S Construction',
    '26D Spring',
    'P. BB',
    '26D BB',
    'P. Butt',
    '26D Butt',
    'P. Spring',
  ].freeze

  LOCKSETS = [
    'Apartment',
    'Mortise Lock',
    '86 Edge',
    '161 Lock',
    'Hinges Only',
    'Panic Bar',
    'Panic & Trim',
    'Inactive',
    'DBL 161 Lock',
    'SVR',
    'SVR & Trim',
    'Mortise Panic'
  ].freeze

  FRAME_TYPES = [
    'A/L',
    'A/W',
    'K/D',
    'D/O',
  ].freeze

  CHANNEL_TYPES = [
    'STD',
    'Closed',
    'Flush'
  ].freeze

  def self.types
    TYPES
  end

  def self.constructions
    CONSTRUCTIONS
  end

  def self.hinges
    HINGES
  end

  def self.locksets
    LOCKSETS
  end

  def self.frame_types
    FRAME_TYPES
  end

  def self.channel_types
    CHANNEL_TYPES
  end
end