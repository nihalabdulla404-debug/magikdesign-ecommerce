const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// On Vercel serverless environment, use /tmp or local fallback database file
const TMP_DB_FILE = path.join('/tmp', 'database.json');
const LOCAL_DB_FILE = path.join(__dirname, '..', 'database.json');

const defaultDbData = {
    auth: {
        username: 'admin',
        password: 'magik123',
        createdAt: Date.now()
    },
    leads: [
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
    ],
    orders: [
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
            stageEnteredAt: Date.now() - (2 * 3600 * 1000),
            createdAt: Date.now() - (2 * 3600 * 1000)
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
            stageEnteredAt: Date.now() - (5 * 3600 * 1000),
            createdAt: Date.now() - (8 * 3600 * 1000)
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
            stageEnteredAt: Date.now() - (12 * 3600 * 1000),
            createdAt: Date.now() - (24 * 3600 * 1000)
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
            stageEnteredAt: Date.now() - (26 * 3600 * 1000),
            createdAt: Date.now() - (30 * 3600 * 1000)
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
            stageEnteredAt: Date.now() - (30 * 3600 * 1000),
            createdAt: Date.now() - (40 * 3600 * 1000)
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
            stageEnteredAt: Date.now() - (4 * 3600 * 1000),
            createdAt: Date.now() - (35 * 3600 * 1000)
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
            stageEnteredAt: Date.now() - (1 * 3600 * 1000),
            createdAt: Date.now() - (48 * 3600 * 1000)
        }
    ]
};

function getDb() {
    try {
        if (fs.existsSync(TMP_DB_FILE)) {
            return JSON.parse(fs.readFileSync(TMP_DB_FILE, 'utf8'));
        }
        if (fs.existsSync(LOCAL_DB_FILE)) {
            const data = fs.readFileSync(LOCAL_DB_FILE, 'utf8');
            try {
                fs.writeFileSync(TMP_DB_FILE, data, 'utf8');
            } catch (e) {}
            return JSON.parse(data);
        }
        try {
            fs.writeFileSync(TMP_DB_FILE, JSON.stringify(defaultDbData, null, 2), 'utf8');
        } catch (e) {}
        return defaultDbData;
    } catch (e) {
        return defaultDbData;
    }
}

function saveDb(data) {
    try {
        fs.writeFileSync(TMP_DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {}
    try {
        if (fs.existsSync(path.dirname(LOCAL_DB_FILE))) {
            fs.writeFileSync(LOCAL_DB_FILE, JSON.stringify(data, null, 2), 'utf8');
        }
    } catch (e) {}
}

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || 'https://proud-hermit-114900.upstash.io';
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || 'gQAAAAAAAcDUAQIgcDE3MjczNzUxNTFmYzA0OGMxODBkOTNjMzgwZmYxZWEzNA';

async function getCloudDb() {
    try {
        const res = await fetch(UPSTASH_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${UPSTASH_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(['GET', 'magik_db'])
        });
        if (res.ok) {
            const json = await res.json();
            if (json.result) {
                return JSON.parse(json.result);
            }
        }
    } catch (e) {
        console.error('Cloud DB Fetch Error:', e);
    }
    return getDb();
}

async function saveCloudDb(data) {
    saveDb(data);
    try {
        await fetch(UPSTASH_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${UPSTASH_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(['SET', 'magik_db', JSON.stringify(data)])
        });
    } catch (e) {
        console.error('Cloud DB Save Error:', e);
    }
}

// CORS & Security Headers Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    next();
});

// --- STATIC FILE SERVING FOR VERCEL ---
const STATIC_FILES = {
    '/': { file: 'index.html', mime: 'text/html' },
    '/index.html': { file: 'index.html', mime: 'text/html' },
    '/styles.css': { file: 'styles.css', mime: 'text/css' },
    '/app.js': { file: 'app.js', mime: 'application/javascript' },
    '/logo.png': { file: 'logo.png', mime: 'image/png' }
};

app.use((req, res, next) => {
    const route = STATIC_FILES[req.path];
    if (route && req.method === 'GET') {
        const pathsToTry = [
            path.join(__dirname, '..', route.file),
            path.join(process.cwd(), route.file),
            path.join(__dirname, route.file)
        ];
        for (const filePath of pathsToTry) {
            try {
                if (fs.existsSync(filePath)) {
                    res.setHeader('Content-Type', route.mime);
                    return res.status(200).send(fs.readFileSync(filePath));
                }
            } catch (e) {}
        }
    }
    next();
});

app.get('/api/health', async (req, res) => {
    const db = await getCloudDb();
    res.json({
        status: 'online',
        database: 'Upstash Global Shared Cloud Database (Connected)',
        leadsCount: db.leads.length,
        ordersCount: db.orders.length
    });
});

app.post('/api/auth/login', async (req, res) => {
    const db = await getCloudDb();
    const { username, password } = req.body || {};
    const creds = db.auth || { username: 'admin', password: 'magik123' };
    if (username === creds.username && password === creds.password) {
        return res.json({ success: true, username: creds.username });
    }
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

app.get('/api/leads', async (req, res) => {
    const db = await getCloudDb();
    res.json(db.leads);
});

app.post('/api/leads', async (req, res) => {
    const db = await getCloudDb();
    const newLead = {
        id: 'lead-' + Date.now(),
        customerName: req.body.customerName,
        mobile: req.body.mobile,
        enquiryText: req.body.enquiryText || '',
        status: req.body.status || 'New',
        createdAt: Date.now()
    };
    db.leads.unshift(newLead);
    await saveCloudDb(db);
    res.status(201).json(newLead);
});

app.put('/api/leads/:id', async (req, res) => {
    const db = await getCloudDb();
    const lead = db.leads.find(l => l.id === req.params.id);
    if (lead) {
        if (req.body.status) lead.status = req.body.status;
        await saveCloudDb(db);
        return res.json(lead);
    }
    res.status(404).json({ error: 'Lead not found' });
});

app.delete('/api/leads/:id', async (req, res) => {
    const db = await getCloudDb();
    db.leads = db.leads.filter(l => l.id !== req.params.id);
    await saveCloudDb(db);
    res.json({ success: true });
});

app.get('/api/orders', async (req, res) => {
    const db = await getCloudDb();
    res.json(db.orders);
});

app.post('/api/orders', async (req, res) => {
    const db = await getCloudDb();

    // If existing ID is passed, perform update instead of duplication
    if (req.body.id) {
        const existingIdx = db.orders.findIndex(o => o.id === req.body.id);
        if (existingIdx !== -1) {
            db.orders[existingIdx] = {
                ...db.orders[existingIdx],
                ...req.body
            };
            await saveCloudDb(db);
            return res.json(db.orders[existingIdx]);
        }
    }

    let maxNum = 1000;
    if (Array.isArray(db.orders)) {
        db.orders.forEach(o => {
            if (o.orderNumber && o.orderNumber.startsWith('ORD-')) {
                const n = parseInt(o.orderNumber.replace('ORD-', ''));
                if (!isNaN(n) && n > maxNum) maxNum = n;
            }
        });
    }
    const orderNum = 'ORD-' + (maxNum + 1);
    const newOrder = {
        id: req.body.id || ('ord-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4)),
        orderNumber: orderNum,
        customerName: req.body.customerName,
        mobile: req.body.mobile,
        itemType: req.body.itemType,
        size: req.body.size || 'Standard',
        quantity: parseInt(req.body.quantity) || 1,
        price: parseFloat(req.body.price) || 0,
        workDetails: req.body.workDetails || '',
        takenBy: req.body.takenBy || 'Staff Desk',
        stageNotes: req.body.stageNotes || [],
        stage: req.body.stage || 'Quotation',
        isPaid: typeof req.body.isPaid === 'boolean' ? req.body.isPaid : false,
        stageEnteredAt: req.body.stageEnteredAt || Date.now(),
        createdAt: req.body.createdAt || Date.now()
    };
    db.orders.unshift(newOrder);
    if (req.body.convertedLeadId) {
        const lead = db.leads.find(l => l.id === req.body.convertedLeadId);
        if (lead) lead.status = 'Converted';
    }
    await saveCloudDb(db);
    res.status(201).json(newOrder);
});

app.put('/api/orders/:id', async (req, res) => {
    const db = await getCloudDb();
    const idx = db.orders.findIndex(o => o.id === req.params.id);
    if (idx !== -1) {
        const existing = db.orders[idx];
        const updated = {
            ...existing,
            ...req.body
        };

        if (req.body.stage && req.body.stage !== existing.stage) {
            updated.stageEnteredAt = req.body.simulateDelay ? Date.now() - (25 * 3600 * 1000) : Date.now();
        } else if (req.body.simulateDelay) {
            updated.stageEnteredAt = Date.now() - (25 * 3600 * 1000);
        }

        db.orders[idx] = updated;
        await saveCloudDb(db);
        return res.json(updated);
    }
    res.status(404).json({ error: 'Order not found' });
});

app.delete('/api/orders/:id', async (req, res) => {
    const db = await getCloudDb();
    db.orders = db.orders.filter(o => o.id !== req.params.id);
    await saveCloudDb(db);
    res.json({ success: true });
});

module.exports = app;
