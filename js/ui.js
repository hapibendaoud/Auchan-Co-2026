// Current layout mode state ("grid" or "list")
let currentViewMode = localStorage.getItem("viewMode") || "grid";

/**
 * Initializes the view switcher controls inside #view-switcher-container.
 */
export function initViewSwitcher(onToggleCallback) {
    const container = document.getElementById("view-switcher-container");
    if (!container) return;

    container.innerHTML = `
        <div class="flex items-center bg-gray-200 p-1 rounded-lg border border-gray-300 gap-1">
            <button id="grid-view-btn" type="button" title="Grid View" 
                class="p-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z"/>
                </svg>
            </button>
            <button id="list-view-btn" type="button" title="List View" 
                class="p-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center">
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
                </svg>
            </button>
        </div>
    `;

    const gridBtn = document.getElementById("grid-view-btn");
    const listBtn = document.getElementById("list-view-btn");

    updateSwitcherUI(gridBtn, listBtn);

    gridBtn?.addEventListener("click", () => {
        if (currentViewMode !== "grid") {
            currentViewMode = "grid";
            localStorage.setItem("viewMode", "grid");
            updateSwitcherUI(gridBtn, listBtn);
            if (typeof onToggleCallback === "function") onToggleCallback();
        }
    });

    listBtn?.addEventListener("click", () => {
        if (currentViewMode !== "list") {
            currentViewMode = "list";
            localStorage.setItem("viewMode", "list");
            updateSwitcherUI(gridBtn, listBtn);
            if (typeof onToggleCallback === "function") onToggleCallback();
        }
    });
}

function updateSwitcherUI(gridBtn, listBtn) {
    const activeClasses = ["bg-white", "text-red-600", "shadow-sm"];
    const inactiveClasses = ["text-gray-500", "hover:text-gray-800"];

    if (currentViewMode === "grid") {
        gridBtn?.classList.add(...activeClasses);
        gridBtn?.classList.remove(...inactiveClasses);
        listBtn?.classList.remove(...activeClasses);
        listBtn?.classList.add(...inactiveClasses);
    } else {
        listBtn?.classList.add(...activeClasses);
        listBtn?.classList.remove(...inactiveClasses);
        gridBtn?.classList.remove(...activeClasses);
        gridBtn?.classList.add(...inactiveClasses);
    }
}

export function getCurrentViewMode() {
    return currentViewMode;
}