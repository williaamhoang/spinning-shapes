document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.getElementById("terminal");
    const output = document.getElementById("output");
    const folderLine = document.getElementById("line-1");

    let step = 0; // Track progression
    let currentHighlightIndex = 0;
    const shapes = ["Sphere", "Cube", "Pyramid"];

    // Listen for Enter key
    document.addEventListener("keydown", (event) => {
        if (step === 0 && event.key === "Enter") {
            // Remove blinking aniation and show contents
            folderLine.innerHTML = `<span class="folder">Shapes:</span>`;
            displayShapeList();
            step++;
        } else if (step === 1) {
            // Arrow key navigation
            if (event.key === "ArrowDown") {
                moveHighlight(1);
            } else if (event.key === "ArrowUp") {
                moveHighlight(-1);
            } else if (event.key === "Enter") {
                // Open mini-terminal for the highlighted shape
                openMiniTerminal(shapes[currentHighlightIndex]);
            }
        }
    });

    // Function to display shapes with folder-like indentation
    function displayShapeList() {
        const shapesHTML = shapes
            .map((shape, index) => 
                `<div class="indent${index === 0 ? ' highlight' : ''}" data-index="${index}">
                    <span class="dash">| = =</span> ${shape}
                </div>`
            )
            .join("");
        output.innerHTML += shapesHTML;
    }

    // Function to handle navigation
    function moveHighlight(direction) {
        const shapeElements = document.querySelectorAll(".indent");
        shapeElements[currentHighlightIndex].classList.remove("highlight");

        currentHighlightIndex += direction;
        if (currentHighlightIndex < 0) currentHighlightIndex = shapes.length - 1;
        if (currentHighlightIndex >= shapes.length) currentHighlightIndex = 0;

        shapeElements[currentHighlightIndex].classList.add("highlight");
    }

    function openMiniTerminal(shape) {
        // Create a mini-terminal div
        const miniTerminal = document.createElement("div");
        miniTerminal.id = "mini-terminal";
        miniTerminal.innerHTML = `
            <div><strong>${shape} Terminal: </strong></div>
            <div>Details about the ${shape} go here...</div>
        `;
        terminal.appendChild(miniTerminal);

        // Close mini-terminal on Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                terminal.removeChild(miniTerminal);
            }
        });

    }
});
