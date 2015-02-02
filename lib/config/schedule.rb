set :output, '../log/cron_log.log'

every 1.day, at: '3 am' do
	rake 'radar'
end