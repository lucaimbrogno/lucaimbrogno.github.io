class CoronaController < ApplicationController
    def corona_dashboard
        require 'openssl'
        doc = Nokogiri::HTML(open('https://www.worldometers.info/coronavirus/#countries', ssl_verify_mode: OpenSSL::SSL::VERIFY_NONE))

        totals = doc.css('.maincounter-number')

        country_table = doc.css('#main_table_countries')

        country_table_entries = country_table.css('tbody')[0].css('tr')

        # rate = entries.css('table')[0].css('tr')[1].css('td')[1].text

        @corona_stats = {
            overall_count: totals[0].text.tr(',',''),
            deaths: totals[1].text.tr(',',''),
            recovered: totals[2].text.tr(',',''),
            country_count: country_table_entries.length
        }

        @countries = {}

        country_table_entries.each do |country|
            country_info = country.text.split(' ')
            string_part_1 = country_info[0]
            string_part_2 = ""
            cases_index = 1

            if string? country_info[1]
                string_part_2 = " " + country_info[1]
                cases_index = 2
            end

            country_name = string_part_1 + string_part_2

            @countries[country_name] = country_info[cases_index]
        end
        
    end

    def string? string
        return string =~ /[^\d.,]/
    end


end
