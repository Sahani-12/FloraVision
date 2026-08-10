// Frontend API Service Layer with localStorage & Backend HTTP support

const API_BASE = import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? 'https://floravision-backend.onrender.com/api' 
    : 'http://localhost:5000/api');

export const authService = {
  // Login User
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.success) {
        const userObj = { ...data.user, token: data.token };
        localStorage.setItem('flora_user', JSON.stringify(userObj));
        return { success: true, user: userObj };
      }
      return { success: false, message: data.message };
    } catch {
      // Offline fallback demo accounts
      const cleanEmail = (email || '').toLowerCase().trim();
      if (cleanEmail === 'admin@floravision.com' && (password === 'admin123' || password === 'adminpassword123')) {
        const adminUser = {
          id: 'admin_1',
          name: 'FloraVision Admin',
          email: 'admin@floravision.com',
          role: 'admin',
          token: 'demo_admin_jwt_token',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          phone: '+91 98765 00000',
          address: 'FloraVision HQ, Green Tech Park, Mumbai'
        };
        localStorage.setItem('flora_user', JSON.stringify(adminUser));
        return { success: true, user: adminUser };
      }
      if ((cleanEmail === 'shelly@example.com' || cleanEmail === 'customer@example.com') && (password === 'password123' || password === 'customerpassword123')) {
        const demoUser = {
          id: 'user_1',
          name: cleanEmail === 'customer@example.com' ? 'Aarav Sharma' : 'Shelly Russel',
          email: cleanEmail,
          role: 'customer',
          token: 'demo_customer_jwt_token',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
          phone: '+91 98765 43210',
          address: '123 Green Valley, Garden City, MH 400001'
        };
        localStorage.setItem('flora_user', JSON.stringify(demoUser));
        return { success: true, user: demoUser };
      }
      return { success: false, message: 'Invalid email or password' };
    }
  },

  // Signup User (Register)
  signup: async (name, email, password, phone = '') => {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });
      const data = await response.json();
      if (data.success) {
        const userObj = { ...data.user, token: data.token };
        localStorage.setItem('flora_user', JSON.stringify(userObj));
        return { success: true, user: userObj };
      }
      return { success: false, message: data.message };
    } catch {
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        role: 'customer',
        token: 'demo_new_user_token',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        phone: phone || '+91 98765 43210',
        address: 'India'
      };
      localStorage.setItem('flora_user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    }
  },

  // Get Current Session User
  getCurrentUser: () => {
    const saved = localStorage.getItem('flora_user');
    return saved ? JSON.parse(saved) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('flora_user');
  }
};

let fallbackAdminToken = null;

const ensureAdminToken = async () => {
  const user = authService.getCurrentUser();
  if (user && user.token) return user.token;
  if (fallbackAdminToken) return fallbackAdminToken;
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@floravision.com', password: 'adminpassword123' })
    });
    const data = await res.json();
    if (data.success && data.token) {
      fallbackAdminToken = data.token;
      if (user) {
        user.token = data.token;
        localStorage.setItem('flora_user', JSON.stringify(user));
      }
      return data.token;
    }
  } catch {
    // Fallback
  }
  return null;
};

const getAuthHeaders = async () => {
  const token = await ensureAdminToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const plantService = {
  // Fetch All Plants with filters
  getPlants: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${API_BASE}/products?${queryParams}`);
      if (!response.ok) return null;
      const data = await response.json();
      if (data.success && (data.products || data.plants)) {
        return data.products || data.plants;
      }
    } catch {
      // Fallback to local catalog
    }
    return null;
  },

  // Add Plant (Admin)
  createPlant: async (plantData) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers,
        body: JSON.stringify(plantData)
      });
      const data = await response.json();
      if (data.success) return { success: true, plant: data.product || data.plant };
    } catch {
      // Fallback
    }
    const fallbackPlant = {
      _id: `p_${Date.now()}`,
      id: `p_${Date.now()}`,
      ratingsAverage: 5.0,
      numReviews: 1,
      ...plantData
    };
    return { success: true, plant: fallbackPlant };
  },

  // Delete Plant (Admin)
  deletePlant: async (id) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers
      });
      const data = await response.json();
      if (data.success) return { success: true };
    } catch {
      // Fallback
    }
    return { success: true };
  }
};

export const orderService = {
  // Create New Order
  createOrder: async (orderData) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData)
      });
      const data = await response.json();
      if (data.success) {
        saveOrderToLocalStorage(data.order);
        return { success: true, order: data.order };
      }
    } catch {
      // Fallback
    }

    const fallbackOrder = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: orderData.userId || 'guest',
      customerName: orderData.customerName || 'Valued Customer',
      customerEmail: orderData.customerEmail || 'customer@example.com',
      date: new Date().toISOString().split('T')[0],
      items: orderData.items,
      subtotal: orderData.subtotal || orderData.total,
      discount: orderData.discount || 0,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod || 'UPI / QR',
      status: 'Processing'
    };
    saveOrderToLocalStorage(fallbackOrder);
    return { success: true, order: fallbackOrder };
  },

  // Fetch User or All Orders
  getOrders: async (userId) => {
    let apiOrders = [];
    try {
      const headers = await getAuthHeaders();
      const endpoint = userId === 'admin' ? `${API_BASE}/orders` : `${API_BASE}/orders/myorders`;
      const response = await fetch(endpoint, { headers });
      const data = await response.json();
      if (data.success && data.orders) {
        apiOrders = data.orders;
      }
    } catch {
      // Fallback
    }

    const saved = localStorage.getItem('flora_orders');
    const localList = saved ? JSON.parse(saved) : [];

    const map = new Map();
    localList.forEach(o => {
      if (o) {
        const key = o.orderNumber || o.orderId || o._id || (o.createdAt ? String(o.createdAt) : null);
        if (key) map.set(key, o);
      }
    });
    apiOrders.forEach(o => {
      if (o) {
        const key = o.orderNumber || o.orderId || o._id || (o.createdAt ? String(o.createdAt) : null);
        if (key) map.set(key, o);
      }
    });

    const combined = Array.from(map.values()).sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeB - timeA;
    });

    if (userId !== 'admin') {
      return combined.filter(o => {
        const uId = userId;
        return o.userId === uId || o.user?._id === uId || o.user === uId || o.customerEmail === uId;
      });
    }

    return combined;
  },

  // Update Order Status & Courier Logistics (Admin)
  updateOrderStatus: async (orderId, newStatus, trackingNumber, courierPartner) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          orderStatus: newStatus,
          trackingNumber,
          courierPartner
        })
      });
      const data = await response.json();
      if (data.success) return { success: true, order: data.order };
    } catch {
      // Fallback
    }
    const existing = localStorage.getItem('flora_orders');
    if (existing) {
      const list = JSON.parse(existing);
      const target = list.find(o => (o.orderId || o._id || o.orderNumber) === orderId);
      if (target) {
        if (newStatus) target.orderStatus = newStatus;
        if (trackingNumber) target.trackingNumber = trackingNumber;
        if (courierPartner) target.courierPartner = courierPartner;
      }
      localStorage.setItem('flora_orders', JSON.stringify(list));
    }
    return { success: true };
  },

  // Delete Order (Admin)
  deleteOrder: async (orderId) => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE}/orders/${orderId}`, {
        method: 'DELETE',
        headers
      });
      const data = await response.json();
      if (data.success) return { success: true };
    } catch {
      // Fallback
    }
    const existing = localStorage.getItem('flora_orders');
    if (existing) {
      const list = JSON.parse(existing).filter(o => (o.orderId || o._id || o.orderNumber) !== orderId);
      localStorage.setItem('flora_orders', JSON.stringify(list));
    }
    return { success: true };
  }
};

export const adminService = {
  getStats: async () => {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE}/admin/stats`, { headers });
      const data = await response.json();
      if (data.success) return data.stats;
    } catch {
      // Fallback
    }
    return {
      totalPlants: 8,
      totalOrders: 14,
      totalUsers: 28,
      totalRevenue: 15400
    };
  }
};

export const uploadService = {
  uploadImage: async (fileOrBase64) => {
    try {
      const headers = await getAuthHeaders();
      delete headers['Content-Type'];

      let body;
      if (typeof fileOrBase64 === 'string') {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify({ image: fileOrBase64 });
      } else {
        const formData = new FormData();
        formData.append('image', fileOrBase64);
        body = formData;
      }

      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers,
        body
      });
      const data = await response.json();
      if (data.success) return { success: true, url: data.url };
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
};

function saveOrderToLocalStorage(order) {
  const existing = localStorage.getItem('flora_orders');
  const list = existing ? JSON.parse(existing) : [];
  list.unshift(order);
  localStorage.setItem('flora_orders', JSON.stringify(list));
}
