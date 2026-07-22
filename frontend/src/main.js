// ==========================================================================
// Lumina CMS — Main Application Controller & UI Logic
// ==========================================================================

import confetti from 'canvas-confetti';
import { api, authState } from './api.js';

// Application State
const state = {
  theme: localStorage.getItem('lumina_theme') || 'dark',
  contents: [],
  filteredContents: [],
  activeFilter: 'all', // 'all' | 'mine'
  searchQuery: '',
  sortBy: 'newest', // 'newest' | 'oldest' | 'title'
  viewMode: 'grid', // 'grid' | 'table'
  apiOnline: false,
  selectedContent: null,
  isEditMode: false,
  updateMethod: 'PUT', // 'PUT' | 'PATCH'
};

// DOM Element References
const app = document.getElementById('app');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  setTheme(state.theme);
  renderApp();
  initApiCheck();
  if (authState.isAuthenticated()) {
    loadContents();
  }
});

// Theme Switcher
function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('lumina_theme', theme);
}

function toggleTheme() {
  setTheme(state.theme === 'dark' ? 'light' : 'dark');
  renderNavbar();
}

// Check API Health
async function initApiCheck() {
  try {
    const res = await api.checkHealth();
    state.apiOnline = !!res?.message;
  } catch (err) {
    state.apiOnline = false;
  }
  updateApiStatusUI();
}

function updateApiStatusUI() {
  const statusEl = document.getElementById('api-status-container');
  if (!statusEl) return;
  statusEl.innerHTML = `
    <div class="api-status-badge ${state.apiOnline ? '' : 'offline'}">
      <span class="api-status-dot"></span>
      <span>${state.apiOnline ? 'API Connected' : 'API Offline'}</span>
    </div>
  `;
}

// Toast Notifications
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || 'ℹ'}</div>
    <div class="toast-message">${escapeHtml(message)}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Utility: HTML Escaper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Utility: Format Relative Time
function formatTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffSecs = Math.floor((now - date) / 1000);

  if (diffSecs < 60) return 'Just now';
  if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
  if (diffSecs < 86400) return `${Math.floor(diffSecs / 3600)}h ago`;
  if (diffSecs < 604800) return `${Math.floor(diffSecs / 86400)}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Load Contents
async function loadContents() {
  try {
    const res = await api.listContents();
    state.contents = res.data || [];
    applyFilters();
  } catch (err) {
    showToast(err.message || 'Failed to load contents', 'error');
  }
}

function applyFilters() {
  let list = [...state.contents];

  // Filter by mine / all
  if (state.activeFilter === 'mine' && authState.user) {
    // Note: Backend list_contents endpoint returns items without owner email inside attributes,
    // but items created by current user can be identified or stored.
    // Let's filter if owned or allow user to see all
  }

  // Search filter
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(item => 
      item.attributes.title.toLowerCase().includes(q) ||
      item.attributes.body.toLowerCase().includes(q)
    );
  }

  // Sort
  if (state.sortBy === 'newest') {
    list.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
  } else if (state.sortBy === 'oldest') {
    list.sort((a, b) => new Date(a.attributes.createdAt) - new Date(b.attributes.createdAt));
  } else if (state.sortBy === 'title') {
    list.sort((a, b) => a.attributes.title.localeCompare(b.attributes.title));
  }

  state.filteredContents = list;
  renderMainView();
}

// Main Render Function
function renderApp() {
  app.innerHTML = `
    <header id="navbar-root"></header>
    <main id="main-root" class="main-content"></main>
    <div id="modal-root"></div>
  `;
  renderNavbar();
  renderMainView();
}

// Navbar Render
function renderNavbar() {
  const navbarEl = document.getElementById('navbar-root');
  if (!navbarEl) return;

  const isAuth = authState.isAuthenticated();
  const user = authState.user;

  navbarEl.className = 'navbar';
  navbarEl.innerHTML = `
    <div class="navbar-container">
      <a href="#" class="brand-logo" id="brand-home-link">
        <img src="/app_logo.jpg" alt="Lumina CMS Logo" class="brand-icon-img" />
        <span>LUMINA<span class="brand-text-gradient">CMS</span></span>
        <span class="brand-badge">v1.0</span>
      </a>

      <div class="nav-actions">
        <div id="api-status-container"></div>

        <button class="btn btn-icon btn-outline" id="theme-toggle-btn" title="Toggle Light/Dark Theme">
          ${state.theme === 'dark' ? '☀️' : '🌙'}
        </button>

        ${isAuth ? `
          <button class="btn btn-primary" id="create-content-nav-btn">
            ✨ New Content
          </button>

          <div class="user-menu-btn" id="user-profile-menu-btn" title="View Profile & JWT Token">
            <div class="user-avatar">${(user?.name || user?.email || 'U')[0].toUpperCase()}</div>
            <span class="user-name-text">${escapeHtml(user?.name || user?.email)}</span>
          </div>

          <button class="btn btn-secondary btn-icon" id="logout-btn" title="Sign Out">
            🚪
          </button>
        ` : `
          <button class="btn btn-outline" id="open-signin-btn">Sign In</button>
          <button class="btn btn-primary" id="open-signup-btn">Get Started</button>
        `}
      </div>
    </div>
  `;

  // Attach Events
  document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
  document.getElementById('open-signin-btn')?.addEventListener('click', () => openAuthModal('signin'));
  document.getElementById('open-signup-btn')?.addEventListener('click', () => openAuthModal('signup'));
  document.getElementById('create-content-nav-btn')?.addEventListener('click', () => openContentModal());
  document.getElementById('user-profile-menu-btn')?.addEventListener('click', openTokenInspectorModal);
  document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
  document.getElementById('brand-home-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    state.activeFilter = 'all';
    state.searchQuery = '';
    applyFilters();
  });

  updateApiStatusUI();
}

// Handle Logout
function handleLogout() {
  api.logout();
  showToast('Logged out successfully', 'info');
  state.contents = [];
  state.filteredContents = [];
  renderApp();
}

// Main View Render
function renderMainView() {
  const mainEl = document.getElementById('main-root');
  if (!mainEl) return;

  const isAuth = authState.isAuthenticated();

  if (!isAuth) {
    mainEl.innerHTML = `
      <div class="hero-section glass-panel">
        <div>
          <h1 class="hero-title">Manage Content with <span class="brand-text-gradient">Precision & Speed</span></h1>
          <p class="hero-subtitle">Experience full CRUD power, REST API precision, and instant authorization driven by Django Ninja and JWT security.</p>
          <div style="margin-top: 24px; display: flex; gap: 14px;">
            <button class="btn btn-primary" id="hero-get-started-btn">🚀 Create Account</button>
            <button class="btn btn-outline" id="hero-signin-btn">🔑 Sign In to Demo</button>
          </div>
        </div>
        <div>
          <img src="/app_logo.jpg" alt="Lumina CMS Prism" style="width: 180px; height: 180px; border-radius: var(--radius-lg); box-shadow: var(--shadow-glow);" />
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card glass-panel">
          <div class="stat-icon-wrapper">🔐</div>
          <div class="stat-info">
            <span class="stat-value">JWT Auth</span>
            <span class="stat-label">Secure Token Session</span>
          </div>
        </div>
        <div class="stat-card glass-panel">
          <div class="stat-icon-wrapper">⚡</div>
          <div class="stat-info">
            <span class="stat-value">Django Ninja</span>
            <span class="stat-label">Fast REST Endpoints</span>
          </div>
        </div>
        <div class="stat-card glass-panel">
          <div class="stat-icon-wrapper">🛡️</div>
          <div class="stat-info">
            <span class="stat-value">Permission Guard</span>
            <span class="stat-label">Owner-based Authorization</span>
          </div>
        </div>
      </div>

      <div class="empty-state-container glass-panel">
        <img src="/empty_state.jpg" alt="Sign in required" class="empty-state-img" />
        <h2 class="empty-state-title">Sign in to Access Content Dashboard</h2>
        <p class="empty-state-text">Join thousands of content managers or log in to create, edit, and explore live REST content entries.</p>
        <button class="btn btn-primary" id="guest-access-signin-btn">🔑 Sign In Now</button>
      </div>
    `;

    document.getElementById('hero-get-started-btn')?.addEventListener('click', () => openAuthModal('signup'));
    document.getElementById('hero-signin-btn')?.addEventListener('click', () => openAuthModal('signin'));
    document.getElementById('guest-access-signin-btn')?.addEventListener('click', () => openAuthModal('signin'));
    return;
  }

  // Render Authenticated Dashboard
  const myContentsCount = state.contents.length; // total accessible

  mainEl.innerHTML = `
    <!-- Stats Banner -->
    <div class="hero-section glass-panel" style="padding: 28px 36px;">
      <div>
        <h1 class="hero-title">Welcome back, <span class="brand-text-gradient">${escapeHtml(authState.user?.name || 'Creator')}</span></h1>
        <p class="hero-subtitle">You are authenticated as <strong>${escapeHtml(authState.user?.email)}</strong> (${escapeHtml(authState.user?.country || 'Global')})</p>
      </div>
      <button class="btn btn-primary" id="hero-create-btn">
        ✨ Create Content
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card glass-panel">
        <div class="stat-icon-wrapper">📚</div>
        <div class="stat-info">
          <span class="stat-value">${state.contents.length}</span>
          <span class="stat-label">Total Articles</span>
        </div>
      </div>

      <div class="stat-card glass-panel">
        <div class="stat-icon-wrapper">👤</div>
        <div class="stat-info">
          <span class="stat-value">${authState.user?.email ? 'Active' : 'Guest'}</span>
          <span class="stat-label">Current Session</span>
        </div>
      </div>

      <div class="stat-card glass-panel" id="stat-ping-card" style="cursor: pointer;" title="Click to test live /api/hello">
        <div class="stat-icon-wrapper">📡</div>
        <div class="stat-info">
          <span class="stat-value" id="ping-result-val">${state.apiOnline ? '200 OK' : 'Checking'}</span>
          <span class="stat-label">Backend API Status</span>
        </div>
      </div>
    </div>

    <!-- Toolbar Section -->
    <div class="toolbar-section glass-panel">
      <div class="toolbar-left">
        <button class="filter-tab ${state.activeFilter === 'all' ? 'active' : ''}" id="filter-all-btn">
          All Contents (${state.contents.length})
        </button>

        <div class="input-wrapper search-box">
          <span class="input-left-icon">🔍</span>
          <input 
            type="text" 
            class="input-field input-icon-left" 
            id="search-input" 
            placeholder="Search content by title or body..."
            value="${escapeHtml(state.searchQuery)}"
          />
        </div>
      </div>

      <div class="toolbar-right">
        <select class="input-field" id="sort-select" style="width: 150px; padding: 8px 12px;">
          <option value="newest" ${state.sortBy === 'newest' ? 'selected' : ''}>Newest First</option>
          <option value="oldest" ${state.sortBy === 'oldest' ? 'selected' : ''}>Oldest First</option>
          <option value="title" ${state.sortBy === 'title' ? 'selected' : ''}>Title (A-Z)</option>
        </select>

        <div style="display: flex; gap: 4px;">
          <button class="view-toggle-btn ${state.viewMode === 'grid' ? 'active' : ''}" id="view-grid-btn" title="Grid View">
            田 Grid
          </button>
          <button class="view-toggle-btn ${state.viewMode === 'table' ? 'active' : ''}" id="view-table-btn" title="Table View">
            ☰ Table
          </button>
        </div>
      </div>
    </div>

    <!-- Content Items Grid / Table -->
    <div id="contents-container"></div>
  `;

  // Attach Dashboard Event Listeners
  document.getElementById('hero-create-btn')?.addEventListener('click', () => openContentModal());
  document.getElementById('filter-all-btn')?.addEventListener('click', () => {
    state.activeFilter = 'all';
    applyFilters();
  });
  
  const searchInput = document.getElementById('search-input');
  searchInput?.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    applyFilters();
  });

  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    applyFilters();
  });

  document.getElementById('view-grid-btn')?.addEventListener('click', () => {
    state.viewMode = 'grid';
    renderMainView();
  });

  document.getElementById('view-table-btn')?.addEventListener('click', () => {
    state.viewMode = 'table';
    renderMainView();
  });

  document.getElementById('stat-ping-card')?.addEventListener('click', async () => {
    try {
      const start = performance.now();
      const res = await api.checkHealth();
      const latency = Math.round(performance.now() - start);
      showToast(`API Ping Response: "${res.message}" (${latency}ms)`, 'success');
      document.getElementById('ping-result-val').innerText = `${latency}ms OK`;
    } catch (err) {
      showToast('API ping failed: ' + err.message, 'error');
    }
  });

  renderContentsList();
}

// Render Content Grid or Table
function renderContentsList() {
  const container = document.getElementById('contents-container');
  if (!container) return;

  const items = state.filteredContents;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state-container glass-panel">
        <img src="/empty_state.jpg" alt="No content" class="empty-state-img" />
        <h2 class="empty-state-title">No Contents Found</h2>
        <p class="empty-state-text">
          ${state.searchQuery ? `No articles match "${escapeHtml(state.searchQuery)}". Try adjusting your search query.` : 'Be the first to publish an article! Click below to create content.'}
        </p>
        <button class="btn btn-primary" id="empty-create-btn">✨ Create First Content</button>
      </div>
    `;
    document.getElementById('empty-create-btn')?.addEventListener('click', () => openContentModal());
    return;
  }

  if (state.viewMode === 'grid') {
    container.className = 'contents-grid';
    container.innerHTML = items.map(item => {
      const attrs = item.attributes;
      return `
        <div class="content-card glass-panel" data-id="${item.id}">
          <div class="card-header">
            <h3 class="card-title">${escapeHtml(attrs.title)}</h3>
            <span class="owner-pill is-mine">REST Article #${item.id}</span>
          </div>

          <p class="card-body-preview">${escapeHtml(attrs.body)}</p>

          <div class="card-footer">
            <span>📅 ${formatTime(attrs.createdAt)}</span>
            <div class="card-actions">
              <button class="card-action-btn view-btn" data-id="${item.id}" title="Read Full Article">👁 View</button>
              <button class="card-action-btn edit-btn" data-id="${item.id}" title="Edit Article">✏ Edit</button>
              <button class="card-action-btn delete delete-btn" data-id="${item.id}" title="Delete Article">🗑 Delete</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } else {
    // Table View
    container.className = '';
    container.innerHTML = `
      <div class="glass-panel" style="overflow-x: auto; padding: 12px;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-medium); color: var(--text-secondary);">
              <th style="padding: 12px 16px;">ID</th>
              <th style="padding: 12px 16px;">Title</th>
              <th style="padding: 12px 16px;">Preview</th>
              <th style="padding: 12px 16px;">Created</th>
              <th style="padding: 12px 16px; text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr style="border-bottom: 1px solid var(--border-subtle);" class="table-row-hover">
                <td style="padding: 14px 16px; font-weight: 700; color: var(--accent-cyan);">#${item.id}</td>
                <td style="padding: 14px 16px; font-weight: 600;">${escapeHtml(item.attributes.title)}</td>
                <td style="padding: 14px 16px; color: var(--text-secondary); max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  ${escapeHtml(item.attributes.body)}
                </td>
                <td style="padding: 14px 16px; color: var(--text-muted); font-size: 0.82rem;">${formatTime(item.attributes.createdAt)}</td>
                <td style="padding: 14px 16px; text-align: right;">
                  <div class="card-actions" style="justify-content: flex-end;">
                    <button class="card-action-btn view-btn" data-id="${item.id}">👁</button>
                    <button class="card-action-btn edit-btn" data-id="${item.id}">✏</button>
                    <button class="card-action-btn delete delete-btn" data-id="${item.id}">🗑</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // Attach Item Action Listeners
  container.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const item = state.contents.find(c => c.id == id);
      if (item) openDetailModal(item);
    });
  });

  container.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const item = state.contents.find(c => c.id == id);
      if (item) openContentModal(item);
    });
  });

  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      handleDeleteContent(id);
    });
  });
}

// Auth Modal (Sign In / Sign Up)
function openAuthModal(initialTab = 'signin') {
  const modalRoot = document.getElementById('modal-root');
  let activeTab = initialTab;

  function renderModalContent() {
    modalRoot.innerHTML = `
      <div class="modal-backdrop open" id="auth-modal-backdrop">
        <div class="modal-content glass-panel">
          <div class="modal-header">
            <h2 class="modal-title" style="font-size: 1.5rem;">
              ${activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <button class="modal-close-btn" id="close-auth-modal">✕</button>
          </div>

          <!-- Auth Tab Switcher -->
          <div style="display: flex; gap: 8px; background: var(--bg-input); padding: 4px; border-radius: var(--radius-md); margin-bottom: 24px;">
            <button class="filter-tab ${activeTab === 'signin' ? 'active' : ''}" id="tab-signin-btn" style="flex: 1; text-align: center;">
              Sign In
            </button>
            <button class="filter-tab ${activeTab === 'signup' ? 'active' : ''}" id="tab-signup-btn" style="flex: 1; text-align: center;">
              Sign Up
            </button>
          </div>

          <form id="auth-form">
            ${activeTab === 'signup' ? `
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="form-group">
                  <label class="form-label" for="first_name">First Name</label>
                  <input type="text" class="input-field" id="first_name" required placeholder="Jane" />
                </div>
                <div class="form-group">
                  <label class="form-label" for="last_name">Last Name</label>
                  <input type="text" class="input-field" id="last_name" required placeholder="Doe" />
                </div>
              </div>
            ` : ''}

            <div class="form-group">
              <label class="form-label" for="auth-email">Email Address</label>
              <div class="input-wrapper">
                <span class="input-left-icon">✉</span>
                <input type="email" class="input-field input-icon-left" id="auth-email" required placeholder="user@example.com" autocomplete="username" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="auth-password">Password</label>
              <div class="input-wrapper">
                <span class="input-left-icon">🔒</span>
                <input type="password" class="input-field input-icon-left input-icon-right" id="auth-password" required placeholder="••••••••" autocomplete="${activeTab === 'signup' ? 'new-password' : 'current-password'}" />
                <span class="input-right-icon" id="toggle-pwd-btn">👁</span>
              </div>
            </div>

            ${activeTab === 'signup' ? `
              <div class="form-group">
                <label class="form-label" for="auth-country">Country (Optional)</label>
                <input type="text" class="input-field" id="auth-country" placeholder="e.g. United States, Germany, Nepal" />
              </div>
            ` : `
              <div style="margin-bottom: 20px; background: rgba(0, 242, 254, 0.08); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid rgba(0, 242, 254, 0.2);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.85rem; color: var(--text-secondary);">Need a quick test login?</span>
                  <button type="button" class="btn btn-outline" id="prefill-demo-btn" style="padding: 4px 10px; font-size: 0.78rem;">
                    ⚡ Quick Demo Fill
                  </button>
                </div>
              </div>
            `}

            <button type="submit" class="btn btn-primary" id="auth-submit-btn" style="width: 100%; margin-top: 8px;">
              ${activeTab === 'signin' ? '🔑 Sign In' : '✨ Register Account'}
            </button>
          </form>
        </div>
      </div>
    `;

    // Events
    document.getElementById('close-auth-modal')?.addEventListener('click', closeModal);
    document.getElementById('auth-modal-backdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'auth-modal-backdrop') closeModal();
    });

    document.getElementById('tab-signin-btn')?.addEventListener('click', () => {
      activeTab = 'signin';
      renderModalContent();
    });
    document.getElementById('tab-signup-btn')?.addEventListener('click', () => {
      activeTab = 'signup';
      renderModalContent();
    });

    const pwdInput = document.getElementById('auth-password');
    document.getElementById('toggle-pwd-btn')?.addEventListener('click', () => {
      if (pwdInput) {
        pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
      }
    });

    document.getElementById('prefill-demo-btn')?.addEventListener('click', () => {
      document.getElementById('auth-email').value = 'demo@lumina.io';
      document.getElementById('auth-password').value = 'DemoPassword123!';
    });

    // Form Submit
    document.getElementById('auth-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('auth-submit-btn');
      submitBtn.disabled = true;
      submitBtn.innerText = 'Processing...';

      try {
        if (activeTab === 'signin') {
          const email = document.getElementById('auth-email').value;
          const pwd = document.getElementById('auth-password').value;
          await api.signin(email, pwd);

          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
          showToast('Signed in successfully!', 'success');
          closeModal();
          renderApp();
          loadContents();
        } else {
          const payload = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('auth-email').value,
            password: document.getElementById('auth-password').value,
            country: document.getElementById('auth-country')?.value || null,
          };

          await api.signup(payload);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          showToast('Account created successfully! Please sign in.', 'success');
          activeTab = 'signin';
          renderModalContent();
          document.getElementById('auth-email').value = payload.email;
        }
      } catch (err) {
        showToast(err.message || 'Authentication failed', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = activeTab === 'signin' ? '🔑 Sign In' : '✨ Register Account';
      }
    });
  }

  renderModalContent();
}

// Content Modal (Create / Edit)
function openContentModal(item = null) {
  const isEdit = !!item;
  state.isEditMode = isEdit;
  state.selectedContent = item;
  state.updateMethod = 'PUT';

  const modalRoot = document.getElementById('modal-root');
  modalRoot.innerHTML = `
    <div class="modal-backdrop open" id="content-modal-backdrop">
      <div class="modal-content glass-panel" style="max-width: 620px;">
        <div class="modal-header">
          <h2 class="modal-title">${isEdit ? `Edit Content #${item.id}` : 'Create New Content'}</h2>
          <button class="modal-close-btn" id="close-content-modal">✕</button>
        </div>

        <form id="content-form">
          <div class="form-group">
            <label class="form-label" for="content-title">Title</label>
            <input 
              type="text" 
              class="input-field" 
              id="content-title" 
              required 
              placeholder="e.g., Master Django Ninja REST APIs"
              value="${isEdit ? escapeHtml(item.attributes.title) : ''}" 
            />
          </div>

          ${isEdit ? `
            <div class="form-group" style="margin-bottom: 14px;">
              <label class="form-label">HTTP Method for Update</label>
              <div style="display: flex; gap: 12px;">
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                  <input type="radio" name="update-method" value="PUT" checked /> 
                  <span><strong>PUT</strong> (Full replacement)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 6px; cursor: pointer;">
                  <input type="radio" name="update-method" value="PATCH" /> 
                  <span><strong>PATCH</strong> (Partial update)</span>
                </label>
              </div>
            </div>
          ` : ''}

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label class="form-label" for="content-body">Content Body</label>
              <span id="char-counter" style="font-size: 0.78rem; color: var(--text-muted);">0 characters</span>
            </div>
            <textarea 
              class="input-field" 
              id="content-body" 
              required 
              placeholder="Write your article content here..."
              style="min-height: 180px;"
            >${isEdit ? escapeHtml(item.attributes.body) : ''}</textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px;">
            <button type="button" class="btn btn-outline" id="cancel-content-btn">Cancel</button>
            <button type="submit" class="btn btn-primary" id="save-content-btn">
              ${isEdit ? '💾 Update Content' : '🚀 Publish Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById('close-content-modal')?.addEventListener('click', closeModal);
  document.getElementById('cancel-content-btn')?.addEventListener('click', closeModal);
  document.getElementById('content-modal-backdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'content-modal-backdrop') closeModal();
  });

  const bodyInput = document.getElementById('content-body');
  const counterEl = document.getElementById('char-counter');
  function updateCount() {
    const len = bodyInput.value.length;
    counterEl.innerText = `${len} character${len === 1 ? '' : 's'}`;
  }
  bodyInput?.addEventListener('input', updateCount);
  updateCount();

  document.getElementById('content-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const saveBtn = document.getElementById('save-content-btn');
    saveBtn.disabled = true;
    saveBtn.innerText = 'Saving...';

    const title = document.getElementById('content-title').value;
    const body = document.getElementById('content-body').value;

    try {
      if (isEdit) {
        const method = document.querySelector('input[name="update-method"]:checked')?.value || 'PUT';
        if (method === 'PUT') {
          await api.updateContent(item.id, title, body);
        } else {
          await api.partialUpdateContent(item.id, { title, body });
        }
        showToast('Content updated successfully!', 'success');
      } else {
        await api.createContent(title, body);
        confetti({ particleCount: 70, spread: 50, origin: { y: 0.7 } });
        showToast('Content created successfully!', 'success');
      }

      closeModal();
      loadContents();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    } finally {
      saveBtn.disabled = false;
      saveBtn.innerText = isEdit ? '💾 Update Content' : '🚀 Publish Article';
    }
  });
}

// View Detail Modal
function openDetailModal(item) {
  const modalRoot = document.getElementById('modal-root');
  const attrs = item.attributes;

  modalRoot.innerHTML = `
    <div class="modal-backdrop open" id="detail-modal-backdrop">
      <div class="modal-content glass-panel" style="max-width: 680px;">
        <div class="modal-header">
          <div>
            <span class="owner-pill is-mine" style="margin-bottom: 6px; display: inline-block;">Content #${item.id}</span>
            <h2 class="modal-title" style="font-size: 1.6rem;">${escapeHtml(attrs.title)}</h2>
          </div>
          <button class="modal-close-btn" id="close-detail-modal">✕</button>
        </div>

        <div style="margin-bottom: 20px; font-size: 0.85rem; color: var(--text-muted); display: flex; gap: 16px;">
          <span>📅 Created: ${formatTime(attrs.createdAt)}</span>
          <span>🔄 Updated: ${formatTime(attrs.updatedAt)}</span>
        </div>

        <div style="background: var(--bg-input); padding: 20px; border-radius: var(--radius-md); font-size: 1rem; line-height: 1.7; white-space: pre-wrap; word-break: break-word; color: var(--text-primary); border: 1px solid var(--border-subtle);">
          ${escapeHtml(attrs.body)}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px;">
          <button class="btn btn-outline" id="copy-article-btn">📋 Copy Text</button>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-secondary" id="detail-edit-btn">✏ Edit</button>
            <button class="btn btn-danger" id="detail-delete-btn">🗑 Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('close-detail-modal')?.addEventListener('click', closeModal);
  document.getElementById('detail-modal-backdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'detail-modal-backdrop') closeModal();
  });

  document.getElementById('copy-article-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(`${attrs.title}\n\n${attrs.body}`);
    showToast('Article text copied to clipboard!', 'success');
  });

  document.getElementById('detail-edit-btn')?.addEventListener('click', () => {
    closeModal();
    openContentModal(item);
  });

  document.getElementById('detail-delete-btn')?.addEventListener('click', () => {
    closeModal();
    handleDeleteContent(item.id);
  });
}

// Delete Handler
async function handleDeleteContent(id) {
  if (!confirm(`Are you sure you want to delete content #${id}?`)) return;

  try {
    await api.deleteContent(id);
    showToast('Content deleted successfully', 'success');
    loadContents();
  } catch (err) {
    showToast(err.message || 'Delete failed. You may only delete content you created.', 'error');
  }
}

// JWT Token Inspector Modal
function openTokenInspectorModal() {
  const modalRoot = document.getElementById('modal-root');
  const user = authState.user;
  const token = authState.token;

  modalRoot.innerHTML = `
    <div class="modal-backdrop open" id="token-modal-backdrop">
      <div class="modal-content glass-panel" style="max-width: 640px;">
        <div class="modal-header">
          <h2 class="modal-title">🔐 JWT Session & Token Inspector</h2>
          <button class="modal-close-btn" id="close-token-modal">✕</button>
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: var(--bg-input); padding: 16px; border-radius: var(--radius-md);">
            <div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">USER NAME</div>
              <div style="font-weight: 700;">${escapeHtml(user?.name || 'N/A')}</div>
            </div>
            <div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">EMAIL ADDRESS</div>
              <div style="font-weight: 700;">${escapeHtml(user?.email || 'N/A')}</div>
            </div>
            <div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">COUNTRY</div>
              <div style="font-weight: 700;">${escapeHtml(user?.country || 'Not specified')}</div>
            </div>
            <div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">ACCOUNT ID</div>
              <div style="font-weight: 700; color: var(--accent-cyan);">#${user?.id || 'N/A'}</div>
            </div>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label class="form-label">JWT Bearer Access Token</label>
              <button class="btn btn-outline" id="copy-token-btn" style="padding: 4px 10px; font-size: 0.78rem;">
                📋 Copy Bearer Token
              </button>
            </div>
            <textarea 
              class="input-field" 
              readonly 
              style="font-family: var(--font-mono); font-size: 0.78rem; height: 90px;"
            >${token || 'No active token'}</textarea>
          </div>

          <div style="background: rgba(16, 185, 129, 0.08); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid rgba(16, 185, 129, 0.2); font-size: 0.85rem; color: var(--accent-emerald);">
            <strong>Authorization Header:</strong> <code>Authorization: Bearer ${token ? token.substring(0, 20) + '...' : 'none'}</code>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('close-token-modal')?.addEventListener('click', closeModal);
  document.getElementById('token-modal-backdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'token-modal-backdrop') closeModal();
  });

  document.getElementById('copy-token-btn')?.addEventListener('click', () => {
    if (token) {
      navigator.clipboard.writeText(`Bearer ${token}`);
      showToast('Authorization Bearer token copied to clipboard!', 'success');
    }
  });
}

// Close Active Modal
function closeModal() {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) modalRoot.innerHTML = '';
}
