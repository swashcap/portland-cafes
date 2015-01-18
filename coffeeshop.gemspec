# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'coffeeshop/version'

Gem::Specification.new do |spec|
  spec.name          = "coffeeshop"
  spec.version       = Coffeeshop::VERSION
  spec.authors       = ["David La Chasse"]
  spec.email         = ["david.lachasse@gmail.com"]
  spec.summary       = %q{API for local coffee shop hours}
  spec.description   = %q{API to query Google Places API for local coffee shop hours}
  spec.homepage      = ""
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.6"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "rspec"
end
