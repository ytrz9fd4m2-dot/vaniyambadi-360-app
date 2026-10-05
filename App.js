import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";

/* =========================================================
   VANIYAMBADI 360
   LOCAL, ALL AROUND
   ========================================================= */

const ADMIN_PIN = "360ADMIN";
const ADMIN_UPI_ID = "9655171389@ybl";
const MEMBERSHIP_AMOUNT = 300;

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

function makeId(prefix = "id") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function categoryInfo(id) {
  return CATEGORIES.find((x) => x.id === id);
}

function callNumber(phone) {
  if (!phone) {
    Alert.alert("Phone", "Number not available.");
    return;
  }

  Linking.openURL(
    `tel:${String(phone).replace(/[^\d+]/g, "")}`
  ).catch(() => Alert.alert("Phone", "Unable to open phone."));
}

function openWhatsApp(phone) {
  if (!phone) {
    Alert.alert("WhatsApp", "WhatsApp number not available.");
    return;
  }

  let n = String(phone).replace(/[^\d]/g, "");

  if (n.length === 10) n = "91" + n;
  if (n.startsWith("0")) n = "91" + n.substring(1);

  Linking.openURL(`https://wa.me/${n}`).catch(() =>
    Alert.alert("WhatsApp", "Unable to open WhatsApp.")
  );
}

function openMap(item) {
  const query = encodeURIComponent(
    `${item.name} ${item.location || ""} Vaniyambadi Tamil Nadu`
  );

  Linking.openURL(
    `https://www.google.com/maps/search/?api=1&query=${query}`
  ).catch(() => Alert.alert("Map", "Unable to open map."));
}

function openWebsite(url) {
  if (!url) return;

  Linking.openURL(url).catch(() =>
    Alert.alert("Website", "Unable to open website.")
  );
}

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
];

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
];

const COLLEGES = [
  ["Islamiah College", "New Town, Vaniyambadi"],
  ["Islamiah Women's College", "Perumalpet, Vaniyambadi"],
  ["Priyadarshini College", "Vaniyambadi"],
  ["Islamiah I.T.I.", "New Town, Vaniyambadi"],
  ["Priyadarshini Engineering College", "Tirupattur Road side"],
  ["Priyadarshini Polytechnic College", "Vaniyambadi area"],
  ["Vaani College of Education", "Vaniyambadi"],
  ["Government ITI", "Vaniyambadi"],
  ["Ar Rahman College of Allied Health", "Pallan Khaleelur Rahman Street"],
  ["Annai Nursing College & Allied Health Science", "CN Annadurai Road"],
];

const HOSPITALS = [
  ["Government Hospital", "Jamath Road, Vaniyambadi", "225700"],
  ["Kafeel Emergency Care Unit (Azeem Hospital)", "PJN Road", "9944238110"],
  ["Ikram Hospital", "147, Mandi Dadamiyan Street, Neelfield", "944338668"],
  ["Fyyaz Kamal Hospital", "24/2/1, PJN Road", "9345970089"],
  ["Dr. Vasantha Hospital", "4/1, PJN Road", "9952778962"],
  ["Riya Maternity Hospital", "265, PJN Road", ""],
  ["AR Rahman Hospital", "Hameenabad, Khaderpet", ""],
  ["Dr. Parvathi Hospital", "Malang Road, Khaderpet", ""],
  ["David Hospital", "Opp. Khaderpet Masjid, Railway Station Road", ""],
  ["Vijaya Ortho Care and Hospital", "283/20, Jamath Road", "9003622638"],
  ["Sadha Hospital", "Bypass Road, New Town", "9994214888"],
  ["Dr. Akbar Kouser", "New Town", ""],
  ["Karunai Illam", "124/K, Alangayam Cross Road, Perumalpet", ""],
  ["Sugam Multi-Speciality Hospital", "CN Annadurai Road, Near Railway Gate", "8111055539"],
  ["Ayesha Hospital", "2/25, Kaniyambadi Street, Neelfield", "9894474730"],
  ["ARSH Maternity & Surgical Care", "Mandi Street, Neelfield", "6383612329"],
  ["A R Speciality Hospital", "CL Road, Neelfield", "8940327070"],
  ["Care & Cure Centre", "Cutchery Road, Neelfield", "4174320206"],
  ["Kaleef Dialysis Hospital", "Shakirabad", ""],
  ["Azeem Multispeciality Dental Care Center", "Shakirabad", ""],
  ["Arivu Dental Care", "Mandi Dhadhemiyan Street, Neelfield", ""],
  ["Best Laser Dental Clinic", "CL Road, Khaderpet", ""],
  ["Al-Ameen Unani Multispeciality Clinic & Hijama", "PJN Road", "8667436515"],
  ["Al Sadiq Multispeciality Clinic & Hijamah Centre", "Salamabad Main Road, Basheerabad", "8610033503"],
  ["Apollo 24|7 Lab Test Vaniyambadi", "CL Road, Khaderpet", "8045572851"],
];

const CLINICS = [
  ["Dr. Siva Subramaniyam M.B.B.S", "Bypass Road, Thendral Nagar, Perumalpet", "8870331718"],
  ["Dr. Tamil Selvi M.B.B.S", "81, New Street, New Town", "9443019307"],
  ["Dr. Moda Amjad Basha M.B.B.S", "1304, Meddaikar Street, Neelfield", "9500912531"],
  ["D. Ejaz Ahmed M.B.B.S", "19, PJN Road", "9791338545"],
  ["Dr. Arivumani M.B.B.S", "Mariyamman Koil Street, Pudur", ""],
  ["Ayesha Hospital Clinic", "2/25, Kaniyambadi Street, Neelfield", "9894474730"],
  ["Dr. Syed Farouk Ahmed M.B.B.S", "1240, PJN Road", "9980511640"],
];

const HOTELS = [
  ["Vasantha Vihar", "15, C.N.A. Road", "Vegetarian Restaurant"],
  ["Saravana Bhavan", "8, C.N.A. Road", "Vegetarian Restaurant"],
  ["Khaja Hotel", "157, C.N.A. Road", "Non-Vegetarian Restaurant"],
  ["Madras Hotel", "23, C.N.A. Road", "Non-Vegetarian Restaurant"],
  ["Rahamathiya Hotel", "C.N.A. Road", "Non-Vegetarian Restaurant"],
  ["Ahamathiya Hotel", "C.N.A. Road", "Non-Vegetarian Restaurant"],
];

const LODGES = [
  ["Municipal Lodge", "C.N.A. Road, Bus Stand"],
  ["Kanna Lodge", "C.N.A. Road"],
  ["Sumangali Lodge", "C.N.A. Road"],
  ["M.R. Manson", "C.N.A. Road"],
  ["Babu Lodge", "C.N.A. Road"],
  ["Vetri Lodge", "C.L. Road"],
  ["Naveen Lodge", "Madurai Street"],
  ["Padmavathi Annamalai", "P.J.N. Road"],
];

const AGENCIES = [
  ["J.K. Agencies", "C.L. Road, Vaniyambadi", ""],
  ["Rainbow", "C.L. Road, Vaniyambadi", ""],
  ["Sathya Agencies", "157/A2, CAN Road, Near Bus Stand", "+917305958985"],
  ["Amul Distributor", "Vaniyambadi", ""],
];

const DELIVERY = [
  ["DHT Global Express International Courier", "CN Annadurai Road", "+919042577651"],
  ["ST Courier - Vaniyambadi", "665, Munisamy Pillai Street, Khaderpet", "+919994859147"],
  ["Blue Dart Express Limited", "Shop No.4 Matha Lodge, CN Annadurai Road", "+912269751234"],
  ["VRL Logistics Ltd - Vaniyambadi", "Bypass Street, Miyan Nagar", "+9118005997800"],
  ["A1 Travels & Speed Parcel Service", "46, Jinnah Road", "+919514604998"],
  ["AKR Express Parcel Service", "1057/D5, Matha Lodge, Trunk Road", "+919443123217"],
  ["Liberty Express", "84 CN Annadurai Road, Khaderpet", "+919944729904"],
  ["Trackon Couriers", "451 Jinnah Road, Khaderpet", "+914162256242"],
];

const PETROL = [
  ["Hindustan Petroleum Corporation Limited", "Islamia College Road Part A", "+919751190190"],
  ["Hindustan Petroleum", "Ground Floor, Bangalore Road", "+917601936945"],
  ["Bharat Petroleum Petrol Pump", "49 Shivan Street, Nadar Colony", "+911800224344"],
  ["Bharat Petroleum - N.S. Rajan", "Adjacent Bus Stand", "+911800224344"],
  ["ADS Fuel Station", "Alangayam to Vaniyambadi Road, Nethaji Nagar", ""],
  ["IndianOil", "Chettiyappanur, NH46, Govindapuram", "+919443161812"],
  ["IndianOil", "Khaderpet, Adhoc 152 Trunk Road", "+918778992329"],
  ["IndianOil", "Satipur NH46, Chettiyappanur", "+919952782133"],
];

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
];

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
];

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
];

const GOVERNMENT = [
  ["Aadhaar / UIDAI", "India", "1947", "https://www.uidai.gov.in/"],
  ["Tamil Nadu e-Sevai", "Tamil Nadu", "18004256000", "https://www.tnesevai.tn.gov.in/"],
  ["Vaniyambadi Municipality", "Islamiah College Road", "04174235317", "https://www.tnurbantree.tn.gov.in/vaniyambadi/"],
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
];

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
];

function buildInitialData() {
  const result = [];

  LOCATIONS.forEach(([name, ta]) =>
    result.push({
      id: makeId("loc"),
      category: "locations",
      name: `${name} / ${ta}`,
      location: name,
    })
  );

  SCHOOLS.forEach(([name, location]) =>
    result.push({
      id: makeId("school"),
      category: "school",
      name,
      location,
    })
  );

  COLLEGES.forEach(([name, location]) =>
    result.push({
      id: makeId("college"),
      category: "college",
      name,
      location,
    })
  );

  HOSPITALS.forEach(([name, location, phone]) =>
    result.push({
      id: makeId("hospital"),
      category: "hospital",
      name,
      location,
      phone,
    })
  );

  CLINICS.forEach(([name, location, phone]) =>
    result.push({
      id: makeId("clinic"),
      category: "clinic",
      name,
      location,
      phone,
    })
  );

  HOTELS.forEach(([name, location, description]) =>
    result.push({
      id: makeId("hotel"),
      category: "hotel",
      name,
      location,
      description,
    })
  );

  LODGES.forEach(([name, location]) =>
    result.push({
      id: makeId("lodge"),
      category: "lodge",
      name,
      location,
    })
  );

  AGENCIES.forEach(([name, location, phone]) =>
    result.push({
      id: makeId("agency"),
      category: "agency",
      name,
      location,
      phone,
    })
  );

  DELIVERY.forEach(([name, location, phone]) =>
    result.push({
      id: makeId("delivery"),
      category: "delivery",
      name,
      location,
      phone,
    })
  );

  PETROL.forEach(([name, location, phone]) =>
    result.push({
      id: makeId("petrol"),
      category: "petrol",
      name,
      location,
      phone,
    })
  );

  SHOPS.forEach(([name, location, phone]) =>
    result.push({
      id: makeId("shop"),
      category: "supermarket",
      name,
      location,
      phone,
    })
  );

  SALONS.forEach(([name, location, phone]) =>
    result.push({
      id: makeId("salon"),
      category: "salon",
      name,
      location,
      phone,
    })
  );

  TEMPLES.forEach(([name, location, phone]) =>
    result.push({
      id: makeId("temple"),
      category: "temple",
      name,
      location,
      phone,
    })
  );

  [
    ["State Bank of India", "Vaniyambadi"],
    ["HDFC Bank", "Vaniyambadi"],
    ["ICICI Bank", "Vaniyambadi"],
    ["Canara Bank", "Vaniyambadi"],
    ["Indian Overseas Bank", "Vaniyambadi"],
    ["Karur Vysya Bank", "Vaniyambadi"],
    ["Axis Bank", "Vaniyambadi"],
  ].forEach(([name, location]) =>
    result.push({
      id: makeId("bank"),
      category: "bank",
      name,
      location,
    })
  );

  [
    "SBI ATM",
    "ICICI Bank ATM",
    "HDFC Bank ATM",
    "Axis Bank ATM",
    "City Union Bank ATM",
  ].forEach((name) =>
    result.push({
      id: makeId("atm"),
      category: "atm",
      name,
      location: "Vaniyambadi",
    })
  );

  result.push(
    {
      id: makeId("railway"),
      category: "railway",
      name: "Vaniyambadi Railway Station",
      location: "Vaniyambadi",
      phone: "232308",
    },
    {
      id: makeId("highway"),
      category: "highway",
      name: "Vaniyambadi - Bengaluru Highway",
      location: "NH48 / Bengaluru Road side",
    },
    {
      id: makeId("highway"),
      category: "highway",
      name: "Vaniyambadi - Chennai Highway",
      location: "NH48 / Chennai direction",
    },
    {
      id: makeId("gold"),
      category: "gold",
      name: "Today's Gold Rate",
      location: "Vaniyambadi",
      description: "LIVE API PENDING",
    },
    {
      id: makeId("offers"),
      category: "offers",
      name: "Vaniyambadi 360 Offers",
      location: "Vaniyambadi",
      description: "Admin can add offers",
    }
  );

  GOVERNMENT.forEach(([name, location, phone, website]) =>
    result.push({
      id: makeId("gov"),
      category: "government",
      name,
      location,
      phone,
      website,
    })
  );

  EMERGENCY.forEach(([name, location, phone]) =>
    result.push({
      id: makeId("emergency"),
      category: "emergency",
      name,
      location,
      phone,
    })
  );

  return result;
}

/* ===================== CARD ===================== */

function Card({ item, onEdit, onDelete }) {
  const cat = categoryInfo(item.category);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.iconCircle}>
          <Text style={styles.cardIcon}>{cat?.icon || "📌"}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{item.name}</Text>

          {!!item.location && (
            <Text style={styles.location}>📍 {item.location}</Text>
          )}

          {!!item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
        </View>
      </View>

      <View style={styles.actionRow}>
        {!!item.phone && (
          <>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => callNumber(item.phone)}
            >
              <Text style={styles.smallButtonText}>📞 Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => openWhatsApp(item.phone)}
            >
              <Text style={styles.smallButtonText}>💬 WhatsApp</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => openMap(item)}
        >
          <Text style={styles.smallButtonText}>🗺️ Map</Text>
        </TouchableOpacity>

        {!!item.website && (
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => openWebsite(item.website)}
          >
            <Text style={styles.smallButtonText}>🌐 Web</Text>
          </TouchableOpacity>
        )}

        {onEdit && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => onEdit(item)}
          >
            <Text style={styles.smallButtonText}>✏️</Text>
          </TouchableOpacity>
        )}

        {onDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.smallButtonText}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* ===================== HOME ===================== */

function Home({
  search,
  setSearch,
  onSearch,
  setScreen,
}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroSmall}>VANIYAMBADI</Text>
        <Text style={styles.heroTitle}>VANIYAMBADI 360</Text>
        <Text style={styles.heroSub}>LOCAL, ALL AROUND</Text>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔎</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="எதை தேடுகிறீர்கள்?"
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
            onSubmitEditing={onSearch}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.emergencyBox}
        onPress={() => setScreen("emergency")}
      >
        <Text style={styles.emergencyIcon}>🚨</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.emergencyTitle}>Emergency Help</Text>
          <Text style={styles.emergencySub}>
            Hospital • Police • Ambulance • Fire
          </Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Quick Access</Text>

      <View style={styles.quickGrid}>
        <Quick
          icon="👤"
          title="Member"
          onPress={() => setScreen("member")}
        />
        <Quick
          icon="🏪"
          title="Shop Owner"
          onPress={() => setScreen("owner")}
        />
        <Quick
          icon="💳"
          title="₹300 Membership"
          onPress={() => setScreen("membership")}
        />
        <Quick
          icon="📸"
          title="Posts & Photos"
          onPress={() => setScreen("posts")}
        />
        <Quick
          icon="🎬"
          title="Reels"
          onPress={() => setScreen("reels")}
        />
        <Quick
          icon="📍"
          title="Locations"
          onPress={() => setScreen("directory")}
        />
      </View>

      <Text style={styles.sectionTitle}>Categories</Text>

      <View style={styles.categoryGrid}>
        {CATEGORIES.filter((x) => x.id !== "all").map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={styles.categoryBox}
            onPress={() => setScreen(cat.id)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function Quick({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.quickBox} onPress={onPress}>
      <Text style={styles.quickIcon}>{icon}</Text>
      <Text style={styles.quickText}>{title}</Text>
    </TouchableOpacity>
  );
}

/* ===================== DIRECTORY ===================== */

function Directory({
  data,
  category,
  search,
  setSearch,
  onEdit,
  onDelete,
  admin,
}) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return data.filter((item) => {
      const categoryMatch =
        category === "all" || item.category === category;

      const text =
        `${item.name} ${item.location || ""} ${
          item.description || ""
        }`.toLowerCase();

      return categoryMatch && (!q || text.includes(q));
    });
  }, [data, category, search]);

  const title =
    categoryInfo(category)?.name || "Directory";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>{title}</Text>

      <View style={styles.directorySearch}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="எதை தேடுகிறீர்கள்?"
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
        />
      </View>

      <Text style={styles.resultCount}>
        {filtered.length} listings
      </Text>

      {filtered.map((item) => (
        <Card
          key={item.id}
          item={item}
          onEdit={admin ? onEdit : null}
          onDelete={admin ? onDelete : null}
        />
      ))}

      {!filtered.length && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No listings found
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

/* ===================== MEMBERSHIP ===================== */

function Membership({
  memberUser,
  ownerUser,
  membership,
  setMembership,
}) {
  const phone =
    memberUser?.phone ||
    ownerUser?.phone ||
    "";

  const current = phone ? membership[phone] : null;

  const pay = () => {
    const url =
      `upi://pay?pa=${encodeURIComponent(
        ADMIN_UPI_ID
      )}&pn=${encodeURIComponent(
        "VANIYAMBADI 360"
      )}&am=${MEMBERSHIP_AMOUNT}&cu=INR`;

    Linking.openURL(url).catch(() => {
      Alert.alert(
        "UPI / GPay",
        `UPI ID: ${ADMIN_UPI_ID}\n\nAmount: ₹${MEMBERSHIP_AMOUNT}`
      );
    });
  };

  const paid = () => {
    if (!phone) {
      Alert.alert(
        "Login required",
        "Member அல்லது Shop Owner login செய்யவும்."
      );
      return;
    }

    setMembership((prev) => ({
      ...prev,
      [phone]: {
        status: "pending",
        amount: MEMBERSHIP_AMOUNT,
        method: "UPI/GPay",
        submittedAt: new Date().toISOString(),
      },
    }));

    Alert.alert(
      "Submitted",
      "Payment submitted. Admin verification pending."
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.membershipHero}>
        <Text style={styles.membershipIcon}>💳</Text>
        <Text style={styles.membershipTitle}>
          VANIYAMBADI 360 Membership
        </Text>
        <Text style={styles.price}>₹300 / Month</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Membership Benefits</Text>
        <Text style={styles.infoLine}>✓ Shop Owner controls</Text>
        <Text style={styles.infoLine}>✓ Products</Text>
        <Text style={styles.infoLine}>✓ Posts & Photos</Text>
        <Text style={styles.infoLine}>✓ Reels</Text>
        <Text style={styles.infoLine}>✓ Shop contact & location</Text>
        <Text style={styles.infoLine}>✓ Download ON/OFF</Text>
        <Text style={styles.infoLine}>✓ WhatsApp ON/OFF</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>UPI / GPay</Text>
        <Text style={styles.upi}>{ADMIN_UPI_ID}</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={pay}
        >
          <Text style={styles.primaryText}>
            💳 Pay ₹300 with UPI
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={paid}
        >
          <Text style={styles.secondaryText}>
            ✅ I Paid
          </Text>
        </TouchableOpacity>

        {current && (
          <Text style={styles.pending}>
            Status: {current.status === "active"
              ? "ACTIVE"
              : "PAYMENT PENDING"}
          </Text>
        )}
      </View>

      <Text style={styles.note}>
        Prototype payment UI only. Automatic payment verification
        requires a secure backend/payment gateway.
      </Text>
    </ScrollView>
  );
}

/* ===================== MEMBER ===================== */

function Member({
  members,
  setMembers,
  memberUser,
  setMemberUser,
}) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  if (memberUser) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>👤 Member Profile</Text>

        <View style={styles.profileCard}>
          <Text style={styles.profileAvatar}>👤</Text>
          <Text style={styles.profileName}>{memberUser.name}</Text>
          <Text style={styles.profilePhone}>
            📱 {memberUser.phone}
          </Text>
          <Text style={styles.activeBadge}>MEMBER ACTIVE</Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setMemberUser(null)}
          >
            <Text style={styles.secondaryText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const submit = () => {
    if (!phone || !password || (mode === "join" && !name)) {
      Alert.alert("Required", "Please fill all fields.");
      return;
    }

    if (mode === "join") {
      const exists = members.find(
        (m) => m.phone === phone
      );

      if (exists) {
        Alert.alert("Member", "Phone already registered.");
        return;
      }

      const user = {
        id: makeId("member"),
        name,
        phone,
        password,
      };

      setMembers((prev) => [...prev, user]);
      setMemberUser(user);
      return;
    }

    const user = members.find(
      (m) =>
        m.phone === phone &&
        m.password === password
    );

    if (!user) {
      Alert.alert(
        "Login failed",
        "Phone or password is incorrect."
      );
      return;
    }

    setMemberUser(user);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>
        👤 Member {mode === "login" ? "Login" : "Join"}
      </Text>

      {mode === "join" && (
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />
      )}

      <Input
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone number"
        keyboardType="phone-pad"
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={submit}
      >
        <Text style={styles.primaryText}>
          {mode === "login" ? "Login" : "Create Member"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() =>
          setMode(mode === "login" ? "join" : "login")
        }
      >
        <Text style={styles.secondaryText}>
          {mode === "login"
            ? "New Member? Join"
            : "Already have account? Login"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Prototype local login. Secure authentication requires backend.
      </Text>
    </ScrollView>
  );
}

/* ===================== OWNER ===================== */

function Owner({
  owners,
  setOwners,
  ownerUser,
  setOwnerUser,
  membership,
  setMembership,
  ownerSettings,
  setOwnerSettings,
  setPosts,
  setReels,
}) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [shopImage, setShopImage] = useState("");

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");

  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");

  const [reelUrl, setReelUrl] = useState("");
  const [reelCaption, setReelCaption] = useState("");

  const [products, setProducts] = useState([]);

  if (!ownerUser) {
    const submit = () => {
      if (
        !phone ||
        !password ||
        (mode === "join" &&
          (!name || !shopName || !address))
      ) {
        Alert.alert("Required", "Please fill all fields.");
        return;
      }

      if (mode === "join") {
        const exists = owners.find(
          (o) => o.phone === phone
        );

        if (exists) {
          Alert.alert("Owner", "Phone already registered.");
          return;
        }

        const user = {
          id: makeId("owner"),
          name,
          phone,
          password,
          shopName,
          address,
          imageUrl: shopImage,
        };

        setOwners((prev) => [...prev, user]);

        setOwnerSettings((prev) => ({
          ...prev,
          [user.id]: {
            download: true,
            whatsapp: true,
          },
        }));

        setOwnerUser(user);
        return;
      }

      const user = owners.find(
        (o) =>
          o.phone === phone &&
          o.password === password
      );

      if (!user) {
        Alert.alert(
          "Login failed",
          "Phone or password is incorrect."
        );
        return;
      }

      setOwnerUser(user);
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>
          🏪 Shop Owner {mode === "login" ? "Login" : "Join"}
        </Text>

        {mode === "join" && (
          <>
            <Input
              label="Owner Name"
              value={name}
              onChangeText={setName}
              placeholder="Owner name"
            />

            <Input
              label="Shop Name"
              value={shopName}
              onChangeText={setShopName}
              placeholder="Shop name"
            />

            <Input
              label="Shop Address"
              value={address}
              onChangeText={setAddress}
              placeholder="Shop address"
            />

            <Input
              label="Shop Image URL"
              value={shopImage}
              onChangeText={setShopImage}
              placeholder="https://..."
            />
          </>
        )}

        <Input
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number"
          keyboardType="phone-pad"
        />

        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={submit}
        >
          <Text style={styles.primaryText}>
            {mode === "login"
              ? "Owner Login"
              : "Create Shop Owner"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() =>
            setMode(mode === "login" ? "join" : "login")
          }
        >
          <Text style={styles.secondaryText}>
            {mode === "login"
              ? "New Shop Owner? Join"
              : "Already registered? Login"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Shop Owner reels can be uploaded directly without Admin approval.
        </Text>
      </ScrollView>
    );
  }

  const settings =
    ownerSettings[ownerUser.id] || {
      download: true,
      whatsapp: true,
    };

  const updateSettings = (key) => {
    setOwnerSettings((prev) => ({
      ...prev,
      [ownerUser.id]: {
        ...settings,
        [key]: !settings[key],
      },
    }));
  };

  const addProduct = () => {
    if (!productName) {
      Alert.alert("Product", "Enter product name.");
      return;
    }

    setProducts((prev) => [
      ...prev,
      {
        id: makeId("product"),
        name: productName,
        price: productPrice,
        imageUrl: productImage,
      },
    ]);

    setProductName("");
    setProductPrice("");
    setProductImage("");
  };

  const addPost = () => {
    if (!postText && !postImage) {
      Alert.alert("Post", "Enter text or image URL.");
      return;
    }

    setPosts((prev) => [
      {
        id: makeId("post"),
        ownerId: ownerUser.id,
        ownerName: ownerUser.name,
        shopName: ownerUser.shopName,
        text: postText,
        imageUrl: postImage,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setPostText("");
    setPostImage("");

    Alert.alert("Post", "Published successfully.");
  };

  const addReel = () => {
    if (!reelUrl) {
      Alert.alert("Reel", "Enter video URL.");
      return;
    }

    setReels((prev) => [
      {
        id: makeId("reel"),
        ownerId: ownerUser.id,
        ownerName: ownerUser.name,
        shopName: ownerUser.shopName,
        videoUrl: reelUrl,
        caption: reelCaption,
        phone: ownerUser.phone,
        address: ownerUser.address,
        download: settings.download,
        whatsapp: settings.whatsapp,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    setReelUrl("");
    setReelCaption("");

    Alert.alert(
      "Reel Published",
      "Reel is live immediately. Admin approval is not required."
    );
  };

  const membershipStatus =
    membership[ownerUser.phone]?.status || "not_submitted";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>
        🏪 Shop Owner Dashboard
      </Text>

      <View style={styles.profileCard}>
        {!!ownerUser.imageUrl && (
          <Image
            source={{ uri: ownerUser.imageUrl }}
            style={styles.shopImage}
          />
        )}

        <Text style={styles.profileName}>
          {ownerUser.shopName}
        </Text>

        <Text style={styles.profilePhone}>
          👤 {ownerUser.name}
        </Text>

        <Text style={styles.profilePhone}>
          📞 {ownerUser.phone}
        </Text>

        <Text style={styles.profilePhone}>
          📍 {ownerUser.address}
        </Text>

        <Text style={styles.activeBadge}>
          MEMBERSHIP: {membershipStatus.toUpperCase()}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Owner Settings
      </Text>

      <Toggle
        title="Download in Reels"
        value={settings.download}
        onPress={() => updateSettings("download")}
      />

      <Toggle
        title="Show WhatsApp in Reels"
        value={settings.whatsapp}
        onPress={() => updateSettings("whatsapp")}
      />

      <Text style={styles.sectionTitle}>
        📦 Products
      </Text>

      <Input
        label="Product Name"
        value={productName}
        onChangeText={setProductName}
        placeholder="Product name"
      />

      <Input
        label="Price"
        value={productPrice}
        onChangeText={setProductPrice}
        placeholder="₹ price"
        keyboardType="numeric"
      />

      <Input
        label="Product Image URL"
        value={productImage}
        onChangeText={setProductImage}
        placeholder="https://..."
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={addProduct}
      >
        <Text style={styles.primaryText}>
          + Add Product
        </Text>
      </TouchableOpacity>

      {products.map((p) => (
        <View key={p.id} style={styles.miniCard}>
          <Text style={styles.cardTitle}>{p.name}</Text>
          {!!p.price && (
            <Text style={styles.priceSmall}>₹{p.price}</Text>
          )}
        </View>
      ))}

      <Text style={styles.sectionTitle}>
        📸 Create Post
      </Text>

      <Input
        label="Post Text"
        value={postText}
        onChangeText={setPostText}
        placeholder="Write your post..."
        multiline
      />

      <Input
        label="Image URL"
        value={postImage}
        onChangeText={setPostImage}
        placeholder="https://..."
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={addPost}
      >
        <Text style={styles.primaryText}>
          📸 Publish Post
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        🎬 Create Reel
      </Text>

      <Input
        label="Video URL"
        value={reelUrl}
        onChangeText={setReelUrl}
        placeholder="https://..."
      />

      <Input
        label="Caption"
        value={reelCaption}
        onChangeText={setReelCaption}
        placeholder="Reel caption"
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={addReel}
      >
        <Text style={styles.primaryText}>
          🎬 Publish Reel
        </Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Reel upload is immediate. Admin approval is not required.
      </Text>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => setOwnerUser(null)}
      >
        <Text style={styles.secondaryText}>
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ===================== POSTS ===================== */

function Posts({ posts, admin, setPosts }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>
        📸 Posts & Photos
      </Text>

      {!posts.length && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No posts yet.
          </Text>
        </View>
      )}

      {posts.map((post) => (
        <View style={styles.postCard} key={post.id}>
          <Text style={styles.postShop}>
            🏪 {post.shopName}
          </Text>

          <Text style={styles.postOwner}>
            👤 {post.ownerName}
          </Text>

          {!!post.text && (
            <Text style={styles.postText}>
              {post.text}
            </Text>
          )}

          {!!post.imageUrl && (
            <Image
              source={{ uri: post.imageUrl }}
              style={styles.postImage}
            />
          )}

          {admin && (
            <TouchableOpacity
              style={styles.deleteButtonFull}
              onPress={() =>
                setPosts((prev) =>
                  prev.filter((x) => x.id !== post.id)
                )
              }
            >
              <Text style={styles.smallButtonText}>
                🗑️ Delete
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

/* ===================== REELS ===================== */

function Reels({ reels, admin, setReels }) {
  const openReel = (url) => {
    if (!url) return;

    Linking.openURL(url).catch(() =>
      Alert.alert("Reel", "Unable to open video.")
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>
        🎬 VANIYAMBADI 360 Reels
      </Text>

      {!reels.length && (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            No reels yet.
          </Text>
        </View>
      )}

      {reels.map((reel) => (
        <View style={styles.reelCard} key={reel.id}>
          <View style={styles.reelTop}>
            <Text style={styles.reelShop}>
              🎬 {reel.shopName}
            </Text>
            <Text style={styles.reelOwner}>
              {reel.ownerName}
            </Text>
          </View>

          {!!reel.caption && (
            <Text style={styles.postText}>
              {reel.caption}
            </Text>
          )}

          <View style={styles.videoPlaceholder}>
            <Text style={styles.videoIcon}>▶️</Text>
            <Text style={styles.videoText}>
              Reel Video
            </Text>
          </View>

          <Text style={styles.reelInfo}>
            📞 {reel.phone}
          </Text>

          <Text style={styles.reelInfo}>
            📍 {reel.address}
          </Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.primarySmall}
              onPress={() => openReel(reel.videoUrl)}
            >
              <Text style={styles.smallButtonText}>
                ▶️ Open Reel
              </Text>
            </TouchableOpacity>

            {reel.whatsapp && (
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => openWhatsApp(reel.phone)}
              >
                <Text style={styles.smallButtonText}>
                  💬 WhatsApp
                </Text>
              </TouchableOpacity>
            )}

            {reel.download && (
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => openReel(reel.videoUrl)}
              >
                <Text style={styles.smallButtonText}>
                  ⬇️ Open Media
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() =>
              openMap({
                name: reel.shopName,
                location: reel.address,
              })
            }
          >
            <Text style={styles.smallButtonText}>
              🗺️ Shop Location
            </Text>
          </TouchableOpacity>

          {admin && (
            <TouchableOpacity
              style={styles.deleteButtonFull}
              onPress={() =>
                setReels((prev) =>
                  prev.filter((x) => x.id !== reel.id)
                )
              }
            >
              <Text style={styles.smallButtonText}>
                🗑️ Admin Delete
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

/* ===================== ADMIN LOGIN ===================== */

function AdminLogin({ onLogin }) {
  const [pin, setPin] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>
        🔐 Admin Login
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
        onPress={() => {
          if (pin === ADMIN_PIN) {
            onLogin();
          } else {
            Alert.alert("Admin", "Wrong PIN.");
          }
        }}
      >
        <Text style={styles.primaryText}>
          Login as Admin
        </Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Prototype Admin PIN: {ADMIN_PIN}
      </Text>
    </ScrollView>
  );
}

/* ===================== ADMIN ===================== */

function Admin({
  data,
  setData,
  members,
  owners,
  membership,
  setMembership,
  posts,
  setPosts,
  reels,
  setReels,
  onEdit,
}) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("shop");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const addListing = () => {
    if (!name) {
      Alert.alert("Admin", "Enter listing name.");
      return;
    }

    const item = {
      id: makeId("admin"),
      category,
      name,
      location,
      phone,
      description,
      imageUrl,
    };

    setData((prev) => [item, ...prev]);

    setName("");
    setLocation("");
    setPhone("");
    setDescription("");
    setImageUrl("");

    Alert.alert("Admin", "Listing added.");
  };

  const approve = (phoneNumber) => {
    setMembership((prev) => ({
      ...prev,
      [phoneNumber]: {
        ...(prev[phoneNumber] || {}),
        status: "active",
        amount: MEMBERSHIP_AMOUNT,
        approvedAt: new Date().toISOString(),
      },
    }));

    Alert.alert("Membership", "Approved.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>
        ⚙️ Admin Control
      </Text>

      <View style={styles.adminBanner}>
        <Text style={styles.adminBannerText}>
          👑 ADMIN — FULL CONTROL
        </Text>
        <Text style={styles.adminBannerSub}>
          Add • Edit • Delete • Members • Owners • Posts • Reels
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        + Add Listing
      </Text>

      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Shop / Hospital / School..."
      />

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
        placeholder="Phone"
        keyboardType="phone-pad"
      />

      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />

      <Input
        label="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="https://..."
      />

      <Text style={styles.label}>Category</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 12 }}
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
            <Text>
              {cat.icon} {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={addListing}
      >
        <Text style={styles.primaryText}>
          + Add Listing
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        👥 Members ({members.length})
      </Text>

      {members.map((member) => (
        <View style={styles.adminRow} key={member.id}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>
              {member.name}
            </Text>
            <Text>{member.phone}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>
        🏪 Shop Owners ({owners.length})
      </Text>

      {owners.map((owner) => (
        <View style={styles.adminRow} key={owner.id}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>
              {owner.shopName}
            </Text>
            <Text>{owner.name}</Text>
            <Text>{owner.phone}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>
        💳 Payment Requests
      </Text>

      {Object.keys(membership).length === 0 && (
        <Text style={styles.note}>
          No payment requests.
        </Text>
      )}

      {Object.entries(membership).map(
        ([phoneNumber, payment]) => (
          <View
            style={styles.adminRow}
            key={phoneNumber}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                {phoneNumber}
              </Text>
              <Text>
                ₹{payment.amount || MEMBERSHIP_AMOUNT}
              </Text>
              <Text>
                Status: {payment.status}
              </Text>
            </View>

            {payment.status !== "active" && (
              <TouchableOpacity
                style={styles.approveButton}
                onPress={() => approve(phoneNumber)}
              >
                <Text style={styles.smallButtonText}>
                  Approve
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )
      )}

      <Text style={styles.sectionTitle}>
        📸 Posts: {posts.length}
      </Text>

      {posts.map((post) => (
        <View style={styles.adminRow} key={post.id}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>
              {post.shopName}
            </Text>
            <Text numberOfLines={2}>
              {post.text}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              setPosts((prev) =>
                prev.filter((x) => x.id !== post.id)
              )
            }
          >
            <Text>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>
        🎬 Reels: {reels.length}
      </Text>

      {reels.map((reel) => (
        <View style={styles.adminRow} key={reel.id}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>
              {reel.shopName}
            </Text>
            <Text>{reel.phone}</Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              setReels((prev) =>
                prev.filter((x) => x.id !== reel.id)
              )
            }
          >
            <Text>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.sectionTitle}>
        📋 Current Listings
      </Text>

      {data.slice(0, 100).map((item) => (
        <Card
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={(id) =>
            setData((prev) =>
              prev.filter((x) => x.id !== id)
            )
          }
        />
      ))}
    </ScrollView>
  );
}

/* ===================== EDIT ===================== */

function Edit({ item, onSave, onCancel }) {
  const [name, setName] = useState(item.name || "");
  const [location, setLocation] = useState(
    item.location || ""
  );
  const [phone, setPhone] = useState(item.phone || "");
  const [description, setDescription] = useState(
    item.description || ""
  );
  const [imageUrl, setImageUrl] = useState(
    item.imageUrl || ""
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>
        ✏️ Edit Listing
      </Text>

      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />

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
        placeholder="Phone"
      />

      <Input
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />

      <Input
        label="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="https://..."
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() =>
          onSave({
            ...item,
            name,
            location,
            phone,
            description,
            imageUrl,
          })
        }
      >
        <Text style={styles.primaryText}>
          💾 Save
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onCancel}
      >
        <Text style={styles.secondaryText}>
          Cancel
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ===================== INPUT ===================== */

function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  multiline,
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[
          styles.input,
          multiline && {
            minHeight: 90,
            textAlignVertical: "top",
          },
        ]}
      />
    </View>
  );
}

/* ===================== TOGGLE ===================== */

function Toggle({ title, value, onPress }) {
  return (
    <TouchableOpacity
      style={styles.toggleRow}
      onPress={onPress}
    >
      <Text style={styles.toggleTitle}>{title}</Text>

      <View
        style={[
          styles.toggle,
          value && styles.toggleOn,
        ]}
      >
        <Text style={styles.toggleText}>
          {value ? "ON" : "OFF"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/* ===================== APP ===================== */

export default function App() {
  const [screen, setScreen] = useState("home");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(() =>
    buildInitialData()
  );

  const [members, setMembers] = useState([]);
  const [owners, setOwners] = useState([]);

  const [memberUser, setMemberUser] = useState(null);
  const [ownerUser, setOwnerUser] = useState(null);

  const [membership, setMembership] = useState({});
  const [ownerSettings, setOwnerSettings] = useState({});

  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);

  const [admin, setAdmin] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const goSearch = () => {
    setScreen("directory");
  };

  const saveEdit = (updated) => {
    setData((prev) =>
      prev.map((x) =>
        x.id === updated.id ? updated : x
      )
    );

    setEditingItem(null);
    setScreen("admin");
  };

  const getDirectoryCategory = () => {
    if (CATEGORIES.some((x) => x.id === screen)) {
      return screen;
    }

    return "all";
  };

  const renderScreen = () => {
    if (editingItem) {
      return (
        <Edit
          item={editingItem}
          onSave={saveEdit}
          onCancel={() => setEditingItem(null)}
        />
      );
    }

    if (screen === "home") {
      return (
        <Home
          search={search}
          setSearch={setSearch}
          onSearch={goSearch}
          setScreen={setScreen}
        />
      );
    }

    if (screen === "member") {
      return (
        <Member
          members={members}
          setMembers={setMembers}
          memberUser={memberUser}
          setMemberUser={setMemberUser}
        />
      );
    }

    if (screen === "owner") {
      return (
        <Owner
          owners={owners}
          setOwners={setOwners}
          ownerUser={ownerUser}
          setOwnerUser={setOwnerUser}
          membership={membership}
          setMembership={setMembership}
          ownerSettings={ownerSettings}
          setOwnerSettings={setOwnerSettings}
          setPosts={setPosts}
          setReels={setReels}
        />
      );
    }

    if (screen === "membership") {
      return (
        <Membership
          memberUser={memberUser}
          ownerUser={ownerUser}
          membership={membership}
          setMembership={setMembership}
        />
      );
    }

    if (screen === "posts") {
      return (
        <Posts
          posts={posts}
          admin={admin}
          setPosts={setPosts}
        />
      );
    }

    if (screen === "reels") {
      return (
        <Reels
          reels={reels}
          admin={admin}
          setReels={setReels}
        />
      );
    }

    if (screen === "admin" && !admin) {
      return (
        <AdminLogin
          onLogin={() => setAdmin(true)}
        />
      );
    }

    if (screen === "admin" && admin) {
      return (
        <Admin
          data={data}
          setData={setData}
          members={members}
          owners={owners}
          membership={membership}
          setMembership={setMembership}
          posts={posts}
          setPosts={setPosts}
          reels={reels}
          setReels={setReels}
          onEdit={(item) => setEditingItem(item)}
        />
      );
    }

    return (
      <Directory
        data={data}
        category={getDirectoryCategory()}
        search={search}
        setSearch={setSearch}
        admin={admin}
        onEdit={(item) => setEditingItem(item)}
        onDelete={(id) =>
          setData((prev) =>
            prev.filter((x) => x.id !== id)
          )
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        {renderScreen()}

        <View style={styles.bottomNav}>
          <NavButton
            icon="🏠"
            title="Home"
            active={screen === "home"}
            onPress={() => {
              setEditingItem(null);
              setScreen("home");
            }}
          />

          <NavButton
            icon="🔎"
            title="Search"
            active={
              screen === "directory" ||
              CATEGORIES.some(
                (x) => x.id === screen
              )
            }
            onPress={() => {
              setEditingItem(null);
              setScreen("directory");
            }}
          />

          <NavButton
            icon="🚨"
            title="Emergency"
            active={screen === "emergency"}
            onPress={() => {
              setEditingItem(null);
              setScreen("emergency");
            }}
          />

          <NavButton
            icon="⚙️"
            title="Admin"
            active={screen === "admin"}
            onPress={() => {
              setEditingItem(null);
              setScreen("admin");
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
        active && styles.navActive,
      ]}
      onPress={onPress}
    >
      <Text style={styles.navIcon}>{icon}</Text>
      <Text
        style={[
          styles.navText,
          active && styles.navTextActive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  container: {
    padding: 16,
    paddingBottom: 110,
  },

  hero: {
    backgroundColor: "#111827",
    borderRadius: 24,
    padding: 22,
    marginBottom: 14,
  },

  heroSmall: {
    color: "#93c5fd",
    fontWeight: "800",
    letterSpacing: 2,
    fontSize: 13,
  },

  heroTitle: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 5,
  },

  heroSub: {
    color: "#fbbf24",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
    marginTop: 4,
  },

  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginTop: 20,
  },

  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },

  emergencyBox: {
    backgroundColor: "#dc2626",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  emergencyIcon: {
    fontSize: 34,
    marginRight: 14,
  },

  emergencyTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },

  emergencySub: {
    color: "#fee2e2",
    marginTop: 3,
  },

  arrow: {
    color: "#fff",
    fontSize: 34,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
    marginTop: 12,
    marginBottom: 12,
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  quickBox: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 17,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  quickIcon: {
    fontSize: 27,
  },

  quickText: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 8,
    color: "#111827",
  },

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  categoryBox: {
    width: "31%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 13,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  categoryIcon: {
    fontSize: 28,
  },

  categoryName: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 6,
    color: "#374151",
  },

  pageTitle: {
    fontSize: 27,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 18,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  cardTop: {
    flexDirection: "row",
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eef2ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  cardIcon: {
    fontSize: 25,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
  },

  location: {
    color: "#4b5563",
    marginTop: 5,
    fontSize: 13,
  },

  description: {
    color: "#6b7280",
    marginTop: 5,
    fontSize: 13,
  },

  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 13,
  },

  smallButton: {
    backgroundColor: "#eef2ff",
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 7,
    marginBottom: 7,
  },

  smallButtonText: {
    fontWeight: "800",
    color: "#1f2937",
    fontSize: 12,
  },

  editButton: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 7,
    marginBottom: 7,
  },

  deleteButton: {
    backgroundColor: "#fee2e2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 7,
    marginBottom: 7,
  },

  primarySmall: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 7,
    marginBottom: 7,
  },

  directorySearch: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 50,
    justifyContent: "center",
    marginBottom: 10,
  },

  resultCount: {
    color: "#6b7280",
    marginBottom: 10,
  },

  empty: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    marginTop: 15,
  },

  emptyText: {
    color: "#6b7280",
    fontWeight: "700",
  },

  inputWrap: {
    marginBottom: 13,
  },

  label: {
    fontWeight: "800",
    color: "#374151",
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 13,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
  },

  primaryButton: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  primaryText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 15,
  },

  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2563eb",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  secondaryText: {
    color: "#2563eb",
    fontWeight: "900",
  },

  note: {
    color: "#6b7280",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
    marginBottom: 12,
  },

  membershipHero: {
    backgroundColor: "#111827",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    marginBottom: 15,
  },

  membershipIcon: {
    fontSize: 48,
  },

  membershipTitle: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 8,
  },

  price: {
    color: "#fbbf24",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 10,
  },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 10,
  },

  infoLine: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 7,
  },

  upi: {
    backgroundColor: "#f3f4f6",
    padding: 14,
    borderRadius: 12,
    fontWeight: "900",
    marginBottom: 12,
    color: "#111827",
  },

  pending: {
    color: "#d97706",
    fontWeight: "900",
    marginTop: 8,
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },

  profileAvatar: {
    fontSize: 50,
    marginBottom: 8,
  },

  profileName: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111827",
  },

  profilePhone: {
    color: "#4b5563",
    marginTop: 5,
    textAlign: "center",
  },

  activeBadge: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    fontWeight: "900",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 14,
  },

  shopImage: {
    width: 110,
    height: 110,
    borderRadius: 18,
    marginBottom: 12,
  },

  toggleRow: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toggleTitle: {
    fontWeight: "800",
    color: "#111827",
  },

  toggle: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
  },

  toggleOn: {
    backgroundColor: "#22c55e",
  },

  toggleText: {
    color: "#fff",
    fontWeight: "900",
  },

  miniCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },

  priceSmall: {
    fontWeight: "900",
    color: "#2563eb",
    marginTop: 4,
  },

  postCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },

  postShop: {
    fontSize: 18,
    fontWeight: "900",
  },

  postOwner: {
    color: "#6b7280",
    marginTop: 3,
  },

  postText: {
    color: "#374151",
    fontSize: 15,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 10,
  },

  postImage: {
    width: "100%",
    height: 240,
    borderRadius: 15,
    backgroundColor: "#e5e7eb",
  },

  deleteButtonFull: {
    backgroundColor: "#fee2e2",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },

  reelCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
  },

  reelTop: {
    marginBottom: 7,
  },

  reelShop: {
    fontSize: 18,
    fontWeight: "900",
  },

  reelOwner: {
    color: "#6b7280",
    marginTop: 3,
  },

  videoPlaceholder: {
    height: 270,
    borderRadius: 17,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  videoIcon: {
    fontSize: 50,
  },

  videoText: {
    color: "#fff",
    fontWeight: "800",
    marginTop: 8,
  },

  reelInfo: {
    color: "#374151",
    marginTop: 8,
    fontSize: 13,
  },

  adminBanner: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
  },

  adminBannerText: {
    color: "#fbbf24",
    fontSize: 19,
    fontWeight: "900",
  },

  adminBannerSub: {
    color: "#d1d5db",
    marginTop: 5,
  },

  categoryChip: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    marginRight: 8,
  },

  categoryChipActive: {
    backgroundColor: "#dbeafe",
    borderColor: "#2563eb",
  },

  adminRow: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 14,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  approveButton: {
    backgroundColor: "#22c55e",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 72,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 12,
  },

  navActive: {
    backgroundColor: "#eff6ff",
  },

  navIcon: {
    fontSize: 22,
  },

  navText: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "700",
    marginTop: 2,
  },

  navTextActive: {
    color: "#2563eb",
  },
});
