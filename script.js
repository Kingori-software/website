
/* =========================================================
   ROTARACT CLUB OF KARATINA UNIVERSITY
   Website JavaScript
   ========================================================= */


/* 1. CLUB PHOTO SLIDESHOW
   Add or replace photo URLs in this list.
   The slideshow duplicates the photos for a continuous loop.
   ========================================================= */

const galleryImages = [
    {
        src: "https://i.ibb.co/JRdwnj72/IMG-20261014-WA0003-1.jpg",
        alt: "Rotaract Club of Karatina University event"
    },
    {
        src: "https://i.ibb.co/7cDk3cy/IMG-20261018-WA0055.jpg",
        alt: "Rotaract Club community activity"
    },
    {
        src: "https://i.ibb.co/JRdwnj72/IMG-20261014-WA0003-1.jpg",
        alt: "Rotaract Club fellowship"
    },
    {
        src: "https://i.ibb.co/7cDk3cy/IMG-20261018-WA0055.jpg",
        alt: "Rotaractors working together"
    }
];


/* 2. BOARD MEMBERS
   Add up to six board members here.
   Replace the example details with real information.
   Use public image URLs for profile pictures.
   ========================================================= */

const boardMembers = [
    /*
    {
        name: "Portia Gatihi",
        position: "Club President",
        description: "Leading the club with purpose, teamwork and service.",
        image: "https://example.com/president-photo.jpg"
    },
    {
        name: "Your Name",
        position: "PR & Image Director",
        description: "Sharing our story and highlighting the impact of our club.",
        image: "https://example.com/your-photo.jpg"
    }
    */
];


/* 3. CLUB EVENTS
   Update the details below whenever new events are announced.
   ========================================================= */

const events = [
    {
        image: "https://i.ibb.co/JRdwnj72/IMG-20261014-WA0003-1.jpg",
        name: "GAME NIGHT: Play • Connect • Have Fun",
        date: "19",
        month: "OCT",
        time: "6 PM",
        description:
            "Get ready for an evening of fun, games and fellowship with fellow Rotaractors. Come connect, make memories and enjoy the experience together."
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


/* 4. FOOTER: CURRENT YEAR AND LAST UPDATED DATE
   Uses East African Time for the displayed date.
   ========================================================= */

function updateFooter() {
    const yearElement = document.getElementById("current-year");
    const updatedElement = document.getElementById("last-updated");

    const now = new Date();

    if (yearElement) {
        yearElement.textContent = now.getFullYear();
    }

    if (updatedElement) {
        updatedElement.textContent = new Intl.DateTimeFormat("en-KE", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Africa/Nairobi"
        }).format(now);
    }
}


/* 5. IMAGE HELPER
   Creates images safely and handles unavailable images.
   ========================================================= */

function createImageCard(src, alt, className) {
    const image = document.createElement("img");

    image.src = src;
    image.alt = alt;
    image.className = className || "";
    image.loading = "lazy";
    image.decoding = "async";

    image.addEventListener("error", function () {
        image.classList.add("image-unavailable");
        image.alt = "Image temporarily unavailable";
    });

    return image;
}


/* 6. DISPLAY THE AUTOMATIC PHOTO SLIDESHOW
   The second copy makes the horizontal animation loop smoothly.
   ========================================================= */

function displayGallery() {
    const track = document.getElementById("gallery-track");

    if (!track) return;

    track.replaceChildren();

    if (galleryImages.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Club photos will appear here soon.";
        track.appendChild(message);
        return;
    }

    const allImages = [
        ...galleryImages,
        ...galleryImages
    ];

    allImages.forEach(function (photo, index) {
        const photoCard = document.createElement("div");
        photoCard.className = "gallery-photo";

        // Mark duplicated images as decorative for screen readers.
        if (index >= galleryImages.length) {
            photoCard.setAttribute("aria-hidden", "true");
        }

        const image = createImageCard(
            photo.src,
            photo.alt,
            "gallery-image"
        );

        photoCard.appendChild(image);
        track.appendChild(photoCard);
    });
}


/* 7. DISPLAY EVENTS
   Builds the event cards using the information above.
   ========================================================= */

function displayEvents() {
    const container = document.getElementById("events-container");

    if (!container) return;

    container.replaceChildren();

    if (events.length === 0) {
        const message = document.createElement("p");
        message.textContent = "New club events will be announced soon.";
        container.appendChild(message);
        return;
    }

    events.forEach(function (event) {
        const card = document.createElement("article");
        card.className = "event-card reveal";

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "event-image-wrapper";

        const image = createImageCard(
            event.image,
            event.name,
            "event-image"
        );

        const dateBadge = document.createElement("div");
        dateBadge.className = "event-date";

        const dateNumber = document.createElement("span");
        dateNumber.className = "event-date-number";
        dateNumber.textContent = event.date;

        const dateMonth = document.createElement("span");
        dateMonth.className = "event-date-month";
        dateMonth.textContent = event.month;

        dateBadge.append(dateNumber, dateMonth);
        imageWrapper.append(image, dateBadge);

        const content = document.createElement("div");
        content.className = "event-content";

        const title = document.createElement("h3");
        title.className = "event-title";
        title.textContent = event.name;

        const time = document.createElement("p");
        time.className = "event-time";
        time.textContent = "🕒 " + event.time;

        const description = document.createElement("p");
        description.className = "event-description";
        description.textContent = event.description;

        content.append(title, time, description);
        card.append(imageWrapper, content);
        container.appendChild(card);
    });
}


/* 8. BOARD MEMBER STORAGE
   Board edits are saved in this browser using localStorage.
   Important: these changes do not automatically update the
   website for other visitors or devices.
   ========================================================= */

const BOARD_STORAGE_KEY = "rotaractBoardMembers";

function getSavedBoardMembers() {
    try {
        const saved = localStorage.getItem(BOARD_STORAGE_KEY);

        if (saved !== null) {
            const parsed = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                return parsed.slice(0, 6);
            }
        }
    } catch (error) {
        console.warn("Could not load saved board members:", error);
    }

    return boardMembers.slice(0, 6);
}

function saveBoardMembers(members) {
    try {
        localStorage.setItem(
            BOARD_STORAGE_KEY,
            JSON.stringify(members.slice(0, 6))
        );

        return true;
    } catch (error) {
        console.error("Could not save board members:", error);
        return false;
    }
}


/* 9. RENDER BOARD MEMBER CARDS
   Displays a maximum of six board members.
   ========================================================= */

function renderBoard() {
    const grid = document.getElementById("board-grid");

    if (!grid) return;

    grid.replaceChildren();

    const members = getSavedBoardMembers().slice(0, 6);

    if (members.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "board-empty";
        emptyMessage.textContent =
            "Our board profiles are coming soon. Meet the people helping our club grow!";

        grid.appendChild(emptyMessage);
        return;
    }

    members.forEach(function (member) {
        const card = document.createElement("article");
        card.className = "member-card";

        const photoWrapper = document.createElement("div");
        photoWrapper.className = "member-photo-wrap";

        if (member.image) {
            const image = createImageCard(
                member.image,
                member.name + " — " + member.position,
                "member-photo"
            );

            image.addEventListener("error", function () {
                const placeholder = document.createElement("div");
                placeholder.className = "member-placeholder";
                placeholder.textContent =
                    (member.name || "?").trim().charAt(0).toUpperCase();

                photoWrapper.replaceChildren(placeholder);
            });

            photoWrapper.appendChild(image);
        } else {
            const placeholder = document.createElement("div");
            placeholder.className = "member-placeholder";
            placeholder.textContent =
                (member.name || "?").trim().charAt(0).toUpperCase();

            photoWrapper.appendChild(placeholder);
        }

        const info = document.createElement("div");
        info.className = "member-info";

        const name = document.createElement("h3");
        name.className = "member-name";
        name.textContent = member.name || "Board Member";

        const position = document.createElement("p");
        position.className = "member-position";
        position.textContent = member.position || "Club Board";

        const description = document.createElement("p");
        description.className = "member-description";
        description.textContent =
            member.description || "Serving through leadership and fellowship.";

        info.append(name, position, description);
        card.append(photoWrapper, info);
        grid.appendChild(card);
    });
}


/* 10. EXPAND AND COLLAPSE THE BOARD SECTION
   ========================================================= */

function setupBoardToggle() {
    const toggle = document.getElementById("board-toggle");
    const content = document.getElementById("board-content");

    if (!toggle || !content) return;

    toggle.setAttribute("aria-expanded", "false");
    content.hidden = true;

    toggle.addEventListener("click", function () {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        const shouldExpand = !isExpanded;

        toggle.setAttribute("aria-expanded", String(shouldExpand));
        content.hidden = !shouldExpand;

        const label = toggle.querySelector(".toggle-label");
        const symbol = toggle.querySelector(".toggle-symbol");

        if (label) {
            label.textContent = shouldExpand
                ? "Hide Board Members"
                : "See Board Members";
        }

        if (symbol) {
            symbol.textContent = shouldExpand ? "−" : "+";
        }

        if (shouldExpand) {
            renderBoard();
        }
    });
}


/* 11. BOARD MEMBER EDITOR
   Allows a person using this browser to add/edit up to six cards.
   ========================================================= */

function setupBoardEditor() {
    const editorToggle = document.getElementById("editor-toggle");
    const editorPanel = document.getElementById("board-editor-panel");
    const form = document.getElementById("board-member-form");
    const cancelButton = document.getElementById("cancel-edit");
    const imageInput = document.getElementById("member-image");
    const message = document.getElementById("form-message");

    if (!editorToggle || !editorPanel || !form) return;

    let selectedImage = "";

    editorPanel.hidden = true;

    editorToggle.addEventListener("click", function () {
        editorPanel.hidden = !editorPanel.hidden;

        editorToggle.setAttribute(
            "aria-expanded",
            String(!editorPanel.hidden)
        );

        if (!editorPanel.hidden) {
            editorPanel.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    });

    if (imageInput) {
        imageInput.addEventListener("change", function () {
            const file = imageInput.files && imageInput.files[0];

            if (!file) {
                selectedImage = "";
                return;
            }

            if (!file.type.startsWith("image/")) {
                showFormMessage("Please choose a valid image file.", true);
                imageInput.value = "";
                selectedImage = "";
                return;
            }

            // Keep files small to reduce browser storage problems.
            const maxSize = 1.5 * 1024 * 1024;

            if (file.size > maxSize) {
                showFormMessage(
                    "Please choose an image smaller than 1.5 MB.",
                    true
                );

                imageInput.value = "";
                selectedImage = "";
                return;
            }

            const reader = new FileReader();

            reader.onload = function () {
                selectedImage = String(reader.result || "");
                showFormMessage("Image ready to save.", false);
            };

            reader.onerror = function () {
                selectedImage = "";
                showFormMessage("Could not read that image. Try another.", true);
            };

            reader.readAsDataURL(file);
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("member-name");
        const positionInput = document.getElementById("member-position");
        const descriptionInput = document.getElementById("member-description");

        if (!nameInput || !positionInput || !descriptionInput) {
            showFormMessage("The board form is missing a field.", true);
            return;
        }

        const name = nameInput.value.trim();
        const position = positionInput.value.trim();
        const description = descriptionInput.value.trim();

        if (!name || !position || !description) {
            showFormMessage(
                "Please fill in the name, position and description.",
                true
            );
            return;
        }

        const members = getSavedBoardMembers();

        if (members.length >= 6) {
            showFormMessage(
                "The board section is limited to six members. Edit your board member list in the script to change existing profiles.",
                true
            );
            return;
        }

        const newMember = {
            name: name,
            position: position,
            description: description,
            image: selectedImage
        };

        members.push(newMember);

        if (!saveBoardMembers(members)) {
            showFormMessage(
                "Could not save. Try a smaller image or use a public image URL in script.js.",
                true
            );
            return;
        }

        form.reset();
        selectedImage = "";

        renderBoard();

        showFormMessage(
            "Board member added in this browser. Remember: this does not publish the change for other visitors.",
            false
        );
    });

    if (cancelButton) {
        cancelButton.addEventListener("click", function () {
            form.reset();
            selectedImage = "";
            showFormMessage("", false);
        });
    }

    function showFormMessage(text, isError) {
        if (!message) return;

        message.textContent = text;
        message.classList.toggle("error", Boolean(isError));
        message.classList.toggle("success", Boolean(text) && !isError);
    }
}


/* 12. SCROLL REVEAL ANIMATIONS
   Elements with the .reveal class appear as you scroll.
   ========================================================= */

function setupRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
        elements.forEach(function (element) {
            element.classList.add("visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        function (entries, currentObserver) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elements.forEach(function (element) {
        observer.observe(element);
    });
}


/* 13. START THE WEBSITE FEATURES
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    updateFooter();
    displayGallery();
    displayEvents();
    renderBoard();
    setupBoardToggle();
    setupBoardEditor();
    setupRevealAnimations();
});
