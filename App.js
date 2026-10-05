// VANIYAMBADI 360
// LOCAL, ALL AROUND
// Single-file Expo / React Native App.js

import React, { useMemo, useState } from "react";
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ADMIN_PIN = "360ADMIN";
const MEMBERSHIP_PRICE = 300;

/* =========================
   CATEGORIES
========================= */

const CATEGORIES = [
  { id: "all", icon: "🔎", name: "All" },
  { id: "locations", icon: "📍", name: "Locations / ஊர்கள்" },
  { id: "hospital", icon: "🏥", name: "Hospitals" },
  { id: "clinic", icon: "🩺", name: "Clinics" },
  { id: "school", icon: "🏫", name: "Schools" },
  { id: "college", icon: "🎓", name: "Colleges" },
  { id: "hotel", icon: "🍴", name: "Hotels" },
  { id: "lodge", icon: "🏨", name: "Lodges" },
  { id: "agency", icon: "🏢", name: "Agencies" },
  { id: "delivery", icon: "🛵", name: "Delivery / Courier" },
  { id: "supermarket", icon: "🛒", name: "Super Markets" },
  { id: "shop", icon: "🏪", name: "Shops" },
  { id: "petrol", icon: "⛽", name: "Petrol Bunks" },
  { id: "bank", icon: "🏦", name: "Banks" },
  { id: "atm", icon: "🏧", name: "ATMs" },
  { id: "salon", icon: "💇", name: "Salon" },
  { id: "temple", icon: "🛕", name: "Temples" },
  { id: "railway", icon: "🚉", name: "Railway" },
  { id: "highway", icon: "🛣️", name: "Highway" },
  { id: "gold", icon: "🥇", name: "Gold Rate" },
  { id: "reels", icon: "🎬", name: "Reels" },
  { id: "offers", icon: "🎁", name: "Offers" },
  { id: "government", icon: "🏛️", name: "Government" },
  { id: "emergency", icon: "🚨", name: "Emergency" },
];

/* =========================
   HELPERS
========================= */

function makeId(prefix = "item") {
  return (
    prefix +
    "_" +
    Date.now().toString(36) +
    "_" +
    Math.random().toString(36).slice(2, 7)
  );
}

function categoryInfo(id) {
  return CATEGORIES.find((x) => x.id === id);
}

function callNumber(phone) {
  if (!phone) {
    Alert.alert("Phone", "Number not available.");
    return;
  }

  const number = String(phone).replace(/[^\d+]/g, "");
  Linking.openURL(`tel:${number}`);
}

function openWhatsApp(phone) {
  if (!phone) {
    Alert.alert("WhatsApp", "WhatsApp number not available.");
    return;
  }

  let number = String(phone).replace(/[^\d]/g, "");

  if (number.length === 10) {
    number = "91" + number;
  }

  if (number.startsWith("0")) {
    number = "91" + number.substring(1);
  }

  Linking.openURL(`https://wa.me/${number}`);
}

function openMap(item) {
  const query = encodeURIComponent(
    `${item.name || ""} ${item.location || ""} Vaniyambadi Tamil Nadu`
  );

  Linking.openURL(
    `https://www.google.com/maps/search/?api=1&query=${query}`
  );
}

function openWebsite(url) {
  if (!url) return;

  Linking.openURL(url).catch(() => {
    Alert.alert("Website", "Unable to open website.");
  });
}

/* =========================
   LOCATIONS
========================= */

const LOCATIONS = [
  ["Vaniyambadi", "வாணியம்பாடி"],
  ["Mettupalayam", "மேட்டுப்பாளையம்"],
  ["Pallipattu", "பள்ளிப்பட்டு"],
  ["Udayendiram", "உதயந்திரம்"],
  ["Jabrapath", "ஜாப்ராபாத்"],
  ["Madanancheri", "மதனாஞ்சேரி"],
  ["Thumberi", "தும்பேரி"],
  ["Thimmampettai", "திம்மாம்பேட்டை"],
  ["Khaderpet", "காதர்பேட்டை"],
  ["Neelfield", "நீல்ஃபீல்டு"],
  ["Muslimpur", "முஸ்லிம்பூர்"],
  ["Basheerabad", "பஷீராபாத்"],
  ["Shakirabad", "ஷாகிராபாத்"],
  ["New Town", "நியூ டவுன்"],
  ["Perumalpet", "பெருமாள்பேட்டை"],
  ["Pudur", "புதூர்"],
  ["Konamedu", "கோணமேடு"],
  ["Periyapet", "பெரியபேட்டை"],
  ["Jandamedu", "ஜண்டாமேடு"],
  ["Valayambattu", "வளையாம்பட்டு"],
  ["Chennampet", "சென்னாம்பேட்டை"],
].map((x, i) => ({
  id: `location_${i}`,
  category: "locations",
  name: x[0],
  tamilName: x[1],
  location: x[0],
  description: x[1],
}));

/* =========================
   SCHOOLS
========================= */

const SCHOOLS = [
  ["T.V.K.V. School", "Nethaji Nagar"],
  ["Municipal Muslim Girls Middle School", "Fort"],
  ["Municipal Higher Secondary School", "Gandhi Nagar"],
  ["Madhara-Se-Ajam", "Fort"],
  ["Municipal Hindu Primary School", "Pudur"],
  ["T.V.K.V. Elementary School", "Fort"],
  ["Madhare-Se-Mubithe-Am", "Neelifield"],
  ["Madhare-Se-Mubithe-Niswan", "Neelified"],
  ["Hindu Aided School", "Amburpet"],
  ["Nasirel Islam School", "Muslimpur"],
  ["Municipal Muslim Boys School", "Gandhi Nagar"],
  ["Municipal Hindu Primary School", "Perumalpet"],
  ["Khaderia High School", "Khaderpet"],
  ["Municipal Hindu Primary School", "Gandhi Nagar"],
  ["Municipal Muslim Girls Primary School", "Khaderpet"],
  ["Municipal Hindu Primary School", "Periyapet"],
  ["Municipal Muslim Girls Primary School", "Muslimpur"],
  ["Municipal Muslim Girls School", "Periyapet"],
  ["T.V.K.V. High School", "Fort"],
  ["I.E.L.C. Aided Primary School", "Pudur"],
  ["Khaderia Aided Primary School", "Khaderpet"],
  ["Hindu Middle School", "Konamedu"],
  ["Concordia Higher Secondary School", "Pudur"],
  ["Islamiah Higher Secondary School", "Fort"],
  ["Islamiah Girls Higher Secondary School", "Noorullahpet"],
  ["Madhare-Se Niswan", "Muslimpur"],
].map((x, i) => ({
  id: `school_${i}`,
  category: "school",
  name: x[0],
  location: x[1],
}));

/* =========================
   COLLEGES
========================= */

const COLLEGES = [
  ["Islamiah College", "New Town, Vaniyambadi"],
  ["Islamiah Women's College", "Perumalpet, Vaniyambadi"],
  ["Priyadarshini College", "Vaniyambadi"],
  ["Islamiah I.T.I.", "New Town, Vaniyambadi"],
  ["Priyadarshini Engineering College", "Tirupattur Road side"],
  ["Priyadarshini Polytechnic College", "Vaniyambadi area"],
  ["Vaani College of Education", "Vaniyambadi"],
  ["Government ITI", "Vaniyambadi"],
  [
    "Ar Rahman College of Allied Health",
    "Pallan Khaleelur Rahman Street, Vaniyambadi",
  ],
  [
    "Annai Nursing College & Allied Health Science",
    "CN Annadurai Road, Vaniyambadi",
  ],
].map((x, i) => ({
  id: `college_${i}`,
  category: "college",
  name: x[0],
  location: x[1],
}));

/* =========================
   HOSPITALS
========================= */

const HOSPITALS = [
  ["Government Hospital", "Jamath Road, Vaniyambadi", "225700"],
  ["Kafeel Emergency Care Unit (Azeem Hospital)", "PJN Road, Vaniyambadi", "9944238110"],
  ["Ikram Hospital", "147, Mandi Dadamiyan Street, Neelfield, Vaniyambadi", "944338668"],
  ["Fyyaz Kamal Hospital", "24/2/1, PJN Road, Vaniyambadi", "9345970089"],
  ["Dr. Vasantha Hospital", "4/1, PJN Road, Vaniyambadi", "9952778962"],
  ["Riya Maternity Hospital", "265, PJN Road, Vaniyambadi", ""],
  ["AR Rahman Hospital", "Hameenabad, Khaderpet, Vaniyambadi", ""],
  ["Dr. Parvathi Hospital", "Malang Road, Khaderpet, Vaniyambadi", ""],
  ["David Hospital", "Opp. Khaderpet Masjid, Railway Station Road, Vaniyambadi", ""],
  ["Vijaya Ortho Care and Hospital", "283/20, Jamath Road, Noorullahpet, Vaniyambadi", "9003622638"],
  ["Sadha Hospital", "Bypass Road, New Town, Vaniyambadi", "9994214888"],
  ["Dr. Akbar Kouser", "New Town, Vaniyambadi", ""],
  ["Karunai Illam", "124/K, Alangayam Cross Road, Perumalpet, Vaniyambadi", ""],
  ["Sugam Multi-Speciality Hospital", "CN Annadurai Road, Near Railway Gate", "8111055539"],
  ["Ayesha Hospital", "2/25, Kaniyambadi Street, Neelfield", "9894474730"],
  ["ARSH Maternity & Surgical Care", "Mandi Street, Neelfield", "6383612329"],
  ["A R Speciality Hospital", "CL Road, Neelfield", "8940327070"],
  ["Care & Cure Centre", "Cutchery Road, Neelfield", "4174320206"],
  ["Kaleef Dialysis Hospital", "Shakirabad, Vaniyambadi", ""],
  ["Azeem Multispeciality Dental Care Center", "Shakirabad, Vaniyambadi", ""],
  ["Arivu Dental Care", "Mandi Dhadhemiyan Street, Neelfield", ""],
  ["Best Laser Dental Clinic", "CL Road, Khaderpet", ""],
  ["Al-Ameen Unani Multispeciality Clinic & Hijama", "PJN Road", "8667436515"],
  ["Al Sadiq Multispeciality Clinic & Hijamah Centre", "Salamabad Main Road, Basheerabad", "8610033503"],
  ["Apollo 24|7 Lab Test Vaniyambadi", "CL Road, Khaderpet", "8045572851"],
].map((x, i) => ({
  id: `hospital_${i}`,
  category: "hospital",
  name: x[0],
  location: x[1],
  phone: x[2],
}));

/* =========================
   CLINICS
========================= */

const CLINICS = [
  ["Dr. Siva Subramaniyam M.B.B.S", "Bypass Road, Thendral Nagar, Perumalpet", "8870331718"],
  ["Dr. Tamil Selvi M.B.B.S", "81, New Street, New Town", "9443019307"],
  ["Dr. Moda Amjad Basha M.B.B.S", "1304, Meddaikar Street, Neelfield", "9500912531"],
  ["D. Ejaz Ahmed M.B.B.S", "19, PJN Road", "9791338545"],
  ["Dr. Arivumani M.B.B.S", "Mariyamman Koil Street, Pudur", ""],
  ["Ayesha Hospital Clinic", "2/25, Kaniyambadi Street, Neelfield", "9894474730"],
  ["Dr. Syed Farouk Ahmed M.B.B.S / B.A. Shukoor Hospital", "1240, PJN Road", "9980511640"],
].map((x, i) => ({
  id: `clinic_${i}`,
  category: "clinic",
  name: x[0],
  location: x[1],
  phone: x[2],
}));

/* =========================
   HOTELS
========================= */

const HOTELS = [
  ["Vasantha Vihar", "15, C.N.A. Road", "Vegetarian Restaurant"],
  ["Saravana Bhavan", "8, C.N.A. Road", "Vegetarian Restaurant"],
  ["Khaja Hotel", "157, C.N.A. Road", "Non-Vegetarian Restaurant"],
  ["Madras Hotel", "23, C.N.A. Road", "Non-Vegetarian Restaurant"],
  ["Rahamathiya Hotel", "C.N.A. Road", "Non-Vegetarian Restaurant"],
  ["Ahamathiya Hotel", "C.N.A. Road", "Non-Vegetarian Restaurant"],
].map((x, i) => ({
  id: `hotel_${i}`,
  category: "hotel",
  name: x[0],
  location: x[1],
  description: x[2],
}));

/* =========================
   LODGES
========================= */

const LODGES = [
  ["Municipal Lodge", "C.N.A. Road, Bus Stand"],
  ["Kanna Lodge", "C.N.A. Road"],
  ["Sumangali Lodge", "C.N.A. Road"],
  ["M.R. Manson", "C.N.A. Road"],
  ["Babu Lodge", "C.N.A. Road"],
  ["Vetri Lodge", "C.L. Road"],
  ["Naveen Lodge", "Madurai Street"],
  ["Padmavathi Annamalai", "P.J.N. Road"],
].map((x, i) => ({
  id: `lodge_${i}`,
  category: "lodge",
  name: x[0],
  location: x[1],
}));

/* =========================
   AGENCIES
========================= */

const AGENCIES = [
  ["J.K. Agencies", "C.L. Road, Vaniyambadi", ""],
  ["Rainbow", "C.L. Road, Vaniyambadi", ""],
  ["Sathya Agencies", "157/A2, CAN Road, Near Bus Stand, Vaniyambadi", "+917305958985"],
  ["Amul Distributor", "Vaniyambadi", ""],
].map((x, i) => ({
  id: `agency_${i}`,
  category: "agency",
  name: x[0],
  location: x[1],
  phone: x[2],
}));

/* =========================
   DELIVERY
========================= */

const DELIVERY = [
  ["DHT Global Express International Courier", "CN Annadurai Road, Nadar Colony, Teachers Colony", "+919042577651"],
  ["ST Courier - Vaniyambadi", "665, Munisamy Pillai Street, Khaderpet", "+919994859147"],
  ["Blue Dart Express Limited", "Shop No.4 Matha Lodge, 1062/A, CN Annadurai Road, Near Fire Station", "+912269751234"],
  ["VRL Logistics Ltd - Vaniyambadi", "Bypass Street, Near Mugal Garden, Miyan Nagar", "+9118005997800"],
  ["A1 Travels & Speed Parcel Service", "46, Jinnah Road, Vaniyambadi", "+919514604998"],
  ["AKR Express Parcel Service", "No.1057/D5, Matha Lodge, Trunk Road, Konamedu", "+919443123217"],
  ["Liberty Express", "84 CN Annadurai Road, Khaderpet, Teachers Colony", "+919944729904"],
  ["Trackon Couriers", "451 Jinnah Road, Khaderpet", "+914162256242"],
].map((x, i) => ({
  id: `delivery_${i}`,
  category: "delivery",
  name: x[0],
  location: x[1],
  phone: x[2],
}));

/* =========================
   PETROL
========================= */

const PETROL = [
  ["Hindustan Petroleum Corporation Limited", "Islamia College Road Part A, Vaniyambadi", "+919751190190", "24 Hours"],
  ["Hindustan Petroleum", "Ground Floor, Bangalore Road, Vaniyambadi", "+917601936945", "24 Hours"],
  ["Bharat Petroleum Petrol Pump", "49 Shivan Street, Nadar Colony, Muslimpur", "+911800224344", ""],
  ["Bharat Petroleum - N.S. Rajan", "Adjacent Bus Stand, Vaniyambadi", "+911800224344", ""],
  ["ADS Fuel Station", "Alangayam to Vaniyambadi Road, Nethaji Nagar", "", ""],
  ["IndianOil", "Chettiyappanur, NH46, Govindapuram", "+919443161812", ""],
  ["IndianOil", "Khaderpet, Adhoc 152 Trunk Road", "+918778992329", ""],
  ["IndianOil", "Satipur NH46, Chettiyappanur", "+919952782133", ""],
].map((x, i) => ({
  id: `petrol_${i}`,
  category: "petrol",
  name: x[0],
  location: x[1],
  phone: x[2],
  description: x[3],
}));

/* =========================
   SHOPS
========================= */

const SHOPS = [
  ["City Supermarket", "319 Malang Road, Muslimpur / Basheerabad", "9360716622"],
  ["OAS Supermart", "475 Jinnah Road, Khaderpet", "7200455455"],
  ["Seema Super Market", "61 Iqbal Road, Basheerabad", "9994489658"],
  ["Sri Saravana Super Market", "Chettiyappanur / Kalendira", "9443686003"],
  ["A2Z Mart Super Market", "Kaki Street / CL Road, Khaderpet", "7010016386"],
  ["G M C Stores", "Mandi Street, Neelfield", "9994267502"],
  ["Sanjay Stores", "CN Annadurai Road, Khaderpet", "9787460896"],
  ["M G General Store", "1255 PJ Nehru Street, Cutchery Main Road", "7010807095"],
  ["Al Madina General Store", "Vaniyambadi", "9994033982"],
  ["S M Salahuddin Store", "Md Ali Bazaar Road, Shakirabad", "9042241977"],
  ["Sama Store", "Periyar Nagar, Muslimpur", "9366111536"],
  ["Makka Store", "High Road, Jabrapath", ""],
  ["Mani Departments", "Bus Stand", ""],
  ["Tindivanam Silks", "C.L. Road", ""],
  ["Seematti Silks", "C.L. Road", ""],
].map((x, i) => ({
  id: `shop_${i}`,
  category: "shop",
  name: x[0],
  location: x[1],
  phone: x[2],
}));

/* =========================
   SALONS
========================= */

const SALONS = [
  ["Naturals Salon", "30 CN Annadurai Road, Teachers Colony", "6383103066"],
  ["Mahi Maa Beauty Parlour", "55 Kamarajar Street, Pudur", "9150396088"],
  ["Darpan Beauty Clinic & Parlour", "Thippanarao Street, Amburpet", "9442059119"],
  ["Pooja Beauty Parlour & Training Academy", "Municipality Complex, Jinnah Road", "8754892009"],
  ["Studio 27 Unisex Salon", "Vaniyambadi", ""],
  ["Shine Gents Hair Salon", "Vaniyambadi", ""],
  ["Nowmi Men Salon", "Vaniyambadi", ""],
  ["M M Beauty Parlour", "Vaniyambadi", ""],
  ["Royal Mens Beauty Saloon", "Vaniyambadi", ""],
].map((x, i) => ({
  id: `salon_${i}`,
  category: "salon",
  name: x[0],
  location: x[1],
  phone: x[2],
}));

/* =========================
   TEMPLES
========================= */

const TEMPLES = [
  ["Sri Athitheeswara Swamy Temple", "Old Vaniyambadi", "9994107395"],
  ["Sri Azhagu Perumal Temple", "Haji Street, D. Periyapettai", "9743955052"],
  ["Puthu Mariyamman Kovil", "New Town", ""],
  ["Sri Ettiyamman Temple", "W Mada Street, Old Vaniyambadi", ""],
  ["Sri Vettuvanam Ellaiyamman Temple", "Old Vaniyambadi", ""],
  ["Balamurugan Temple", "Vasantham Nagar / Valayambattu", ""],
  ["Sri Panduranga Rukmayi Temple", "Chennampet", ""],
  ["Vetkaliyamman Temple", "Konamedu", ""],
  ["Om Sakthi Temple", "C.L. Road", ""],
  ["Ponni Amman Koil", "Bazaar", ""],
  ["Lord Venkateswaran Temple", "Periyapet", ""],
].map((x, i) => ({
  id: `temple_${i}`,
  category: "temple",
  name: x[0],
  location: x[1],
  phone: x[2],
}));

/* =========================
   BANKS / ATM
========================= */

const BANKS = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Canara Bank",
  "Indian Overseas Bank",
  "Karur Vysya Bank",
  "Axis Bank",
].map((name, i) => ({
  id: `bank_${i}`,
  category: "bank",
  name,
  location: "Vaniyambadi",
}));

const ATMS = [
  "SBI ATM",
  "ICICI Bank ATM",
  "HDFC Bank ATM",
  "Axis Bank ATM",
  "City Union Bank ATM",
].map((name, i) => ({
  id: `atm_${i}`,
  category: "atm",
  name,
  location: "Vaniyambadi",
}));

/* =========================
   EXTRA
========================= */

const EXTRA = [
  {
    id: "railway_1",
    category: "railway",
    name: "Vaniyambadi Railway Station",
    location: "Vaniyambadi",
    phone: "232308",
  },
  {
    id: "highway_1",
    category: "highway",
    name: "Vaniyambadi - Bengaluru Highway",
    location: "NH48 / Bengaluru Road side",
  },
  {
    id: "highway_2",
    category: "highway",
    name: "Vaniyambadi - Chennai Highway",
    location: "NH48 / Chennai direction",
  },
  {
    id: "gold_1",
    category: "gold",
    name: "Today's Gold Rate",
    location: "Vaniyambadi",
    description: "LIVE API PENDING",
  },
  {
    id: "offers_1",
    category: "offers",
    name: "Vaniyambadi 360 Offers",
    location: "Vaniyambadi",
    description: "Admin can add offers.",
  },
];

/* =========================
   GOVERNMENT
========================= */

const GOVERNMENT = [
  ["Aadhaar / UIDAI", "India", "1947", "https://www.uidai.gov.in/"],
  ["Tamil Nadu e-Sevai", "Tamil Nadu", "18004256000", "https://www.tnesevai.tn.gov.in/"],
  ["Vaniyambadi Municipality", "Islamiah College Road, Vaniyambadi", "04174235317", "https://www.tnurbantree.tn.gov.in/vaniyambadi/"],
  ["Vaniyambadi Taluk Office", "Vaniyambadi", "232184", "https://tirupathur.nic.in/"],
  ["Police Station", "Vaniyambadi", "232110", ""],
  ["Fire Station", "Vaniyambadi", "224101", ""],
  ["Railway Station", "Vaniyambadi", "232308", ""],
  ["Government Hospital", "Vaniyambadi", "225700", ""],
  ["Electricity Board", "Vaniyambadi", "224339", ""],
  ["Municipal Office", "Vaniyambadi", "235317", ""],
  ["Municipal Commissioner", "Vaniyambadi", "235408", ""],
  ["Telephone Complaints", "India", "198", ""],
  ["Passport Seva", "India", "18002581800", "https://www.passportindia.gov.in/"],
  ["Voter / Election Commission", "India", "1950", "https://voters.eci.gov.in/"],
  ["Tamil Nadu Ration / TNPDS", "Tamil Nadu", "1967", "https://www.tnpds.gov.in/"],
  ["Patta / Land e-Services", "Tamil Nadu", "", "https://eservices.tn.gov.in/"],
  ["Registration Department", "Tamil Nadu", "04174227222", "https://tnreginet.gov.in/"],
].map((x, i) => ({
  id: `government_${i}`,
  category: "government",
  name: x[0],
  location: x[1],
  phone: x[2],
  website: x[3],
}));

/* =========================
   EMERGENCY
========================= */

const EMERGENCY = [
  ["Emergency / Unified", "India", "112"],
  ["Police", "India", "100"],
  ["Fire & Rescue", "India", "101"],
  ["Ambulance", "India", "108"],
  ["Ambulance", "India", "102"],
  ["Child Helpline", "India", "1098"],
  ["Women Helpline", "India", "1091"],
  ["Disaster Control Room", "Tamil Nadu", "1077"],
  ["State Control Room", "Tamil Nadu", "1070"],
  ["Police WhatsApp", "Tirupattur District", "9092700100"],
].map((x, i) => ({
  id: `emergency_${i}`,
  category: "emergency",
  name: x[0],
  location: x[1],
  phone: x[2],
}));

/* =========================
   INITIAL DATA
========================= */

const INITIAL_DATA = [
  ...LOCATIONS,
  ...SCHOOLS,
  ...COLLEGES,
  ...HOSPITALS,
  ...CLINICS,
  ...HOTELS,
  ...LODGES,
  ...AGENCIES,
  ...DELIVERY,
  ...PETROL,
  ...SHOPS,
  ...SALONS,
  ...TEMPLES,
  ...BANKS,
  ...ATMS,
  ...EXTRA,
  ...GOVERNMENT,
  ...EMERGENCY,
];

/* =========================
   UI COMPONENTS
========================= */

function Header({ onAdmin }) {
  return (
    <View style={styles.header}>
      <View style={styles.brandRow}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>V</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.brandBig}>
            VANIYAMBADI
            <Text style={styles.brandBlue}>.83</Text>
          </Text>

          <Text style={styles.brandSmall}>LOCAL, ALL AROUND</Text>
        </View>

        <TouchableOpacity style={styles.adminMini} onPress={onAdmin}>
          <Text style={styles.adminMiniText}>ADMIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ActionButton({ icon, title, onPress, secondary = false }) {
  return (
    <TouchableOpacity
      style={[styles.actionButton, secondary && styles.actionSecondary]}
      onPress={onPress}
    >
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );
}

function ListingCard({ item, onEdit, onDelete, adminMode = false }) {
  const cat = categoryInfo(item.category);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardIcon}>
          <Text style={styles.cardIconText}>{cat ? cat.icon : "📌"}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{item.name}</Text>

          {item.tamilName ? (
            <Text style={styles.cardTamil}>{item.tamilName}</Text>
          ) : null}

          {item.location ? (
            <Text style={styles.cardLocation}>📍 {item.location}</Text>
          ) : null}

          {item.description ? (
            <Text style={styles.cardDescription}>{item.description}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.cardButtons}>
        {item.phone ? (
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => callNumber(item.phone)}
          >
            <Text style={styles.smallButtonText}>📞 Call</Text>
          </TouchableOpacity>
        ) : null}

        {item.phone ? (
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => openWhatsApp(item.phone)}
          >
            <Text style={styles.smallButtonText}>💬 WhatsApp</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => openMap(item)}
        >
          <Text style={styles.smallButtonText}>🗺️ Map</Text>
        </TouchableOpacity>

        {item.website ? (
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => openWebsite(item.website)}
          >
            <Text style={styles.smallButtonText}>🌐 Open</Text>
          </TouchableOpacity>
        ) : null}

        {adminMode ? (
          <>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => onEdit(item)}
            >
              <Text style={styles.editButtonText}>✏️ Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(item)}
            >
              <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </View>
  );
}

/* =========================
   HOME
========================= */

function Home({
  data,
  onSearch,
  onCategory,
  onMember,
  onOwner,
  onPosts,
  onReels,
  onAdmin,
}) {
  const popular = data.filter(
    (x) =>
      ["hospital", "hotel", "shop", "petrol", "school"].includes(x.category)
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Header onAdmin={onAdmin} />

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>VANIYAMBADI</Text>
        <Text style={styles.heroSub}>LOCAL, ALL AROUND</Text>
        <Text style={styles.heroTamil}>
          வாணியம்பாடி முழுவதும் ஒரே இடத்தில்
        </Text>

        <TouchableOpacity style={styles.searchBox} onPress={onSearch}>
          <Text style={styles.searchIcon}>🔎</Text>
          <Text style={styles.searchPlaceholder}>
            எதை தேடுகிறீர்கள்?
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Quick Access</Text>

      <View style={styles.quickGrid}>
        <ActionButton
          icon="🚨"
          title="Emergency"
          onPress={() => onCategory("emergency")}
        />
        <ActionButton
          icon="🏥"
          title="Hospitals"
          onPress={() => onCategory("hospital")}
        />
        <ActionButton
          icon="🏫"
          title="Schools"
          onPress={() => onCategory("school")}
        />
        <ActionButton
          icon="⛽"
          title="Petrol"
          onPress={() => onCategory("petrol")}
        />
        <ActionButton
          icon="🍴"
          title="Hotels"
          onPress={() => onCategory("hotel")}
        />
        <ActionButton
          icon="📍"
          title="Locations"
          onPress={() => onCategory("locations")}
        />
        <ActionButton
          icon="🎬"
          title="Reels"
          onPress={onReels}
        />
        <ActionButton
          icon="🎁"
          title="Offers"
          onPress={() => onCategory("offers")}
        />
      </View>

      <Text style={styles.sectionTitle}>Vaniyambadi 360</Text>

      <View style={styles.featureCard}>
        <Text style={styles.featureIcon}>📱</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.featureTitle}>
            Local, All Around
          </Text>
          <Text style={styles.featureText}>
            Shops, hospitals, schools, hotels, petrol bunks,
            services, locations and more.
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Member Area</Text>

      <View style={styles.memberGrid}>
        <TouchableOpacity style={styles.memberCard} onPress={onMember}>
          <Text style={styles.memberIcon}>👤</Text>
          <Text style={styles.memberTitle}>Member</Text>
          <Text style={styles.memberText}>Join / Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.memberCard} onPress={onOwner}>
          <Text style={styles.memberIcon}>🏪</Text>
          <Text style={styles.memberTitle}>Shop Owner</Text>
          <Text style={styles.memberText}>Owner Control</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.memberCard} onPress={onPosts}>
          <Text style={styles.memberIcon}>📸</Text>
          <Text style={styles.memberTitle}>Posts</Text>
          <Text style={styles.memberText}>Photos & Updates</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.memberCard} onPress={onReels}>
          <Text style={styles.memberIcon}>🎬</Text>
          <Text style={styles.memberTitle}>Reels</Text>
          <Text style={styles.memberText}>Short Videos</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Popular</Text>

      {popular.slice(0, 8).map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

/* =========================
   DIRECTORY
========================= */

function Directory({ data, initialCategory = "all", onBack }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return data.filter((item) => {
      const categoryMatch =
        category === "all" || item.category === category;

      if (!categoryMatch) return false;

      if (!q) return true;

      return (
        String(item.name || "").toLowerCase().includes(q) ||
        String(item.location || "").toLowerCase().includes(q) ||
        String(item.tamilName || "").toLowerCase().includes(q) ||
        String(item.description || "").toLowerCase().includes(q)
      );
    });
  }, [data, category, query]);

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.topTitle}>VANIYAMBADI 360</Text>
      </View>

      <View style={styles.directorySearch}>
        <Text style={{ fontSize: 18 }}>🔎</Text>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="எதை தேடுகிறீர்கள்?"
          placeholderTextColor="#94a3b8"
          style={styles.directoryInput}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryChip,
              category === cat.id && styles.categoryChipActive,
            ]}
            onPress={() => setCategory(cat.id)}
          >
            <Text style={styles.categoryChipIcon}>{cat.icon}</Text>
            <Text
              style={[
                styles.categoryChipText,
                category === cat.id && styles.categoryChipTextActive,
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.resultText}>
        {filtered.length} results
      </Text>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))}

        {filtered.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>🔎</Text>
            <Text style={styles.emptyTitle}>No result found</Text>
            <Text style={styles.emptyText}>
              வேறு பெயர் அல்லது category search செய்யுங்கள்.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

/* =========================
   EMERGENCY
========================= */

function EmergencyScreen({ onBack }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>🚨 Emergency Help</Text>
      </View>

      <View style={styles.emergencyHero}>
        <Text style={styles.emergencyHeroIcon}>🚨</Text>
        <Text style={styles.emergencyHeroTitle}>
          Emergency Help
        </Text>
        <Text style={styles.emergencyHeroText}>
          அவசர நேரத்தில் தேவையான எண்ணை உடனடியாக அழைக்கவும்.
        </Text>
      </View>

      {EMERGENCY.map((item) => (
        <View key={item.id} style={styles.emergencyCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.emergencyTitle}>{item.name}</Text>
            <Text style={styles.emergencyLocation}>
              📍 {item.location}
            </Text>
            <Text style={styles.emergencyNumber}>
              {item.phone}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.callEmergency}
            onPress={() => callNumber(item.phone)}
          >
            <Text style={styles.callEmergencyText}>📞</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

/* =========================
   GOVERNMENT
========================= */

function GovernmentScreen({ onBack }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>🏛️ Government</Text>
      </View>

      {GOVERNMENT.map((item) => (
        <ListingCard
          key={item.id}
          item={item}
        />
      ))}
    </ScrollView>
  );
}

/* =========================
   MEMBER
========================= */

function MemberScreen({ onBack }) {
  const [mode, setMode] = useState("join");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function submit() {
    if (!name.trim() || !phone.trim()) {
      Alert.alert("Member", "Name and phone number enter செய்யுங்கள்.");
      return;
    }

    Alert.alert(
      "Member",
      mode === "join"
        ? "Member registration prototype completed."
        : "Member login prototype completed."
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>👤 Member</Text>
      </View>

      <View style={styles.panelCard}>
        <Text style={styles.panelTitle}>Member Area</Text>

        <View style={styles.segment}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              mode === "join" && styles.segmentActive,
            ]}
            onPress={() => setMode("join")}
          >
            <Text style={styles.segmentText}>Join</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentButton,
              mode === "login" && styles.segmentActive,
            ]}
            onPress={() => setMode("login")}
          >
            <Text style={styles.segmentText}>Login</Text>
          </TouchableOpacity>
        </View>

        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />

        <Input
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number"
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={submit}
        >
          <Text style={styles.primaryButtonText}>
            {mode === "join" ? "Join Member" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* =========================
   SHOP OWNER
========================= */

function ShopOwnerScreen({ onBack, onMembership }) {
  const [logged, setLogged] = useState(false);
  const [mode, setMode] = useState("login");

  const [shopName, setShopName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [downloadEnabled, setDownloadEnabled] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  function submitLogin() {
    setLogged(true);
  }

  if (!logged) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.topTitle}>🏪 Shop Owner</Text>
        </View>

        <View style={styles.panelCard}>
          <Text style={styles.panelTitle}>
            Shop Owner Control
          </Text>

          <Text style={styles.panelText}>
            Shop owner login / join prototype.
          </Text>

          <View style={styles.segment}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                mode === "login" && styles.segmentActive,
              ]}
              onPress={() => setMode("login")}
            >
              <Text style={styles.segmentText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentButton,
                mode === "join" && styles.segmentActive,
              ]}
              onPress={() => setMode("join")}
            >
              <Text style={styles.segmentText}>Join</Text>
            </TouchableOpacity>
          </View>

          <Input
            label="Shop Name"
            value={shopName}
            onChangeText={setShopName}
            placeholder="Shop name"
          />

          <Input
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={submitLogin}
          >
            <Text style={styles.primaryButtonText}>
              {mode === "login" ? "Login" : "Create Owner Account"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onMembership}
          >
            <Text style={styles.secondaryButtonText}>
              💳 Membership ₹{MEMBERSHIP_PRICE}/month
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.topTitle}>🏪 My Shop</Text>
      </View>

      <View style={styles.panelCard}>
        <Text style={styles.panelTitle}>
          Shop Owner Dashboard
        </Text>

        <Text style={styles.ownerBadge}>
          OWNER CONTROL
        </Text>

        <Input
          label="Shop Name"
          value={shopName}
          onChangeText={setShopName}
          placeholder="Shop name"
        />

        <Input
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
        />

        <Input
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Shop location"
        />

        <Text style={styles.settingsTitle}>
          Shop Settings
        </Text>

        <ToggleRow
          title="Reel Download"
          value={downloadEnabled}
          onChange={setDownloadEnabled}
        />

        <ToggleRow
          title="Show WhatsApp in Reel"
          value={whatsappEnabled}
          onChange={setWhatsappEnabled}
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            Alert.alert(
              "Shop Owner",
              "Shop details saved in prototype."
            )
          }
        >
          <Text style={styles.primaryButtonText}>
            💾 Save Shop
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() =>
            Alert.alert(
              "Reels",
              "Owner reel upload prototype. Admin approval is not required."
            )
          }
        >
          <Text style={styles.uploadButtonText}>
            🎬 Upload Reel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() =>
            Alert.alert("Posts", "Photo upload prototype.")
          }
        >
          <Text style={styles.uploadButtonText}>
            📸 Upload Photo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onMembership}
        >
          <Text style={styles.secondaryButtonText}>
            ₹{MEMBERSHIP_PRICE}/month Membership
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* =========================
   TOGGLE
========================= */

function ToggleRow({ title, value, onChange }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.toggleTitle}>{title}</Text>

      <TouchableOpacity
        style={[
          styles.toggle,
          value && styles.toggleOn,
        ]}
        onPress={() => onChange(!value)}
      >
        <View
          style={[
            styles.toggleCircle,
            value && styles.toggleCircleOn,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

/* =========================
   POSTS / REELS
========================= */

function PostsScreen({
  posts,
  mode = "posts",
  onBack,
  onCreate,
}) {
  const filtered = posts.filter((p) =>
    mode === "reels"
      ? p.type === "reel"
      : p.type === "photo"
  );

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.topTitle}>
          {mode === "reels" ? "🎬 Reels" : "📸 Posts"}
        </Text>

        <TouchableOpacity
          style={styles.addTop}
          onPress={onCreate}
        >
          <Text style={styles.addTopText}>＋</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatar}>
                <Text>🏪</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.postShop}>
                  {post.shopName || "Vaniyambadi 360"}
                </Text>

                <Text style={styles.postDate}>
                  {post.date || "Today"}
                </Text>
              </View>
            </View>

            <View style={styles.postMedia}>
              <Text style={styles.postMediaIcon}>
                {post.type === "reel" ? "🎬" : "📸"}
              </Text>

              <Text style={styles.postMediaText}>
                {post.type === "reel"
                  ? "REEL / SHORT VIDEO"
                  : "PHOTO POST"}
              </Text>
            </View>

            {post.caption ? (
              <Text style={styles.postCaption}>
                {post.caption}
              </Text>
            ) : null}

            {post.location ? (
              <Text style={styles.postLocation}>
                📍 {post.location}
              </Text>
            ) : null}

            {post.phone ? (
              <View style={styles.postActions}>
                <TouchableOpacity
                  style={styles.postAction}
                  onPress={() => callNumber(post.phone)}
                >
                  <Text>📞 Call</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.postAction}
                  onPress={() => openWhatsApp(post.phone)}
                >
                  <Text>💬 WhatsApp</Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {post.downloadEnabled ? (
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() =>
                  Alert.alert(
                    "Download",
                    "Download prototype enabled by shop owner."
                  )
                }
              >
                <Text style={styles.downloadText}>
                  ⬇️ Download
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}

        {filtered.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>
              {mode === "reels" ? "🎬" : "📸"}
            </Text>

            <Text style={styles.emptyTitle}>
              No {mode === "reels" ? "reels" : "posts"} yet
            </Text>

            <Text style={styles.emptyText}>
              ＋ button மூலம் புதிய content உருவாக்கலாம்.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

/* =========================
   CREATE POST
========================= */

function CreatePostScreen({
  onBack,
  onSave,
  defaultType = "photo",
}) {
  const [type, setType] = useState(defaultType);
  const [shopName, setShopName] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [downloadEnabled, setDownloadEnabled] = useState(true);

  function save() {
    onSave({
      id: makeId("post"),
      type,
      shopName,
      caption,
      location,
      phone,
      downloadEnabled,
      date: new Date().toLocaleDateString("en-IN"),
    });
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.topTitle}>
          Create Content
        </Text>
      </View>

      <View style={styles.panelCard}>
        <Text style={styles.panelTitle}>
          Create Post / Reel
        </Text>

        <View style={styles.segment}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              type === "photo" && styles.segmentActive,
            ]}
            onPress={() => setType("photo")}
          >
            <Text style={styles.segmentText}>
              📸 Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentButton,
              type === "reel" && styles.segmentActive,
            ]}
            onPress={() => setType("reel")}
          >
            <Text style={styles.segmentText}>
              🎬 Reel
            </Text>
          </TouchableOpacity>
        </View>

        <Input
          label="Shop Name"
          value={shopName}
          onChangeText={setShopName}
          placeholder="Shop name"
        />

        <Input
          label="Caption"
          value={caption}
          onChangeText={setCaption}
          placeholder="Write something..."
          multiline
        />

        <Input
          label="Address / Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Shop address"
        />

        <Input
          label="Contact Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number"
          keyboardType="phone-pad"
        />

        {type === "reel" ? (
          <ToggleRow
            title="Allow Download"
            value={downloadEnabled}
            onChange={setDownloadEnabled}
          />
        ) : null}

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() =>
            Alert.alert(
              "Media",
              type === "reel"
                ? "Video picker integration can be connected here."
                : "Image picker integration can be connected here."
            )
          }
        >
          <Text style={styles.uploadButtonText}>
            {type === "reel"
              ? "🎬 Select Video"
              : "📸 Select Photo"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={save}
        >
          <Text style={styles.primaryButtonText}>
            🚀 Publish
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* =========================
   MEMBERSHIP
========================= */

function MembershipScreen({ onBack }) {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.topTitle}>
          💳 Membership
        </Text>
      </View>

      <View style={styles.membershipHero}>
        <Text style={styles.membershipIcon}>🏪</Text>

        <Text style={styles.membershipTitle}>
          Shop Owner Membership
        </Text>

        <Text style={styles.price}>
          ₹{MEMBERSHIP_PRICE}
          <Text style={styles.priceSmall}> / month</Text>
        </Text>

        <Text style={styles.membershipText}>
          Shop Owner control, photos, products, posts,
          reels and shop settings.
        </Text>
      </View>

      <View style={styles.panelCard}>
        <Text style={styles.panelTitle}>
          Included
        </Text>

        <Benefit text="Shop name edit" />
        <Benefit text="Shop photos" />
        <Benefit text="Products / Services" />
        <Benefit text="Photo posts" />
        <Benefit text="Reels upload" />
        <Benefit text="Location / Map" />
        <Benefit text="Call / WhatsApp" />
        <Benefit text="Download ON / OFF" />
        <Benefit text="WhatsApp display ON / OFF" />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() =>
            Alert.alert(
              "Payment",
              "₹300/month payment gateway integration is pending."
            )
          }
        >
          <Text style={styles.primaryButtonText}>
            💳 Pay ₹{MEMBERSHIP_PRICE}
          </Text>
        </TouchableOpacity>

        <Text style={styles.paymentNote}>
          UPI / GPay payment integration can be connected
          to the Admin account in the backend.
        </Text>
      </View>
    </ScrollView>
  );
}

function Benefit({ text }) {
  return (
    <View style={styles.benefit}>
      <Text style={styles.benefitIcon}>✓</Text>
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
}

/* =========================
   ADMIN LOGIN
========================= */

function AdminLogin({ onBack, onSuccess }) {
  const [pin, setPin] = useState("");

  function login() {
    if (pin === ADMIN_PIN) {
      onSuccess();
    } else {
      Alert.alert("Admin", "Wrong Admin PIN.");
    }
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.topTitle}>🔐 Admin Login</Text>
      </View>

      <View style={styles.adminLoginCard}>
        <Text style={styles.adminLock}>🔐</Text>

        <Text style={styles.panelTitle}>
          VANIYAMBADI 360 ADMIN
        </Text>

        <Text style={styles.panelText}>
          Admin control — Add / Edit / Delete / Manage
        </Text>

        <Input
          label="Admin PIN"
          value={pin}
          onChangeText={setPin}
          placeholder="Enter PIN"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={login}
        >
          <Text style={styles.primaryButtonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* =========================
   ADMIN PANEL
========================= */

function AdminPanel({
  data,
  onBack,
  onAdd,
  onEdit,
  onDelete,
  onLogout,
}) {
  const [query, setQuery] = useState("");

  const filtered = data.filter((item) => {
    const q = query.toLowerCase();

    return (
      !q ||
      String(item.name || "").toLowerCase().includes(q) ||
      String(item.location || "").toLowerCase().includes(q)
    );
  });

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.topTitle}>⚙️ Admin Panel</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.adminDashboard}>
          <Text style={styles.adminDashboardTitle}>
            VANIYAMBADI 360
          </Text>

          <Text style={styles.adminDashboardSub}>
            FULL ADMIN CONTROL
          </Text>

          <View style={styles.statsRow}>
            <StatBox title="Listings" value={String(data.length)} />
            <StatBox title="Categories" value={String(CATEGORIES.length)} />
            <StatBox title="Membership" value="₹300" />
          </View>
        </View>

        <View style={styles.adminActionGrid}>
          <AdminAction
            icon="＋"
            title="Add Listing"
            onPress={onAdd}
          />

          <AdminAction
            icon="👥"
            title="Members"
            onPress={() =>
              Alert.alert("Admin", "Member management area.")
            }
          />

          <AdminAction
            icon="🏪"
            title="Shop Owners"
            onPress={() =>
              Alert.alert("Admin", "Shop owner management area.")
            }
          />

          <AdminAction
            icon="🎬"
            title="Reels"
            onPress={() =>
              Alert.alert("Admin", "Reels management area.")
            }
          />

          <AdminAction
            icon="🎁"
            title="Offers"
            onPress={() =>
              Alert.alert("Admin", "Offers management area.")
            }
          />

          <AdminAction
            icon="💳"
            title="Payments"
            onPress={() =>
              Alert.alert(
                "Admin",
                "₹300/month payment management area."
              )
            }
          />
        </View>

        <View style={styles.directorySearch}>
          <Text style={{ fontSize: 18 }}>🔎</Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search listing..."
            placeholderTextColor="#94a3b8"
            style={styles.directoryInput}
          />
        </View>

        {filtered.map((item) => (
          <ListingCard
            key={item.id}
            item={item}
            adminMode
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
        >
          <Text style={styles.logoutText}>
            Logout Admin
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function StatBox({ title, value }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function AdminAction({ icon, title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.adminAction}
      onPress={onPress}
    >
      <Text style={styles.adminActionIcon}>{icon}</Text>
      <Text style={styles.adminActionTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

/* =========================
   EDIT LISTING
========================= */

function EditListing({
  item,
  onBack,
  onSave,
  isNew = false,
}) {
  const [name, setName] = useState(item?.name || "");
  const [category, setCategory] = useState(
    item?.category || "shop"
  );
  const [location, setLocation] = useState(
    item?.location || ""
  );
  const [phone, setPhone] = useState(
    item?.phone || ""
  );
  const [description, setDescription] = useState(
    item?.description || ""
  );

  function save() {
    if (!name.trim()) {
      Alert.alert("Admin", "Name enter செய்யுங்கள்.");
      return;
    }

    onSave({
      ...(item || {}),
      id: item?.id || makeId("listing"),
      name,
      category,
      location,
      phone,
      description,
    });
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.topTitle}>
          {isNew ? "＋ Add Listing" : "✏️ Edit Listing"}
        </Text>
      </View>

      <View style={styles.panelCard}>
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Listing name"
        />

        <Text style={styles.inputLabel}>
          Category
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 12 }}
        >
          {CATEGORIES.filter(
            (x) => x.id !== "all"
          ).map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                category === cat.id &&
                  styles.categoryChipActive,
              ]}
              onPress={() => setCategory(cat.id)}
            >
              <Text>{cat.icon}</Text>
              <Text
                style={[
                  styles.categoryChipText,
                  category === cat.id &&
                    styles.categoryChipTextActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Input
          label="Location"
          value={location}
          onChangeText={setLocation}
          placeholder="Location"
        />

        <Input
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number"
          keyboardType="phone-pad"
        />

        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Description"
          multiline
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={save}
        >
          <Text style={styles.primaryButtonText}>
            💾 Save
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

/* =========================
   INPUT
========================= */

function Input({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType,
  secureTextEntry = false,
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        style={[
          styles.input,
          multiline && styles.inputMultiline,
        ]}
        multiline={multiline}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

/* =========================
   BOTTOM NAV
========================= */

function BottomNav({
  screen,
  onHome,
  onSearch,
  onEmergency,
  onAdmin,
}) {
  return (
    <View style={styles.bottomNav}>
      <NavButton
        icon="🏠"
        title="Home"
        active={screen === "home"}
        onPress={onHome}
      />

      <NavButton
        icon="🔎"
        title="Search"
        active={screen === "directory"}
        onPress={onSearch}
      />

      <NavButton
        icon="🚨"
        title="Emergency"
        active={screen === "emergency"}
        onPress={onEmergency}
      />

      <NavButton
        icon="⚙️"
        title="Admin"
        active={screen === "admin" || screen === "adminLogin"}
        onPress={onAdmin}
      />
    </View>
  );
}

function NavButton({
  icon,
  title,
  active,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.navButton,
        active && styles.navButtonActive,
      ]}
      onPress={onPress}
    >
      <Text style={styles.navIcon}>{icon}</Text>
      <Text
        style={[
          styles.navTitle,
          active && styles.navTitleActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

/* =========================
   MAIN APP
========================= */

export default function App() {
  const [data, setData] = useState(INITIAL_DATA);

  const [screen, setScreen] = useState("home");

  const [directoryCategory, setDirectoryCategory] =
    useState("all");

  const [adminLogged, setAdminLogged] =
    useState(false);

  const [editingItem, setEditingItem] =
    useState(null);

  const [posts, setPosts] = useState([
    {
      id: "post_demo_1",
      type: "photo",
      shopName: "Vaniyambadi 360",
      caption:
        "VANIYAMBADI — LOCAL, ALL AROUND",
      location: "Vaniyambadi",
      date: "Today",
    },
  ]);

  function goHome() {
    setScreen("home");
  }

  function openDirectory(category = "all") {
    setDirectoryCategory(category);
    setScreen("directory");
  }

  function openAdmin() {
    if (adminLogged) {
      setScreen("admin");
    } else {
      setScreen("adminLogin");
    }
  }

  function saveListing(item) {
    setData((prev) => {
      const exists = prev.some(
        (x) => x.id === item.id
      );

      if (exists) {
        return prev.map((x) =>
          x.id === item.id ? item : x
        );
      }

      return [item, ...prev];
    });

    setEditingItem(null);
    setScreen("admin");

    Alert.alert(
      "Admin",
      "Listing saved successfully."
    );
  }

  function deleteListing(item) {
    Alert.alert(
      "Delete Listing",
      `${item.name} delete செய்யவா?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setData((prev) =>
              prev.filter((x) => x.id !== item.id)
            );
          },
        },
      ]
    );
  }

  function savePost(post) {
    setPosts((prev) => [post, ...prev]);

    setScreen(
      post.type === "reel"
        ? "reels"
        : "posts"
    );
  }

  let content = null;

  if (screen === "home") {
    content = (
      <Home
        data={data}
        onSearch={() => openDirectory("all")}
        onCategory={openDirectory}
        onMember={() => setScreen("member")}
        onOwner={() => setScreen("owner")}
        onPosts={() => setScreen("posts")}
        onReels={() => setScreen("reels")}
        onAdmin={openAdmin}
      />
    );
  }

  if (screen === "directory") {
    content = (
      <Directory
        data={data}
        initialCategory={directoryCategory}
        onBack={goHome}
      />
    );
  }

  if (screen === "emergency") {
    content = (
      <EmergencyScreen onBack={goHome} />
    );
  }

  if (screen === "government") {
    content = (
      <GovernmentScreen onBack={goHome} />
    );
  }

  if (screen === "member") {
    content = (
      <MemberScreen
        onBack={goHome}
      />
    );
  }

  if (screen === "owner") {
    content = (
      <ShopOwnerScreen
        onBack={goHome}
        onMembership={() =>
          setScreen("membership")
        }
      />
    );
  }

  if (screen === "posts") {
    content = (
      <PostsScreen
        posts={posts}
        mode="posts"
        onBack={goHome}
        onCreate={() =>
          setScreen("createPost")
        }
      />
    );
  }

  if (screen === "reels") {
    content = (
      <PostsScreen
        posts={posts}
        mode="reels"
        onBack={goHome}
        onCreate={() =>
          setScreen("createReel")
        }
      />
    );
  }

  if (screen === "createPost") {
    content = (
      <CreatePostScreen
        defaultType="photo"
        onBack={() => setScreen("posts")}
        onSave={savePost}
      />
    );
  }

  if (screen === "createReel") {
    content = (
      <CreatePostScreen
        defaultType="reel"
        onBack={() => setScreen("reels")}
        onSave={savePost}
      />
    );
  }

  if (screen === "membership") {
    content = (
      <MembershipScreen
        onBack={() => setScreen("owner")}
      />
    );
  }

  if (screen === "adminLogin") {
    content = (
      <AdminLogin
        onBack={goHome}
        onSuccess={() => {
          setAdminLogged(true);
          setScreen("admin");
        }}
      />
    );
  }

  if (screen === "admin") {
    if (!adminLogged) {
      content = (
        <AdminLogin
          onBack={goHome}
          onSuccess={() => {
            setAdminLogged(true);
            setScreen("admin");
          }}
        />
      );
    } else {
      content = (
        <AdminPanel
          data={data}
          onBack={goHome}
          onAdd={() => {
            setEditingItem(null);
            setScreen("edit");
          }}
          onEdit={(item) => {
            setEditingItem(item);
            setScreen("edit");
          }}
          onDelete={deleteListing}
          onLogout={() => {
            setAdminLogged(false);
            setScreen("home");
          }}
        />
      );
    }
  }

  if (screen === "edit") {
    content = (
      <EditListing
        item={editingItem}
        isNew={!editingItem}
        onBack={() => setScreen("admin")}
        onSave={saveListing}
      />
    );
  }

  const showBottomNav = [
    "home",
    "directory",
    "emergency",
    "admin",
    "adminLogin",
  ].includes(screen);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />

      <View style={styles.app}>
        {content}

        {showBottomNav ? (
          <BottomNav
            screen={screen}
            onHome={goHome}
            onSearch={() => openDirectory("all")}
            onEmergency={() =>
              setScreen("emergency")
            }
            onAdmin={openAdmin}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

/* =========================
   STYLES
========================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  app: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  header: {
    backgroundColor: "#ffffff",
    paddingBottom: 12,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  logoText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
  },

  brandBig: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0f172a",
    letterSpacing: 0.5,
  },

  brandBlue: {
    color: "#2563eb",
  },

  brandSmall: {
    marginTop: 2,
    fontSize: 10,
    color: "#64748b",
    fontWeight: "800",
    letterSpacing: 2,
  },

  adminMini: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },

  adminMiniText: {
    color: "#1d4ed8",
    fontSize: 10,
    fontWeight: "900",
  },

  hero: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 22,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  heroTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0f172a",
  },

  heroSub: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2563eb",
    letterSpacing: 2,
    marginTop: 2,
  },

  heroTamil: {
    marginTop: 8,
    color: "#64748b",
    fontSize: 14,
  },

  searchBox: {
    marginTop: 18,
    backgroundColor: "#f1f5f9",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  searchIcon: {
    fontSize: 19,
    marginRight: 9,
  },

  searchPlaceholder: {
    color: "#64748b",
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0f172a",
    marginTop: 24,
    marginBottom: 12,
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  actionButton: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    minHeight: 92,
    justifyContent: "center",
  },

  actionSecondary: {
    backgroundColor: "#f8fafc",
  },

  actionIcon: {
    fontSize: 28,
    marginBottom: 7,
  },

  actionText: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 14,
  },

  featureCard: {
    backgroundColor: "#eff6ff",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbeafe",
  },

  featureIcon: {
    fontSize: 34,
    marginRight: 14,
  },

  featureTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1e3a8a",
  },

  featureText: {
    marginTop: 4,
    color: "#475569",
    lineHeight: 20,
  },

  memberGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  memberCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    marginBottom: 12,
  },

  memberIcon: {
    fontSize: 28,
  },

  memberTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#0f172a",
    marginTop: 7,
  },

  memberText: {
    color: "#64748b",
    marginTop: 3,
    fontSize: 12,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 15,
    marginBottom: 12,
  },

  cardTop: {
    flexDirection: "row",
  },

  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  cardIconText: {
    fontSize: 24,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0f172a",
  },

  cardTamil: {
    color: "#2563eb",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "700",
  },

  cardLocation: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 6,
  },

  cardDescription: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 5,
  },

  cardButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 13,
  },

  smallButton: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 6,
    marginBottom: 6,
  },

  smallButtonText: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "800",
  },

  editButton: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 6,
    marginBottom: 6,
  },

  editButtonText: {
    color: "#1d4ed8",
    fontSize: 11,
    fontWeight: "800",
  },

  deleteButton: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 6,
  },

  deleteButtonText: {
    color: "#dc2626",
    fontSize: 11,
    fontWeight: "800",
  },

  topBar: {
    minHeight: 62,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  backText: {
    fontSize: 30,
    color: "#0f172a",
    marginTop: -4,
  },

  topTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "900",
    color: "#0f172a",
  },

  addTop: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
  },

  addTopText: {
    color: "#ffffff",
    fontSize: 25,
  },

  directorySearch: {
    margin: 14,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  directoryInput: {
    flex: 1,
    height: 48,
    marginLeft: 8,
    color: "#0f172a",
  },

  categoryRow: {
    paddingHorizontal: 14,
    paddingBottom: 8,
  },

  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 13,
    paddingHorizontal: 11,
    paddingVertical: 9,
    marginRight: 7,
  },

  categoryChipActive: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  categoryChipIcon: {
    marginRight: 5,
  },

  categoryChipText: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "800",
  },

  categoryChipTextActive: {
    color: "#ffffff",
  },

  resultText: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },

  emptyBox: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginTop: 20,
  },

  emptyIcon: {
    fontSize: 38,
  },

  emptyTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "900",
    color: "#0f172a",
  },

  emptyText: {
    marginTop: 5,
    color: "#64748b",
    textAlign: "center",
  },

  emergencyHero: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },

  emergencyHeroIcon: {
    fontSize: 44,
  },

  emergencyHeroTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#991b1b",
    marginTop: 7,
  },

  emergencyHeroText: {
    textAlign: "center",
    color: "#7f1d1d",
    marginTop: 6,
  },

  emergencyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#fecaca",
    padding: 15,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
  },

  emergencyTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0f172a",
  },

  emergencyLocation: {
    marginTop: 4,
    color: "#64748b",
    fontSize: 12,
  },

  emergencyNumber: {
    marginTop: 6,
    color: "#dc2626",
    fontSize: 18,
    fontWeight: "900",
  },

  callEmergency: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
  },

  callEmergencyText: {
    fontSize: 24,
  },

  panelCard: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  panelTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#0f172a",
  },

  panelText: {
    color: "#64748b",
    marginTop: 7,
    lineHeight: 20,
  },

  segment: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 13,
    padding: 4,
    marginTop: 16,
    marginBottom: 16,
  },

  segmentButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },

  segmentActive: {
    backgroundColor: "#ffffff",
  },

  segmentText: {
    fontWeight: "800",
    color: "#334155",
  },

  inputWrap: {
    marginBottom: 14,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: "#334155",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 13,
    paddingHorizontal: 13,
    height: 48,
    color: "#0f172a",
  },

  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },

  primaryButton: {
    backgroundColor: "#2563eb",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },

  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 14,
  },

  secondaryButton: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },

  secondaryButtonText: {
    color: "#1d4ed8",
    fontWeight: "900",
  },

  ownerBadge: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#dcfce7",
    color: "#166534",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9,
    fontSize: 10,
    fontWeight: "900",
  },

  settingsTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0f172a",
    marginTop: 8,
    marginBottom: 5,
  },

  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  toggleTitle: {
    color: "#334155",
    fontWeight: "700",
  },

  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#cbd5e1",
    padding: 3,
    justifyContent: "center",
  },

  toggleOn: {
    backgroundColor: "#2563eb",
  },

  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#ffffff",
  },

  toggleCircleOn: {
    alignSelf: "flex-end",
  },

  uploadButton: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#94a3b8",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },

  uploadButtonText: {
    color: "#334155",
    fontWeight: "900",
  },

  postCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 15,
    overflow: "hidden",
  },

  postHeader: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  postShop: {
    fontWeight: "900",
    color: "#0f172a",
  },

  postDate: {
    color: "#94a3b8",
    fontSize: 11,
    marginTop: 2,
  },

  postMedia: {
    height: 240,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },

  postMediaIcon: {
    fontSize: 50,
  },

  postMediaText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
    marginTop: 7,
    letterSpacing: 1,
  },

  postCaption: {
    paddingHorizontal: 15,
    paddingTop: 13,
    color: "#334155",
    lineHeight: 20,
  },

  postLocation: {
    paddingHorizontal: 15,
    paddingTop: 8,
    color: "#64748b",
    fontSize: 12,
  },

  postActions: {
    flexDirection: "row",
    padding: 12,
  },

  postAction: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    marginRight: 7,
  },

  downloadButton: {
    marginHorizontal: 14,
    marginBottom: 14,
    backgroundColor: "#eff6ff",
    borderRadius: 11,
    paddingVertical: 10,
    alignItems: "center",
  },

  downloadText: {
    color: "#1d4ed8",
    fontWeight: "800",
  },

  membershipHero: {
    backgroundColor: "#2563eb",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 15,
  },

  membershipIcon: {
    fontSize: 42,
  },

  membershipTitle: {
    color: "#ffffff",
    fontSize: 21,
    fontWeight: "900",
    marginTop: 9,
    textAlign: "center",
  },

  price: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "900",
    marginTop: 10,
  },

  priceSmall: {
    fontSize: 14,
    fontWeight: "700",
  },

  membershipText: {
    color: "#dbeafe",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  paymentNote: {
    color: "#64748b",
    textAlign: "center",
    fontSize: 11,
    marginTop: 12,
    lineHeight: 17,
  },

  benefit: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 9,
  },

  benefitIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#dcfce7",
    color: "#16a34a",
    textAlign: "center",
    lineHeight: 25,
    fontWeight: "900",
    marginRight: 9,
  },

  benefitText: {
    color: "#334155",
    fontWeight: "700",
  },

  adminLoginCard: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginTop: 20,
  },

  adminLock: {
    fontSize: 48,
    marginBottom: 10,
  },

  adminDashboard: {
    backgroundColor: "#0f172a",
    borderRadius: 22,
    padding: 20,
    marginBottom: 14,
  },

  adminDashboardTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "900",
  },

  adminDashboardSub: {
    color: "#93c5fd",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  statBox: {
    width: "31%",
    backgroundColor: "#1e293b",
    borderRadius: 13,
    padding: 11,
  },

  statValue: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },

  statTitle: {
    color: "#94a3b8",
    fontSize: 10,
    marginTop: 3,
  },

  adminActionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  adminAction: {
    width: "31%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 15,
    padding: 12,
    marginBottom: 9,
  },

  adminActionIcon: {
    fontSize: 22,
  },

  adminActionTitle: {
    color: "#334155",
    fontWeight: "800",
    fontSize: 11,
    marginTop: 7,
  },

  logoutButton: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 15,
  },

  logoutText: {
    color: "#dc2626",
    fontWeight: "900",
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },

  navButton: {
    minWidth: 65,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 12,
  },

  navButtonActive: {
    backgroundColor: "#eff6ff",
  },

  navIcon: {
    fontSize: 20,
  },

  navTitle: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 2,
    fontWeight: "700",
  },

  navTitleActive: {
    color: "#2563eb",
  },
});
