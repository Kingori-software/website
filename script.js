
/* =========================================================
   ROTARACT CLUB OF KARATINA UNIVERSITY
   Website JavaScript
   ========================================================= */


/* 1. CLUB PHOTO SLIDESHOW
   Replace these sample URLs with your preferred club photos.
   ========================================================= */

const galleryImages = [
    {
        src: "https://i.ibb.co/ZzNyjtNC/IMG-2047.jpg",
        alt: "Rotaract Club of Karatina University event"
    },
    {
        src: "https://i.ibb.co/8LBfdzdY/IMG-1225.jpg",
        alt: "Rotaract Club members at a community activity"
    },
    {
        src: "https://i.ibb.co/PvkB57Jn/IMG-20261017-173745-271.jpg",
        alt: "Rotaractors participating in club activities"
    },
    {
        src: "https://i.ibb.co/W4KYKKn0/IMG-2064-1.jpg",
        alt: "Rotaract fellowship and memories"
    }
];


/* 2. BOARD MEMBERS
   
   Wait For processing.
   ========================================================= */

const boardMembers = [
    
    {
        name: "Portia Gatihi",
        position: "Club President",
        description: "Provides leadership and strategic direction to the club, ensuring its goals and service objectives are achieved.",
        image:"https://i.ibb.co/wFG1RZvT/IMG-1727.jpg"
    },
{
        name: "Kelvin Gitonga",
        position: "IPP/TRF Director",
        description: "Provides continuity and guidance to the club while promoting Rotary Foundation awareness, contributions, and initiatives.",
        image:"https://i.ibb.co/zHB69J9P/IMG-20261021-WA0032.jpg"
    },
{
        name: "Christabel",
        position: "Finance Director",
        description: "Oversees club finances, maintains accurate financial records, and ensures responsible budgeting and accountability.",
        image:"https://i.ibb.co/Pq1bM4B/IMG-20261017-WA0006-1.jpg"
    },

{
        name: "Boniface",
        position: "Sergeant At Arms",
        description: "Supports the President in club leadership and maintains order, protocol, and proper conduct during meetings and events.",
        image:"https://i.ibb.co/YHXrySd/IMG-20261030-WA0005.jpg"
    },

{
        name: "Sly",
        position: "Secretary",
        description: " Maintains club records, prepares meeting minutes, manages official correspondence, and supports effective administration.",
        image:"https://i.ibb.co/WWMq9fys/IMG-20261018-WA0012.jpg"
    },

{
        name: "Annis",
        position: "Membership and International Service Director – Annis",
        description: "Supports member recruitment, engagement, and retention while promoting international fellowship, collaboration, and service opportunities. ",
        image:"https://i.ibb.co/pvTPTH8x/IMG-20260916-WA0016.jpg"
    },

  {
        name: "Stephen",
        position: "PR & Image Director",
        description: "Sharing our story and showcasing the impact of our club.",
        image: "https://example.com/your-photo.jpg"
    },
{
        name: "Chelangat",
        position: "Service Director",
        description: "Coordinates community service projects and initiatives that address local needs and create meaningful, lasting impact.",
        image:"https://i.ibb.co/DgrM12Q8/IMG-20261016-WA0168.jpg"
    }
    ];


/* 3. UPCOMING EVENTS
   Check the dates and descriptions before publishing.
   ========================================================= */

const events = [
    {
        image: "https://i.ibb.co/JRdwnj72/IMG-20261014-WA0003-1.jpg",
        name: "GAME NIGHT: Play • Connect • Have Fun",
        date: "19",
        month: "OCT",
        time: "6 PM",
        description:
            "Enjoy an evening of games, friendship and fellowship with fellow Rotaractors. Come connect, make memories and have fun together."
    },
    {
        image: "https://i.ibb.co/7cDk3cy/IMG-20261018-WA0055.jpg",
        name: "WORLD POLIO DAY 2026: Walk & Talk",
        date: "24",
        month: "OCT",
        time: "10 AM",
        description:
            "Join us on 24 October 2026 at 10:00 AM. Meet at Kamukunji Grounds, walk around Nyeri Town, and talk at St. Mary's Boys' Secondary School. Everyone is welcome!"
    }
];


/* 4. GENERAL HELPERS
   ========================================================= */

function createElement(tag, className, textContent) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (textContent !== undefined) {
        element.textContent = textContent;
    }

    return element;
}


function createImage(src, alt, className) {
    const image = document.createElement("img");

    image.src = src;
    image.alt = alt || "Rotaract Club photo";
    image.className = className || "";
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("error", function () {
        image.classList.add("image-unavailable");
    });

    return image;
}


/* 5. FOOTER DATE AND YEAR
   ========================================================= */

function updateFooter() {
    const yearElement = document.getElementById("current-year");
    const dateElement = document.getElementById("last-updated");

    const now = new Date();

    if (yearElement) {
        yearElement.textContent = now.getFullYear();
    }

    if (dateElement) {
        dateElement.textContent = new Intl.DateTimeFormat("en-KE", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Africa/Nairobi"
        }).format(now);
    }
}


/* 6. FULL-SIZE IMAGE VIEWER
   Clicking gallery or event images opens the full image.
   ========================================================= */

function setupLightbox() {
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const closeButton = document.getElementById("lightbox-close");
    const backdropButton = document.getElementById("lightbox-backdrop");

    if (
        !lightbox ||
        !lightboxImage ||
        !closeButton ||
        !backdropButton
    ) {
        return;
    }

    let previousFocus = null;

    function openLightbox(src, alt) {
        previousFocus = document.activeElement;

        lightboxImage.src = src;
        lightboxImage.alt = alt || "Full-size club photo";

        if (lightboxCaption) {
            lightboxCaption.textContent = alt || "";
        }

        lightbox.hidden = false;
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-open");

        closeButton.focus();
    }

    function closeLightbox() {
        if (lightbox.hidden) return;

        lightbox.hidden = true;
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-open");

        lightboxImage.src = "";
        lightboxImage.alt = "";

        if (lightboxCaption) {
            lightboxCaption.textContent = "";
        }

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }
    }

    // Event delegation also works for images created later by JavaScript.
    document.addEventListener("click", function (event) {
        const image = event.target.closest(
            ".gallery-image, .event-image, .member-photo"
        );

        if (!image || image.classList.contains("image-unavailable")) {
            return;
        }

        event.preventDefault();

        openLightbox(
            image.currentSrc || image.src,
            image.alt
        );
    });

    closeButton.addEventListener("click", closeLightbox);
    backdropButton.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", function (event) {
        if (lightbox.hidden) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        // Keep keyboard focus within the open viewer.
        if (event.key === "Tab") {
            event.preventDefault();
            closeButton.focus();
        }
    });
}


/* 7. CLUB PHOTO SLIDESHOW
   Duplicate the images to create a continuous scrolling track.
   CSS will control the speed and direction of movement.
   ========================================================= */

function displayGallery() {
    const track = document.getElementById("gallery-track");

    if (!track) return;

    track.replaceChildren();

    if (galleryImages.length === 0) {
        track.appendChild(
            createElement("p", "gallery-empty", "Club photos coming soon.")
        );
        return;
    }

    // Two copies allow the animation to loop continuously.
    const imagesForTrack = [
        ...galleryImages,
        ...galleryImages
    ];

    imagesForTrack.forEach(function (photo, index) {
        const card = createElement("div", "gallery-photo");

        // Mark the duplicate set as decorative for screen readers.
        if (index >= galleryImages.length) {
            card.setAttribute("aria-hidden", "true");
        }

        const image = createImage(
            photo.src,
            photo.alt,
            "gallery-image"
        );

        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", "View full image: " + photo.alt);

        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                image.click();
            }
        });

        card.appendChild(image);
        track.appendChild(card);
    });
}


/* 8. UPCOMING EVENTS
   Wider cards and clickable full-size photos.
   ========================================================= */

function displayEvents() {
    const container = document.getElementById("events-container");

    if (!container) return;

    container.replaceChildren();

    if (events.length === 0) {
        container.appendChild(
            createElement(
                "p",
                "events-empty",
                "New club events will be announced soon."
            )
        );
        return;
    }

    events.forEach(function (event) {
        const card = createElement("article", "event-card");

        const imageWrapper = createElement("div", "event-image-wrapper");

        const image = createImage(
            event.image,
            event.name + " — View full image",
            "event-image"
        );

        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", "View full event image: " + event.name);

        image.addEventListener("keydown", function (keyboardEvent) {
            if (
                keyboardEvent.key === "Enter" ||
                keyboardEvent.key === " "
            ) {
                keyboardEvent.preventDefault();
                image.click();
            }
        });

        const dateBadge = createElement("div", "event-date");

        const day = createElement(
            "span",
            "event-date-number",
            event.date
        );

        const month = createElement(
            "span",
            "event-date-month",
            event.month
        );

        dateBadge.append(day, month);
        imageWrapper.append(image, dateBadge);

        const content = createElement("div", "event-content");

        const title = createElement("h3", "event-title", event.name);

        const time = createElement(
            "p",
            "event-time",
            "Time: " + event.time
        );

        const description = createElement(
            "p",
            "event-description",
            event.description
        );

        content.append(title, time, description);
        card.append(imageWrapper, content);
        container.appendChild(card);
    });
}


/* 9. BOARD MEMBER DATA
   Browser-based edits are local to that browser only.
   ========================================================= */

const BOARD_STORAGE_KEY = "rotaractBoardMembers";

function getSavedBoardMembers() {
    try {
        const saved = localStorage.getItem(BOARD_STORAGE_KEY);

        if (saved !== null) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                return parsed.slice(0, 8);
            }
        }
    } catch (error) {
        console.warn("Unable to load saved board members.", error);
    }

    return boardMembers.slice(0, 8);
}


function saveBoardMembers(members) {
    try {
        localStorage.setItem(
            BOARD_STORAGE_KEY,
            JSON.stringify(members.slice(0, 8))
        );

        return true;
    } catch (error) {
        console.error("Unable to save board members.", error);
        return false;
    }
}


/* 10. DISPLAY BOARD MEMBERS
   Maximum of six profile cards.
   ========================================================= */

function renderBoard() {
    const grid = document.getElementById("board-grid");

    if (!grid) return;

    grid.replaceChildren();

    const members = getSavedBoardMembers().slice(0, 8);

    if (members.length === 0) {
        grid.appendChild(
            createElement(
                "p",
                "board-empty",
                "Our board profiles are coming soon. Meet the people helping our club grow!"
            )
        );
        return;
    }

    members.forEach(function (member) {
        const card = createElement("article", "member-card");
        const photoWrapper = createElement("div", "member-photo-wrap");

        if (member.image) {
            const image = createImage(
                member.image,
                member.name + " — " + member.position,
                "member-photo"
            );

            image.tabIndex = 0;
            image.setAttribute("role", "button");
            image.setAttribute("aria-label", "View full photo of " + member.name);

            image.addEventListener("error", function () {
                const placeholder = createElement(
                    "div",
                    "member-placeholder",
                    (member.name || "?").trim().charAt(0).toUpperCase()
                );

                photoWrapper.replaceChildren(placeholder);
            });

            image.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    image.click();
                }
            });

            photoWrapper.appendChild(image);
        } else {
            photoWrapper.appendChild(
                createElement(
                    "div",
                    "member-placeholder",
                    (member.name || "?").trim().charAt(0).toUpperCase()
                )
            );
        }

        const info = createElement("div", "member-info");

        const name = createElement(
            "h3",
            "member-name",
            member.name || "Board Member"
        );

        const position = createElement(
            "p",
            "member-position",
            member.position || "Club Board"
        );

        const description = createElement(
            "p",
            "member-description",
            member.description || "Serving through leadership and fellowship."
        );

        info.append(name, position, description);
        card.append(photoWrapper, info);
        grid.appendChild(card);
    });
}


/* 11. EXPAND / COLLAPSE BOARD MEMBERS
   ========================================================= */

function setupBoardToggle() {
    const toggle = document.getElementById("board-toggle");
    const content = document.getElementById("board-content");

    if (!toggle || !content) return;

    toggle.setAttribute("aria-expanded", "false");
    content.hidden = true;

    toggle.addEventListener("click", function () {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        const nextState = !expanded;

        toggle.setAttribute("aria-expanded", String(nextState));
        content.hidden = !nextState;

        const label = toggle.querySelector(".toggle-label");
        const symbol = toggle.querySelector(".toggle-symbol");

        if (label) {
            label.textContent = nextState
                ? "Hide Board Members"
                : "See Board Members";
        }

        if (symbol) {
            symbol.textContent = nextState ? "−" : "+";
        }

        if (nextState) {
            renderBoard();
        }
    });
}


/* 12. BOARD EDITOR
   Adds profiles to local browser storage.
   ========================================================= */

function setupBoardEditor() {
    const toggle = document.getElementById("editor-toggle");
    const panel = document.getElementById("board-editor-panel");
    const form = document.getElementById("board-member-form");
    const cancelButton = document.getElementById("cancel-edit");
    const imageInput = document.getElementById("member-image");
    const message = document.getElementById("form-message");

    if (!toggle || !panel || !form) return;

    let selectedImage = "";

    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");

    function showMessage(text, isError) {
        if (!message) return;

        message.textContent = text;
        message.classList.toggle("error", Boolean(isError));
        message.classList.toggle("success", Boolean(text) && !isError);
    }

    toggle.addEventListener("click", function () {
        const open = panel.hidden;

        panel.hidden = !open;
        toggle.setAttribute("aria-expanded", String(open));

        if (open) {
            panel.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    });

    if (imageInput) {
        imageInput.addEventListener("change", function () {
            const file = imageInput.files && imageInput.files[0];

            selectedImage = "";

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                imageInput.value = "";
                showMessage("Please select a valid image.", true);
                return;
            }

            if (file.size > 1.5 * 1024 * 1024) {
                imageInput.value = "";
                showMessage(
                    "Please choose an image smaller than 1.5 MB.",
                    true
                );
                return;
            }

            const reader = new FileReader();

            reader.onload = function () {
                selectedImage = String(reader.result || "");
                showMessage("Image loaded and ready to save.", false);
            };

            reader.onerror = function () {
                selectedImage = "";
                showMessage("Unable to read that image. Please try again.", true);
            };

            reader.readAsDataURL(file);
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("member-name");
        const positionInput = document.getElementById("member-position");
        const descriptionInput = document.getElementById("member-description");

        if (!nameInput || !positionInput || !descriptionInput) return;

        const name = nameInput.value.trim();
        const position = positionInput.value.trim();
        const description = descriptionInput.value.trim();

        if (!name || !position || !description) {
            showMessage("Please complete all required fields.", true);
            return;
        }

        const members = getSavedBoardMembers();

        if (members.length >= 8) {
            showMessage(
                "You have reached the six-member limit. Update the boardMembers list in script.js to replace profiles.",
                true
            );
            return;
        }

        members.push({
            name: name,
            position: position,
            description: description,
            image: selectedImage
        });

        if (!saveBoardMembers(members)) {
            showMessage(
                "Saving failed. Try a smaller image or use a public image URL in script.js.",
                true
            );
            return;
        }

        form.reset();
        selectedImage = "";

        renderBoard();

        showMessage(
            "Profile added in this browser only. It is not yet published to all visitors.",
            false
        );
    });

    if (cancelButton) {
        cancelButton.addEventListener("click", function () {
            form.reset();
            selectedImage = "";
            showMessage("", false);
        });
    }
}


/* 13. START EVERYTHING
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    updateFooter();
    setupLightbox();
    displayGallery();
    displayEvents();
    renderBoard();
    setupBoardToggle();
    setupBoardEditor();
});

