// ==========================================================================
// Lumina CMS — REST API Service & Authentication Storage
// ==========================================================================

const API_BASE = import.meta.env.VITE_BACKEND_URL 
  ? `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '')}/api` 
  : '/api';
const TOKEN_KEY = 'lumina_jwt_access_token';
const USER_KEY = 'lumina_user_profile';

export const authState = {
  token: localStorage.getItem(TOKEN_KEY) || null,
  user: JSON.parse(localStorage.getItem(USER_KEY) || 'null'),

  setSession(token, user) {
    this.token = token;
    this.user = user;
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);

    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  },

  clearSession() {
    this.token = null;
    this.user = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  isAuthenticated() {
    return !!this.token;
  }
};

/**
  * Wrapper for API requests with auto Authorization headers & error handling
  */
async function apiFetch(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (authState.token) {
    headers['Authorization'] = `Bearer ${authState.token}`;
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // If 401 Unauthorized, token might be expired or invalid
      if (response.status === 401 && endpoint !== '/auth/signin') {
        // Optional handle token expiry
      }
      const errorMessage = data.message || `API Error (${response.status})`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (err) {
    console.error(`API Fetch Error [${endpoint}]:`, err);
    throw err;
  }
}

export const api = {
  // Health check endpoint
  async checkHealth() {
    return apiFetch('/hello');
  },

  // Auth endpoints
  async signup(payload) {
    // payload: { first_name, last_name, email, password, country }
    return apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async signin(email, password) {
    const res = await apiFetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        auth: { email, password }
      }),
    });

    if (res?.data?.attributes?.token) {
      const user = {
        id: res.data.id,
        email: res.data.attributes.email,
        name: res.data.attributes.name,
        country: res.data.attributes.country,
        createdAt: res.data.attributes.createdAt,
        updatedAt: res.data.attributes.updatedAt,
      };
      authState.setSession(res.data.attributes.token, user);
    }

    return res;
  },

  logout() {
    authState.clearSession();
  },

  // Content endpoints
  async listContents() {
    return apiFetch('/contents');
  },

  async getContent(id) {
    return apiFetch(`/contents/${id}`);
  },

  async createContent(title, body) {
    return apiFetch('/contents', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
    });
  },

  async updateContent(id, title, body) {
    return apiFetch(`/contents/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, body }),
    });
  },

  async partialUpdateContent(id, updates) {
    // updates: { title?: string, body?: string }
    return apiFetch(`/contents/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  },

  async deleteContent(id) {
    return apiFetch(`/contents/${id}`, {
      method: 'DELETE',
    });
  }
};
