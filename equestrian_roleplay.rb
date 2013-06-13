require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/content_for'
require 'haml'


class EquestrianRP < Sinatra::Base
  helpers Sinatra::ContentFor
  configure :development do
    register Sinatra::Reloader
  end

  configure do 

    set :haml, :format => :html5
    set :haml, :layout => :layout
    set :scss_dir, "public/css/"
    set :port, 80

    Haml::Options.defaults[:escape_html] = true

    # Helper Configuration
    set :views, :haml => 'views', :default => 'scss'

    helpers do
      def find_template(views, name, engine, &block)
        _, folder = views.detect { |k,v| engine == Tilt[k] }
        folder ||= views[:default]
        super(folder, name, engine, &block)
      end

    end

  end

  def self.simple_path( name )

    get "/" + name.to_s do

      haml name.to_sym

    end

  end

  get '/' do

    haml :index

  end

  simple_path :about

  simple_path :websites 

  simple_path :guides

  simple_path :getting_started

  simple_path :being_player

  simple_path :being_gamemaster

  simple_path :advantages

  get '/styles.css' do
    scss :styles
  end

end