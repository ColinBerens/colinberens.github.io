interface Game {
    id: string;
    thumbnail: string;
    title: string;
    description: string;
    year: number;
}

// Load the template from a separate HTML file
async function loadTemplate(url: string): Promise<HTMLTemplateElement | null> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to load template: ${url}`);
            return null;
        }
        const html = await response.text();

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        return tempDiv.querySelector('template');
    } catch (error) {
        console.error(`Error loading template from ${url}:`, error);
        return null;
    }
}

// Render games
async function renderGames() {
    const template = await loadTemplate('gamesCardTemplate.html');
    if (!template) return;
    
    const container = document.getElementById('game-list');
    if (!container) return;

    const stylecontainer = document.getElementById('game-list-style');
    if (!stylecontainer) return;
  
    stylecontainer.innerHTML = '<link rel="stylesheet" href="CSS/gamesCardTemplate.css"> \n <link rel="stylesheet" href="CSS/gamesTemplate.css">';

    const games: Game[] = [
        { id: 'Fastnetic', thumbnail: 'IMAGES/Portfolio/FastneticInGame.png', title: 'Fastnetic', description: 'Fast-Paced Platformer', year: 2025 },
        { id: 'TwoLeftJams', thumbnail: 'IMAGES/Portfolio/boom.png', title: 'Two Left Jams', description: 'Award Winning Coop Game', year: 2025 },
        { id: 'Slother', thumbnail: 'IMAGES/SnH+uH.png', title: 'Slother', description: 'Tower-Defence Game', year: 2024 }
    ];

    games.forEach(game => {
        const clone = template.content.cloneNode(true) as DocumentFragment;

        const thumbnail = clone.querySelector('.thumbnail') as HTMLImageElement | null;
        const title = clone.querySelector('.title') as HTMLElement | null;
        const description = clone.querySelector('.description') as HTMLElement | null;
        const year = clone.querySelector('.year') as HTMLElement | null;

        if (thumbnail) thumbnail.src = game.thumbnail;
        if (title) title.textContent = game.title;
        if (description) description.textContent = game.description;
        if (year) year.textContent = game.year.toString();

        const button = clone.querySelector('.game-button') as HTMLButtonElement | null;
        if (button) {
            button.addEventListener('click', () => {
                console.log(`Loading game: ${game.id}`);
                loadGameDetails(game.id); // Load dynamically instead of page reload
            });
        }
        container.appendChild(clone);
    });
}

// Load game details dynamically
async function loadGameDetails(gameId: string) {
    const gameListContainer = document.getElementById('game-list');
    const detailsContainer = document.getElementById('gamesTemplate');
    
    if (!detailsContainer) {
        console.error('gamesTemplate container not found');
        return;
    }

    try {
        // Load game data
        const res = await fetch("Data/games.json");
        if (!res.ok) throw new Error('Failed to load games.json');
        
        const games: any[] = await res.json();
        const game = games.find((g: any) => g.id === gameId);

        if (!game) {
            detailsContainer.innerHTML = "<h2>Game not found</h2>";
            return;
        }

        // Load template
        const template = await loadTemplate('gamesTemplate.html');
        if (!template) {
            detailsContainer.innerHTML = "<h2>Failed to load template</h2>";
            return;
        }

        const clone = template.content.cloneNode(true) as DocumentFragment;

        // Use querySelector instead of getElementById on DocumentFragment
        const gameName = clone.querySelector("#game-name h2");
        if (gameName) gameName.textContent = game["game-name-h2"];

        const upperBoxText = clone.querySelector("#game-upperbox-text");
        if (upperBoxText) {
            const h3 = upperBoxText.querySelector("h3");
            const p = upperBoxText.querySelector("p");
            if (h3) h3.textContent = game["game-upperbox-text-h3"];
            if (p) p.innerHTML = game["game-upperbox-text-p"];
        }

        const lowerBoxText = clone.querySelector("#game-lowerbox-text");
        if (lowerBoxText) {
            const h3Elements = lowerBoxText.querySelectorAll("h3");
            const pElements = lowerBoxText.querySelectorAll("p");

            if (h3Elements[0]) h3Elements[0].textContent = game["game-lowerbox-text-h3"];
            if (pElements[0]) pElements[0].textContent = game["game-lowerbox-text-p"];
            if (h3Elements[1]) h3Elements[1].textContent = game["game-lowerbox-text-h3-02"];
            if (pElements[1]) pElements[1].textContent = game["game-lowerbox-text-p-02"];
            if (h3Elements[2]) h3Elements[2].textContent = game["game-lowerbox-text-h3-teammembers"];
            if (game["Teammembers"] != null && game["Teammembers"] != undefined) 
            {
                if (pElements[2]) pElements[2].innerHTML = game["Teammembers"]; // Plain text
            }
            else {
                // Hide if no team members
                if (h3Elements[2]) h3Elements[2].style.display = "none";
                if (pElements[2]) pElements[2].style.display = "none";
            }
            const downloadLinkContainer = clone.querySelector("#downloadlink");
            if (downloadLinkContainer) {
                const downloadLink = downloadLinkContainer.querySelector("a") as HTMLAnchorElement;
                if (downloadLink && game["downloadlink"]) {
                    downloadLink.href = game["downloadlink"];
                } else if (!game["downloadlink"]) {
                    (downloadLinkContainer as HTMLElement).style.display = "none";
                }
            }
            // Additional downloads section (if exists)
            if (game["game-lowerbox-text-h3-03"]) {
                if (h3Elements[3]) h3Elements[3].textContent = game["game-lowerbox-text-h3-03"];
                if (pElements[3]) pElements[3].innerHTML = game["additional-downloads"];
            } else {
                // Hide if no additional downloads
                if (h3Elements[3]) h3Elements[3].style.display = "none";
                if (pElements[3]) pElements[3].style.display = "none";
            }
        }

        const downloadText = clone.querySelector("#DownloadText");
        if (downloadText) downloadText.textContent = game["DownloadText"];

        const downloadLink = clone.querySelector("#main-download-link") as HTMLAnchorElement;
        if (downloadLink) {
            if (game["downloadlink"]) {
                downloadLink.href = game["downloadlink"];
            } else {
                const container = clone.querySelector("#downloadlink-container");
                if (container) (container as HTMLElement).style.display = "none";
            }
        }

        // Images
        const mainImage = clone.querySelector("#game-upperbox img") as HTMLImageElement;
        const gameplayImage = clone.querySelector("#game-lowerbox img") as HTMLImageElement;
        if (mainImage && game.IMAGES) mainImage.src = game.IMAGES["image-01"];
        if (gameplayImage && game.IMAGES) gameplayImage.src = game.IMAGES["image-02"];

        // Clear and append to correct container
        detailsContainer.innerHTML = '';
        detailsContainer.appendChild(clone);

    } catch (error) {
        console.error("Error loading game data:", error);
        detailsContainer.innerHTML = "<h2>Error loading game data</h2>";
    }
}

// Optional: Add back button functionality
function showGameList() {
    const gameListContainer = document.getElementById('game-list');
    const detailsContainer = document.getElementById('gamesTemplate');
    
    if (gameListContainer) gameListContainer.style.display = 'block';
    if (detailsContainer) detailsContainer.style.display = 'none';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Call on page load
document.addEventListener('DOMContentLoaded', async () => {
    await renderGames();

    // Check if there's a game ID in URL (for direct links)
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get("id");
    if (gameId) {
        loadGameDetails(gameId);
    }
});