/**
 * תצורת העסק - תבנית מודולרית הניתנת להתאמה קלה לכל סוג עסק
 * ניתן לשנות את תחום העסק, השירותים, התמונות וההגדרות בקובץ זה בלבד
 */
const BUSINESS_CONFIG = {
  // פרטי העסק הבסיסיים
  businessId: "clinic-holistic-01",
  businessName: "מרחב שלווה",
  businessType: "מרכז לרפואה משלימה ואיזון גוף-נפש",
  tagline: "מקום לעצור, לנשום ולהחזיר את הגוף והנפש לאיזון טבעי",
  ownerName: "שגב שמואלי",
  ownerEmail: "segevshmueli0@gmail.com",
  phone: "050-1234567",
  address: "דרך השלווה 12, מתחם המטפלים",
  
  // פלטת צבעים מרגיעה ואוורירית (Tranquil & Serene Palette)
  theme: {
    primaryColor: "#5B8E7D",       // ירוק מרווה רגוע
    secondaryColor: "#8EB897",     // ירוק מנטה פסטלי
    accentColor: "#DDA15E",        // זהוב אדמה חם
    backgroundColor: "#F7F9F6",    // לבן שבור מרגיע
    cardBackground: "#FFFFFF",
    textColor: "#2D3748",
    mutedTextColor: "#718096"
  },

  // שירותי העסק - כל שירות כולל פירוט מעמיק בן 3 משפטים (מקור, למי מיועד, תועלת)
  services: [
    {
      id: "shiatsu",
      name: "טיפול שיאצו הוליסטי ומאזן",
      category: "טיפולי מגע",
      price: 320,
      durationMinutes: 60,
      backgroundImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80",
      description: "מקור השיאצו נטוע במסורת הריפוי היפנית העתיקה המבוססת על לחיצות עדינות לאורך מסלולי המרידיאנים האנרגטיים בגוף. הטיפול מיועד לאנשים החווים סטרס מתמשך, עייפות כרונית או חוסר שקט פנימי הזקוקים להרפיה עמוקה. באמצעות הלחיצות הממוקדות מתחדשת זרימת הדם והאנרגיה, מערכת העצבים נרגעת והגוף חוזר לחיוניות בריאה ומאוזנת."
    },
    {
      id: "acupuncture",
      name: "דיקור סיני מסורתי לחידוש אנרגטי",
      category: "רפואה סינית",
      price: 290,
      durationMinutes: 45,
      backgroundImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
      description: "שורשיו של הדיקור הסיני נטועים בפילוסופיית הטאו ובאלפי שנות רפואה מזרחית הרואות באדם מכלול של גוף ונפש. הטיפול מיועד למתמודדים עם כאבי שרירים ושלד, בעיות שינה, מיגרנות וחוסר איזון הורמונלי או רגשי. הדיקור במחטים עדינות ומדויקות מסייע בשחרור חסימות פנימיות, מעורר את מנגנוני הריפוי הטבעיים של הגוף ומביא להקלה מהירה."
    },
    {
      id: "reflexology",
      name: "רפלקסולוגיה ופתיחת חסימות",
      category: "טיפולי מגע",
      price: 280,
      durationMinutes: 50,
      backgroundImage: "https://images.unsplash.com/photo-1519735777090-ec97162dc266?auto=format&fit=crop&w=800&q=80",
      description: "שיטת הרפלקסולוגיה התפתחה מרישומים עתיקים במצרים וסין המזהים את כף הרגל כמפת השתקפות מדויקת של כלל איברי הגוף. הטיפול מיועד לכל מי שמעוניין בהפגת מתחים יומיומיים, תמיכה בפעילות מערכת העיכול ואיזון מערכתי כולל. עיסוי ולחיצות מדויקות בנקודות ההשתקפות משחררים עומסים עמוקים, מגבירים חיוניות ומעניקים תחושת קלילות בכל הגוף."
    },
    {
      id: "aromatherapy",
      name: "עיסוי ארומתרפי בשמנים טהורים",
      category: "רגיעה וטיפוח",
      price: 350,
      durationMinutes: 60,
      backgroundImage: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
      description: "הארומתרפיה שואבת את השראתה מתרבויות עתיקות שהשתמשו במיצויי צמחים טהורים לרקיחת שמנים רפואיים ומשרי שלווה. הטיפול מתאים במיוחד לאנשים הזקוקים לפסק זמן מלא מהמרוץ המלחיץ, פריקת כיווצי שרירים ושיפור מצב הרוח. השילוב בין מגע רך לשאיפת הניחוחות הטיפוליים מנקה את התודעה, מזין את העור ומעניק שלווה עמוקה שנשארת ימים רבים."
    }
  ],

  // גלריית תמונות מהקליניקה והחלל המזמין
  gallery: [
    {
      title: "חדר טיפולים מואר ומשקיט",
      caption: "אווירה שקטה בליווי תאורה טבעית ונעימה",
      image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "פינת התה וההתרגעות",
      caption: "חליטות צמחים טבעיות לפני ואחרי כל מפגש",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "מרחב הטיפולים המרכזי",
      caption: "חומרים טבעיים, עץ ואבן לחוויית חיבור לקרקע",
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "שמנים אתריים וצמחי מרפא",
      caption: "חומרי גלם טהורים הנרקחים בהתאמה אישית",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
    }
  ],

  // שעות פעילות להזמנת תורים (מוצגות כשעות עגולות בדידות כפי שנתבקש)
  availableHours: [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00"
  ],

  // נקודות קצה עבור האוטומציות של n8n (לחיבור בזמן אמת)
  webhooks: {
    bookingWebhookUrl: "https://segevshmueli0.app.n8n.cloud/webhook/appointment-booking",
    appointmentConfirmedWebhookUrl: "https://segevshmueli0.app.n8n.cloud/webhook/appointment-confirmed",
    calendarSyncWebhookUrl: "https://segevshmueli0.app.n8n.cloud/webhook/available-slots"
  }
};
