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
                    :src => 'stories.PNG',
                    :skills => ['HTML', 'CSS', 'JS', 'UI Design'],
                    :title => 'Instagram Story Grouping',
                    :path => '/story_grouping'
                },
                {
                    :src => 'database.png',
                    :skills => ['SQL', 'MySQL', 'HeidiSQL'],
                    :title => 'Quidditch Database',
                    :path => '/quidditch'
                },
                {
                    :src => 'amazon.PNG',
                    :skills => ['Python'],
                    :title => 'Amazon Price Tracker',
                    :path => '/amazon_tracker'
                },


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
                },
                {
                    :src => 'rtc.PNG',
                    :title => 'RTC Construction',
                    :desc => "New modern commericial construction website I'm currently in the process of building",
                    :link => 'https://rtcconstruction.ca/'
                }
            ]
        }
    end

    def arapp

    end

    def story_grouping

    end

    def contact

    end

    def quidditch

    end

    def amazon_tracker

    end
end
