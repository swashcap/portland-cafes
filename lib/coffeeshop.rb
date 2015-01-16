require 'dotenv'
require 'httparty'
require 'open-uri'
require 'active_support'
require 'byebug'
require 'json'
require 'sequel'
require 'sqlite3'

Dotenv.load

require_relative 'coffeeshop/query_tools'
require_relative 'coffeeshop/request'
require_relative 'coffeeshop/query'
require_relative 'coffeeshop/format'
require_relative 'coffeeshop/database'
require_relative 'coffeeshop/result_parser'
require_relative 'coffeeshop/api/search'
require_relative 'coffeeshop/api/details'
require_relative 'coffeeshop/api/radar'
require_relative 'coffeeshop/city/portland'

module Coffeeshop

	class << self

		def search(params={})
			@places = Search.new(params).send_query
			write_places_results
		end

		def details(params={})
			@details = Details.new(params).send_query
		end

		def radar(params={})
			@radar = Radar.new(params).send_query
			ResultParser.new(@radar)
		end

		def write_results
			if valid_details_request? && !is_undesired_establishment?
				File.open(@file, 'a+') do |file|
					@details = remove_unused_detail_properties
					file.write(jsonified_results + ",")
				end
			end
		end

		def jsonified_results
			@details.to_json
		end

		def remove_unused_detail_properties
			unused_properties = ['formatted_address','icon','international_phone_number','reference','scope','user_ratings_total','utc_offset','address_components','price_level','photos']
			@details.parsed_response["result"].reject { |k,v| unused_properties.include?(k) }
		end

		def is_undesired_establishment?
			undesirables = ['Starbucks','McDonald\'s']
			undesirables.include?(@details.parsed_response["result"]["name"] == 'Starbucks')
		end

		def valid_details_request?
			@details.parsed_response["status"] != 'INVALID_REQUEST'
		end

		def format_output
			file_name = @file
			snip_trailing_comma file_name
			wrap_object_in_array file_name
		end

		def snip_trailing_comma file_name
			File.truncate(file_name, File.size(file_name) - 1)
		end

		def wrap_object_in_array file_name
			contents = File.read(file_name)
			contents = contents.gsub(/\A/,'[')
			contents = contents.gsub(/\z/,']')
			File.open(file_name, 'w') { |file| file.puts contents }
		end

		def load_coords
			Portland::LOCATIONS
		end

		def load_place_ids
			@db = Database.new.load_all_places
		end

		def get_details params, output=false
			@file = './app/results.json' if output
			place_ids = load_place_ids
			place_ids.each do |place|
				details(params.merge!(place_id: place[:place_id]))
				write_results if output
			end
			format_output if output
		end

		def get_radar params
			coords = load_coords
			coords.each do |coord|
				radar(params.merge!(location: coord))
			end
		end

	end

end
