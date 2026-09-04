/* ==========================================================================
   MAGIKDESIGN INTERNAL WORK SYSTEM - CORE APPLICATION LOGIC
   ========================================================================== */

// --- PIPELINE STAGES DEFINITION ---
const PIPELINE_STAGES = [
    { id: 'Quotation', label: 'Quotation', desc: 'Brief quotation given', color: 'var(--stage-quotation)' },
    { id: 'Design', label: 'Design', desc: 'Design work started', color: 'var(--stage-design)' },
    { id: 'Proof Sent', label: 'Proof Sent', desc: 'Proof sent to client', color: 'var(--stage-proof)' },
    { id: 'Approved', label: 'Approved', desc: 'Client approved design', color: 'var(--stage-approved)' },
    { id: 'Printing & Cutting', label: 'Printing & Cutting', desc: 'Printing and cutting in progress', color: 'var(--stage-printing)' },
    { id: 'Invoice', label: 'Invoice', desc: 'Invoice has been raised', color: 'var(--stage-invoice)' },
    { id: 'Delivery', label: 'Delivery', desc: 'Handed over to customer', color: 'var(--stage-delivery)' }
];

// --- LOCAL STORAGE DATABASE MODULE ---
const DB = {
    get: (key) => {
        try {
            const val = localStorage.getItem(key);
            return val ? JSON.parse(val) : null;
        } catch (e) {
            console.error('Storage Read Error:', e);
            return null;
        }
    },
    set: (key, val) => {
        try {
            localStorage.setItem(key, JSON.stringify(val));
            SyncEngine.notifyTabs();
        } catch (e) {
            console.error('Storage Write Error:', e);
        }
    },
    init: () => {
        // Pre-seed sample leads if first launch
        if (!DB.get('magik_leads')) {
            DB.set('magik_leads', [
                {
                    id: 'lead-101',
                    customerName: 'Aarav Sharma',
                    mobile: '+91 98765 43210',
                    enquiryText: 'Enquired about 500 Gold Foil Business Cards on 400gsm matte card stock.',
                    status: 'New',
                    createdAt: Date.now() - 3600000 * 5
                },
                {
                    id: 'lead-102',
                    customerName: 'Priya Sundaram',
                    mobile: '+91 98400 11223',
                    enquiryText: 'Looking for a 12x4 ft Outdoor Flex Banner for new clinic opening on Friday.',
                    status: 'Contacted',
                    createdAt: Date.now() - 3600000 * 18
                },
                {
                    id: 'lead-103',
                    customerName: 'Vikram Electronics',
                    mobile: '+91 99112 88776',
                    enquiryText: 'Needs 50 Acrylic Custom Trophies for annual company awards.',
                    status: 'Converted',
                    createdAt: Date.now() - 3600000 * 48
                }
            ]);
        }

        // Pre-seed sample sale orders if first launch
        if (!DB.get('magik_orders')) {
            const now = Date.now();
            const h26 = 26 * 3600 * 1000; // 26 hours ago (triggers >24h alert!)
            const h30 = 30 * 3600 * 1000; // 30 hours ago (triggers >24h alert!)
            const h2 = 2 * 3600 * 1000;

            DB.set('magik_orders', [
                {
                    id: 'ord-1001',
                    orderNumber: 'ORD-1001',
                    customerName: 'Kaveri Bakery',
                    mobile: '+91 97110 55443',
                    itemType: 'Flyer / Pamphlet',
                    size: 'A5 Trifold Gloss',
                    quantity: 2000,
                    price: 4500,
                    workDetails: 'Bakery inauguration flyer. Colors: Warm Amber & White. High gloss finish.',
                    stage: 'Quotation',
                    isPaid: false,
                    stageEnteredAt: now - h2,
                    createdAt: now - h2
                },
                {
                    id: 'ord-1002',
                    orderNumber: 'ORD-1002',
                    customerName: 'Metro Fitness Studio',
                    mobile: '+91 98888 12345',
                    itemType: 'Flex Banner',
                    size: '10x4 ft Vinyl',
                    quantity: 2,
                    price: 3200,
                    workDetails: 'Bright yellow background. Bold text "30% OFF SUMMER PASS". Eyelets every 2 feet.',
                    stage: 'Design',
                    isPaid: false,
                    stageEnteredAt: now - (5 * 3600 * 1000),
                    createdAt: now - (8 * 3600 * 1000)
                },
                {
                    id: 'ord-1003',
                    orderNumber: 'ORD-1003',
                    customerName: 'Dr. Ramesh Kumar',
                    mobile: '+91 94440 88990',
                    itemType: 'Business Cards',
                    size: '3.5x2 in Standard',
                    quantity: 500,
                    price: 1800,
                    workDetails: 'Spot UV coating on doctor logo. Matte 350gsm cardstock.',
                    stage: 'Proof Sent',
                    isPaid: false,
                    stageEnteredAt: now - (12 * 3600 * 1000),
                    createdAt: now - (24 * 3600 * 1000)
                },
                {
                    id: 'ord-1004',
                    orderNumber: 'ORD-1004',
                    customerName: 'Apex Tech Solutions',
                    mobile: '+91 96000 33445',
                    itemType: 'Acrylic Signage',
                    size: '3x2 ft LED Backlit',
                    quantity: 1,
                    price: 12500,
                    workDetails: 'CRITICAL ALERT DEMO: Client approved design 26h ago! Printing hasn\'t started yet!',
                    stage: 'Approved',
                    isPaid: false,
                    stageEnteredAt: now - h26, // >24h Sitting in Approved (Forgot to print!)
                    createdAt: now - h26 - (4 * 3600 * 1000)
                },
                {
                    id: 'ord-1005',
                    orderNumber: 'ORD-1005',
                    customerName: 'Greenwood International',
                    mobile: '+91 95555 77112',
                    itemType: 'Trophy / Memento',
                    size: '8 inch Crystal',
                    quantity: 35,
                    price: 24500,
                    workDetails: 'CRITICAL ALERT DEMO: Printing & Engraving completed 30h ago! Invoice not raised yet!',
                    stage: 'Printing & Cutting',
                    isPaid: false,
                    stageEnteredAt: now - h30, // >24h Sitting in Printing & Cutting (Forgot to invoice!)
                    createdAt: now - h30 - (10 * 3600 * 1000)
                },
                {
                    id: 'ord-1006',
                    orderNumber: 'ORD-1006',
                    customerName: 'Royal Auto Workshop',
                    mobile: '+91 93333 44556',
                    itemType: 'Sticker / Label',
                    size: '3x3 in Waterproof Vinyl',
                    quantity: 1000,
                    price: 3500,
                    workDetails: 'Oil change reminder stickers with metallic foil border.',
                    stage: 'Invoice',
                    isPaid: false,
                    stageEnteredAt: now - (4 * 3600 * 1000),
                    createdAt: now - (35 * 3600 * 1000)
                },
                {
                    id: 'ord-1007',
                    orderNumber: 'ORD-1007',
                    customerName: 'Sunrise Cafe',
                    mobile: '+91 92222 11000',
                    itemType: 'ID Card',
                    size: 'PVC Standard',
                    quantity: 12,
                    price: 2400,
                    workDetails: 'Staff ID cards with lanyard printed on both sides.',
                    stage: 'Delivery',
                    isPaid: true,
                    stageEnteredAt: now - (1 * 3600 * 1000),
                    createdAt: now - (48 * 3600 * 1000)
                }
            ]);
        }

        // Pre-seed default team auth credentials if not present
        if (!DB.get('magik_auth_creds')) {
            DB.set('magik_auth_creds', {
                username: 'admin',
                password: 'magik123',
                createdAt: Date.now()
            });
        }

        // Auto-login session by default on initial launch
        if (DB.get('magik_session_active') === null) {
            DB.set('magik_session_active', true);
        }
    }
};

// --- REAL-TIME MULTI-TAB SYNC ENGINE ---
const SyncEngine = {
    channel: null,
    init: () => {
        try {
            if ('BroadcastChannel' in window) {
                SyncEngine.channel = new BroadcastChannel('magikdesign_sync_channel');
                SyncEngine.channel.onmessage = (event) => {
                    if (event.data === 'sync_refresh') {
                        App.renderAll();
                    }
                };
            }
        } catch (e) {
            console.warn('BroadcastChannel fallback:', e);
        }

        window.addEventListener('storage', (event) => {
            if (event.key && event.key.startsWith('magik_')) {
                App.renderAll();
            }
        });

        // Periodic auto-refresh every 10 seconds to update sitting timers live
        setInterval(() => {
            App.renderAllSilently();
        }, 10000);
    },
    notifyTabs: () => {
        if (SyncEngine.channel) {
            SyncEngine.channel.postMessage('sync_refresh');
        }
    }
};

// --- AUTHENTICATION & LOGIN GATE CONTROLLER ---
const AuthGate = {
    isConfigured: () => {
        return !!DB.get('magik_auth_creds');
    },
    isLoggedIn: () => {
        return DB.get('magik_session_active') === true;
    },
    checkState: () => {
        const authOverlay = document.getElementById('auth-overlay');
        const mainApp = document.getElementById('main-app-content');
        const setupForm = document.getElementById('setup-form-wrapper');
        const loginForm = document.getElementById('login-form-wrapper');

        if (!AuthGate.isLoggedIn()) {
            authOverlay.classList.add('active');
            authOverlay.style.display = 'flex';
            mainApp.style.display = 'none';

            if (!AuthGate.isConfigured()) {
                setupForm.style.display = 'block';
                loginForm.style.display = 'none';
            } else {
                setupForm.style.display = 'none';
                loginForm.style.display = 'block';
            }
        } else {
            authOverlay.classList.remove('active');
            authOverlay.style.display = 'none';
            mainApp.style.display = 'flex';
            const creds = DB.get('magik_auth_creds');
            if (creds) {
                document.getElementById('logged-user-name').innerText = creds.username || 'admin';
            }
            App.renderAll();
        }
    },
    setup: (username, password) => {
        if (!username || !password) return alert('Please fill in both fields.');
        DB.set('magik_auth_creds', {
            username: username.trim(),
            password: password.trim(),
            createdAt: Date.now()
        });
        DB.set('magik_session_active', true);
        AuthGate.checkState();
    },
    login: (username, password) => {
        const creds = DB.get('magik_auth_creds') || { username: 'admin', password: 'magik123' };

        const inputUser = (username || '').trim();
        const inputPass = (password || '').trim();

        if (inputUser === creds.username && inputPass === creds.password) {
            DB.set('magik_session_active', true);
            AuthGate.checkState();
        } else if (inputUser === 'admin' && inputPass === 'magik123') {
            // Fallback default credential override
            DB.set('magik_auth_creds', { username: 'admin', password: 'magik123', createdAt: Date.now() });
            DB.set('magik_session_active', true);
            AuthGate.checkState();
        } else {
            alert(`Invalid credentials. Use Username: admin and Password: magik123`);
        }
    },
    quickLogin: () => {
        DB.set('magik_auth_creds', { username: 'admin', password: 'magik123', createdAt: Date.now() });
        DB.set('magik_session_active', true);
        AuthGate.checkState();
    },
    logout: () => {
        DB.set('magik_session_active', false);
        AuthGate.checkState();
    }
};

// --- BACKEND DATABASE REST API SYNC ENGINE ---
const API = {
    fetchLeads: async () => {
        try {
            const res = await fetch('/api/leads');
            if (res.ok) {
                const data = await res.json();
                DB.set('magik_leads', data);
                return data;
            }
        } catch (e) {
            console.log('Backend API offline, falling back to local storage:', e);
        }
        return DB.get('magik_leads') || [];
    },
    fetchOrders: async () => {
        try {
            const res = await fetch('/api/orders');
            if (res.ok) {
                const data = await res.json();
                DB.set('magik_orders', data);
                return data;
            }
        } catch (e) {
            console.log('Backend API offline, falling back to local storage:', e);
        }
        return DB.get('magik_orders') || [];
    },
    saveLead: async (leadData) => {
        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leadData)
            });
            await API.fetchLeads();
        } catch (e) {
            console.error('API Save Lead Error:', e);
        }
    },
    updateLeadStatus: async (leadId, status) => {
        try {
            await fetch(`/api/leads/${leadId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            await API.fetchLeads();
        } catch (e) {
            console.error('API Update Lead Error:', e);
        }
    },
    deleteLead: async (leadId) => {
        try {
            await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
            await API.fetchLeads();
        } catch (e) {
            console.error('API Delete Lead Error:', e);
        }
    },
    saveOrder: async (orderData) => {
        try {
            await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            await API.fetchOrders();
            await API.fetchLeads();
        } catch (e) {
            console.error('API Save Order Error:', e);
        }
    },
    updateOrderStage: async (orderId, stage, simulateDelay = false) => {
        try {
            await fetch(`/api/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stage, simulateDelay })
            });
            await API.fetchOrders();
        } catch (e) {
            console.error('API Update Order Error:', e);
        }
    },
    deleteOrder: async (orderId) => {
        try {
            await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
            await API.fetchOrders();
        } catch (e) {
            console.error('API Delete Order Error:', e);
        }
    }
};

// --- LEADS MANAGEMENT MODULE ---
const LeadsModule = {
    getLeads: () => DB.get('magik_leads') || [],
    
    addLead: async (customerName, mobile, enquiryText) => {
        if (!customerName || !mobile) return alert('Customer name and mobile number are required.');
        const leads = LeadsModule.getLeads();
        const newLead = {
            id: 'lead-' + Date.now(),
            customerName: customerName.trim(),
            mobile: mobile.trim(),
            enquiryText: enquiryText.trim(),
            status: 'New',
            createdAt: Date.now()
        };
        leads.unshift(newLead);
        DB.set('magik_leads', leads);
        App.closeModal('lead-modal');
        App.renderAll();
        await API.saveLead(newLead);
        App.renderAll();
    },

    updateStatus: async (leadId, newStatus) => {
        const leads = LeadsModule.getLeads();
        const lead = leads.find(l => l.id === leadId);
        if (lead) {
            lead.status = newStatus;
            DB.set('magik_leads', leads);
            App.renderAll();
            await API.updateLeadStatus(leadId, newStatus);
            App.renderAll();
        }
    },

    deleteLead: async (leadId) => {
        if (confirm('Are you sure you want to delete this enquiry lead?')) {
            let leads = LeadsModule.getLeads();
            leads = leads.filter(l => l.id !== leadId);
            DB.set('magik_leads', leads);
            App.renderAll();
            await API.deleteLead(leadId);
            App.renderAll();
        }
    },

    openConvertModal: (leadId) => {
        const lead = LeadsModule.getLeads().find(l => l.id === leadId);
        if (!lead) return;

        // Pre-fill the sale order modal with lead's data
        document.getElementById('ord-customer-name').value = lead.customerName;
        document.getElementById('ord-mobile').value = lead.mobile;
        document.getElementById('ord-work-details').value = lead.enquiryText;
        document.getElementById('ord-converted-lead-id').value = lead.id;

        // Open Order Modal
        App.openModal('order-modal');
    }
};

// --- SALE ORDERS KANBAN BOARD MODULE ---
const OrdersModule = {
    getOrders: () => DB.get('magik_orders') || [],

    addOrder: async (customerName, mobile, itemType, size, quantity, price, workDetails, convertedLeadId = '') => {
        if (!customerName || !mobile || !itemType) {
            return alert('Customer name, mobile number, and item type are required.');
        }

        const orders = OrdersModule.getOrders();
        const orderNum = 'ORD-' + (1001 + orders.length);

        const newOrder = {
            id: 'ord-' + Date.now(),
            orderNumber: orderNum,
            customerName: customerName.trim(),
            mobile: mobile.trim(),
            itemType: itemType.trim(),
            size: size ? size.trim() : 'Standard',
            quantity: parseInt(quantity) || 1,
            price: parseFloat(price) || 0,
            workDetails: workDetails ? workDetails.trim() : '',
            stage: 'Quotation',
            isPaid: false,
            stageEnteredAt: Date.now(),
            createdAt: Date.now(),
            convertedLeadId: convertedLeadId
        };

        orders.unshift(newOrder);
        DB.set('magik_orders', orders);

        if (convertedLeadId) {
            LeadsModule.updateStatus(convertedLeadId, 'Converted');
        }

        App.closeModal('order-modal');
        App.renderAll();
        await API.saveOrder(newOrder);
        App.renderAll();
    },

    advanceStage: async (orderId) => {
        const orders = OrdersModule.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        const currIdx = PIPELINE_STAGES.findIndex(s => s.id === order.stage);
        if (currIdx >= 0 && currIdx < PIPELINE_STAGES.length - 1) {
            const nextStage = PIPELINE_STAGES[currIdx + 1].id;
            order.stage = nextStage;
            order.stageEnteredAt = Date.now();
            DB.set('magik_orders', orders);
            App.renderAll();
            await API.updateOrderStage(orderId, nextStage);
            App.renderAll();
        }
    },

    revertStage: async (orderId) => {
        const orders = OrdersModule.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        const currIdx = PIPELINE_STAGES.findIndex(s => s.id === order.stage);
        if (currIdx > 0) {
            const prevStage = PIPELINE_STAGES[currIdx - 1].id;
            order.stage = prevStage;
            order.stageEnteredAt = Date.now();
            DB.set('magik_orders', orders);
            App.renderAll();
            await API.updateOrderStage(orderId, prevStage);
            App.renderAll();
        }
    },

    simulateDelay: async (orderId) => {
        const orders = OrdersModule.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.stageEnteredAt = Date.now() - (25 * 3600 * 1000);
            DB.set('magik_orders', orders);
            App.renderAll();
            await API.updateOrderStage(orderId, order.stage, true);
            App.renderAll();
        }
    },

    togglePaid: (orderId) => {
        const orders = OrdersModule.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.isPaid = !order.isPaid;
            DB.set('magik_orders', orders);
            App.renderAll();
        }
    },

    deleteOrder: async (orderId) => {
        if (confirm('Are you sure you want to delete this order?')) {
            let orders = OrdersModule.getOrders();
            orders = orders.filter(o => o.id !== orderId);
            DB.set('magik_orders', orders);
            App.renderAll();
            await API.deleteOrder(orderId);
            App.renderAll();
        }
    },

    formatSittingTime: (stageEnteredAt) => {
        if (!stageEnteredAt) return { text: 'Just now', isDelayed: false, hours: 0 };
        const diffMs = Date.now() - stageEnteredAt;
        const totalMinutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        const days = Math.floor(hours / 24);

        let text = '';
        if (days > 0) {
            const remHours = hours % 24;
            text = `${days}d ${remHours}h sitting`;
        } else if (hours > 0) {
            text = `${hours}h ${mins}m sitting`;
        } else {
            text = `${Math.max(1, mins)}m sitting`;
        }

        return {
            text: text,
            isDelayed: hours >= 24,
            hours: hours
        };
    }
};

// --- MAIN UI APPLICATION CONTROLLER ---
const App = {
    currentTab: 'orders',
    selectedCustomerFilter: 'ALL',

    init: async () => {
        DB.init();
        SyncEngine.init();
        AuthGate.checkState();
        await API.fetchLeads();
        await API.fetchOrders();
        App.renderAll();
    },

    switchTab: (tabName) => {
        App.currentTab = tabName;
        document.getElementById('tab-btn-orders').classList.toggle('active', tabName === 'orders');
        document.getElementById('tab-btn-leads').classList.toggle('active', tabName === 'leads');

        document.getElementById('section-orders').style.display = tabName === 'orders' ? 'flex' : 'none';
        document.getElementById('section-leads').style.display = tabName === 'leads' ? 'flex' : 'none';
        App.renderAll();
    },

    setCustomerFilter: (customerName) => {
        App.selectedCustomerFilter = customerName || 'ALL';
        const select = document.getElementById('customer-filter-select');
        if (select) select.value = App.selectedCustomerFilter;
        App.renderAll();
    },

    populateCustomerFilterDropdown: () => {
        const select = document.getElementById('customer-filter-select');
        if (!select) return;

        const orders = OrdersModule.getOrders();
        const leads = LeadsModule.getLeads();

        // Calculate works count per customer name
        const customerCounts = {};
        orders.forEach(o => {
            customerCounts[o.customerName] = (customerCounts[o.customerName] || 0) + 1;
        });
        leads.forEach(l => {
            customerCounts[l.customerName] = (customerCounts[l.customerName] || 0) + 1;
        });

        const uniqueCustomers = Object.keys(customerCounts).sort();

        let html = `<option value="ALL">All Customers (${orders.length} Total Works)</option>`;
        uniqueCustomers.forEach(cust => {
            const count = customerCounts[cust];
            const isSel = App.selectedCustomerFilter === cust ? 'selected' : '';
            html += `<option value="${App.escapeHtml(cust)}" ${isSel}>${App.escapeHtml(cust)} (${count} work${count > 1 ? 's' : ''})</option>`;
        });

        select.innerHTML = html;
    },

    renderCustomerBanner: () => {
        const wrapper = document.getElementById('customer-active-banner-wrapper');
        if (!wrapper) return;

        if (App.selectedCustomerFilter === 'ALL') {
            wrapper.innerHTML = '';
            return;
        }

        const customerName = App.selectedCustomerFilter;
        const orders = OrdersModule.getOrders().filter(o => o.customerName === customerName);
        const leads = LeadsModule.getLeads().filter(l => l.customerName === customerName);

        let totalValue = 0;
        orders.forEach(o => totalValue += o.price);

        const totalWorks = orders.length + leads.length;

        wrapper.innerHTML = `
            <div class="customer-active-banner">
                <div class="customer-banner-info">
                    <div class="customer-banner-icon"><i class="fa-solid fa-user-check"></i></div>
                    <div class="customer-banner-details">
                        <h4>Filtering Works for: ${App.escapeHtml(customerName)}</h4>
                        <p>${orders.length} Active Order(s), ${leads.length} Lead Enquiry(ies) | Combined Order Value: <strong>₹${totalValue.toLocaleString()}</strong></p>
                    </div>
                </div>
                <div class="customer-banner-actions">
                    ${orders.length > 0 ? `
                        <button class="btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;" onclick="App.openCombinedInvoiceModal('${App.escapeHtml(customerName)}')">
                            <i class="fa-solid fa-file-invoice-dollar"></i> Combined Invoice (${orders.length} Works)
                        </button>
                    ` : ''}
                    <button class="btn-clear-customer-filter" onclick="App.setCustomerFilter('ALL')">
                        <i class="fa-solid fa-xmark"></i> Show All Customers
                    </button>
                </div>
            </div>
        `;
    },

    renderAll: () => {
        App.populateCustomerFilterDropdown();
        App.renderHeaderCounters();
        App.renderAlerts();
        App.renderCustomerBanner();
        if (App.currentTab === 'orders') {
            App.renderOrdersBoard();
        } else {
            App.renderLeadsTable();
        }
    },

    renderAllSilently: () => {
        App.renderHeaderCounters();
        App.renderAlerts();
        App.renderCustomerBanner();
        if (App.currentTab === 'orders') {
            App.renderOrdersBoard();
        }
    },

    renderHeaderCounters: () => {
        const leads = LeadsModule.getLeads();
        const orders = OrdersModule.getOrders();
        document.getElementById('leads-count-badge').innerText = leads.length;
        document.getElementById('orders-count-badge').innerText = orders.length;
    },

    renderAlerts: () => {
        const orders = OrdersModule.getOrders();
        const alertsContainer = document.getElementById('automatic-alerts-wrapper');
        alertsContainer.innerHTML = '';

        // Alert 1: Orders sitting in Approved for > 24 hours (forgot to print!)
        const approvedDelayed = orders.filter(o => o.stage === 'Approved' && OrdersModule.formatSittingTime(o.stageEnteredAt).isDelayed);

        // Alert 2: Orders sitting in Printing & Cutting for > 24 hours (forgot to invoice!)
        const printingDelayed = orders.filter(o => o.stage === 'Printing & Cutting' && OrdersModule.formatSittingTime(o.stageEnteredAt).isDelayed);

        if (approvedDelayed.length === 0 && printingDelayed.length === 0) {
            return;
        }

        if (approvedDelayed.length > 0) {
            const banner = document.createElement('div');
            banner.className = 'alert-banner';
            banner.innerHTML = `
                <div class="alert-left">
                    <div class="alert-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
                    <div class="alert-content">
                        <h4>⚠️ Action Needed: ${approvedDelayed.length} Order(s) Approved >24 hours ago (Forgot to print!)</h4>
                        <p>Customer confirmed design proof, but print production has not started yet.</p>
                        <div class="alert-items-list">
                            ${approvedDelayed.map(o => `
                                <span class="alert-item-chip" onclick="App.highlightOrder('${o.id}')">
                                    <i class="fa-solid fa-print"></i> ${o.orderNumber} - ${o.customerName} (${OrdersModule.formatSittingTime(o.stageEnteredAt).text})
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            alertsContainer.appendChild(banner);
        }

        if (printingDelayed.length > 0) {
            const banner = document.createElement('div');
            banner.className = 'alert-banner warning-amber';
            banner.innerHTML = `
                <div class="alert-left">
                    <div class="alert-icon"><i class="fa-solid fa-file-invoice-dollar"></i></div>
                    <div class="alert-content">
                        <h4>⚠️ Action Needed: ${printingDelayed.length} Order(s) in Printing >24 hours (Forgot to invoice!)</h4>
                        <p>Print production is complete, but an invoice has not been raised yet.</p>
                        <div class="alert-items-list">
                            ${printingDelayed.map(o => `
                                <span class="alert-item-chip" onclick="App.highlightOrder('${o.id}')">
                                    <i class="fa-solid fa-receipt"></i> ${o.orderNumber} - ${o.customerName} (${OrdersModule.formatSittingTime(o.stageEnteredAt).text})
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            alertsContainer.appendChild(banner);
        }
    },

    renderOrdersBoard: () => {
        const orders = OrdersModule.getOrders();
        const searchQuery = (document.getElementById('global-search-input').value || '').toLowerCase();
        const boardContainer = document.getElementById('kanban-board-container');
        boardContainer.innerHTML = '';

        PIPELINE_STAGES.forEach((stage, idx) => {
            const stageOrders = orders.filter(o => {
                const matchesStage = o.stage === stage.id;
                const matchesCustomerFilter = App.selectedCustomerFilter === 'ALL' || o.customerName === App.selectedCustomerFilter;
                const matchesSearch = !searchQuery || 
                    o.customerName.toLowerCase().includes(searchQuery) ||
                    o.orderNumber.toLowerCase().includes(searchQuery) ||
                    o.mobile.includes(searchQuery) ||
                    o.itemType.toLowerCase().includes(searchQuery);
                return matchesStage && matchesCustomerFilter && matchesSearch;
            });

            const col = document.createElement('div');
            col.className = 'board-column';
            col.innerHTML = `
                <div class="column-header">
                    <div class="column-title-wrap">
                        <span class="stage-dot" style="background-color: ${stage.color}"></span>
                        <h3>${stage.label}</h3>
                    </div>
                    <span class="column-count">${stageOrders.length}</span>
                </div>
                <div class="cards-scroll-area" id="col-cards-${stage.id.replace(/\s+/g, '-')}">
                </div>
            `;

            const cardsArea = col.querySelector('.cards-scroll-area');

            if (stageOrders.length === 0) {
                cardsArea.innerHTML = `<div class="empty-column-msg">No orders in ${stage.label}</div>`;
            } else {
                stageOrders.forEach(o => {
                    const timerInfo = OrdersModule.formatSittingTime(o.stageEnteredAt);
                    const isApprovedDelay = o.stage === 'Approved' && timerInfo.isDelayed;
                    const isPrintingDelay = o.stage === 'Printing & Cutting' && timerInfo.isDelayed;
                    const isAlert = isApprovedDelay || isPrintingDelay;

                    const card = document.createElement('div');
                    card.className = `order-card ${isAlert ? 'alert-delay' : ''}`;
                    card.id = `card-${o.id}`;
                    card.setAttribute('data-stage', o.stage);

                    card.innerHTML = `
                        <div class="card-top">
                            <span class="order-id-tag">${o.orderNumber}</span>
                            <span class="stage-timer-badge ${timerInfo.isDelayed ? 'danger' : ''}">
                                <i class="fa-regular fa-clock"></i> ${timerInfo.text}
                            </span>
                        </div>

                        <div class="card-customer-info">
                            <span class="customer-name clickable-customer-name" onclick="App.setCustomerFilter('${App.escapeHtml(o.customerName)}')" title="Click to filter all works by ${App.escapeHtml(o.customerName)}">
                                ${App.escapeHtml(o.customerName)} <i class="fa-solid fa-filter"></i>
                            </span>
                            <span class="customer-mobile"><i class="fa-solid fa-phone"></i> ${App.escapeHtml(o.mobile)}</span>
                        </div>

                        <div class="card-item-details">
                            <div class="item-main-row">
                                <span>${App.escapeHtml(o.itemType)}</span>
                                <span>₹${o.price.toLocaleString()}</span>
                            </div>
                            <div class="item-specs-row">
                                <span>Size: ${App.escapeHtml(o.size)}</span>
                                <span>Qty: ${o.quantity}</span>
                            </div>
                        </div>

                        ${o.workDetails ? `<div class="work-details-excerpt" title="${App.escapeHtml(o.workDetails)}">${App.escapeHtml(o.workDetails)}</div>` : ''}

                        <div class="card-actions-row">
                            ${idx > 0 ? `
                                <button class="btn-revert-stage" onclick="OrdersModule.revertStage('${o.id}')" title="Move back to ${PIPELINE_STAGES[idx - 1].label}">
                                    <i class="fa-solid fa-arrow-left"></i> ${PIPELINE_STAGES[idx - 1].label}
                                </button>
                            ` : '<span></span>'}

                            ${idx < PIPELINE_STAGES.length - 1 ? `
                                <button class="btn-advance-stage" onclick="OrdersModule.advanceStage('${o.id}')">
                                    ${PIPELINE_STAGES[idx + 1].label} <i class="fa-solid fa-arrow-right"></i>
                                </button>
                            ` : `<span class="badge-count" style="background:#d1fae5; color:#047857; padding:0.25rem 0.5rem; font-size:0.75rem; border-radius:4px;"><i class="fa-solid fa-check-double"></i> Delivered</span>`}
                        </div>

                        <div class="card-extra-actions">
                            <button class="btn-icon-subtle" onclick="App.openInvoiceModal('${o.id}')" title="Print/Export Invoice">
                                <i class="fa-solid fa-print"></i> Invoice
                            </button>
                            <button class="btn-icon-subtle btn-sim-delay" onclick="OrdersModule.simulateDelay('${o.id}')" title="Simulate +25 Hours sitting to test automatic alert banner">
                                <i class="fa-solid fa-bolt"></i> +24h Test
                            </button>
                            <button class="btn-icon-subtle" style="color:var(--danger)" onclick="OrdersModule.deleteOrder('${o.id}')" title="Delete Order">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    `;

                    cardsArea.appendChild(card);
                });
            }

            boardContainer.appendChild(col);
        });
    },

    renderLeadsTable: () => {
        const leads = LeadsModule.getLeads();
        const searchQuery = (document.getElementById('global-search-input').value || '').toLowerCase();
        const tbody = document.getElementById('leads-tbody');
        tbody.innerHTML = '';

        const filtered = leads.filter(l => {
            const matchesCustomerFilter = App.selectedCustomerFilter === 'ALL' || l.customerName === App.selectedCustomerFilter;
            const matchesSearch = !searchQuery || 
                l.customerName.toLowerCase().includes(searchQuery) ||
                l.mobile.includes(searchQuery) ||
                l.enquiryText.toLowerCase().includes(searchQuery);
            return matchesCustomerFilter && matchesSearch;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:2rem; color:var(--text-light)">No enquiries found. Click "+ New lead" to record an enquiry.</td></tr>`;
            return;
        }

        filtered.forEach(lead => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="clickable-customer-name" style="font-weight:700; font-size:0.95rem;" onclick="App.setCustomerFilter('${App.escapeHtml(lead.customerName)}')" title="Click to filter all works by ${App.escapeHtml(lead.customerName)}">
                        ${App.escapeHtml(lead.customerName)} <i class="fa-solid fa-filter"></i>
                    </div>
                    <div style="font-size:0.775rem; color:var(--text-sub);"><i class="fa-solid fa-calendar"></i> ${new Date(lead.createdAt).toLocaleDateString()}</div>
                </td>
                <td><strong style="color:var(--primary-dark)"><i class="fa-solid fa-phone"></i> ${App.escapeHtml(lead.mobile)}</strong></td>
                <td style="max-width:320px;">
                    <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.4;">${App.escapeHtml(lead.enquiryText)}</div>
                </td>
                <td>
                    <select class="status-select ${lead.status.replace(/\s+/g, '')}" onchange="LeadsModule.updateStatus('${lead.id}', this.value)">
                        <option value="New" ${lead.status === 'New' ? 'selected' : ''}>New</option>
                        <option value="Contacted" ${lead.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
                        <option value="Converted" ${lead.status === 'Converted' ? 'selected' : ''}>Converted</option>
                        <option value="Not Interested" ${lead.status === 'Not Interested' ? 'selected' : ''}>Not Interested</option>
                    </select>
                </td>
                <td>
                    <div style="display:flex; align-items:center; gap:0.5rem;">
                        <button class="btn-convert-lead" onclick="LeadsModule.openConvertModal('${lead.id}')">
                            <i class="fa-solid fa-arrow-right-to-bracket"></i> Convert to Order
                        </button>
                        <button class="btn-delete-lead" onclick="LeadsModule.deleteLead('${lead.id}')" title="Delete Lead">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    },

    highlightOrder: (orderId) => {
        App.switchTab('orders');
        setTimeout(() => {
            const card = document.getElementById(`card-${orderId}`);
            if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.style.transform = 'scale(1.05)';
                setTimeout(() => card.style.transform = 'none', 1000);
            }
        }, 100);
    },

    openModal: (modalId) => {
        document.getElementById(modalId).classList.add('active');
    },

    closeModal: (modalId) => {
        document.getElementById(modalId).classList.remove('active');
    },

    openInvoiceModal: (orderId) => {
        const order = OrdersModule.getOrders().find(o => o.id === orderId);
        if (!order) return;

        const modalBody = document.getElementById('invoice-printable-area');
        const taxRate = 0.18;
        const subtotal = order.price;
        const taxAmount = subtotal * taxRate;
        const grandTotal = subtotal + taxAmount;

        modalBody.innerHTML = `
            <div class="invoice-paper">
                <div class="invoice-brand">
                    <div class="invoice-brand-info">
                        <img src="logo.png" alt="MagikDesign Logo" style="height:54px; margin-bottom:0.4rem;">
                        <p style="font-size:0.85rem; color:var(--text-sub)">Graphics • Printing • Sports</p>
                        <p style="font-size:0.8rem; color:var(--text-light)">MG Road Commercial Hub, Bangalore, India</p>
                    </div>
                    <div style="text-align:right">
                        <h3 style="color:var(--text-main); font-size:1.25rem;">TAX INVOICE</h3>
                        <p style="font-size:0.9rem; font-weight:700; color:var(--primary)">${order.orderNumber}</p>
                        <p style="font-size:0.8rem; color:var(--text-sub)">Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <div class="invoice-details-grid">
                    <div>
                        <h4 style="font-size:0.85rem; text-transform:uppercase; color:var(--text-light); margin-bottom:0.3rem;">Billed To:</h4>
                        <p style="font-weight:700; font-size:1rem; color:var(--text-main);">${App.escapeHtml(order.customerName)}</p>
                        <p style="font-size:0.85rem; color:var(--text-sub);"><i class="fa-solid fa-phone"></i> ${App.escapeHtml(order.mobile)}</p>
                    </div>
                    <div style="text-align:right;">
                        <h4 style="font-size:0.85rem; text-transform:uppercase; color:var(--text-light); margin-bottom:0.3rem;">Work Status:</h4>
                        <span style="font-weight:700; background:var(--primary-light); color:var(--primary-dark); padding:0.25rem 0.6rem; border-radius:4px; font-size:0.85rem;">${order.stage}</span>
                    </div>
                </div>

                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Item Description</th>
                            <th>Size / Specifications</th>
                            <th style="text-align:center">Qty</th>
                            <th style="text-align:right">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>${App.escapeHtml(order.itemType)}</strong>
                                ${order.workDetails ? `<div style="font-size:0.8rem; color:var(--text-sub); margin-top:0.2rem;">${App.escapeHtml(order.workDetails)}</div>` : ''}
                            </td>
                            <td>${App.escapeHtml(order.size)}</td>
                            <td style="text-align:center">${order.quantity}</td>
                            <td style="text-align:right; font-weight:700;">₹${order.price.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>

                <div style="display:flex; justify-content:flex-end; margin-top:1.5rem;">
                    <div style="width:280px; display:flex; flex-direction:column; gap:0.5rem; background:var(--bg-subtle); padding:1rem; border-radius:8px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
                            <span>Subtotal:</span>
                            <span>₹${subtotal.toLocaleString()}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
                            <span>GST (18%):</span>
                            <span>₹${taxAmount.toLocaleString()}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:1.05rem; font-weight:800; border-top:1px solid var(--border-color); padding-top:0.5rem; color:var(--primary-dark);">
                            <span>Total Payable:</span>
                            <span>₹${grandTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div style="margin-top:2.5rem; border-top:1px dashed var(--border-color); padding-top:1rem; text-align:center; font-size:0.8rem; color:var(--text-sub);">
                    Thank you for doing business with MagikDesign! For queries, call staff desk or visit shop.
                </div>
            </div>
        `;

        App.openModal('invoice-modal');
    },

    openCombinedInvoiceModal: (customerName) => {
        const orders = OrdersModule.getOrders().filter(o => o.customerName === customerName);
        if (orders.length === 0) return alert('No orders found for this customer.');

        const modalBody = document.getElementById('invoice-printable-area');
        const taxRate = 0.18;
        let subtotal = 0;
        orders.forEach(o => subtotal += o.price);
        const taxAmount = subtotal * taxRate;
        const grandTotal = subtotal + taxAmount;

        let rowsHtml = '';
        orders.forEach(o => {
            rowsHtml += `
                <tr>
                    <td>
                        <strong style="color:var(--primary-dark)">${o.orderNumber}</strong> - <strong>${App.escapeHtml(o.itemType)}</strong>
                        <span style="font-size:0.75rem; background:var(--primary-light); color:var(--primary-dark); padding:0.1rem 0.4rem; border-radius:3px; margin-left:0.4rem;">${o.stage}</span>
                        ${o.workDetails ? `<div style="font-size:0.8rem; color:var(--text-sub); margin-top:0.2rem;">${App.escapeHtml(o.workDetails)}</div>` : ''}
                    </td>
                    <td>${App.escapeHtml(o.size)}</td>
                    <td style="text-align:center">${o.quantity}</td>
                    <td style="text-align:right; font-weight:700;">₹${o.price.toLocaleString()}</td>
                </tr>
            `;
        });

        modalBody.innerHTML = `
            <div class="invoice-paper">
                <div class="invoice-brand">
                    <div class="invoice-brand-info">
                        <img src="logo.png" alt="MagikDesign Logo" style="height:54px; margin-bottom:0.4rem;">
                        <p style="font-size:0.85rem; color:var(--text-sub)">Graphics • Printing • Sports</p>
                        <p style="font-size:0.8rem; color:var(--text-light)">MG Road Commercial Hub, Bangalore, India</p>
                    </div>
                    <div style="text-align:right">
                        <h3 style="color:var(--text-main); font-size:1.25rem;">CONSOLIDATED STATEMENT</h3>
                        <p style="font-size:0.85rem; font-weight:700; color:var(--primary);">${orders.length} Combined Works</p>
                        <p style="font-size:0.8rem; color:var(--text-sub)">Date: ${new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                <div class="invoice-details-grid">
                    <div>
                        <h4 style="font-size:0.85rem; text-transform:uppercase; color:var(--text-light); margin-bottom:0.3rem;">Client Name:</h4>
                        <p style="font-weight:700; font-size:1.05rem; color:var(--text-main);">${App.escapeHtml(customerName)}</p>
                        <p style="font-size:0.85rem; color:var(--text-sub);"><i class="fa-solid fa-phone"></i> ${App.escapeHtml(orders[0].mobile)}</p>
                    </div>
                    <div style="text-align:right;">
                        <h4 style="font-size:0.85rem; text-transform:uppercase; color:var(--text-light); margin-bottom:0.3rem;">Total Items:</h4>
                        <span style="font-weight:700; background:var(--primary-light); color:var(--primary-dark); padding:0.25rem 0.6rem; border-radius:4px; font-size:0.85rem;">${orders.length} Active Orders</span>
                    </div>
                </div>

                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Order # & Item Description</th>
                            <th>Size / Specifications</th>
                            <th style="text-align:center">Qty</th>
                            <th style="text-align:right">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml}
                    </tbody>
                </table>

                <div style="display:flex; justify-content:flex-end; margin-top:1.5rem;">
                    <div style="width:280px; display:flex; flex-direction:column; gap:0.5rem; background:var(--bg-subtle); padding:1rem; border-radius:8px;">
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
                            <span>Subtotal (${orders.length} Works):</span>
                            <span>₹${subtotal.toLocaleString()}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
                            <span>GST (18%):</span>
                            <span>₹${taxAmount.toLocaleString()}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; font-size:1.05rem; font-weight:800; border-top:1px solid var(--border-color); padding-top:0.5rem; color:var(--primary-dark);">
                            <span>Combined Total Payable:</span>
                            <span>₹${grandTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div style="margin-top:2.5rem; border-top:1px dashed var(--border-color); padding-top:1rem; text-align:center; font-size:0.8rem; color:var(--text-sub);">
                    Thank you for choosing MagikDesign! Consolidated statement compiled for all active customer orders.
                </div>
            </div>
        `;

        App.openModal('invoice-modal');
    },

    selectItemChip: (itemText) => {
        document.getElementById('ord-item-type').value = itemText;
    },

    escapeHtml: (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
};

// --- INITIALIZE ON DOM READY ---
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
