// time handling function
function convertTimestamp(timestamp) {
  // Define constants for time conversion
  const secondsInMinute = 60;
  const secondsInHour = secondsInMinute * 60;
  const secondsInDay = secondsInHour * 24;
  const secondsInYear = secondsInDay * 365; // Assuming a non-leap year for simplicity

  // Convert timestamp to total seconds
  const totalSeconds = timestamp;

  // Calculate years, months, days, hours, minutes, and seconds
  const years = Math.floor(totalSeconds / secondsInYear);
  const hours = Math.floor((totalSeconds % secondsInYear) / secondsInHour);
  const minutes = Math.floor((totalSeconds % secondsInHour) / secondsInMinute);
  const seconds = totalSeconds % secondsInMinute;

  // Create the result string, showing only non-zero values
  let result = "";

  if (years > 0) {
    result += years + " year" + (years > 1 ? "s" : "") + " ";
  }
  if (hours > 0) {
    result += hours + " hour" + (hours > 1 ? "s" : "") + " ";
  }
  if (minutes > 0) {
    result += minutes + " minute" + (minutes > 1 ? "s" : "") + " ";
  }
  if (seconds > 0) {
    result += seconds + " second" + (seconds > 1 ? "s" : "") + " ";
  }

  // Trim extra space at the end and return the result
  return result.trim() || "0 seconds"; // Default if everything is zero
}

// button color change
function removeActiveButton() {
  const activeButton = document.getElementsByClassName("btn-category");
  for (const button of activeButton) {
    button.classList.remove("bg-red-500", "text-white");
  }
}
// function to click on the function
const loadVideoCategories = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayVideos(data.category);
      // remove active button
      removeActiveButton();
      // change active button
      const buttons = document.getElementById(`btn-${id}`);
      buttons.classList.add("bg-red-500", "text-white");
    })
    .catch((error) => console.log(error));
};

// load details
const loadDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
};
// display details in modal
const displayDetails = (video) => {
  const modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = `
    <img class="w-full h-64 object-cover" src="${video.thumbnail}" alt="Video Thumbnail" />
    <p class="text-sm text-gray-500 mt-2">${video.description}</p>
  `;
  
  // Trigger the click event programmatically
  const showModalButton = document.getElementById("show_modal");
  if (showModalButton) {
    showModalButton.click(); // This will programmatically trigger the click
  }
}



// loading categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  console.log(categories);
  const buttons = document.getElementById("navbar");

  // buttons.innerHTML = '';
  for (const item of categories) {
    const buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = `
        <button id = "btn-${item.category_id}" onclick = "loadVideoCategories(${item.category_id})" class="btn btn-category">${item.category}</button>
        `;
    buttons.appendChild(buttonDiv);
  }
};
// loading videos
const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
// display videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";
  if (videos.length === 0) {
    videosContainer.classList.remove(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "gap-4"
    );
    videosContainer.innerHTML = `
        <div class="flex flex-col justify-center items-center mx-auto min-h-[300px] gap-10">
        <img src = "icon.png" class = "w-48 h-48 mx-auto" alt = "No content">
        <h2 class="text-3xl text-center">Oops!! Sorry, There is no content here</h2>
        </div>
        `;
    return;
  } else {
    videosContainer.classList.add(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3",
      "gap-4"
    );
  }
  console.log(videos);
  for (const video of videos) {
    const videoDiv = document.createElement("div");

    videoDiv.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="w-full h-full object-cover" src="${
              video.thumbnail
            }" alt="Video Thumbnail" />
        </figure>
        <div class="card-body">
            <div class="flex gap-5">
                <div class="flex-shrink-0">
                    <img class="w-10 h-10 rounded-full" src="${
                      video.authors[0].profile_picture
                    }" alt="Author Image" />
                    ${
                      video.others.posted_date?.length == 0
                        ? ""
                        : `<span class="absolute right-2 bottom-40 bg-black text-white text-sm px-1 rounded">${convertTimestamp(
                            video.others.posted_date
                          )}</span>`
                    }
                   
                </div>
                <div class="space-y-1">
                    <h2 class="card-title">${video.title}</h2>
                    <div class="flex items-center gap-1 relative">
                        <p class="text-sm text-gray-500 m-0 p-0">${
                          video.authors[0].profile_name
                        }</p>
                        ${
                          video.authors[0].verified === true
                            ? `<img 
                            src="https://img.icons8.com/color/48/verified-badge.png" 
                            alt="Verified Badge" 
                            class="w-4 h-4 object-cover m-0 p-0 inline-block align-middle absolute left-25" />`
                            : ""
                        }
                    </div>
                    <p class="text-xs text-gray-500">${
                      video.others.views
                    } Views</p>
                    
                    
                </div>
                <div class="card-actions justify-center items-center ml-auto">
                <button id = "${
                  video.video_id
                }" onclick = "loadDetails('${
      video.video_id
    }')" class="btn btn-active btn-secondary px-2 py-1 m-0 text-xs">Details</button>
                </div>
            </div>
        </div>
        `;

    videoDiv.classList = "card bg-base-100 shadow-sm";
    videosContainer.appendChild(videoDiv);
  }
};

// search functionality
document.getElementById("search-btn").addEventListener("keyup", (e) => {
    // loadVideos(e.target.value);
    loadVideos(e.target.value);
});

loadCategories();
loadVideos();
