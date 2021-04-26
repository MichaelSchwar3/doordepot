class Door < ApplicationRecord

  belongs_to :door_listing

  TYPES = [
    'Single',
    'Pair',
    'Borrowed Light',
    'Elevation (Dwg.)',
  ].freeze

  

  CONSTRUCTIONS = [
    'Knock Down',
    'Welded',
    'Continuous Weld',
    'Stick Material',
    'Solid',
  ].freeze

  ANCHORS = [
    'Pressure Fit',
    'Punch and Dimple',
    'Masonry Straps',
    'Drywall Zee Clip',
    'Wood Stud',
    'No Anchors',
    'T-Anchors',
    'Wire',
    'Provide Anchor',
    'Combine Anchor',
  ].freeze

  STRIKES = [
    'ASA 4 7/8',
    'Deadlock',
    'Blank',
    'Flush Bolt',
    'Rim Panic',
    'Concealed Vertical Rods',
    'Surface Vertical Rod',
    'ASA X Deadlock',
    'T Strike',
    'T Strike X Deadlock',
  ].freeze

  GAUGES = [
    '16',
    '14',
    '18',
    '20',
    '12',
  ].freeze

  MATERIALS = [
    'A40',
    'G60',
    'G90'
  ].freeze

  PROFILES = [
    'KDF',
    'AWF',
    'WCO',
    'KCO',
    'WSR',
    'KSR',
    'WDE',
    'KDE',
  ].freeze

  TRIMS = [
    '2',
    '1',
    '1.5',
    '1.75',
    '3',
    '4',
  ].freeze

  HINGE_SIZES = [
    '4.5 Inch S.W.',
    '4.5 Inch H.W.',
    '5 Inch S.W.',
    '5 Inch H.W.',
    'Cont. Hinge',
    'Enter Below'
].freeze


  def self.types
    TYPES
  end
ß
  def self.constructions
    CONSTRUCTIONS
  end

  def self.anchors
    ANCHORS
  end

  def self.strikes
    STRIKES
  end

  def self.gauges
    GAUGES
  end

  def self.materials
    MATERIALS
  end

  def self.profiles
    PROFILES
  end

  def self.hinge_sizes
    HINGE_SIZES
  end

  def self.trims
    TRIMS
  end
end