/**
 * לוגיקת האפליקציה לקביעת תורים וניהול חוויית המשתמש
 */

// מצב גלובלי של האפליקציה
let currentBooking = {
  serviceId: null,
  selectedDate: null,
  selectedHour: null,
  customerType: localStorage.getItem('app_customer_type') || null, // 'regular' או 'one_time'
  customerProfile: JSON.parse(localStorage.getItem('app_customer_profile') || '{}')
};

// תאריך נוכחי עבור הלוח שנה
let calendarDate = new Date();

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  applyBusinessConfig();
  renderServices();
  renderGallery();
  initCalendar();
  setupEventListeners();
  checkOnboarding();
}

/**
 * החלת פרטי העסק מקובץ התצורה
 */
function applyBusinessConfig() {
  document.title = BUSINESS_CONFIG.businessName;
  document.getElementById('brandName').textContent = BUSINESS_CONFIG.businessName;
  document.getElementById('brandTagline').textContent = BUSINESS_CONFIG.tagline;
  document.getElementById('heroTitle').textContent = BUSINESS_CONFIG.businessName;
  document.getElementById('heroSubtitle').textContent = BUSINESS_CONFIG.businessType;
  document.getElementById('heroDesc').textContent = BUSINESS_CONFIG.tagline;
  document.getElementById('footerBusinessName').textContent = BUSINESS_CONFIG.businessName;
  document.getElementById('footerPhone').textContent = BUSINESS_CONFIG.phone;
  document.getElementById('footerAddress').textContent = BUSINESS_CONFIG.address;

  updateCustomerBadge();
}

/**
 * עדכון תגית סטטוס הלקוח בסרגל העליון
 */
function updateCustomerBadge() {
  const badge = document.getElementById('customerBadge');
  if (currentBooking.customerType === 'regular') {
    const firstName = currentBooking.customerProfile.fullName ? currentBooking.customerProfile.fullName.split(' ')[0] : 'רשום';
    badge.innerHTML = `👤 לקוח קבוע (${firstName})`;
    badge.style.display = 'inline-block';
  } else if (currentBooking.customerType === 'one_time') {
    badge.innerHTML = `👤 אורח`;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

/**
 * בדיקה האם המשתמש כבר בחר הגדרה (קבוע / חד-פעמי)
 */
function checkOnboarding() {
  if (!currentBooking.customerType) {
    document.getElementById('onboardingModal').style.display = 'flex';
  }
}

/**
 * בחירת סוג לקוח: חד-פעמי
 */
function selectOneTimeCustomer() {
  currentBooking.customerType = 'one_time';
  localStorage.setItem('app_customer_type', 'one_time');
  document.getElementById('onboardingModal').style.display = 'none';
  updateCustomerBadge();
}

/**
 * בחירת סוג לקוח: קבוע (מעבר לטופס מילוי פרטים וכרטיס)
 */
function selectRegularCustomer() {
  document.getElementById('onboardingStep1').style.display = 'none';
  document.getElementById('onboardingStep2').style.display = 'block';
}

/**
 * שמירת פרטי לקוח קבוע
 */
function saveRegularCustomerProfile(event) {
  event.preventDefault();
  const fullName = document.getElementById('regFullName').value;
  const email = document.getElementById('regEmail').value;
  const phone = document.getElementById('regPhone').value;
  const cardLast4 = document.getElementById('regCardNumber').value.slice(-4) || '4242';

  const profile = {
    fullName,
    email,
    phone,
    cardToken: 'tok_demo_' + Math.random().toString(36).substring(7),
    cardLast4,
    registeredAt: new Date().toISOString()
  };

  currentBooking.customerType = 'regular';
  currentBooking.customerProfile = profile;

  localStorage.setItem('app_customer_type', 'regular');
  localStorage.setItem('app_customer_profile', JSON.stringify(profile));

  document.getElementById('onboardingModal').style.display = 'none';
  updateCustomerBadge();
  alert(`ברוך הבא ${fullName}! נרשמת בהצלחה כלקוח קבוע. פרטיך נשמרו לחיוב אוטומטי נוח ומאובטח.`);
}

/**
 * רינדור שירותי העסק כולל הפירוט המעמיק בן 3 המשפטים
 */
function renderServices() {
  const container = document.getElementById('servicesContainer');
  container.innerHTML = '';

  BUSINESS_CONFIG.services.forEach(srv => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `
      <div class="service-image" style="background-image: url('${srv.backgroundImage}')">
        <div class="service-image-overlay"></div>
        <span class="service-category-tag">${srv.category}</span>
        <span class="service-price-tag">₪${srv.price}</span>
      </div>
      <div class="service-body">
        <!-- לחיצה נסתרת על הכותרת מובילה ישירות להזמנת תור -->
        <a href="#bookingSection" class="service-title-link" onclick="selectServiceAndScroll('${srv.id}')" title="לחץ לתיאום תור לטיפול זה">
          ${srv.name}
        </a>
        <p class="service-desc">${srv.description}</p>
        <div class="service-footer">
          <span class="service-meta">⏱️ משך: ${srv.durationMinutes} דקות</span>
          <button class="btn-book-service" onclick="selectServiceAndScroll('${srv.id}')">הזמן עכשיו</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // יצירת גלולות בחירת שירות באזור התיאום
  const pillsContainer = document.getElementById('servicePillsContainer');
  pillsContainer.innerHTML = '';
  BUSINESS_CONFIG.services.forEach(srv => {
    const pill = document.createElement('div');
    pill.className = 'service-pill';
    pill.id = `pill_${srv.id}`;
    pill.innerHTML = `<span>${srv.name}</span><strong>₪${srv.price}</strong>`;
    pill.onclick = () => selectServicePill(srv.id);
    pillsContainer.appendChild(pill);
  });
}

/**
 * רינדור גלריית הקליניקה
 */
function renderGallery() {
  const container = document.getElementById('galleryContainer');
  container.innerHTML = '';

  BUSINESS_CONFIG.gallery.forEach(item => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-overlay">
        <div class="gallery-title">${item.title}</div>
        <div class="gallery-caption">${item.caption}</div>
      </div>
    `;
    container.appendChild(el);
  });
}

/**
 * בניית לוח השנה הלועזי
 */
function initCalendar() {
  renderCalendarDays();
}

function renderCalendarDays() {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();

  const monthNames = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ];

  document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;

  const grid = document.getElementById('calendarDaysGrid');
  grid.innerHTML = '';

  // ימי השבוע
  const dayHeaders = ['א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'ש\''];
  dayHeaders.forEach(day => {
    const dEl = document.createElement('div');
    dEl.className = 'calendar-day-name';
    dEl.textContent = day;
    grid.appendChild(dEl);
  });

  // חישוב ימים בחודש
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0,0,0,0);

  // תאים ריקים להתחלה
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-date-cell disabled';
    grid.appendChild(emptyCell);
  }

  // ימי החודש
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(year, month, d);
    const cell = document.createElement('div');
    cell.className = 'calendar-date-cell';
    cell.textContent = d;

    // חסימת עבר
    if (cellDate < today) {
      cell.classList.add('disabled');
    } else {
      const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      if (currentBooking.selectedDate === formattedDate) {
        cell.classList.add('selected');
      }
      cell.onclick = () => onSelectDate(formattedDate, cell);
    }

    grid.appendChild(cell);
  }
}

function nextMonth() {
  calendarDate.setMonth(calendarDate.getMonth() + 1);
  renderCalendarDays();
}

function prevMonth() {
  calendarDate.setMonth(calendarDate.getMonth() - 1);
  renderCalendarDays();
}

/**
 * בחירת תאריך ביומן ושליפת שעות פנויות בלייב מיומן גוגל
 */
function onSelectDate(dateStr, cellElement) {
  currentBooking.selectedDate = dateStr;

  document.querySelectorAll('.calendar-date-cell').forEach(c => c.classList.remove('selected'));
  if (cellElement) cellElement.classList.add('selected');

  // פתיחת שעות פנויות בסנכרון בלייב
  fetchLiveSlots(dateStr);
}

/**
 * שליפת שעות פנויות בזמן אמת מיומן גוגל דרך n8n
 */
function fetchLiveSlots(dateStr) {
  const container = document.getElementById('timeSlotsContainer');
  const grid = document.getElementById('slotsGrid');
  grid.innerHTML = '<div style="grid-column: 1/-1; padding: 12px; color: var(--primary); font-weight: 500;">🔄 בודק שעות פנויות ביומן בעל העסק בזמן אמת...</div>';
  container.classList.add('visible');

  const webhookUrl = `${BUSINESS_CONFIG.webhooks.calendarSyncWebhookUrl}?date=${dateStr}&_t=${Date.now()}`;

  fetch(webhookUrl)
    .then(res => {
      if (!res.ok) throw new Error('Status: ' + res.status);
      return res.json();
    })
    .then(data => {
      const slots = data.availableSlots && data.availableSlots.length > 0 ? data.availableSlots : BUSINESS_CONFIG.availableHours;
      renderTimeSlots(slots);
    })
    .catch(err => {
      console.log('Using default available slots (live webhook offline/testing):', err);
      renderTimeSlots(BUSINESS_CONFIG.availableHours);
    });
}

/**
 * הצגת שעות פנויות כשעות בדידות (לדוגמה 16:00 כפי שנדרש)
 */
function renderTimeSlots(hoursList) {
  const container = document.getElementById('timeSlotsContainer');
  const grid = document.getElementById('slotsGrid');
  grid.innerHTML = '';

  const hours = hoursList || BUSINESS_CONFIG.availableHours;
  hours.forEach(hour => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'time-slot-btn';
    btn.textContent = hour; // 16:00 ולא טווח
    if (currentBooking.selectedHour === hour) {
      btn.classList.add('selected');
    }
    btn.onclick = () => onSelectHour(hour, btn);
    grid.appendChild(btn);
  });

  container.classList.add('visible');
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * בחירת שעה וגלילה חלקה אוטומטית (UX) לבחירת שירות
 */
function onSelectHour(hour, btnElement) {
  currentBooking.selectedHour = hour;

  document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
  btnElement.classList.add('selected');

  // הצגת סקשן בחירת שירות
  const serviceSection = document.getElementById('serviceSelectorSection');
  serviceSection.classList.add('visible');

  // גלילה אוטומטית חלקה לשלב בחירת השירות
  setTimeout(() => {
    serviceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 200);

  updateSummary();
}

/**
 * בחירה דרך גלולות שירות
 */
function selectServicePill(serviceId) {
  currentBooking.serviceId = serviceId;
  document.querySelectorAll('.service-pill').forEach(p => p.classList.remove('selected'));
  const activePill = document.getElementById(`pill_${serviceId}`);
  if (activePill) activePill.classList.add('selected');

  updateSummary();
}

/**
 * מעבר נסתר (בלחיצה על כותרת שירות בכרטיסייה) לקביעת תור
 */
function selectServiceAndScroll(serviceId) {
  currentBooking.serviceId = serviceId;
  const bookingEl = document.getElementById('bookingSection');
  bookingEl.scrollIntoView({ behavior: 'smooth' });

  // סימון גלולה
  selectServicePill(serviceId);

  // אם טרם נבחר תאריך, נסמן את התאריך של מחר כברירת מחדל
  if (!currentBooking.selectedDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    onSelectDate(dateStr, null);
  }
}

/**
 * עדכון סיכום ההזמנה וטופס הפרטים
 */
function updateSummary() {
  const summaryBox = document.getElementById('bookingSummaryBox');
  const selectedSrv = BUSINESS_CONFIG.services.find(s => s.id === currentBooking.serviceId);

  if (currentBooking.selectedDate && currentBooking.selectedHour && selectedSrv) {
    summaryBox.style.display = 'block';
    document.getElementById('sumService').textContent = selectedSrv.name;
    document.getElementById('sumPrice').textContent = `₪${selectedSrv.price}`;
    document.getElementById('sumDateTime').textContent = `${currentBooking.selectedDate} בשעה ${currentBooking.selectedHour}`;

    // מילוי אוטומטי אם לקוח קבוע
    if (currentBooking.customerType === 'regular' && currentBooking.customerProfile) {
      document.getElementById('clientName').value = currentBooking.customerProfile.fullName || '';
      document.getElementById('clientEmail').value = currentBooking.customerProfile.email || '';
      document.getElementById('clientPhone').value = currentBooking.customerProfile.phone || '';
      document.getElementById('regularPaymentNotice').style.display = 'block';
      document.getElementById('cardEndingDigits').textContent = currentBooking.customerProfile.cardLast4 || '4242';
    }
  }
}

/**
 * שליחת טופס הזמנה ורישום התור
 */
function submitBooking(event) {
  event.preventDefault();
  const selectedSrv = BUSINESS_CONFIG.services.find(s => s.id === currentBooking.serviceId);
  const clientName = document.getElementById('clientName').value;
  const clientEmail = document.getElementById('clientEmail').value;
  const clientPhone = document.getElementById('clientPhone').value;

  const bookingPayload = {
    fullName: clientName,
    email: clientEmail,
    phone: clientPhone,
    appointmentDate: `${currentBooking.selectedDate} ${currentBooking.selectedHour}`,
    serviceName: selectedSrv.name,
    servicePrice: selectedSrv.price,
    customerType: currentBooking.customerType || 'one_time',
    paymentStatus: '', // בתחילה ריק עד לחיוב או תשלום
    createdAt: new Date().toISOString()
  };

  // שליחה ממשית לוובהוק של n8n לקליטת התור ורישומו בגוגל שיטס
  if (BUSINESS_CONFIG.webhooks && BUSINESS_CONFIG.webhooks.bookingWebhookUrl) {
    fetch(BUSINESS_CONFIG.webhooks.bookingWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload)
    })
    .then(res => console.log('Successfully posted to n8n booking webhook:', res.status))
    .catch(err => console.warn('Could not post to n8n webhook (check if active):', err));
  }

  // שמירה בלוקל סטורג' לדמו
  const existing = JSON.parse(localStorage.getItem('app_appointments') || '[]');
  existing.push(bookingPayload);
  localStorage.setItem('app_appointments', JSON.stringify(existing));

  alert(`תורך נקבע בהצלחה!\n\nשירות: ${selectedSrv.name}\nמועד: ${bookingPayload.appointmentDate}\nאישור ישלח למייל: ${clientEmail}`);

  // אם לקוח קבוע, נאפשר להדגים את התראת תחילת התור
  if (currentBooking.customerType === 'regular') {
    document.getElementById('simulationControls').style.display = 'block';
  }

  // איפוס טופס
  document.getElementById('bookingSummaryBox').style.display = 'none';
}

/**
 * הדמיית התראת תחילת תור לאישור חיוב (ללקוח קבוע)
 */
function triggerAppointmentStartNotification() {
  const notif = document.getElementById('appointmentStartNotif');
  const selectedSrv = BUSINESS_CONFIG.services.find(s => s.id === currentBooking.serviceId) || BUSINESS_CONFIG.services[0];
  document.getElementById('notifServiceName').textContent = selectedSrv.name;
  document.getElementById('notifPrice').textContent = `₪${selectedSrv.price}`;
  notif.classList.add('active');
}

/**
 * אישור קיום התור על ידי הלקוח ומשיכת התשלום
 */
function confirmAppointmentAndPay() {
  document.getElementById('appointmentStartNotif').classList.remove('active');
  alert('תודה! אישרת את קיום התור. החיוב בסך המוסכם בוצע בהצלחה דרך כרטיסך השמור. חשבונית נשלחה למייל.');

  // עדכון סטטוס מקומי ל-PAY
  const appointments = JSON.parse(localStorage.getItem('app_appointments') || '[]');
  if (appointments.length > 0) {
    appointments[appointments.length - 1].paymentStatus = 'PAY';
    localStorage.setItem('app_appointments', JSON.stringify(appointments));
  }

  // שליחת אישור התור וביצוע התשלום לוובהוק של n8n
  if (BUSINESS_CONFIG.webhooks && BUSINESS_CONFIG.webhooks.appointmentConfirmedWebhookUrl) {
    const lastApp = appointments.length > 0 ? appointments[appointments.length - 1] : {};
    fetch(BUSINESS_CONFIG.webhooks.appointmentConfirmedWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...lastApp,
        status: 'PAY',
        confirmedAt: new Date().toISOString()
      })
    })
    .then(res => console.log('Successfully posted payment confirmation to n8n:', res.status))
    .catch(err => console.warn('Could not post confirmation to n8n:', err));
  }
}

function setupEventListeners() {
  // אירועי טפסים
  document.getElementById('regularForm').addEventListener('submit', saveRegularCustomerProfile);
  document.getElementById('bookingForm').addEventListener('submit', submitBooking);
}
