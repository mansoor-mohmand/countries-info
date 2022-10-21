import {JS} from "../jsCheatSheet.js";

var params = JS.GetURLPramas(window.location.href);
var url = `https://restcountries.com/v3.1/alpha/${params.CountryCode}`;

function FetchCountry()
{ 
    fetch(url).then(res =>res.json()).then(data =>
    {
              
        // console.log(data[0]);
        ShowAppContent(data);

    });
}

const ShowAppContent =(data)=>{
// calling methods
    CountryName(data);
    CountryFlag(data);
    CountryBriefInfo(data);
    CountryDetailedInfo(data);
// event listeners
    EventListeners();
}

const CountryName = (data)=>{
    document.querySelector("#content_title").innerHTML = data[0].name.common;
}

const CountryFlag =(data)=>{
    const flag = document.querySelector("#country_brief_info #flag");
    let flag_data = "";
    flag_data = `<img src="${data[0].flags.png}" alt="country flag">`;
    flag.innerHTML = flag_data;
}

const CountryBriefInfo = (data)=>{
    const table_body = document.querySelector("#country_brief_info #table_body");
    const d = data[0];
    let table_body_data = "";

    table_body_data = `<tr>
                           <td><div class="flag-container"><img src="${d.flags.png}" alt="country flag"></div></td>
                           <td>${d.name.common}</td>
                           <td>${d.capital}</td>
                           <td>${JS.TSeparator(d.population)}</td>
                           <td>${d.region}</td>
                        </tr>`;

    table_body.innerHTML = table_body_data;

}


const CountryDetailedInfo = (data)=>{
    const all_info_content = document.querySelector("#country_all_info #all_info_content");
    const d = data[0];
    let all_info_content_data = "";

    let native_name = JS.IterateObjectKeys(d.name.nativeName);
    let currency = JS.IterateObjectKeys(d.currencies);
    let countrycode = (d.cca3=="USA")?"+1":d.idd.root+d.idd.suffixes;
    

    all_info_content_data = `<ul class="list">
                                <li class="list-items"><span class="item-head">Name</span><span class="item-data">${d.name.common}</span></li>
                                <li class="list-items"><span class="item-head">Official Name</span><span class="item-data">${d.name.official}</span></li>
                                <li class="list-items"><span class="item-head">Native Name</span><span class="item-data">${d.name.nativeName[native_name].official}</span></li>
                                <li class="list-items"><span class="item-head">Capital</span><span class="item-data">${d.capital}</span></li>
                                <li class="list-items"><span class="item-head">Alternative Names</span><span class="item-data">${JS.LineBreakArray(d.altSpellings)}</span></li>
                                <li class="list-items"><span class="item-head">Population</span><span class="item-data">${JS.TSeparator(d.population)}</span></li>
                                <li class="list-items"><span class="item-head">Independent</span><span class="item-data">${d.independent}</span></li>
                                <li class="list-items"><span class="item-head">Region</span><span class="item-data">${d.region}</span></li>
                                <li class="list-items"><span class="item-head">Subregion</span><span class="item-data">${d.subregion}</span></li>
                                <li class="list-items"><span class="item-head">Languages</span><span class="item-data">${JS.LineBreakArray(JS.IterateObject(d.languages))}</span></li>
                                <li class="list-items"><span class="item-head">Currency Name</span><span class="item-data">${d.currencies[currency].name}</span></li>
                                <li class="list-items"><span class="item-head">Currency Symbol</span><span class="item-data">${d.currencies[currency].symbol}</span></li>
                                <li class="list-items"><span class="item-head">Country Code</span><span class="item-data">${countrycode}</span></li>
                                <li class="list-items"><span class="item-head">Car Sign</span><span class="item-data">${d.car.signs}</span></li>
                                <li class="list-items"><span class="item-head">Car Side</span><span class="item-data">${d.car.side}</span></li>
                                <li class="list-items"><span class="item-head">Borders</span><span class="item-data">${d.borders}</span></li>
                                <li class="list-items"><span class="item-head">Logo</span><span class="item-data"><a href="${d.coatOfArms.png}" class="btns">View</a></span></li>
                                <li class="list-items"><span class="item-head">Map</span><span class="item-data"><a href="${d.maps.googleMaps}" class="btns">Goto</a></span></li>
                            </ul>`;

    all_info_content.innerHTML = all_info_content_data;
}


const EventListeners = ()=>{
    
    // window on scroll
    window.addEventListener("scroll",()=>{
        (window.scrollY>0)?header.classList.add("change-bg"):header.classList.remove("change-bg");
    });

    // heading_share eventlistener
    const heading_share = document.querySelector("#heading_share");
    heading_share.addEventListener("click",()=> {
        Share();
    });


}


async function Share()
 {
    let share_data = {
        title :"Countries Info",
        text:document.querySelector("#content_title").textContent || "Country Info.",
        url:window.location.href
    }
    try{
        await navigator.share(share_data);
        alert("Shared Successfully");
    }catch(error){
        alert(`Not Shared ${error}`);
    }
 }


// fetchCountry
FetchCountry();