require "bundler/gem_tasks"
require_relative 'lib/coffeeshop'

desc 'Use database places to output massive json object'
task :details do
	File.delete('app/results.json') if File.exists?('app/results.json')
	Coffeeshop.get_details({}, true)
end

desc 'Get radar results'
task :radar do
	Coffeeshop.get_radar({})
	Rake::Task["details"].execute
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