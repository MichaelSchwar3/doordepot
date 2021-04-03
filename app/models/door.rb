class Door < ApplicationRecord

  belongs_to :door_listing

  TYPES = [
    '20 Flush',
    '20 Narrow Vision',
    '20 Square Vision',
    '20 Diamond Vision',
    '20 Circle Vision',
    '20 Rectangle Vision',
    '20 Full Vision',
    '20 Double Vision',
    '20 Square Louver',
    '20 Rectangle Louver',
    '20 Full Louver',
    '20 Vision Louver',
    '20 1 Panel',
    '20 2 Panel',
    '20 4 Panel',
    '20 6 Panel',
    '20 Misc',
    '18 Flush',
    '18 Narrow Vision',
    '18 Square Vision',
    '18 Diamond Vision',
    '18 Circle Vision',
    '18 Rectangle Vision',
    '18 Full Vision',
    '18 Double Vision',
    '18 Square Louver',
    '18 Rectangle Louver',
    '18 Full Louver',
    '18 Vision Louver',
    '18 1 Panel',
    '18 2 Panel',
    '18 4 Panel',
    '18 6 Panel',
    '18 Misc',
    '16 Flush',
    '16 Narrow Vision',
    '16 Square Vision',
    '16 Diamond Vision',
    '16 Circle Vision',
    '16 Rectangle Vision',
    '16 Full Vision',
    '16 Double Vision',
    '16 Square Louver',
    '16 Rectangle Louver',
    '16 Full Louver',
    '16 Vision Louver',
    '16 1 Panel',
    '16 2 Panel',
    '16 4 Panel',
    '16 6 Panel',
    '16 Misc',
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

  DOOR_ELEVATIONS = [
    'NARROW V.L.',
    'SQUARE V.L.',
    'RECTANGLE V.L.',
    'FULL V.L.',
    'DOUBLE V.L.',
    'SQUARE LOUVER',
    'RECTANGLE LOUVER',
    'FULL LOUVER',
    'VISION / LOUVER',
    '1 PANEL',
    '2 PANEL',
    '4 PANEL',
    '6 PANEL',
].freeze

  def self.types
    TYPES
  end

  def self.constructions
    CONSTRUCTIONS
  end

  def self.door_elevations
    DOOR_ELEVATIONS
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