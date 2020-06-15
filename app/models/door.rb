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
    'F/M Cont.',
    'H/S Cont.',
    'F/S Cont.',
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

  HINGE_SIZES = [
    '4.5',
    '5',
    '6',
    '7',
    'None',
    'Piano',
  ].freeze

  HINGE_BACKSETS = [
    'Standard (1/16)',
    'A/L Hinge (3/16)',
    'Heavy (5/32)',
  ].freeze

  TOP_LOCK_WIDTHS = [
    '1',
    '1.25',
    '1.125'
].freeze

  TOP_LOCK_HEIGHTS = [
    '4.625',
    '3.5',
    '2.75',
    '2.125',
    '2.25',
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

  def self.hinge_sizes
    HINGE_SIZES
  end

  def self.hinge_backsets
    HINGE_BACKSETS
  end

  def self.second_ls_heights
    TOP_LOCK_HEIGHTS
  end

  def self.second_ls_widths
    TOP_LOCK_WIDTHS
  end
end