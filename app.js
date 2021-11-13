function updateMap(flags) {
    fetch("data.json")
        .then(response => response.json())
        .then(rep => {
            lastUpdated=rep['lastUpdated'];
            var myDate = new Date(Date.parse(lastUpdated));
            $("#date").append('(Updated less than '+myDate.toGMTString()+' )');
            var markup = "<tr><td><img src='svg/world.svg' class='gmFWS' height='20px'/>" + ' World ' + "</td><td>" + rep['totalConfirmed'] + "</td><td>" + rep['totalRecovered'] + "</td><td>" + rep['totalDeaths'] + "</td></tr>";
            $("table tbody").append(markup);
            let i;
            for (i = 0; i < rep.areas.length; i++) {
                country_name = rep.areas[i]['displayName'];
                country_totalConfirmed = (rep.areas[i]['totalConfirmed'] == null) ? 0 : rep.areas[i]['totalConfirmed'];
                country_totalDeaths = (rep.areas[i]['totalDeaths'] == null) ? 0 : rep.areas[i]['totalDeaths'];
                country_totalRecovered = (rep.areas[i]['totalRecovered'] == null) ? 0 : rep.areas[i]['totalRecovered'];
                country_lastUpdated = rep.areas[i]['lastUpdated'];
                country_lat = rep.areas[i]['lat'];
                country_long = rep.areas[i]['long'];
                country_flag = "svg/" + flags[country_name];
            
                var markup = "<tr><td><img src='" + country_flag + "' class='gmFWS'/>" + country_name + "</td><td>" + country_totalConfirmed + "</td><td>" + country_totalRecovered + "</td><td>" + country_totalDeaths + "</td></tr>";
                $("table tbody").append(markup);

                Totalcitypercountry = rep.areas[i].areas;
                state = rep.areas[i].areas;
                for (j = 0; j < Totalcitypercountry.length; j++) {
                    state_lat = state[j]['lat'];
                    state_long = state[j]['long'];
                    state_name = state[j]['displayName'];
                    state_totalConfirmed = (state[j]['totalConfirmed'] == null) ? 0 : state[j]['totalConfirmed'];
                    state_totalDeaths = (state[j]['totalDeaths'] == null) ? 0 : state[j]['totalDeaths'];
                    state_totalRecovered = state[j]['totalRecovered'];
                    state_totalRecovered = (state[j]['totalRecovered'] == null) ? 0 : state[j]['totalRecovered'];
                    state_lastUpdated = state[j]['lastUpdated'];

                    var popup = new mapboxgl.Popup({ offset: 25 })
                        .setHTML('<h1><img class="gmFWS" src="' + country_flag + '"> ' + state_name + ',' + country_name + '</h1><hr/><div class="p"><p><b> ' + state_totalConfirmed + '</b> confirmed </p><p><b>' + state_totalRecovered + '</b>  recovered</p><p><b> ' + state_totalDeaths + '</b> deaths</p></div>');


                    // create DOM element for the marker
                    var el = document.createElement('div');
                    el.className = 'circle';
                    el.style.width = '8px';
                    el.style.height = '8px';

                    new mapboxgl.Marker(el)
                        .setLngLat([state_long, state_lat])
                        .setPopup(popup)
                        .addTo(map);
                    /* City Section */
                    city = rep.areas[i].areas[j].areas;
                    for (k = 0; k < city.length; k++) {
                        city_lat = city[k]['lat'];
                        city_long = city[k]['long'];
                        city_name = city[k]['displayName'];
                        city_totalConfirmed = (city[k]['totalConfirmed'] == null) ? 0 : city[k]['totalConfirmed'];
                        city_totalDeaths = (city[k]['totalDeaths'] == null) ? 0 : city[k]['totalDeaths'];
                        city_totalRecovered = city[k]['totalRecovered'];
                        city_totalRecovered = (city[k]['totalRecovered'] == null) ? 0 : city[k]['totalRecovered'];
                        city_lastUpdated = city[k]['lastUpdated'];
                        // create the popup
                        var popup = new mapboxgl.Popup({ offset: 25 })
                            .setHTML('<h1><img class="gmFWS" src="' + country_flag + '"> ' + city_name + ',' + country_name + '</h1><hr/><div class="p"><p><b> ' + city_totalConfirmed + '</b> confirmed </p><p><b>' + city_totalRecovered + '</b>  recovered</p><p><b> ' + city_totalDeaths + '</b> deaths</p></div>');

                    }// end k loop
                } //end j loop

                // create the popup
                var popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML('<h1><img class="gmFWS" src="' + country_flag + '"> ' + country_name + '</h1><hr/><div class="p"><p><b> ' + country_totalConfirmed + '</b> confirmed </p><p><b>' + country_totalRecovered + '</b>  recovered</p><p><b> ' + country_totalDeaths + '</b> deaths</p></div>');

                // create DOM element for the marker
                var el = document.createElement('div');
                el.className = 'circle';
                el.style.width = '30px';
                el.style.height = '30px';

                new mapboxgl.Marker(el)
                    .setLngLat([country_long, country_lat])
                    .setPopup(popup)
                    .addTo(map);

            }

        })
}
var country_flags = {
    "United States": '226-united-states.svg',
    "Italy": '013-italy.svg',
    "Spain": '128-spain.svg',
    "China (mainland)": '034-china.svg',
    "Germany": '162-germany.svg',
    "Iran": '136-iran.svg',
    "France": '195-france.svg',
    "United Kingdom": 'United Kingdom.svg',
    "Switzerland": '205-switzerland.svg',
    "Belgium": '165-belgium.svg',
    "Netherlands": '237-netherlands.svg',
    "South Korea": '094-south-korea.svg',
    "Turkey": '218-turkey.svg',
    "Austria": '003-austria.svg',
    "Canada": '243-canada.svg',
    "Portugal": '224-portugal.svg',
    "Norway": '143-norway.svg',
    "Israel": '155-israel.svg',
    "Brazil": '255-brazil.svg',
    "Australia": '234-australia.svg',
    "Sweden": '184-sweden.svg',
    "Czechia": 'czech_republic_icon_square.png',
    "Malaysia": '118-malasya.svg',
    "Ireland": '179-ireland.svg',
    "Denmark": '174-denmark.svg',
    "Chile": '131-chile.svg',
    "Romania": '109-romania.svg',
    "Luxembourg": '035-luxembourg.svg',
    "Poland": '211-poland.svg',
    "Ecuador": '104-ecuador.svg',
    "Japan": '063-japan.svg',
    "Russia": '248-russia.svg',
    "Pakistan": '100-pakistan.svg',
    "Philippines": '192-philippines.svg',
    "Thailand": '238-thailand.svg',
    "Saudi Arabia": '133-saudi-arabia.svg',
    "Indonesia": '209-indonesia.svg',
    "South Africa": '200-south-africa.svg',
    "India": '246-india.svg',
    "Finland": '125-finland.svg',
    "Greece": '170-greece.svg',
    "Iceland": '080-iceland.svg',
    "Mexico": '252-mexico.svg',
    "Panama": '106-panama.svg',
    "Singapore": '227-senegal.svg',
    "Dominican Republic": '',
    "Peru": '188-peru.svg',
    "Argentina": '198-argentina.svg',
    "Croatia": '164-croatia.svg',
    "Slovenia": '010-slovenia.svg',
    "Serbia": '071-serbia.svg',
    "Estonia": '008-estonia.svg',
    "Colombia": '177-colombia.svg',
    "Hong Kong SAR": '183-hong-kong.svg',
    "Qatar": '026-qatar.svg',
    "United Arab Emirates": '151-united-arab-emirates.svg',
    "Egypt": '158-egypt.svg',
    "New Zealand": '121-new-zealand.svg',
    "Iraq": '020-iraq.svg',
    "Morocco": '166-morocco.svg',
    "Bahrain": '138-bahrain.svg',
    "Algeria": '144-algeria.svg',
    "Lithuania": '064-lithuania.svg',
    "Armenia": '',
    "Ukraine": '145-ukraine.svg',
    "Hungary": '115-hungary.svg',
    "Lebanon": '018-lebanon.svg',
    "Latvia": '044-latvia.svg',
    "Bosnia and Herzegovina": '132-bosnia-and-herzegovina.svg',
    "Bulgaria": '168-bulgaria.svg',
    "Andorra": '045-andorra.svg',
    "Costa Rica": '156-costa-rica.svg',
    "Slovakia": '091-slovakia.svg',
    "Tunisia": '049-tunisia.svg',
    "Taiwan": '202-taiwan.svg',
    "Uruguay": '088-uruguay.svg',
    "Kazakhstan": '074-kazakhstan.svg',
    "North Macedonia": '236-republic-of-macedonia.svg', //#
    "Azerbaijan": '141-azerbaijan.svg',
    "Kuwait": '',
    "Jordan": '077-jordan.svg',
    "Moldova": '212-moldova.svg',
    "San Marino": '097-san-marino.svg',
    "Albania": '099-albania.svg',
    "Burkina Faso": '090-burkina-faso.svg',
    "Cyprus": '101-northern-cyprus.svg',  //#
    "Vietnam": '220-vietnam.svg',
    "Oman": '003-austria.svg',
    "Faroe Islands": '',
    "Côte d’Ivoire": '161-ivory-coast.svg',  //#
    "Malta": '194-malta.svg',
    "Ghana": '053-ghana.svg',
    "Belarus": '135-belarus.svg',
    "Uzbekistan": '190-uzbekistn.svg',
    "Réunion": '259-european-union.svg',  //#
    "Senegal": '227-senegal.svg',
    "Cameroon": '105-cameroon.svg',
    "Honduras": '024-honduras.svg',
    "Cuba": '153-cuba.svg',
    "Venezuela": '139-venezuela.svg',
    "Brunei": '119-brunei.svg',
    "Puerto Rico": '028-puerto-rico.svg',
    "Afghanistan": '111-afghanistan.svg',
    "Sri Lanka": '127-sri-lanka.svg',
    "Palestinian Authority": '208-palestine.svg', //#
    "Nigeria": '086-nigeria.svg',
    "Mauritius": '001-mauritius.svg',
    "Cambodia": '159-cambodia.svg',
    "Georgia": '256-georgia.svg',
    "Bolivia": '150-bolivia.svg',
    "Kyrgyzstan": '152-kyrgyzstan.svg',
    "Montenegro": '239-montenegro.svg',
    "Kosovo": '052-kosovo.svg',
    "Trinidad and Tobago": '181-trinidad-and-tobago.svg',
    "Guadeloupe": '',
    "Rwanda": '',
    "Martinique": '201-martinique.svg',
    "Gibraltar": '213-gibraltar.svg',
    "Congo (DRC)": '249-democratic-republic-of-congo.svg',
    "Paraguay": '041-paraguay.svg',
    "Jersey": '245-jersey.svg',
    "Liechtenstein": '134-liechtenstein.svg',
    "Guam": 'Guam.svg',
    "Aruba": '042-aruba.svg',
    "Bangladesh": '147-bangladesh.svg',
    "Monaco": '039-monaco.svg',
    "Guernsey": '204-guernsey.svg',
    "Kenya": '067-kenya.svg',
    "Isle of Man": '219-isle-of-man.svg',
    "Madagascar": '242-madagascar.svg',
    "Macao SAR": '167-macao.svg',   //#
    "Guatemala": '098-guatemala.svg',
    "Mayotte": '',
    "Jamaica": '037-jamaica.svg',
    "Barbados": '084-barbados.svg',
    "Uganda": '008-estonia.svg',
    "El Salvador": '015-el-salvador.svg',
    "Togo": '073-togo.svg',
    "Zambia": '032-zambia.svg',
    "French Guiana": '180-french-polynesia.svg',  //#
    "U.S. Virgin Islands": '217-virgin-islands.svg', //#
    "Bermuda": '081-bermuda.svg',
    "Ethiopia": '005-ethiopia.svg',
    "Congo": '',
    "Djibouti": '068-djibouti.svg',
    "Mali": '173-mali.svg',
    "Niger": '222-niger.svg',
    "Maldives": '225-maldives.svg',
    "Guinea": '110-guinea.svg',
    "Tanzania": '006-tanzania.svg',
    "Cayman Islands": '051-cayman-islands.svg',
    "Eritrea": '065-eritrea.svg',
    "Equatorial Guinea": '189-equatorial-guinea.svg',
    "Mongolia": '258-mongolia.svg',
    "Dominica": 'dominica_icon_square.png',
    "Saint Martin": '',
    "Namibia": '062-namibia.svg',
    "Greenland": '113-greenland.svg',
    "Bahamas": '120-bahamas.svg',
    "Myanmar": '058-myanmar.svg',
    "Grenada": '210-grenada.svg',
    "Saint Lucia": '172-st-lucia.svg',
    "Eswatini": '',
    "Syria": '022-syria.svg',
    "Curaçao": '116-curacao.svg',
    "Guyana": 'guyana_icon_square.png',
    "Haiti": '185-haiti.svg',
    "Mozambique": '096-mozambique.svg',
    "Seychelles": '253-seychelles.svg',
    "Suriname": '076-suriname.svg',
    "Libya": '231-libya.svg',
    "Laos": '112-laos.svg',
    "Benin": '060-benin.svg',
    "Gabon": '059-gabon.svg',
    "Angola": '117-angola.svg',
    "Antigua and Barbuda": '075-antigua-and-barbuda.svg',
    "Zimbabwe": '011-zimbabwe.svg',
    "Cabo Verde": 'cape_verde_icon_square.png',
    "Vatican City": '124-vatican-city.svg',
    "Sudan": '199-sudan.svg',
    "Fiji": '137-fiji.svg',
    "Montserrat": '043-montserrat.svg',
    "Nepal": '015-el-salvador.svg',
    "Turks and Caicos Islands": '223-turks-and-caicos.svg',
    "Mauritania": '050-mauritania.svg',
    "Bhutan": '040-bhutan.svg',
    "Nicaragua": '007-nicaragua.svg',
    "Central African Republic": '036-central-african-republic.svg',
    "Chad": '066-chad.svg',
    "Saint Barthélemy": '079-st-barts.svg', //#
    "Liberia": '168-bulgaria.svg',
    "Gambia": '146-gambia.svg',
    "Somalia": '083-somalia.svg',
    "Guinea-Bissau": '056-guinea-bissau.svg',
    "British Virgin Islands": '114-british-virgin-islands.svg',
    "Belize": '077-jordan.svg',
    "Anguilla": '025-anguilla.svg',
    "Papua New Guinea": '163-papua-new-guinea.svg',
    "Saint Vincent and the Grenadines": '241-st-vincent-and-the-grenadines.svg',
    "Timor-Leste": '140-east-timor.svg',
};
updateMap(country_flags);


