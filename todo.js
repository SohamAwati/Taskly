// On click toggle dark mode
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Save to localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// On page load: apply saved theme
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
});


// Sidebar Toggle
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const weatherCard = document.getElementById("weather-card");

  sidebar.classList.toggle("collapsed");

  // Hide or show weather card
  if (weatherCard) {
    weatherCard.classList.toggle("hidden");
  }
}

// Active Sidebar Item
function setActive(element) {
  document.querySelectorAll(".sidebar-item").forEach(item => item.classList.remove("active"));
  element.classList.add("active");
}

// Add Task Functionality
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  const previewArea = document.getElementById("task-preview-area");

  if (taskText === "") return;

  // Create preview task container
  const previewTask = document.createElement("div");
  previewTask.className = "task-preview-item";

  // Task content
  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;

  // Remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.innerHTML = "<i class='fa fa-trash'></i>";
  removeBtn.onclick = () => previewArea.removeChild(previewTask);

  // Append content & button to task
  previewTask.appendChild(taskContent);
  previewTask.appendChild(removeBtn);

  // Add task to the bottom of the preview area
  previewArea.appendChild(previewTask);

  // Clear input
  taskInput.value = "";
}



// Drag and Drop Tasks
function enableDragAndDrop() {
    let tasks = document.querySelectorAll("#task-list li");
    tasks.forEach(task => {
        task.setAttribute("draggable", true);
        task.addEventListener("dragstart", () => task.classList.add("dragging"));
        task.addEventListener("dragend", () => task.classList.remove("dragging"));
    });
}

enableDragAndDrop();

// Calendar Initialization
function initializeCalendar() {
    var calendarEl = document.getElementById("calendar-widget");
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        editable: true,
        selectable: true,
        dayMaxEvents: true,
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
        },
        events: [
            { title: "Project Deadline", start: "2025-02-25", backgroundColor: "#ff4757" },
            { title: "Meeting", start: "2025-02-27", backgroundColor: "#1e90ff" }
        ],
        dateClick: function(info) {
            let eventName = prompt("Enter Event Name:");
            if (eventName) {
                calendar.addEvent({ title: eventName, start: info.dateStr });
            }
        },
        eventClick: function(info) {
            if (confirm("Delete this event?")) {
                info.event.remove();
            }
        }
    });
    calendar.render();
}

// Auto Dark Mode
function autoDarkMode() {
    let hour = new Date().getHours();
    if (hour >= 18 || hour < 6) {
        document.body.classList.add("dark-mode");
    }
}


// OpenWeatherMap API Key
const API_KEY = '9505fd1df737e20152fbd78cdb289b6a'; // Replace with your actual API key

// Fetch weather using user's current location
async function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

            await getWeatherData(url);
        });
    } else {
        document.getElementById("weather-location").innerText = "Location access denied";
    }
}

// Fetch weather for a specific city
async function fetchWeatherByCity() {
    const city = document.getElementById("city-search").value;
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    await getWeatherData(url);
}

// Fetch data from OpenWeatherMap and update UI
async function getWeatherData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById("weather-location").innerText = data.name;
            document.getElementById("weather-temp").innerText = `${data.main.temp}°C`;
            document.getElementById("weather-condition").innerText = data.weather[0].description;
            document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        } else {
            alert("City not found! Please enter a valid city name.");
        }
    } catch (error) {
        console.error("Weather API error:", error);
        document.getElementById("weather-location").innerText = "Weather Unavailable";
    }
}

// Call function when page loads
fetchWeatherByLocation();

document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.getElementById("chatbot-container");

    chatbotToggle.addEventListener("click", function () {
        if (chatbotContainer.style.display === "none" || chatbotContainer.style.display === "") {
            chatbotContainer.style.display = "block";
        } else {
            chatbotContainer.style.display = "none";
        }
    });
});

document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
});

function toggleCalendar() {
  const calendar = document.getElementById("calendar-container");
  const isOpen = calendar.style.right === "0px";

  calendar.style.right = isOpen ? "-50vw" : "0px";
}

// Toggle settings panel
    function toggleSettingsPanel() {
      const panel = document.getElementById('settings-panel');
      panel.classList.toggle('hidden');
    }

    // Theme handler
    function changeTheme(theme) {
      document.body.classList.remove("default", "dark", "pastel", "custom");
      if (theme !== "default") {
        document.body.classList.add(theme);
      }
      localStorage.setItem("selectedTheme", theme);
      document.getElementById("custom-theme-color").classList.toggle("hidden", theme !== "custom");
    }

    function applyCustomTheme(color) {
      document.documentElement.style.setProperty('--custom-color', color);
      localStorage.setItem("customThemeColor", color);
    }

    // Font
    function changeFont(font) {
      document.body.style.fontFamily = font;
      localStorage.setItem("selectedFont", font);
    }

    // Font size
    function changeFontSize(size) {
      document.body.style.fontSize = `${size}px`;
      document.getElementById("font-size-value").textContent = `${size}px`;
      localStorage.setItem("selectedFontSize", size);
    }

    // UI Mode
    function switchUITheme(mode) {
      document.body.classList.remove("light", "dark", "auto");
      document.body.classList.add(mode);
      localStorage.setItem("selectedUIMode", mode);
    }

    // Save Button Logic
    document.getElementById("save-settings").addEventListener("click", () => {
      const theme = document.getElementById("theme-selector").value;
      const font = document.getElementById("font-selector").value;
      const fontSize = document.getElementById("font-size").value;
      const uiMode = document.getElementById("ui-mode").value;
      const customColor = document.getElementById("custom-theme-color").value;

      changeTheme(theme);
      changeFont(font);
      changeFontSize(fontSize);
      switchUITheme(uiMode);

      if (theme === "custom") {
        applyCustomTheme(customColor);
      }

      alert("✅ Settings Saved!");
      document.getElementById("settings-panel").classList.add("hidden");
    });



    // Load saved settings on page load
    window.addEventListener("DOMContentLoaded", () => {
      const savedTheme = localStorage.getItem("selectedTheme") || "default";
      changeTheme(savedTheme);
      document.getElementById("theme-selector").value = savedTheme;

      if (savedTheme === "custom") {
        const customColor = localStorage.getItem("customThemeColor") || "#ffffff";
        applyCustomTheme(customColor);
        document.getElementById("custom-theme-color").value = customColor;
      }

      const savedFont = localStorage.getItem("selectedFont");
      if (savedFont) {
        changeFont(savedFont);
        document.getElementById("font-selector").value = savedFont;
      }

      const savedFontSize = localStorage.getItem("selectedFontSize");
      if (savedFontSize) {
        changeFontSize(savedFontSize);
        document.getElementById("font-size").value = savedFontSize;
      }

      const savedUIMode = localStorage.getItem("selectedUIMode") || "light";
      switchUITheme(savedUIMode);
      document.getElementById("ui-mode").value = savedUIMode;
    });

    

