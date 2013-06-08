require 'sinatra/base'
require 'sinatra/reloader'
require 'haml'


class EquestrianRP < Sinatra::Base

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

  get '/' do

    haml :index

  end

  get '/styles.css' do
    scss :styles
  end

end