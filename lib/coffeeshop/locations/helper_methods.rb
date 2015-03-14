module Locations
	module Helpers

		#
		# Takes in a pair of coordinates with which
		# it uses to find it's appropriate region
		#
		# @param coords [Array]	latitude, longitude
		# @param regions [Hash] Includes a hash of regions
		# that are populated with Locations::Coordinates
		# objects
		#
		# @return [String] Returns string representation
		# of coordinate's region
		def get_region(coords) #, street_addr, regions=nil)
			regions = load_regions
			regions.each_pair do |region, coordinate_set|
				check = check_region(coords, coordinate_set)
				return region.to_s if check
			end
		end

		#
		# Loads region coordinates from Regions constant
		#
		# @return [Hash] keys: region values: coordinates
		def load_regions
			regions = Locations::Regions.const_get(ENV['CURRENT_CITY'])
		end

		#
		# Checks if coords fall within region
		#
		# @param coords [Array] latitude, longitude
		# @param region_coordinates [Array] Region boundary
		# coordinate points
		#
		# @return [boolean] Returns true or false
		def check_region(coords, region_coordinates)
			coords_to_check = Locations::Coordinates.new(coords)
			coords_to_check.point_in_polygon?(region_coordinates)
		end

	end
end