class StaticPagesController < ApplicationController
    def index

    end

    def experiences

    end

    def projects
        @projects = {
            :data => [
                {
                    :src => 'stock_game.PNG',
                    :skills => ['HTML', 'CSS', 'JS'],
                    :title => 'Trading Simulation',
                    :path => '/stock_game'
                },
                {
                    :src => 'arapp.png',
                    :skills => ['Unity', 'C#'],
                    :title => 'Marker Based AR App',
                    :path => '/arapp'
                },
                {
                    :src => 'stock_game.PNG',
                    :skills => ['HTML', 'CSS', 'JS'],
                    :title => 'Instagram Story Grouping',
                    :path => ''
                },
                {
                    :src => 'database.png',
                    :skills => ['SQL', 'HeidiSQL'],
                    :title => 'Quidditch Database',
                    :path => ''
                },
                {
                    :src => 'amazon.PNG',
                    :skills => ['Python'],
                    :title => 'Amazon Price Tracker',
                    :path => ''
                }

            ]
        }


    end

    def web_design
        @designs = {
            :data => [
                {
                    :src => 'rusobuild.PNG',
                    :title => 'Ruso Development Inc.',
                    :desc => 'Fully custom mobile optimized gallery website for a home construction company built from scratch using HTML, CSS, and JS with a few JavaScript libraries. The idea for this site was to build something clean and modern with a focus on the galleries to showcase the stunning homes.',
                    :link => 'http://rusobuild.com/'
                },
                {
                    :src => 'painting.png',
                    :title => 'Sweet Painting',
                    :desc => 'Static website built for a professional painting business. I downloaded this design as a theme from Styleshout and made my own edits and customizations.',
                    :link => 'https://sweetpainting.ca/'
                }
            ]
        }
    end

    def arapp

    end
end
