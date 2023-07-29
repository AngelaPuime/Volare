"use strict";
import {
  fromInput,
  toInput,
  departureDateInput,
  passengersInput,
  btnSearch,
  responseSection,
  loadingSection,
  arrayPhotos,
  imgSearch,
} from "./const.js";

import { getFlightOffers, getToken } from "./apiRequest.js";

// Managing click event and data validation
function handleSearchClick(event) {
  try {
    event.preventDefault();
    loadingSection.classList.remove("hidden");
    responseSection.innerHTML = ``;
    const fromValue = fromInput.value.toUpperCase();
    if (fromValue.length !== 3) {
      // responseSection
      throw new Error("Valid value 3 characters");
    }
    if (!isNaN(fromValue)) {
      throw new Error("Valid value letters");
    }
    const toValue = toInput.value.toUpperCase();
    if (toValue.length !== 3) {
      throw new Error("Valid value 3 characters");
    }
    if (!isNaN(toValue)) {
      throw new Error("Valid value letters");
    }
    let departureDateValue = departureDateInput.value;
    departureDateValue = dateInvert(departureDateValue);
    let passengersValue = passengersInput.value;
    passengersValue = Math.floor(passengersValue);

    if (isNaN(passengersValue)) {
      throw new Error("Valid value numbers");
    }

    getToken()
      .then((token) => {
        return getFlightOffers(
          token,
          fromValue,
          toValue,
          departureDateValue,
          passengersValue
        );
      })
      .then((flightOffers) => {
        if (flightOffers && flightOffers.length > 0) {
          const firstOffer = flightOffers[0];
          const price = firstOffer.price.total;
          let duration = firstOffer.itineraries[0].duration.slice(2);

          //creating section with flight data
          document.querySelector("section.loading").classList.add("hidden");
          responseSection.innerHTML = `

          <article>
          <h2>CHEAPEST FLIGHT</h2>   
          <p>${departureDateInput.value}</p>
          <ul>
            <li><strong>From:</strong> ${fromValue}</li>
            <li><strong>To:</strong> ${toValue}</li>
            <li><strong>Price:</strong> ${price}€</li>
            <li><strong>Duration:</strong> ${duration}</li>
          </ul>
        </article>
          `;
        } else {
          loadingSection.classList.add("hidden");
          responseSection.innerHTML = `
            <article class="error"> No flight data found </article> 
    
          `;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    loadingSection.classList.add("hidden");
    responseSection.innerHTML = `
      <article class="error"> ${error.message} </article> 
      
      `;
  }
}

btnSearch.addEventListener("click", handleSearchClick);

// changing date format
function dateInvert(date) {
  const parts = date.split("-"); //new format [dd, mm, yyyy]
  let newDate = parts[2] + "-" + parts[1] + "-" + parts[0];
  //date validation
  if (parts[0] > 31 || parts[0] <= 0 || parts[1] > 12 || parts[1] <= 0) {
    throw new Error("Invalid date");
  }
  if (parts[2] < 2023) {
    throw new Error(`We don't have flights to the past`);
  }
  return newDate;
}
//slider
let currentIndex = 0;

function changeBackgroundImage() {
  currentIndex++;
  if (currentIndex == arrayPhotos.length) {
    currentIndex = 0;
  }
  const currentImageUrl = arrayPhotos[currentIndex];
  imgSearch.style.backgroundImage = `url(${currentImageUrl})`;
}

setInterval(changeBackgroundImage, 5000);
