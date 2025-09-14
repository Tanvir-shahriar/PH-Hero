const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));
}

const displayCategories = categories => {
    console.log(categories);
    const navbar = document.getElementById('navbar');

    for (const item of categories) {
        const button = document.createElement('button');
        button.classList.add('btn');
        button.innerText = item.category;
        navbar.appendChild(button);
    }

};

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error));
}

const displayVideos = videos => {
    const videosContainer = document.getElementById('videos');
    console.log(videos);
    for (const video of videos) {
        const videoDiv = document.createElement('div');
        
        videoDiv.innerHTML = `
        <figure class = "h-[200px]">
            <img class ="w-full h-full object-cover " src="${video.thumbnail}" alt="Video Thumbnail" />
        </figure>
        <div class="card-body">
            <div class="flex gap-3" >
                <div class="flex-shrink-0">
                    <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="Author Image" />
                </div>
                <div class="space-y-1"> 
                    <h2 class="card-title">${video.title}</h2>
                    <div class="flex items-center gap-1">
                        <p class="text-sm text-gray-500">${video.authors[0].profile_name}</p>
                        <img 
                        src="https://img.icons8.com/color/48/verified-badge.png" 
                        alt="Verified Badge" 
                        class="w-4 h-4 inline-block" />
                    </div>
                    <p class="text-xs text-gray-500">${video.others.views} Views</p>
                </div>

            </div>
        </div>
        `;
        
        videoDiv.classList = "card bg-base-100 shadow-sm";

        videosContainer.appendChild(videoDiv);
    }
}


    loadCategories();
    loadVideos();

