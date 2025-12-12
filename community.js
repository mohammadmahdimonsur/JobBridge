// Community Data and State Management
class CommunityManager {
    constructor() {
        this.currentUser = null; // User is not logged in by default
        this.feedItems = [];
        this.mentors = [];
        this.groups = [];
        this.onlineUsers = [];
        this.trendingTopics = [];
        this.upcomingEvents = [];
        this.likedPosts = new Set();
        this.displayedPosts = 4; // Initial number of posts to display
        this.statsAnimated = false;
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderAllSections();
        this.simulateLiveActivity();
        this.setupScrollAnimations();
    }

    // Enhanced sample data with more content for all tabs
    loadSampleData() {
        // Feed items data - Expanded with more content
        this.feedItems = [
            // Discussions
            {
                id: 1,
                user: {
                    name: "Sarah Chen",
                    avatar: "./assets/avatars/sarah.jpg", // Replace with your path
                    role: "Senior Product Manager"
                },
                type: "discussion",
                title: "Best practices for remote team collaboration",
                content: "With more teams going remote, what tools and processes have you found most effective for maintaining productivity and team cohesion? I've been using a combination of Slack for communication, Trello for project management, and weekly video calls to keep everyone connected.",
                tags: ["remote-work", "team-collaboration", "productivity", "tools"],
                timestamp: "2 hours ago",
                likes: 24,
                comments: 8,
                shares: 3,
                liked: false
            },
            {
                id: 2,
                user: {
                    name: "Maria Gonzalez",
                    avatar: "./assets/avatars/maria.jpg",
                    role: "Data Scientist"
                },
                type: "discussion",
                title: "Building effective data visualization dashboards",
                content: "What are your favorite tools and libraries for creating interactive data visualizations? I'm particularly interested in real-time dashboard solutions for business analytics.",
                tags: ["data-viz", "analytics", "dashboard", "business-intelligence"],
                timestamp: "8 hours ago",
                likes: 31,
                comments: 12,
                shares: 4,
                liked: false
            },
            // Questions
            {
                id: 3,
                user: {
                    name: "Alex Rodriguez",
                    avatar: "./assets/avatars/alex.jpg",
                    role: "Lead Developer"
                },
                type: "question",
                title: "React vs Vue in 2024 - which would you choose for a new project?",
                content: "Starting a new frontend project and debating between React and Vue. What are your experiences with both frameworks in production? Looking for insights on performance, ecosystem, and developer experience.",
                tags: ["react", "vue", "frontend", "javascript", "framework"],
                timestamp: "4 hours ago",
                likes: 42,
                comments: 15,
                shares: 2,
                liked: false
            },
            {
                id: 4,
                user: {
                    name: "David Kim",
                    avatar: "./assets/avatars/david.jpg",
                    role: "DevOps Engineer"
                },
                type: "question",
                title: "Best cloud platform for startup with limited budget?",
                content: "We're a small startup looking to deploy our MVP. Which cloud platform offers the best balance of features, scalability, and cost-effectiveness for early-stage companies?",
                tags: ["cloud", "aws", "azure", "startup", "devops"],
                timestamp: "6 hours ago",
                likes: 28,
                comments: 9,
                shares: 1,
                liked: false
            },
            // Events
            {
                id: 5,
                user: {
                    name: "Tech Community",
                    avatar: "./assets/avatars/community.jpg",
                    role: "Official Account"
                },
                type: "event",
                title: "Monthly Tech Meetup - AI in Web Development",
                content: "Join us this Friday for our monthly tech meetup where we'll discuss practical applications of AI in modern web development. Special guest speakers from Google and Microsoft will share their insights.",
                tags: ["ai", "web-development", "meetup", "tech", "machine-learning"],
                timestamp: "6 hours ago",
                likes: 18,
                comments: 5,
                shares: 12,
                liked: false
            },
            {
                id: 6,
                user: {
                    name: "Career Growth Hub",
                    avatar: "./assets/avatars/career.jpg",
                    role: "Community Group"
                },
                type: "event",
                title: "Career Transition Workshop - From Tech to Management",
                content: "Join our workshop for tech professionals considering a move to management roles. Learn about the skills needed, challenges, and strategies for successful transition.",
                tags: ["career", "management", "workshop", "leadership"],
                timestamp: "1 day ago",
                likes: 35,
                comments: 7,
                shares: 8,
                liked: false
            },
            // Additional posts for more content
            {
                id: 7,
                user: {
                    name: "Lisa Wang",
                    avatar: "./assets/avatars/lisa.jpg",
                    role: "UX Researcher"
                },
                type: "discussion",
                title: "Conducting effective user research remotely",
                content: "What methods and tools have you found most effective for remote user research? I'm looking for ways to maintain research quality while working with distributed teams.",
                tags: ["ux-research", "remote", "user-testing", "methodology"],
                timestamp: "3 hours ago",
                likes: 19,
                comments: 6,
                shares: 2,
                liked: false
            },
            {
                id: 8,
                user: {
                    name: "Mike Thompson",
                    avatar: "./assets/avatars/mike.jpg",
                    role: "Backend Engineer"
                },
                type: "question",
                title: "Microservices vs Monolith for new enterprise application",
                content: "Starting a new enterprise application and debating architecture. For a team of 10 developers, would you recommend microservices or a well-structured monolith?",
                tags: ["architecture", "microservices", "monolith", "enterprise"],
                timestamp: "5 hours ago",
                likes: 27,
                comments: 14,
                shares: 3,
                liked: false
            }
        ];

        // Enhanced mentors data
        this.mentors = [
            {
                id: 1,
                name: "Dr. Michael Zhang",
                avatar: "./assets/mentors/michael.jpg",
                role: "AI Research Director",
                company: "Google AI",
                skills: ["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Research"],
                mentees: 45,
                rating: 4.9,
                sessions: 120,
                bio: "Leading AI research initiatives with 10+ years experience in machine learning and neural networks."
            },
            {
                id: 2,
                name: "Emma Watson",
                avatar: "./assets/mentors/emma.jpg",
                role: "Senior UX Director",
                company: "Microsoft",
                skills: ["UX Design", "User Research", "Product Strategy", "Design Systems", "Leadership"],
                mentees: 32,
                rating: 4.8,
                sessions: 89,
                bio: "Passionate about creating intuitive user experiences and mentoring the next generation of designers."
            },
            {
                id: 3,
                name: "James Wilson",
                avatar: "./assets/mentors/james.jpg",
                role: "CTO & Founder",
                company: "TechStart Inc",
                skills: ["Startups", "Leadership", "Cloud Architecture", "DevOps", "Strategy"],
                mentees: 28,
                rating: 4.7,
                sessions: 76,
                bio: "Serial entrepreneur with successful exits and passion for mentoring tech startup founders."
            }
        ];

        // Expanded groups data with 2 additional groups
        this.groups = [
            {
                id: 1,
                name: "Web Developers Hub",
                icon: "bi-code-slash",
                members: 12500,
                posts: 3421,
                description: "A community for web developers to share knowledge, resources, and support each other's growth. Discuss frameworks, tools, and best practices.",
                tags: ["javascript", "react", "vue", "css", "html", "web"]
            },
            {
                id: 2,
                name: "Data Science Community",
                icon: "bi-graph-up",
                members: 8900,
                posts: 2156,
                description: "Connect with data scientists, ML engineers, and AI enthusiasts from around the world. Share projects, research, and career opportunities.",
                tags: ["python", "machine-learning", "data-analysis", "ai", "statistics"]
            },
            {
                id: 3,
                name: "Product Management",
                icon: "bi-kanban",
                members: 6700,
                posts: 1890,
                description: "For product managers to discuss strategy, user research, and product development. Learn from industry experts and peers.",
                tags: ["product-strategy", "ux", "agile", "user-research", "roadmapping"]
            },
            {
                id: 4,
                name: "Cloud & DevOps Engineers",
                icon: "bi-cloud",
                members: 5400,
                posts: 1567,
                description: "Connect with cloud architects and DevOps professionals. Discuss infrastructure, automation, and best practices.",
                tags: ["aws", "azure", "docker", "kubernetes", "ci-cd"]
            },
            {
                id: 5,
                name: "Startup Founders",
                icon: "bi-rocket",
                members: 3200,
                posts: 987,
                description: "A community for startup founders to share experiences, challenges, and learn from each other's journeys.",
                tags: ["entrepreneurship", "funding", "growth", "leadership"]
            },
            {
                id: 6,
                name: "UX/UI Design Community",
                icon: "bi-palette",
                members: 4800,
                posts: 1234,
                description: "For designers to share work, get feedback, and discuss trends in user experience and interface design.",
                tags: ["design", "usability", "wireframing", "prototyping"]
            },
            // Additional Groups
            {
                id: 7,
                name: "Mobile App Developers",
                icon: "bi-phone",
                members: 3800,
                posts: 1120,
                description: "Connect with mobile developers working on iOS, Android, and cross-platform apps. Share code, tools, and best practices.",
                tags: ["ios", "android", "react-native", "flutter", "mobile"]
            },
            {
                id: 8,
                name: "Digital Marketing Pros",
                icon: "bi-megaphone",
                members: 2900,
                posts: 845,
                description: "For marketing professionals to discuss strategies, campaigns, and digital marketing trends. Share insights and success stories.",
                tags: ["seo", "social-media", "content-marketing", "analytics", "growth"]
            }
        ];

        // Online users data
        this.onlineUsers = [
            { name: "Alex", avatar: "./assets/avatars/alex-online.jpg" },
            { name: "Sarah", avatar: "./assets/avatars/sarah-online.jpg" },
            { name: "Mike", avatar: "./assets/avatars/mike-online.jpg" },
            { name: "Emma", avatar: "./assets/avatars/emma-online.jpg" },
            { name: "David", avatar: "./assets/avatars/david-online.jpg" },
            { name: "Lisa", avatar: "./assets/avatars/lisa-online.jpg" }
        ];

        // Trending topics
        this.trendingTopics = [
            { name: "AI Integration", tag: "#ai", posts: 342 },
            { name: "Remote Work", tag: "#remote", posts: 289 },
            { name: "Career Growth", tag: "#career", posts: 267 },
            { name: "Tech Interviews", tag: "#interview", posts: 234 },
            { name: "Cloud Computing", tag: "#cloud", posts: 198 }
        ];

        // Upcoming events
        this.upcomingEvents = [
            { title: "Web Development Workshop", date: "15 DEC", time: "2:00 PM EST", link: "#" },
            { title: "Product Management AMA", date: "18 DEC", time: "1:00 PM EST", link: "#" },
            { title: "Data Science Conference", date: "20 DEC", time: "9:00 AM EST", link: "#" },
            { title: "UX Design Principles", date: "22 DEC", time: "3:00 PM EST", link: "#" }
        ];
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterFeed(e.target.dataset.tab);
            });
        });
    }

    setupScrollAnimations() {
        // Animate stats when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.statsAnimated) {
                    this.animateStats();
                    this.statsAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        const heroSection = document.querySelector('.community-hero');
        if (heroSection) {
            observer.observe(heroSection);
        }

        // Also trigger animation on page load if hero is already visible
        setTimeout(() => {
            const heroRect = heroSection?.getBoundingClientRect();
            if (heroRect && heroRect.top < window.innerHeight && heroRect.bottom >= 0) {
                this.animateStats();
                this.statsAnimated = true;
            }
        }, 500);
    }

    animateStats() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            // Add animation classes
            counter.classList.add('animated');
            counter.nextElementSibling.classList.add('animated');
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    counter.classList.add('counter-animated');
                }
            };
            
            updateCounter();
        });
    }

    renderAllSections() {
        this.renderFeed();
        this.renderMentors();
        this.renderGroups();
        this.renderSidebar();
    }

    renderFeed() {
        const feedContent = document.getElementById('feedContent');
        const visiblePosts = this.feedItems.slice(0, this.displayedPosts);
        feedContent.innerHTML = visiblePosts.map(item => this.createFeedItemHTML(item)).join('');
    }

    createFeedItemHTML(item) {
        const isLiked = this.likedPosts.has(item.id);
        
        return `
            <div class="feed-item" data-type="${item.type}">
                <div class="feed-item-header">
                    <img src="${item.user.avatar}" alt="${item.user.name}" class="user-avatar" onerror="this.src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'">
                    <div class="user-info">
                        <h6>${item.user.name}</h6>
                        <div class="post-meta">
                            <span>${item.user.role}</span> • <span>${item.timestamp}</span>
                        </div>
                    </div>
                    <span class="post-type">${item.type}</span>
                </div>
                <div class="feed-item-content">
                    <h5>${item.title}</h5>
                    <p>${item.content}</p>
                    <div class="post-tags">
                        ${item.tags.map(tag => `<span class="post-tag">#${tag}</span>`).join('')}
                    </div>
                    <div class="post-actions">
                        <button class="post-action ${isLiked ? 'active' : ''}" onclick="communityManager.handleLike(${item.id})">
                            <i class="bi bi-heart${isLiked ? '-fill' : ''}"></i>
                            <span>${item.likes}</span>
                        </button>
                        <button class="post-action" onclick="communityManager.handleComment(${item.id})">
                            <i class="bi bi-chat"></i>
                            <span>${item.comments}</span>
                        </button>
                        <button class="post-action" onclick="communityManager.handleShare(${item.id})">
                            <i class="bi bi-share"></i>
                            <span>${item.shares}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderMentors() {
        const mentorsGrid = document.getElementById('mentorsGrid');
        mentorsGrid.innerHTML = this.mentors.map(mentor => this.createMentorHTML(mentor)).join('');
    }

    createMentorHTML(mentor) {
        return `
            <div class="mentor-card">
                <img src="${mentor.avatar}" alt="${mentor.name}" class="mentor-avatar" onerror="this.src='https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'">
                <h4>${mentor.name}</h4>
                <div class="mentor-role">${mentor.role}</div>
                <div class="mentor-company">${mentor.company}</div>
                <p class="mentor-bio">${mentor.bio}</p>
                <div class="mentor-skills">
                    ${mentor.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <div class="mentor-stats">
                    <div class="mentor-stat">
                        <div class="number">${mentor.mentees}</div>
                        <div class="label">Mentees</div>
                    </div>
                    <div class="mentor-stat">
                        <div class="number">${mentor.rating}</div>
                        <div class="label">Rating</div>
                    </div>
                    <div class="mentor-stat">
                        <div class="number">${mentor.sessions}</div>
                        <div class="label">Sessions</div>
                    </div>
                </div>
                <div class="mentor-actions">
                    <button class="btn btn-primary btn-sm" onclick="communityManager.handleMentorConnect(${mentor.id})">
                        <i class="bi bi-person-plus me-1"></i> Connect
                    </button>
                    <button class="btn btn-outline-primary btn-sm" onclick="communityManager.handleViewProfile(${mentor.id})">
                        <i class="bi bi-eye me-1"></i> Profile
                    </button>
                </div>
            </div>
        `;
    }

    renderGroups() {
        const groupsGrid = document.getElementById('groupsGrid');
        groupsGrid.innerHTML = this.groups.map(group => this.createGroupHTML(group)).join('');
    }

    createGroupHTML(group) {
        return `
            <div class="group-card">
                <div class="group-header">
                    <div class="group-icon">
                        <i class="${group.icon}"></i>
                    </div>
                    <h4>${group.name}</h4>
                    <div class="group-stats">
                        <span>${group.members.toLocaleString()} members</span>
                        <span>${group.posts.toLocaleString()} posts</span>
                    </div>
                </div>
                <div class="group-content">
                    <p class="group-description">${group.description}</p>
                    <div class="group-tags">
                        ${group.tags.map(tag => `<span class="group-tag">#${tag}</span>`).join('')}
                    </div>
                    <div class="group-actions">
                        <button class="btn btn-primary btn-sm" onclick="communityManager.handleGroupJoin(${group.id})">
                            Join Group
                        </button>
                        <button class="btn btn-outline-primary btn-sm" onclick="communityManager.handleGroupView(${group.id})">
                            View
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderSidebar() {
        this.renderOnlineUsers();
        this.renderTrendingTopics();
        this.renderUpcomingEvents();
    }

    renderOnlineUsers() {
        const onlineMembers = document.querySelector('.online-members');
        onlineMembers.innerHTML = this.onlineUsers.map(user => `
            <div class="online-member">
                <img src="${user.avatar}" alt="${user.name}" class="member-avatar" onerror="this.src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'">
                <div class="member-name">${user.name}</div>
            </div>
        `).join('');
    }

    renderTrendingTopics() {
        const trendingTopics = document.querySelector('.trending-topics');
        trendingTopics.innerHTML = this.trendingTopics.map(topic => `
            <a href="#" class="trending-topic" onclick="communityManager.handleTopicClick('${topic.tag}')">
                <span class="topic-tag">${topic.tag}</span>
                <span class="topic-name">${topic.name}</span>
                <span class="topic-count">${topic.posts}</span>
            </a>
        `).join('');
    }

    renderUpcomingEvents() {
        const upcomingEvents = document.querySelector('.upcoming-events');
        upcomingEvents.innerHTML = this.upcomingEvents.map(event => `
            <a href="${event.link}" class="event-item">
                <div class="event-date">
                    <div class="day">${event.date.split(' ')[0]}</div>
                    <div class="month">${event.date.split(' ')[1]}</div>
                </div>
                <div class="event-details">
                    <h6>${event.title}</h6>
                    <p>${event.time}</p>
                </div>
            </a>
        `).join('');
    }

    // Feed filtering
    filterFeed(type) {
        const feedItems = document.querySelectorAll('.feed-item');
        feedItems.forEach(item => {
            if (type === 'all' || item.dataset.type === type) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Load more posts
    loadMorePosts() {
        this.displayedPosts = Math.min(this.displayedPosts + 4, this.feedItems.length);
        this.renderFeed();
        
        // Show subtle notification
        if (this.displayedPosts >= this.feedItems.length) {
            this.showToast('All posts loaded', 'info');
        }
    }

    // Enhanced post interactions
    handleLike(postId) {
        if (!this.currentUser) {
            this.showAuthRequired();
            return;
        }

        const post = this.feedItems.find(item => item.id === postId);
        if (post) {
            if (this.likedPosts.has(postId)) {
                // Unlike
                post.likes--;
                this.likedPosts.delete(postId);
            } else {
                // Like
                post.likes++;
                this.likedPosts.add(postId);
            }
            this.renderFeed();
        }
    }

    handleComment(postId) {
        if (!this.currentUser) {
            this.showAuthRequired();
            return;
        }

        const comment = prompt('Enter your comment:');
        if (comment) {
            const post = this.feedItems.find(item => item.id === postId);
            if (post) {
                post.comments++;
                this.renderFeed();
                this.showToast('Comment added successfully!', 'success');
            }
        }
    }

    handleShare(postId) {
        const post = this.feedItems.find(item => item.id === postId);
        if (post) {
            post.shares++;
            this.renderFeed();
            
            // Simulate share dialog
            setTimeout(() => {
                if (confirm('Would you like to copy the post link to clipboard?')) {
                    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
                    this.showToast('Link copied to clipboard!', 'success');
                }
            }, 100);
        }
    }

    // New post creation
    handleNewPost() {
        if (!this.currentUser) {
            this.showAuthRequired();
            return;
        }
        
        // In a real app, this would open the post creation modal
        this.showToast('Create new post feature would open here', 'info');
    }

    // Mentor interactions
    handleMentorConnect(mentorId) {
        if (!this.currentUser) {
            this.showAuthRequired();
            return;
        }

        const mentor = this.mentors.find(m => m.id === mentorId);
        this.showToast(`Mentorship request sent to ${mentor.name}`, 'success');
    }

    handleViewProfile(mentorId) {
        const mentor = this.mentors.find(m => m.id === mentorId);
        this.showToast(`Viewing ${mentor.name}'s profile`, 'info');
    }

    // Group interactions
    handleGroupJoin(groupId) {
        if (!this.currentUser) {
            this.showAuthRequired();
            return;
        }

        const group = this.groups.find(g => g.id === groupId);
        this.showToast(`Joined ${group.name} successfully!`, 'success');
    }

    handleGroupView(groupId) {
        const group = this.groups.find(g => g.id === groupId);
        this.showToast(`Viewing ${group.name} group`, 'info');
    }

    // Topic search
    handleTopicClick(tag) {
        this.showToast(`Searching for posts with ${tag}`, 'info');
        // In a real app, this would filter the feed
    }

    // Feature clicks
    handleFeatureClick(feature) {
        if (!this.currentUser) {
            this.showAuthRequired();
            return;
        }
        this.showToast(`Exploring ${feature}`, 'info');
    }

    // Auth-related handlers
    handleJoinCommunity() {
        this.showAuthRequired();
    }

    handleTakeTour() {
        this.showToast('Starting community tour...', 'info');
    }

    handleSignIn() {
        // Close modal and show sign in would happen here
        const modal = bootstrap.Modal.getInstance(document.getElementById('authRequiredModal'));
        modal.hide();
        this.showToast('Redirecting to sign in...', 'info');
    }

    handleRegister() {
        // Close modal and show registration would happen here
        const modal = bootstrap.Modal.getInstance(document.getElementById('authRequiredModal'));
        modal.hide();
        this.showToast('Redirecting to registration...', 'info');
    }

    // Auth required modal
    showAuthRequired() {
        const authModal = new bootstrap.Modal(document.getElementById('authRequiredModal'));
        authModal.show();
    }

    // Toast notification system (minimal usage)
    showToast(message, type = 'info') {
        // Only show critical toasts, reduce frequency
        if (type === 'info' && Math.random() > 0.3) return; // Reduce info toasts
        
        const toastEl = document.createElement('div');
        toastEl.className = `toast-notification ${type}`;
        toastEl.innerHTML = `
            <div class="toast-body">
                <strong>${message}</strong>
            </div>
        `;

        document.body.appendChild(toastEl);

        // Animate in
        setTimeout(() => {
            toastEl.classList.add('show');
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toastEl.classList.remove('show');
            setTimeout(() => {
                if (toastEl.parentNode) {
                    toastEl.parentNode.removeChild(toastEl);
                }
            }, 400);
        }, 3000);
    }

    // Simulate live activity
    simulateLiveActivity() {
        setInterval(() => {
            // Randomly update online users count
            const onlineCount = document.querySelector('.online-count');
            const currentCount = parseInt(onlineCount.textContent);
            const newCount = Math.max(100, currentCount + Math.floor(Math.random() * 10) - 5);
            onlineCount.textContent = newCount;
        }, 30000); // Reduced frequency
    }
}

// Initialize the community manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.communityManager = new CommunityManager();
});