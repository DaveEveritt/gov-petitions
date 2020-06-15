"use strict";

const API_URL = "https://petition.parliament.uk/petitions.json";

showData.innerText = "";

const showPetition = (p) => {
  let link = p.links.self.slice(0, -5);
  let attr = p.attributes;
  let resp = attr.government_response;
  let dept = attr.departments[0];
  const content = 
   `<section>
      <h2><a href="${link}">${attr.action}</a></h2>
      <small>${attr.signature_count} signatures, ${attr.state}. <a href="${dept.url}" title="${dept.name}">Department: ${dept.acronym}</a></small>
      <details>
        <summary>${resp ? resp.summary : "No government response yet"} <small>(Created by: ${attr.creator_name})</small></summary>
        <p>
          ${resp ? 
            '<strong class="date">Government response (date: ' + resp.responded_on + ')</strong>' + resp.details
            : "To follow after government response"}
        </p>
      </details>
    </section>`;
  showData.insertAdjacentHTML("beforeend", content);
}

const getPetitions = async () => {
  try {
    let response = await fetch(API_URL);
    let result = await response.json();
    // console.log(result.data[0]);
    result.data.forEach( petition => showPetition(petition) );
    return result.data;
  } catch (err) {
    console.log(err);
  }
}

getPetitions();
