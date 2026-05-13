// ============================================
// MOBILE PHONE PATROL - INTERACTIVE BOOKING
// ============================================

// Service Area Configuration — 101 Willow Lane, Schererville, IN
const BASE_LAT = 41.4858;
const BASE_LNG = -87.4558;
const SERVICE_RADIUS_MILES = 16;

// Valid ZIP codes for the service area (add more here as needed)
const VALID_ZIPS = new Set([
    '46375', // Schererville
    '46311', // Dyer
    '46373', // Saint John
    '46322', // Highland
    '46319', // Griffith
    '46321', // Munster
    '46410', // Merrillville
    '46307', // Crown Point
    '46308', // Crown Point
    '46320', // Hammond
    '46323', // Hammond
    '46324', // Hammond
    '46325', // Hammond
    '46327', // Hammond
    '46303', // Cedar Lake
]);

// Pricing Data — kept in sync with the Pricing section
const repairPrices = {
    iPhone: {
        "iPhone X / XS / XS Max": {
            "Screen Repair (LCD)": 99,
            "Screen Repair (OLED)": 129.99,
            "Battery Replacement": null,
            "Speaker Repair": null,
            "Back Glass": null,
            "Front Glass": null,
            "Charger Port": null
        },
        "iPhone 11 / 11 Pro / 11 Pro Max": {
            "Screen Repair (LCD)": 104.99,
            "Screen Repair": 134.99,
            "Battery Replacement": null,
            "Speaker Repair": null,
            "Back Glass": null,
            "Front Glass": null,
            "Charger Port": null
        },
        "iPhone 12 / 12 Pro / 12 Pro Max / 12 mini": {
            "Screen Repair (LCD)": 114.99,
            "Screen Repair (OLED)": 144.99,
            "Battery Replacement": null,
            "Speaker Repair": null,
            "Back Glass": null,
            "Front Glass": null,
            "Charger Port": null
        },
        "iPhone 13 / 13 Pro / 13 Pro Max / 13 mini": {
            "Screen Repair (LCD)": 124.99,
            "Screen Repair (OLED)": 154.99,
            "Battery Replacement": null,
            "Speaker Repair": null,
            "Back Glass": null,
            "Front Glass": null,
            "Charger Port": null
        },
        "iPhone 14 / 14 Plus / 14 Pro / 14 Pro Max": {
            "Screen Repair (LCD)": 139.99,
            "Screen Repair (OLED)": 159.99,
            "Battery Replacement": null,
            "Speaker Repair": null,
            "Back Glass": null,
            "Front Glass": null,
            "Charger Port": null
        },
        "iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max": {
            "Screen Repair (LCD)": 139.99,
            "Screen Repair (OLED)": 159.99,
            "Battery Replacement": null,
            "Speaker Repair": null,
            "Back Glass": null,
            "Front Glass": null,
            "Charger Port": null
        },
        "iPhone 16 / 16 Plus / 16 Pro / 16 Pro Max": {
            "Screen Repair (LCD)": 149.99,
            "Screen Repair (OLED)": 174.99,
            "Battery Replacement": null,
            "Speaker Repair": null,
            "Back Glass": null,
            "Front Glass": null,
            "Charger Port": null
        },
        "iPhone 17 / 17 Pro": {
            "Screen Repair (OLED)": 289.99,
            "Pro Max OLED Screen": 299.99,
            "Battery Replacement": null,
            "Speaker Repair": null,
            "Back Glass": null,
            "Front Glass": null,
            "Charger Port": null
        }
    },
    Samsung: {
        "Screen Repair": null,
        "Battery Replacement": null,
        "Speaker Repair": null,
        "Back Glass": null,
        "Front Glass": null,
        "Charger Port": null
    },
    Android: {
        "Screen Repair": null,
        "Battery Replacement": null,
        "Speaker Repair": null,
        "Back Glass": null,
        "Front Glass": null,
        "Charger Port": null
    },
    iPad: {
        "Screen Repair": null,
        "Battery Replacement": null,
        "Speaker Repair": null,
        "Back Glass": null,
        "Front Glass": null,
        "Charger Port": null
    }
};

// Form State
let formState = {
    device: null,
    iPhoneModel: null,
    repairs: [],
    totalPrice: 0,
    date: null,
    openEndedModel: null,
    openEndedIssue: null
};

// DOM Elements
const deviceSelect = document.getElementById('deviceType');
const repairStep = document.getElementById('repairStep');
const appointmentStep = document.getElementById('appointmentStep');
const repairCheckboxes = document.getElementById('repairCheckboxes');
const priceDisplay = document.getElementById('priceDisplay');
const appointmentDate = document.getElementById('appointmentDate');
const bookingForm = document.getElementById('bookingForm');

// Summary Elements
const summaryDevice = document.getElementById('summaryDevice');
const summaryRepair = document.getElementById('summaryRepair');
const summaryPrice = document.getElementById('summaryPrice');

// ============================================
// EVENT LISTENERS
// ============================================

deviceSelect.addEventListener('change', function() {
    if (this.value) {
        formState.device = this.value;
        formState.iPhoneModel = null;
        formState.repairs = [];
        formState.totalPrice = 0;
        updateRepairOptions();
        repairStep.style.display = 'block';
        appointmentStep.style.display = 'none';
        summaryDevice.textContent = this.value;
        setTimeout(() => repairStep.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    } else {
        formState.device = null;
        formState.iPhoneModel = null;
        formState.repairs = [];
        repairStep.style.display = 'none';
        appointmentStep.style.display = 'none';
        summaryDevice.textContent = '-';
        summaryRepair.textContent = '-';
        summaryPrice.textContent = '-';
    }
});

// ============================================
// FUNCTION: Update Repair Options
// ============================================
function updateRepairOptions() {
    const device = formState.device;
    repairCheckboxes.innerHTML = '';

    if (device === 'iPhone') {
        createIPhoneModelSelector();
    } else if (device) {
        createOpenEndedForm(device);
        appointmentStep.style.display = 'block';
    }
}

// ============================================
// FUNCTION: Create iPhone Model Selector
// ============================================
function createIPhoneModelSelector() {
    const models = Object.keys(repairPrices['iPhone']);

    const modelDiv = document.createElement('div');
    modelDiv.className = 'repair-checkboxes';
    modelDiv.id = 'iPhoneModelSelector';

    const label = document.createElement('label');
    label.style.fontWeight = '600';
    label.style.display = 'block';
    label.style.marginBottom = '10px';
    label.textContent = 'Which iPhone Model do you have?';
    modelDiv.appendChild(label);

    models.forEach(model => {
        const item = document.createElement('div');
        item.className = 'model-select-item';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'iPhoneModel';
        radio.value = model;
        radio.id = `model-${model.replace(/[\s\/]/g, '-')}`;

        const labelEl = document.createElement('label');
        labelEl.htmlFor = `model-${model.replace(/[\s\/]/g, '-')}`;
        labelEl.textContent = model;
        labelEl.style.margin = '0';

        radio.addEventListener('change', function() {
            if (this.checked) {
                formState.iPhoneModel = model;
                summaryDevice.textContent = `iPhone - ${model}`;
                createRepairCheckboxes('iPhone');
                appointmentStep.style.display = 'block';
                setTimeout(() => repairCheckboxes.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
            }
        });

        item.appendChild(radio);
        item.appendChild(labelEl);
        modelDiv.appendChild(item);
    });

    repairCheckboxes.appendChild(modelDiv);
}

// ============================================
// FUNCTION: Create Open-Ended Form (non-iPhone)
// ============================================
function createOpenEndedForm(device) {
    repairCheckboxes.innerHTML = '';
    formState.openEndedModel = null;
    formState.openEndedIssue = null;

    const wrapper = document.createElement('div');
    wrapper.className = 'open-ended-form';

    // Device name & model input
    const modelGroup = document.createElement('div');
    modelGroup.className = 'form-group';

    const modelLabel = document.createElement('label');
    modelLabel.htmlFor = 'openDeviceModel';
    modelLabel.textContent = `${device} — Device Name & Model`;
    modelLabel.style.fontWeight = '600';

    const modelInput = document.createElement('input');
    modelInput.type = 'text';
    modelInput.id = 'openDeviceModel';
    modelInput.placeholder = `e.g. ${device === 'Samsung' ? 'Samsung Galaxy S24' : device === 'iPad' ? 'iPad Pro 12.9" (2022)' : 'Google Pixel 8'}`;
    modelInput.addEventListener('input', function() {
        formState.openEndedModel = this.value.trim();
        summaryDevice.textContent = this.value.trim() || device;
    });

    modelGroup.appendChild(modelLabel);
    modelGroup.appendChild(modelInput);

    // Issue description textarea
    const issueGroup = document.createElement('div');
    issueGroup.className = 'form-group';

    const issueLabel = document.createElement('label');
    issueLabel.htmlFor = 'openIssueDesc';
    issueLabel.textContent = 'Describe Your Issue';
    issueLabel.style.fontWeight = '600';

    const issueTextarea = document.createElement('textarea');
    issueTextarea.id = 'openIssueDesc';
    issueTextarea.rows = 4;
    issueTextarea.placeholder = 'e.g. Cracked screen, phone won\'t charge, speaker not working...';
    issueTextarea.addEventListener('input', function() {
        formState.openEndedIssue = this.value.trim();
        summaryRepair.textContent = this.value.trim() || '-';
    });

    issueGroup.appendChild(issueLabel);
    issueGroup.appendChild(issueTextarea);

    wrapper.appendChild(modelGroup);
    wrapper.appendChild(issueGroup);
    repairCheckboxes.appendChild(wrapper);

    summaryPrice.textContent = 'Contact for quote';
}

// ============================================
// FUNCTION: Create Repair Checkboxes
// ============================================
function createRepairCheckboxes(device) {
    const modelSelector = document.getElementById('iPhoneModelSelector');
    repairCheckboxes.innerHTML = '';
    if (modelSelector) {
        repairCheckboxes.appendChild(modelSelector);
    }

    let repairs = [];

    if (device === 'iPhone' && formState.iPhoneModel) {
        repairs = Object.keys(repairPrices['iPhone'][formState.iPhoneModel]);
    } else if (device && repairPrices[device]) {
        repairs = Object.keys(repairPrices[device]);
    }

    repairs.forEach(repair => {
        const item = document.createElement('div');
        item.className = 'repair-checkbox-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'repairs';
        checkbox.value = repair;
        checkbox.id = `repair-${repair.replace(/\s/g, '-')}`;

        let price = null;
        if (device === 'iPhone' && formState.iPhoneModel) {
            price = repairPrices['iPhone'][formState.iPhoneModel][repair];
        } else if (device && repairPrices[device]) {
            price = repairPrices[device][repair];
        }

        const labelEl = document.createElement('label');
        labelEl.htmlFor = `repair-${repair.replace(/\s/g, '-')}`;

        const repairName = document.createElement('span');
        repairName.textContent = repair;

        const priceSpan = document.createElement('span');
        priceSpan.className = 'repair-price';

        if (price === null) {
            priceSpan.textContent = 'Estimate';
            priceSpan.style.color = 'var(--warning-orange)';
        } else {
            priceSpan.textContent = `$${price}`;
        }

        labelEl.appendChild(repairName);
        labelEl.appendChild(priceSpan);

        checkbox.addEventListener('change', function() {
            updateRepairSelection();
        });

        item.appendChild(checkbox);
        item.appendChild(labelEl);
        repairCheckboxes.appendChild(item);
    });
}

// ============================================
// FUNCTION: Update Repair Selection
// ============================================
function updateRepairSelection() {
    const checkboxes = document.querySelectorAll('input[name="repairs"]:checked');
    formState.repairs = [];
    formState.totalPrice = 0;
    let displayText = [];
    let hasEstimate = false;

    checkboxes.forEach(checkbox => {
        const repair = checkbox.value;
        formState.repairs.push(repair);
        displayText.push(repair);

        let price = null;
        if (formState.device === 'iPhone' && formState.iPhoneModel) {
            price = repairPrices['iPhone'][formState.iPhoneModel][repair];
        } else if (formState.device && repairPrices[formState.device]) {
            price = repairPrices[formState.device][repair];
        }

        if (price === null) {
            hasEstimate = true;
        } else {
            formState.totalPrice += price;
        }
    });

    if (formState.repairs.length > 0) {
        summaryRepair.textContent = displayText.join(', ');

        if (hasEstimate && formState.totalPrice > 0) {
            priceDisplay.innerHTML = `<strong>Price: $${formState.totalPrice} + Estimate for other repairs</strong><br><small>Text us at 219-333-6778 for complete pricing</small>`;
            summaryPrice.textContent = `$${formState.totalPrice} + Estimate`;
        } else if (hasEstimate) {
            priceDisplay.innerHTML = `<strong>Price: Contact Us for Estimate</strong><br><small>Text us at 219-333-6778 for pricing</small>`;
            summaryPrice.textContent = 'Estimate';
        } else {
            priceDisplay.innerHTML = `<strong>Estimated Total Price: $${formState.totalPrice}</strong>`;
            summaryPrice.textContent = `$${formState.totalPrice}`;
        }
        priceDisplay.classList.add('show');
    } else {
        priceDisplay.classList.remove('show');
        summaryRepair.textContent = '-';
        summaryPrice.textContent = '-';
    }
}

// Form Submission
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitBooking();
});

// ============================================
// FUNCTION: Set Minimum Date (2 days from today)
// ============================================
function setMinimumDate() {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(minDate.getDate() + 1);
    appointmentDate.setAttribute('min', minDate.toISOString().split('T')[0]);
}

// ============================================
// FUNCTION: Check ZIP Code is in Service Area
// ============================================
function checkZipInRange(zip) {
    if (!zip || zip.length < 5) return { inRange: false, noZip: true };
    return { inRange: VALID_ZIPS.has(zip), zip: zip, noZip: false };
}

// ============================================
// FUNCTION: Address ZIP Warning (inline, non-blocking)
// ============================================
function updateAddressWarning(zip) {
    const existing = document.getElementById('addressZipWarning');
    if (existing) existing.remove();
    if (!zip || zip.length < 5) return;

    const zipCheck = checkZipInRange(zip);
    if (!zipCheck.inRange) {
        const warning = document.createElement('small');
        warning.id = 'addressZipWarning';
        warning.style.cssText = 'display:block;margin-top:6px;color:var(--warning-orange);font-weight:500;';
        warning.textContent = `ZIP ${zipCheck.zip} may be outside our service area — we'll reach out to confirm after booking.`;
        document.getElementById('addressZip').insertAdjacentElement('afterend', warning);
    }
}

// ============================================
// FUNCTION: Initialize Service Area Map
// ============================================
function initServiceAreaMap() {
    const mapEl = document.getElementById('serviceAreaMap');
    if (!mapEl || typeof L === 'undefined') return;

    const map = L.map('serviceAreaMap', { scrollWheelZoom: false }).setView([BASE_LAT, BASE_LNG], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    const baseIcon = L.divIcon({
        html: '<div class="map-home-pin">&#128205;</div>',
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    });

  

    L.circle([BASE_LAT, BASE_LNG], {
        radius: SERVICE_RADIUS_MILES * 1609.34,
        color: '#4ECDC4',
        fillColor: '#4ECDC4',
        fillOpacity: 0.13,
        weight: 2,
        dashArray: '8, 5'
    }).addTo(map);
}

// ============================================
// FUNCTION: Submit Booking via Formspree
// ============================================
function submitBooking() {
    const isOpenEnded = formState.device && formState.device !== 'iPhone';

    if (isOpenEnded) {
        if (!formState.openEndedModel) {
            alert('Please enter your device name and model.');
            return;
        }
        if (!formState.openEndedIssue) {
            alert('Please describe your issue.');
            return;
        }
    } else {
        if (formState.repairs.length === 0) {
            alert('Please select at least one repair type.');
            return;
        }
    }

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const street = document.getElementById('addressStreet').value.trim();
    const city = document.getElementById('addressCity').value.trim();
    const state = document.getElementById('addressState').value.trim();
    const zip = document.getElementById('addressZip').value.trim();
    const date = document.getElementById('appointmentDate').value;
    const notes = document.getElementById('notes').value.trim();

    if (!name || !phone || !email || !street || !city || !state || !zip || !date) {
        alert('Please fill in all required fields.');
        return;
    }

    if (!/^\d{5}$/.test(zip)) {
        alert('Please enter a valid 5-digit ZIP code.');
        return;
    }

    const address = `${street}, ${city}, ${state} ${zip}`;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    const submitBtn = document.querySelector('.submit-button');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const deviceDisplay = isOpenEnded
        ? formState.openEndedModel
        : formState.iPhoneModel
            ? `iPhone - ${formState.iPhoneModel}`
            : formState.device;

    const repairDisplay = isOpenEnded
        ? formState.openEndedIssue
        : formState.repairs.join(', ');

    const priceDisplay = isOpenEnded ? 'Contact for quote' : summaryPrice.textContent;

    fetch('https://formspree.io/f/mykoollr', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'name': name,
            'phone': phone,
            'email': email,
            'device': deviceDisplay,
            'repair_types': repairDisplay,
            'total_price': priceDisplay,
            'appointment_date': formattedDate,
            'address': address,
            'notes': notes,
            '_subject': `New Booking: ${name} — ${deviceDisplay}`
        })
    })
    .then(response => {
        if (response.ok) {
            showSuccessMessage(name);
            resetForm();
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an issue submitting your booking. Please try again or call 219-333-6778.');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// ============================================
// FUNCTION: Validate Email
// ============================================
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// FUNCTION: Validate Phone
// ============================================
function validatePhone(phone) {
    return /^[\d\s\-\(\)\\+]{10,}$/.test(phone.replace(/\s/g, ''));
}

// ============================================
// FUNCTION: Show Success Message
// ============================================
function showSuccessMessage(name) {
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <h3>&#10003; Booking Submitted Successfully!</h3>
        <p>Thank you, ${name}! We've received your booking request.</p>
        <p>You should receive a confirmation email shortly at the address you provided.</p>
        <p>We'll reach out to confirm your appointment or answer any questions.</p>
        <p><strong>Call or text us: 219-333-6778</strong></p>
    `;
    bookingForm.parentNode.insertBefore(successMsg, bookingForm);
    successMsg.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => successMsg.remove(), 10000);
}

// ============================================
// FUNCTION: Reset Form
// ============================================
function resetForm() {
    bookingForm.reset();
    formState = {
        device: null,
        iPhoneModel: null,
        repairs: [],
        totalPrice: 0,
        date: null,
        openEndedModel: null,
        openEndedIssue: null
    };
    repairStep.style.display = 'none';
    appointmentStep.style.display = 'none';
    summaryDevice.textContent = '-';
    summaryRepair.textContent = '-';
    summaryPrice.textContent = '-';
    repairCheckboxes.innerHTML = '';
    deviceSelect.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    setMinimumDate();
    initServiceAreaMap();

    const zipInput = document.getElementById('addressZip');
    if (zipInput) {
        zipInput.addEventListener('input', function() {
            updateAddressWarning(this.value.trim());
        });
    }

    // Hamburger menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.querySelector('.navbar');
    if (navToggle && navbar) {
        navToggle.addEventListener('click', function() {
            const isOpen = navbar.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when a nav link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
