require "bundler/gem_tasks"
require_relative 'lib/coffeeshop'

desc 'Use database places to output massive json object'
task :details do
	output_file = Coffeeshop.set_path
	File.delete(output_file) if File.exists?(output_file)
	Coffeeshop.get_details({}, true)
end

desc 'Get radar results'
task :radar do
	Coffeeshop.get_radar({})
	Rake::Task["details"].execute
end

desc 'List env vars'
task :add_undesirable_location, :location do |t, args|
	location = args[:location]
	if File.exists?(File.expand_path('../.env', __FILE__)) && !location.nil?
		env_file = File.expand_path('../.env', __FILE__)
		location_index = File.read(env_file).index("UNDESIRABLE_LOCATIONS=") + "UNDESIRABLE_LOCATIONS=".size
		to_write = location + "," + File.read(env_file).slice(location_index, File.read(env_file).size - location_index)
		File.write(env_file, to_write, location_index)
	elsif location.nil?
		puts "You didn't specify a location to ignore!"
	else
		puts ".env file doesn't exist yet!"
	end
end


namespace :db do

	desc 'Create base database'
	task :create do
		puts "MUST HIT CTRL-D, this will hang in the console but it's actually being created. I promise."
		`sqlite3 places.db`
	end

	desc 'Create database schema'
	task :schema do
		Database.new
	end

	desc 'List stored places'
	task :list do
		data = Database.new
		puts data.list
	end

end