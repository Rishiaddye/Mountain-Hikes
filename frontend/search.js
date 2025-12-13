 const container = document.querySelector('.search-location-container');
        const searchIcon = document.querySelector('.search-icon-container');
        
        searchIcon.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });


        // Search data
        const searchData = [
            { title: "Valley of Flowers National Park", keywords: ["valley", "flowers", "uttarakhand", "trek", "bloom"], location: "Uttarakhand", type: "trek" },
            { title: "Kashmir Great Lakes Trek", keywords: ["kashmir", "lakes", "jammu", "trek", "mountain"], location: "Jammu & Kashmir", type: "trek" },
            { title: "Hampta Pass Trek", keywords: ["hampta", "pass", "himachal", "pradesh", "trek"], location: "Himachal Pradesh", type: "trek" },
            { title: "Roopkund Trek", keywords: ["roopkund", "frozen", "lake", "uttarakhand", "mystery"], location: "Uttarakhand", type: "trek" },
            { title: "Vietnam Adventure", keywords: ["vietnam", "adventure", "international", "asia"], location: "Vietnam", type: "destination" },
            { title: "Bali Adventure", keywords: ["bali", "adventure", "international", "indonesia"], location: "Bali", type: "destination" },
            { title: "Meghalaya", keywords: ["meghalaya", "northeast", "india", "rain"], location: "Meghalaya", type: "destination" },
            { title: "Delhi Gateways", keywords: ["delhi", "gateway", "north", "india"], location: "Delhi", type: "gateway" },
            { title: "Bangalore Getaways", keywords: ["bangalore", "bengaluru", "south", "india"], location: "Bangalore", type: "gateway" },
            { title: "Himalayan Treks", keywords: ["himalaya", "himalayan", "trek", "mountain", "high"], location: "Himalayas", type: "trek" },
            { title: "Camping Events", keywords: ["camping", "camp", "tent", "event", "outdoor"], location: "Various", type: "event" },
            { title: "Community Events", keywords: ["community", "gather", "group", "event", "social"], location: "Various", type: "event" }
        ];

        // Get elements
        const searchInput = document.querySelector('.search-input');
        const searchContainer = document.querySelector('.search-location-container');

        // Create dropdown element
        const dropdown = document.createElement('div');
        dropdown.id = 'search-results-dropdown';
        dropdown.style.display = 'none';
        searchContainer.appendChild(dropdown);

        // Search function
        function performSearch(query) {
            query = query.trim().toLowerCase();
            
            if (query.length < 2) {
                dropdown.style.display = 'none';
                return;
            }

            const results = searchData.filter(item => {
                return item.title.toLowerCase().includes(query) ||
                       item.keywords.some(k => k.toLowerCase().includes(query)) ||
                       item.location.toLowerCase().includes(query);
            });

            showResults(results, query);
        }

        // Show results
        function showResults(results, query) {
            if (results.length === 0) {
                dropdown.innerHTML = `
                    <div style="padding: 20px; text-align: center; color: #666;">
                        <p style="margin: 0; font-weight: 600;">No results found for "${query}"</p>
                        <small style="color: #999;">Try: valley, kashmir, himalayan, bali, delhi</small>
                    </div>
                `;
                dropdown.style.display = 'block';
                return;
            }

            dropdown.innerHTML = results.map(r => {
                const highlightedTitle = r.title.replace(new RegExp(`(${query})`, 'gi'), '<mark>$1</mark>');
                return `
                    <div class="search-result-item" data-title="${r.title}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="flex: 1;">
                                <div style="font-size: 15px; font-weight: 600; margin-bottom: 6px;">${highlightedTitle}</div>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span class="result-type-badge">${r.type}</span>
                                    <span style="font-size: 12px; color: #666;">${r.location}</span>
                                </div>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="#999">
                                <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                    </div>
                `;
            }).join('');

            // Add click events to results
            dropdown.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', function() {
                    const title = this.getAttribute('data-title');
                    scrollToItem(title);
                    dropdown.style.display = 'none';
                    searchInput.value = title;
                });
            });

            dropdown.style.display = 'block';
        }

        // Scroll to item
        function scrollToItem(title) {
            const allItems = document.querySelectorAll('.trek-card, .gallery-item');
            let targetItem = null;

            allItems.forEach(item => {
                const itemTitle = item.querySelector('.card-title, h3, h2');
                if (itemTitle && itemTitle.textContent.toLowerCase().includes(title.toLowerCase())) {
                    targetItem = item;
                }
            });

            if (targetItem) {
                targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                targetItem.classList.add('highlight-animation');
                setTimeout(() => {
                    targetItem.classList.remove('highlight-animation');
                }, 2000);
            }
        }

        // Event listeners
        searchInput.addEventListener('input', function() {
            performSearch(this.value);
        });

        searchInput.addEventListener('focus', function() {
            if (this.value.trim().length >= 2) {
                performSearch(this.value);
            }
        });

        searchIcon.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                const results = searchData.filter(item => {
                    return item.title.toLowerCase().includes(query.toLowerCase()) ||
                           item.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()));
                });
                if (results.length > 0) {
                    scrollToItem(results[0].title);
                    dropdown.style.display = 'none';
                }
            }
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchIcon.click();
            }
        });

        // Close dropdown on outside click
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });