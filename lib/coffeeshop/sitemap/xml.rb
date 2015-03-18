module Sitemap

	class XML

		attr_reader :doc

		def initialize(places, file)
			@file = file
			@places = places
			@base_url = 'http://portlandcafes.com/location/'
		end

		def generate
			@doc = Nokogiri::XML::Builder.new do |xml|
				xml.urlset(xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9') {
					@places.each do |place|
						xml.loc {
							xml.send(:url, process_url(place[:place_id]))
						}
					end
				}
			end
			@doc = @doc.to_xml
		end

		def process_url place
			@base_url + place
		end

		def save_to_disk
			generate unless @doc
			File.open("#{@file}/sitemap.xml", 'w') { |file| file.puts @doc }
		end

	end

end