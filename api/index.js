const fs = require('fs');
const path = require('path');

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

module.exports = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;
    const method = req.method;

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
        let parsedBody = {};
        try {
            if (body) parsedBody = JSON.parse(body);
        } catch (e) {}

        const db = getDb();

        if (pathname === '/api/health') {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({
                status: 'online',
                platform: 'Vercel Serverless Function',
                leadsCount: db.leads.length,
                ordersCount: db.orders.length
            });
        }

        if (pathname === '/api/auth/login') {
            const { username, password } = parsedBody;
            const creds = db.auth || { username: 'admin', password: 'magik123' };
            if (username === creds.username && password === creds.password) {
                return res.status(200).json({ success: true, username: creds.username });
            }
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        if (pathname === '/api/leads' && method === 'GET') {
            return res.status(200).json(db.leads);
        }

        if (pathname === '/api/leads' && method === 'POST') {
            const newLead = {
                id: 'lead-' + Date.now(),
                customerName: parsedBody.customerName,
                mobile: parsedBody.mobile,
                enquiryText: parsedBody.enquiryText || '',
                status: parsedBody.status || 'New',
                createdAt: Date.now()
            };
            db.leads.unshift(newLead);
            saveDb(db);
            return res.status(201).json(newLead);
        }

        if (pathname.startsWith('/api/leads/') && method === 'PUT') {
            const leadId = pathname.replace('/api/leads/', '');
            const lead = db.leads.find(l => l.id === leadId);
            if (lead) {
                if (parsedBody.status) lead.status = parsedBody.status;
                saveDb(db);
                return res.status(200).json(lead);
            }
            return res.status(404).json({ error: 'Lead not found' });
        }

        if (pathname.startsWith('/api/leads/') && method === 'DELETE') {
            const leadId = pathname.replace('/api/leads/', '');
            db.leads = db.leads.filter(l => l.id !== leadId);
            saveDb(db);
            return res.status(200).json({ success: true });
        }

        if (pathname === '/api/orders' && method === 'GET') {
            return res.status(200).json(db.orders);
        }

        if (pathname === '/api/orders' && method === 'POST') {
            const orderNum = 'ORD-' + (1001 + db.orders.length);
            const newOrder = {
                id: 'ord-' + Date.now(),
                orderNumber: orderNum,
                customerName: parsedBody.customerName,
                mobile: parsedBody.mobile,
                itemType: parsedBody.itemType,
                size: parsedBody.size || 'Standard',
                quantity: parseInt(parsedBody.quantity) || 1,
                price: parseFloat(parsedBody.price) || 0,
                workDetails: parsedBody.workDetails || '',
                stage: 'Quotation',
                isPaid: false,
                stageEnteredAt: Date.now(),
                createdAt: Date.now()
            };
            db.orders.unshift(newOrder);
            if (parsedBody.convertedLeadId) {
                const lead = db.leads.find(l => l.id === parsedBody.convertedLeadId);
                if (lead) lead.status = 'Converted';
            }
            saveDb(db);
            return res.status(201).json(newOrder);
        }

        if (pathname.startsWith('/api/orders/') && method === 'PUT') {
            const orderId = pathname.replace('/api/orders/', '');
            const order = db.orders.find(o => o.id === orderId);
            if (order) {
                if (parsedBody.stage) {
                    order.stage = parsedBody.stage;
                    order.stageEnteredAt = Date.now();
                }
                if (parsedBody.simulateDelay) {
                    order.stageEnteredAt = Date.now() - (25 * 3600 * 1000);
                }
                if (typeof parsedBody.isPaid === 'boolean') {
                    order.isPaid = parsedBody.isPaid;
                }
                saveDb(db);
                return res.status(200).json(order);
            }
            return res.status(404).json({ error: 'Order not found' });
        }

        if (pathname.startsWith('/api/orders/') && method === 'DELETE') {
            const orderId = pathname.replace('/api/orders/', '');
            db.orders = db.orders.filter(o => o.id !== orderId);
            saveDb(db);
            return res.status(200).json({ success: true });
        }

        return res.status(404).json({ error: 'Endpoint not found' });
    });
};
