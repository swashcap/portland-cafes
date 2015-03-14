module Locations

	class Coordinates

		attr_reader :latitude, :longitude

		def initialize(coordinates)
			@latitude = coordinates[0]
			@longitude = coordinates[1]
		end

		def point_in_polygon?(polygonPoints)
	    return false if self.latitude == "" or self.longitude == ""
	    polygonPoints.each do |point|
	      point[0] = point[0].to_f
	      point[1] = point[1].to_f
	    end

	    contains_point = false
	    i = -1
	    j = polygonPoints.size - 1
	    while (i += 1) < polygonPoints.size
	      a_point_on_polygon = polygonPoints[i]
	      trailing_point_on_polygon = polygonPoints[j]
	      if point_is_between_the_ys_of_the_line_segment?(a_point_on_polygon, trailing_point_on_polygon)
	        if ray_crosses_through_line_segment?(a_point_on_polygon, trailing_point_on_polygon)
	          contains_point = !contains_point
	        end
	      end
	      j = i
	    end
	    contains_point
	  end

	  private

	  def point_is_between_the_ys_of_the_line_segment?(a_point_on_polygon, trailing_point_on_polygon)
	    (a_point_on_polygon[0] <= self.latitude && self.latitude < trailing_point_on_polygon[0]) ||
	    (trailing_point_on_polygon[0] <= self.latitude && self.latitude < a_point_on_polygon[0])
	  end

	  def ray_crosses_through_line_segment?(a_point_on_polygon, trailing_point_on_polygon)
	    (self.longitude < (trailing_point_on_polygon[1] - a_point_on_polygon[1]) * (self.latitude - a_point_on_polygon[0]) /
	    (trailing_point_on_polygon[0] - a_point_on_polygon[0]) + a_point_on_polygon[1])
	  end

	end

end