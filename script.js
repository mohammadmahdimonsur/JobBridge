// Job data with URLs for navigation
const jobData = [
    // Job Roles
    { type: 'role', name: 'Software Engineer', icon: 'bi-code-slash', url: '/jobs/software-engineer' },
    { type: 'role', name: 'Frontend Developer', icon: 'bi-laptop', url: '/jobs/frontend-developer' },
    { type: 'role', name: 'Backend Developer', icon: 'bi-server', url: '/jobs/backend-developer' },
    { type: 'role', name: 'Full Stack Developer', icon: 'bi-layers', url: '/jobs/full-stack-developer' },
    { type: 'role', name: 'DevOps Engineer', icon: 'bi-gear', url: '/jobs/devops-engineer' },
    { type: 'role', name: 'Data Scientist', icon: 'bi-graph-up', url: '/jobs/data-scientist' },
    { type: 'role', name: 'Product Manager', icon: 'bi-kanban', url: '/jobs/product-manager' },
    { type: 'role', name: 'UX Designer', icon: 'bi-palette', url: '/jobs/ux-designer' },
    { type: 'role', name: 'Marketing Manager', icon: 'bi-megaphone', url: '/jobs/marketing-manager' },
    
    // Companies
    { type: 'company', name: 'Google', icon: 'bi-building', logo: 'https://logo.clearbit.com/google.com', url: '/companies/google' },
    { type: 'company', name: 'Microsoft', icon: 'bi-building', logo: 'https://logo.clearbit.com/microsoft.com', url: '/companies/microsoft' },
    { type: 'company', name: 'Apple', icon: 'bi-building', logo: 'https://logo.clearbit.com/apple.com', url: '/companies/apple' },
    { type: 'company', name: 'Amazon', icon: 'bi-building', logo: 'https://logo.clearbit.com/amazon.com', url: '/companies/amazon' },
    { type: 'company', name: 'Meta', icon: 'bi-building', logo: 'https://logo.clearbit.com/meta.com', url: '/companies/meta' }
];

// Location data with URLs
const locationData = [
    // Bangladesh
    { type: 'city', name: 'Dhaka', country: 'Bangladesh', icon: 'bi-geo-alt', url: '/locations/dhaka' },
    { type: 'city', name: 'Sylhet', country: 'Bangladesh', icon: 'bi-geo-alt', url: '/locations/sylhet' },
    { type: 'city', name: 'Chittagong', country: 'Bangladesh', icon: 'bi-geo-alt', url: '/locations/chittagong' },
    
    // USA
    { type: 'city', name: 'New York', country: 'USA', icon: 'bi-geo-alt', url: '/locations/new-york' },
    { type: 'city', name: 'San Francisco', country: 'USA', icon: 'bi-geo-alt', url: '/locations/san-francisco' },
    { type: 'city', name: 'Los Angeles', country: 'USA', icon: 'bi-geo-alt', url: '/locations/los-angeles' },
    
    // Other major cities
    { type: 'city', name: 'London', country: 'UK', icon: 'bi-geo-alt', url: '/locations/london' },
    { type: 'city', name: 'Tokyo', country: 'Japan', icon: 'bi-geo-alt', url: '/locations/tokyo' },
    { type: 'city', name: 'Singapore', country: 'Singapore', icon: 'bi-geo-alt', url: '/locations/singapore' },
    
    // Countries
    { type: 'country', name: 'United States', icon: 'bi-globe', url: '/locations/usa' },
    { type: 'country', name: 'United Kingdom', icon: 'bi-globe', url: '/locations/uk' },
    { type: 'country', name: 'Bangladesh', icon: 'bi-globe', url: '/locations/bangladesh' },
    
    // Remote options
    { type: 'remote', name: 'Remote', icon: 'bi-house', url: '/jobs/remote' },
    { type: 'remote', name: 'Work from Home', icon: 'bi-house', url: '/jobs/remote' }
];

// DOM elements
const jobSearchInput = document.getElementById('jobSearch');
const locationSearchInput = document.getElementById('locationSearch');
const jobResults = document.getElementById('jobResults');
const locationResults = document.getElementById('locationResults');
const searchButton = document.getElementById('searchButton');
const flashMessage = document.getElementById('flashMessage');
const searchContainer = document.querySelector('.search-container');

/**
 * Manages search container height when dropdown is active
 */
function manageContainerHeight() {
    const isJobActive = jobResults.classList.contains('active');
    const isLocationActive = locationResults.classList.contains('active');
    
    if (isJobActive || isLocationActive) {
        searchContainer.classList.add('dropdown-active');
    } else {
        searchContainer.classList.remove('dropdown-active');
    }
}

/**
 * Shows a flash message that disappears automatically
 */
function showFlashMessage(message, type = 'info', duration = 3000) {
    flashMessage.textContent = message;
    flashMessage.className = `flash-message ${type}`;
    flashMessage.classList.add('show');
    
    setTimeout(() => {
        flashMessage.classList.remove('show');
    }, duration);
}

/**
 * Truncates text to specified length and adds ellipsis
 */
function truncateText(text, maxLength = 8) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Filters data based on user input
 */
function filterData(data, query) {
    if (!query) return [];
    
    const exactMatches = data.filter(item => 
        item.name.toLowerCase() === query.toLowerCase()
    );
    
    const partialMatches = data.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) && 
        !exactMatches.includes(item)
    );
    
    return [...exactMatches, ...partialMatches].slice(0, 6);
}

/**
 * Generates location suggestions including current location option
 */
function generateLocationSuggestions(query) {
    if (!query) return [];
    
    const suggestions = [];
    
    // Add current location detection option for short queries
    if (query.length <= 2) {
        suggestions.push({
            type: 'suggestion',
            name: 'Use my current location',
            icon: 'bi-crosshair',
            action: 'detectLocation'
        });
    }
    
    // Add filtered location matches
    const locationMatches = filterData(locationData, query);
    suggestions.push(...locationMatches);
    
    // Create custom search suggestion for unknown locations
    if (locationMatches.length === 0 && query.length > 2) {
        const truncatedQuery = truncateText(query);
        suggestions.push({
            type: 'custom',
            name: `Search for "${truncatedQuery}"`,
            icon: 'bi-search',
            query: query
        });
    }
    
    return suggestions;
}

/**
 * Clears active states from all autocomplete items
 */
function clearActiveItems(container) {
    const items = container.querySelectorAll('.autocomplete-item');
    items.forEach(item => item.classList.remove('active'));
}

/**
 * Sets active state on an autocomplete item
 */
function setActiveItem(container, index) {
    const items = container.querySelectorAll('.autocomplete-item');
    if (items.length > 0 && index >= 0 && index < items.length) {
        clearActiveItems(container);
        items[index].classList.add('active');
        // Scroll into view if needed
        items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
}

/**
 * Displays autocomplete results
 */
function displayResults(results, container, input, type) {
    container.innerHTML = '';
    clearActiveItems(container);
    
    if (results.length === 0) {
        container.classList.remove('active');
        manageContainerHeight();
        return;
    }
    
    results.forEach((item, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'autocomplete-item';
        resultItem.dataset.index = index;
        
        // Truncate display text if it's a custom search suggestion
        let displayText = item.name;
        if (item.type === 'custom' && item.name.length > 20) {
            displayText = truncateText(item.name, 20);
        }
        
        let badgeText = '';
        if (item.type === 'role') badgeText = 'Role';
        else if (item.type === 'company') badgeText = 'Company';
        else if (item.type === 'city') badgeText = item.country;
        else if (item.type === 'country') badgeText = 'Country';
        else if (item.type === 'remote') badgeText = 'Remote';
        else if (item.type === 'suggestion') badgeText = 'Suggestion';
        else if (item.type === 'custom') badgeText = 'Search';
        
        // Create icon HTML
        let iconHTML = '';
        if (item.logo) {
            iconHTML = `<img src="${item.logo}" class="company-logo" alt="${item.name} logo" onerror="this.style.display='none'">`;
        } else {
            iconHTML = `<i class="${item.icon}"></i>`;
        }
        
        // Build result item
        resultItem.innerHTML = `
            ${iconHTML}
            <span class="truncate-text">${displayText}</span>
            ${badgeText ? `<span class="location-badge">${badgeText}</span>` : ''}
        `;
        
        // Add click handler
        resultItem.addEventListener('click', () => {
            if (item.action === 'detectLocation') {
                detectUserLocation();
            } else if (item.type === 'custom') {
                input.value = item.query;
                container.classList.remove('active');
                manageContainerHeight();
            } else {
                input.value = item.name;
                container.classList.remove('active');
                manageContainerHeight();
                
                // Navigate directly if URL exists
                if (item.url && type === 'job') {
                    navigateToResults(item.url, input.value, '');
                }
            }
        });
        
        // Add hover effects
        resultItem.addEventListener('mouseenter', () => {
            clearActiveItems(container);
            resultItem.classList.add('active');
        });
        
        container.appendChild(resultItem);
    });
    
    container.classList.add('active');
    manageContainerHeight();
}

/**
 * Detects user's current location
 */
function detectUserLocation() {
    if (!navigator.geolocation) {
        showFlashMessage('Geolocation is not supported by your browser', 'error');
        return;
    }
    
    locationSearchInput.value = 'Detecting location...';
    locationSearchInput.disabled = true;
    locationResults.classList.remove('active');
    manageContainerHeight();
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                .then(response => response.json())
                .then(data => {
                    const city = data.city || data.locality;
                    const country = data.countryName;
                    
                    if (city && country) {
                        locationSearchInput.value = `${city}, ${country}`;
                        showFlashMessage(`Location detected: ${city}, ${country}`, 'success');
                    } else {
                        locationSearchInput.value = 'Location detected';
                    }
                    locationSearchInput.disabled = false;
                })
                .catch(error => {
                    console.error('Geocoding error:', error);
                    locationSearchInput.value = 'Unable to detect location';
                    locationSearchInput.disabled = false;
                    showFlashMessage('Failed to detect location', 'error');
                });
        },
        (error) => {
            console.error('Geolocation error:', error);
            locationSearchInput.value = 'Location access denied';
            locationSearchInput.disabled = false;
            showFlashMessage('Location access denied. Please enable location services.', 'error');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}

/**
 * Navigates to search results page
 */
function navigateToResults(jobUrl, jobQuery, locationQuery) {
    // Show loading state
    showFlashMessage('Searching for jobs...', 'info', 2000);
    
    // Simulate API call delay
    setTimeout(() => {
        // Check if we have exact matches
        const exactJobMatch = jobData.find(item => 
            item.name.toLowerCase() === jobQuery.toLowerCase()
        );
        
        const exactLocationMatch = locationData.find(item => 
            item.name.toLowerCase() === locationQuery.toLowerCase()
        );
        
        if (exactJobMatch || exactLocationMatch) {
            // Navigate to results page (replace with your actual navigation)
            console.log('Navigating to results page with:', { jobQuery, locationQuery });
            // window.location.href = `/search?job=${encodeURIComponent(jobQuery)}&location=${encodeURIComponent(locationQuery)}`;
            showFlashMessage('Found matching jobs!', 'success');
        } else {
            showFlashMessage('No jobs found for your search', 'error');
        }
    }, 1000);
}

/**
 * Executes the search
 */
function executeSearch() {
    const jobQuery = jobSearchInput.value.trim();
    const locationQuery = locationSearchInput.value.trim();
    
    if (!jobQuery && !locationQuery) {
        showFlashMessage('Please enter job title or location', 'error');
        return;
    }
    
    // Close any open dropdowns
    jobResults.classList.remove('active');
    locationResults.classList.remove('active');
    manageContainerHeight();
    
    navigateToResults('', jobQuery, locationQuery);
}

/**
 * Handles keyboard navigation for autocomplete
 */
function handleKeyboardNavigation(e, input, container) {
    if (!container.classList.contains('active')) return;
    
    const items = container.querySelectorAll('.autocomplete-item');
    if (items.length === 0) return;
    
    let activeIndex = -1;
    for (let i = 0; i < items.length; i++) {
        if (items[i].classList.contains('active')) {
            activeIndex = i;
            break;
        }
    }
    
    switch(e.key) {
        case 'ArrowDown':
            e.preventDefault();
            if (activeIndex < items.length - 1) {
                setActiveItem(container, activeIndex + 1);
            } else {
                setActiveItem(container, 0);
            }
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            if (activeIndex > 0) {
                setActiveItem(container, activeIndex - 1);
            } else {
                setActiveItem(container, items.length - 1);
            }
            break;
            
        case 'Enter':
            if (activeIndex >= 0) {
                e.preventDefault();
                items[activeIndex].click();
            } else {
                executeSearch();
            }
            break;
            
        case 'Escape':
            container.classList.remove('active');
            manageContainerHeight();
            break;
    }
}

// Event Listeners with container management
jobSearchInput.addEventListener('input', function() {
    const query = this.value;
    const results = filterData(jobData, query);
    displayResults(results, jobResults, jobSearchInput, 'job');
});

jobSearchInput.addEventListener('focus', function() {
    const query = this.value;
    const results = filterData(jobData, query);
    displayResults(results, jobResults, jobSearchInput, 'job');
});

jobSearchInput.addEventListener('blur', function() {
    // Delay hiding to allow click on suggestions
    setTimeout(() => {
        if (!jobSearchInput.matches(':focus')) {
            jobResults.classList.remove('active');
            manageContainerHeight();
        }
    }, 200);
});

locationSearchInput.addEventListener('input', function() {
    const query = this.value;
    const suggestions = generateLocationSuggestions(query);
    displayResults(suggestions, locationResults, locationSearchInput, 'location');
});

locationSearchInput.addEventListener('focus', function() {
    const query = this.value;
    const suggestions = generateLocationSuggestions(query);
    displayResults(suggestions, locationResults, locationSearchInput, 'location');
});

locationSearchInput.addEventListener('blur', function() {
    // Delay hiding to allow click on suggestions
    setTimeout(() => {
        if (!locationSearchInput.matches(':focus')) {
            locationResults.classList.remove('active');
            manageContainerHeight();
        }
    }, 200);
});

searchButton.addEventListener('click', executeSearch);

// Enter key support with keyboard navigation
jobSearchInput.addEventListener('keydown', (e) => {
    handleKeyboardNavigation(e, jobSearchInput, jobResults);
});

locationSearchInput.addEventListener('keydown', (e) => {
    handleKeyboardNavigation(e, locationSearchInput, locationResults);
});

// Close autocomplete when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.autocomplete-container')) {
        jobResults.classList.remove('active');
        locationResults.classList.remove('active');
        manageContainerHeight();
    }
});

// Initialize
console.log('Search section initialized successfully!');

// Make functions available globally for debugging
window.searchDebug = {
    jobData,
    locationData,
    manageContainerHeight,
    filterData
};
// =======================================================================

// Original functions (keep these if they're used elsewhere)
document.getElementById("Sign In").addEventListener("click", function() {
    window.location.href = "signing.html";
});

function sign() {
    window.location.href = "get_started.html";
}
// =======================================================================



document.getElementById("Sign In").addEventListener("click", function() {
    window.location.href = "signing.html";
  });
