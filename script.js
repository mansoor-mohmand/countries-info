import {JS} from "./jsCheatSheet.js";

function FetchData()
{ 
    fetch("https://restcountries.com/v3.1/all").then(res =>res.json()).then(data =>
    {
                
        ShowAppContent(data);

    });
}



function ShowAppContent(data)
{
    // Methods Calls
    DisplayContinent(data);
    DisplayCountries(data);

    // EventListeners Calls
    EventListeners();
}


// Methods
const DisplayContinent = (data)=>{
    const section_all_continents = document.querySelector("#all_continents");
    
    let all_continent = GetContinent(data).sort();
    let continents = "";
    let icon = "";
    all_continent.forEach(ct =>{
        let {country,population} = GetCountriesByContinent(data,ct);
        icon = `fa-earth-${ct.toLowerCase()}`;
        if(ct==="Antarctic")
        {
            country=0;
            population=0;
            icon ="fa-snowflake";
        }
        continents+=`
                <div class="continent" data-continent="${ct}">
                    <div class="continent-heading">
                        <h2>${ct}</h2>
                        <i class="fa-solid ${icon}"></i>
                    </div>
                    <div class="continent-data">
                        <div>
                            <div class="country-count">
                                <h5>Countries</h5>
                                <p>${country}</p>
                            </div>
                            <div class="population-count">
                                <h5>Population</h5>
                                <p>${JS.TSeparator(population)}</p>
                            </div>
                        </div>
                        <a href="" class="btn-goto">view</a>
                    </div>
                </div>    
                `;
        
    });
    section_all_continents.innerHTML = continents;
    
}

const DisplayCountries= (data)=>{
    const section_all_countries = document.querySelector("#all_countries");
    let all_continent = GetContinent(data).sort();
    let c_name="";
    let c_alpha_name="";
    let c_capital_name="";
    let c_continent_name="";
    let c_flag="";
    let countries="";
    all_continent.forEach(ct=>{
        data.forEach(c =>{
            if(c.region===ct)
            {
                c_name = c.name.common;
                c_alpha_name = c.cca3;
                c_capital_name = c.capital;
                c_continent_name = c.region;
                c_flag = c.flags.png;
                countries+=`
                          <div class="country" id="country" data-countrycode="${c_alpha_name}">
                              <div class="country-name-flag">
                                  <div class="country-flag">
                                      <img src="${c_flag}" alt="flag-name">
                                  </div>
                                  <div class="country-name">
                                      <h5>${c_name}</h5>
                                      <p>${c_capital_name}</p>
                                  </div>
                              </div>
                              <div class="country-continent" data-continent_name="${c_continent_name}">
                                  <h5>${c_continent_name}</h5>
                              </div>
                          </div>
                            `;
            }     
        });
    });
    section_all_countries.innerHTML = countries;
}

const GetContinent = (data)=>
{
    var all_continents = [];
    data.forEach(cont =>{
        if(!all_continents.includes(cont.region))
        {
           all_continents.push(cont.region);
        }

    });

    return all_continents;
}
const GetCountriesByContinent = (data,continent_name)=>
{
    let country=0;
    let population=0;
    data.forEach(d=>{
        if(d.region===continent_name)
        {
            country +=1;
            population +=d.population;
        }
    });

    country =(population==0)?0:country;

    let c_p ={country,population}
    return c_p;
}

const ViewByContinent = (continent_name,countries_data)=>{
    countries_data.forEach(country=>{
        let data_continent_name = country.querySelector(".country-continent").dataset.continent_name;
        (data_continent_name !== continent_name)
        ?country.style.display="none":country.style.display="flex";
        
    });
}
// function GetData(data,name)
// {
//   let arr =[];
//   data.forEach(d =>{
//     arr.push(d[name]);
//   });
  
//   return arr;
// }


// Events
function EventListeners(){
    //* variables 
    let check;
    //* DOMS
    const continent_section = document.querySelector("#all_continents");
    const header = document.querySelector("#header");


    //?all continet eventlistener 
    const continents = document.querySelectorAll(".continent");
    const countries = document.querySelectorAll(".country");


    continents.forEach(cont=>cont.addEventListener("click",()=>{
        console.log(window.innerWidth);
       if(window.innerWidth>600)
       {
        let data_continent = cont.dataset.continent;
        ViewByContinent(data_continent,countries);
       }
    }));

    //? show countries by continent name - btn_goto
    const btn_goto = document.querySelectorAll(".btn-goto");

    btn_goto.forEach(btn=>btn.addEventListener("click",(e)=>{
        e.preventDefault();

        let data_continent = btn.parentElement.parentElement.dataset.continent;
        ViewByContinent(data_continent,countries);
        continent_section.classList.remove("show");
    }));


    // ? search eventlistener
    const search_country = document.querySelector("#search_country");
    const all_country = document.querySelectorAll(".country");
    let content_title = document.querySelector("#content_title");
    let filter = "";
    search_country.addEventListener("keyup",()=>{
        filter = search_country.value.toLowerCase();
        if(filter){
            continent_section.classList.add("hide");
            content_title.innerText = filter;   
        }else{
            continent_section.classList.remove("hide");
            content_title.innerText = "Country";
        }
        all_country.forEach(country=>{
            let C_NAME = country.querySelector(".country-name h5").innerText.toLowerCase();
            let C_CAPITAL = country.querySelector(".country-name p").innerText.toLowerCase();
            let C_CONTINENT = country.querySelector(".country-continent h5").innerText.toLowerCase();
            ( C_NAME.indexOf(filter) > -1 || C_CONTINENT.indexOf(filter) > -1 || C_CAPITAL.indexOf(filter) > -1)
            ?country.style.display="flex":country.style.display="none";
        });
    });



    //click listener to open country details
    const OpenCountry = document.querySelectorAll("#all_countries .country");

    OpenCountry.forEach(country=>{
        country.addEventListener("click",(e)=>{
        let url = `./country/?CountryCode=${country.dataset.countrycode}`;
        window.open(url,"_self");
    });
});

    // heading_menu eventlistener
    const heading_menu = document.querySelector("#heading_menu");
    heading_menu.addEventListener("click",()=>{
        continent_section.classList.toggle("show");
    });

    // window on scroll
    window.addEventListener("scroll",()=>{
        (window.scrollY>0)?header.classList.add("change-bg"):header.classList.remove("change-bg");
    });

}
// get all unique continents
// const GetContinent=(data)=>{
// let F=false;
// let all_continent=[];
// let region = GetData(data,"region");
//  region.forEach(r => {
//    all_continent.forEach(ct => {
//       if (ct == r) 
//       {
//         F = true;
//         return;
//       }
//    });
//    (!F)?all_continent.push(r):F=false;
//  });
 
//  return all_continent;
// }





// calilng
FetchData();