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
} from "react-native";

const ADMIN_PIN = "360ADMIN";

const CATEGORIES = [
  ["all","⌕","All"],
  ["locations","⌖","Locations / ஊர்கள்"],
  ["hospital","✚","Hospitals"],
  ["clinic","⚕","Clinics"],
  ["school","▣","Schools"],
  ["college","🎓","Colleges"],
  ["hotel","🍴","Hotels"],
  ["lodge","⌂","Lodges"],
  ["agency","▤","Agencies"],
  ["delivery","⌁","Delivery"],
  ["supermarket","🛒","Super Markets"],
  ["shop","▦","Shops"],
  ["petrol","⛽","Petrol Bunks"],
  ["bank","▰","Banks"],
  ["atm","▣","ATMs"],
  ["salon","✂","Salon"],
  ["temple","♜","Temples"],
  ["railway","🚉","Railway"],
  ["highway","🛣","Highway"],
  ["gold","◆","Gold Rate"],
  ["reels","▶","Reels"],
  ["offers","★","Offers"],
  ["government","⌘","Government"],
  ["emergency","!","Emergency"],
];

const LOCATIONS = [
  ["Vaniyambadi","வாணியம்பாடி"],
  ["Mettupalayam","மேட்டுப்பாளையம்"],
  ["Pallipattu","பள்ளிப்பட்டு"],
  ["Udayendiram","உதயந்திரம்"],
  ["Jabrapath","ஜாப்ராபாத்"],
  ["Madanancheri","மதனாஞ்சேரி"],
  ["Thumberi","தும்பேரி"],
  ["Thimmampettai","திம்மாம்பேட்டை"],
  ["Khaderpet","காதர்பேட்டை"],
  ["Neelfield","நீல்ஃபீல்டு"],
  ["Muslimpur","முஸ்லிம்பூர்"],
  ["Basheerabad","பஷீராபாத்"],
  ["Shakirabad","ஷாகிராபாத்"],
  ["New Town","நியூ டவுன்"],
  ["Perumalpet","பெருமாள்பேட்டை"],
  ["Pudur","புதூர்"],
  ["Konamedu","கோணமேடு"],
  ["Periyapet","பெரியபேட்டை"],
  ["Jandamedu","ஜண்டாமேடு"],
  ["Valayambattu","வளையாம்பட்டு"],
  ["Chennampet","சென்னாம்பேட்டை"],
].map(([name,tamil]) => ({
  name,
  category:"locations",
  location:`${tamil}, Vaniyambadi`,
  description:`${name} — ${tamil}`,
}));

const SCHOOLS = [
  ["T.V.K.V. School","Nethaji Nagar"],
  ["Municipal Muslim Girls Middle School","Fort"],
  ["Municipal Higher Secondary School","Gandhi Nagar"],
  ["Madhara-Se-Ajam","Fort"],
  ["Municipal Hindu Primary School","Pudur"],
  ["T.V.K.V. Elementary School","Fort"],
  ["Madhare-Se-Mubithe-Am","Neelifield"],
  ["Madhare-Se-Mubithe-Niswan","Neelifield"],
  ["Hindu Aided School","Amburpet"],
  ["Nasirel Islam School","Muslimpur"],
  ["Municipal Muslim Boys School","Gandhi Nagar"],
  ["Municipal Hindu Primary School","Perumalpet"],
  ["Khaderia High School","Khaderpet"],
  ["Municipal Hindu Primary School","Gandhi Nagar"],
  ["Municipal Muslim Girls Primary School","Khaderpet"],
  ["Municipal Hindu Primary School","Periyapet"],
  ["Municipal Muslim Girls Primary School","Muslimpur"],
  ["Municipal Muslim Girls School","Periyapet"],
  ["T.V.K.V. High School","Fort"],
  ["I.E.L.C. Aided Primary School","Pudur"],
  ["Khaderia Aided Primary School","Khaderpet"],
  ["Hindu Middle School","Konamedu"],
  ["Concordia Higher Secondary School","Pudur"],
  ["Islamiah Higher Secondary School","Fort"],
  ["Islamiah Girls Higher Secondary School","Noorullahpet"],
  ["Madhare-Se Niswan","Muslimpur"],
].map(([name,location]) => ({
  name, category:"school",
  location:`${location}, Vaniyambadi`,
  verified:true,
}));

const COLLEGES = [
  ["Islamiah College","New Town, Vaniyambadi"],
  ["Islamiah Women's College","Perumalpet, Vaniyambadi"],
  ["Priyadarshini College","Vaniyambadi"],
  ["Islamiah I.T.I.","New Town, Vaniyambadi"],
  ["Priyadarshini Engineering College","Tirupattur Road side"],
  ["Priyadarshini Polytechnic College","Vaniyambadi area"],
  ["Vaani College of Education","Vaniyambadi"],
  ["Government ITI","Vaniyambadi"],
  ["Ar Rahman College of Allied Health","Pallan Khaleelur Rahman Street"],
  ["Annai Nursing College & Allied Health Science","CN Annadurai Road"],
].map(([name,location]) => ({
  name,category:"college",location,verified:true
}));

const HOSPITALS = [
  ["Government Hospital","Jamath Road, Vaniyambadi","225700"],
  ["Kafeel Emergency Care Unit (Azeem Hospital)","PJN Road, Vaniyambadi","9944238110"],
  ["Ikram Hospital","147, Mandi Dadamiyan Street, Neelfield","944338668"],
  ["Fyyaz Kamal Hospital","24/2/1, PJN Road","9345970089"],
  ["Dr. Vasantha Hospital","4/1, PJN Road","9952778962"],
  ["Riya Maternity Hospital","265, PJN Road",""],
  ["AR Rahman Hospital","Hameenabad, Khaderpet",""],
  ["Dr. Parvathi Hospital","Malang Road, Khaderpet",""],
  ["David Hospital","Opp. Khaderpet Masjid, Railway Station Road",""],
  ["Vijaya Ortho Care and Hospital","283/20, Jamath Road","9003622638"],
  ["Sadha Hospital","Bypass Road, New Town","9994214888"],
  ["Sugam Multi-Speciality Hospital","CN Annadurai Road, Near Railway Gate","8111055539"],
  ["Ayesha Hospital","Kaniyambadi Street, Neelfield","9894474730"],
  ["ARSH Maternity & Surgical Care","Mandi Street, Neelfield","6383612329"],
  ["A R Speciality Hospital","CL Road, Neelfield","8940327070"],
  ["Care & Cure Centre","Cutchery Road, Neelfield","4174320206"],
  ["Kaleef Dialysis Hospital","Shakirabad",""],
  ["Azeem Multispeciality Dental Care Center","Shakirabad",""],
  ["Arivu Dental Care","Mandi Dhadhemiyan Street",""],
  ["Best Laser Dental Clinic","CL Road, Khaderpet",""],
  ["Al-Ameen Unani Multispeciality Clinic & Hijama","PJN Road","8667436515"],
  ["Al Sadiq Multispeciality Clinic & Hijamah Centre","Basheerabad","8610033503"],
  ["Apollo 24|7 Lab Test Vaniyambadi","CL Road, Khaderpet","8045572851"],
].map(([name,location,phone]) => ({
  name,category:"hospital",location,phone,verified:true
}));

const CLINICS = [
  ["Dr. Siva Subramaniyam M.B.B.S","Perumalpet","8870331718"],
  ["Dr. Tamil Selvi M.B.B.S","New Town","9443019307"],
  ["Dr. Moda Amjad Basha M.B.B.S","Neelfield","9500912531"],
  ["D. Ejaz Ahmed M.B.B.S","PJN Road","9791338545"],
  ["Dr. Arivumani M.B.B.S","Pudur",""],
  ["Ayesha Hospital Clinic","Neelfield","9894474730"],
  ["Dr. Syed Farouk Ahmed M.B.B.S","PJN Road","9980511640"],
].map(([name,location,phone]) => ({
  name,category:"clinic",location:`${location}, Vaniyambadi`,phone
}));

const HOTELS = [
  ["Vasantha Vihar","C.N.A. Road","Vegetarian Restaurant"],
  ["Saravana Bhavan","C.N.A. Road","Vegetarian Restaurant"],
  ["Khaja Hotel","C.N.A. Road","Non-Vegetarian Restaurant"],
  ["Madras Hotel","C.N.A. Road","Non-Vegetarian Restaurant"],
  ["Rahamathiya Hotel","C.N.A. Road","Non-Vegetarian Restaurant"],
  ["Ahamathiya Hotel","C.N.A. Road","Non-Vegetarian Restaurant"],
].map(([name,location,description]) => ({
  name,category:"hotel",location:`${location}, Vaniyambadi`,description
}));

const SHOPS = [
  ["City Supermarket","319 Malang Road, Muslimpur","9360716622"],
  ["OAS Supermart","475 Jinnah Road, Khaderpet","7200455455"],
  ["Seema Super Market","61 Iqbal Road, Basheerabad","9994489658"],
  ["Sri Saravana Super Market","Chettiyappanur / Kalendira","9443686003"],
  ["A2Z Mart Super Market","Kaki Street / CL Road","7010016386"],
  ["G M C Stores","Mandi Street, Neelfield","9994267502"],
  ["Sanjay Stores","CN Annadurai Road","9787460896"],
  ["M G General Store","Cutchery Main Road","7010807095"],
  ["Al Madina General Store","Vaniyambadi","9994033982"],
  ["S M Salahuddin Store","Shakirabad","9042241977"],
  ["Sama Store","Muslimpur","9366111536"],
  ["Makka Store","High Road, Jabrapath",""],
  ["Mani Departments","Bus Stand",""],
  ["Tindivanam Silks","C.L. Road",""],
  ["Seematti Silks","C.L. Road",""],
].map(([name,location,phone]) => ({
  name,
  category:name.toLowerCase().includes("market") ? "supermarket":"shop",
  location,phone
}));

const PETROL = [
  ["Hindustan Petroleum Corporation Limited","Islamia College Road","9751190190"],
  ["Hindustan Petroleum","Bangalore Road","7601936945"],
  ["Bharat Petroleum Petrol Pump","Shivan Street, Muslimpur","1800224344"],
  ["Bharat Petroleum - N.S. Rajan","Adjacent Bus Stand","1800224344"],
  ["ADS Fuel Station","Alangayam to Vaniyambadi Road",""],
  ["IndianOil","Chettiyappanur, NH46","9443161812"],
  ["IndianOil","Khaderpet, Trunk Road","8778992329"],
  ["IndianOil","Satipur NH46","9952782133"],
].map(([name,location,phone]) => ({
  name,category:"petrol",location:`${location}, Vaniyambadi`,phone
}));

const AGENCIES = [
  ["J.K. Agencies","C.L. Road",""],
  ["Rainbow","C.L. Road",""],
  ["Sathya Agencies","CAN Road, Near Bus Stand","7305958985"],
  ["Amul Distributor","Vaniyambadi",""],
].map(([name,location,phone]) => ({
  name,category:"agency",location,phone
}));

const DELIVERY = [
  ["DHT Global Express International Courier","Nadar Colony","9042577651"],
  ["ST Courier - Vaniyambadi","Khaderpet","9994859147"],
  ["Blue Dart Express Limited","Near Fire Station",""],
  ["VRL Logistics Ltd","Miyan Nagar",""],
  ["A1 Travels & Speed Parcel Service","Jinnah Road","9514604998"],
  ["AKR Express Parcel Service","Konamedu","9443123217"],
  ["Liberty Express","Khaderpet","9944729904"],
  ["Trackon Couriers","Khaderpet",""],
].map(([name,location,phone]) => ({
  name,category:"delivery",location:`${location}, Vaniyambadi`,phone
}));

const GOVERNMENT = [
  ["Aadhaar / UIDAI","India","1947","https://www.uidai.gov.in/"],
  ["Tamil Nadu e-Sevai","Tamil Nadu","18004256000","https://www.tnesevai.tn.gov.in/"],
  ["Vaniyambadi Municipality","Vaniyambadi","04174235317","https://www.tnurbantree.tn.gov.in/vaniyambadi/"],
  ["Vaniyambadi Taluk Office","Vaniyambadi","232184","https://tirupathur.nic.in/"],
  ["Police Station","Vaniyambadi","232110",""],
  ["Fire Station","Vaniyambadi","224101",""],
  ["Railway Station","Vaniyambadi","232308",""],
  ["Government Hospital","Vaniyambadi","225700",""],
  ["Electricity Board","Vaniyambadi","224339",""],
  ["Municipal Office","Vaniyambadi","235317",""],
  ["Passport Seva","India","18002581800","https://www.passportindia.gov.in/"],
  ["Voter / Election Commission","India","1950","https://voters.eci.gov.in/"],
  ["Tamil Nadu Ration / TNPDS","Tamil Nadu","1967","https://www.tnpds.gov.in/"],
  ["Patta / Land e-Services","Tamil Nadu","","https://eservices.tn.gov.in/"],
  ["Registration Department","Tamil Nadu","04174227222","https://tnreginet.gov.in/"],
].map(([name,location,phone,website]) => ({
  name,category:"government",location,phone,website
}));

const EMERGENCY = [
  ["Emergency / Unified","India","112"],
  ["Police","India","100"],
  ["Fire & Rescue","India","101"],
  ["Ambulance","India","108"],
  ["Ambulance","India","102"],
  ["Child Helpline","India","1098"],
  ["Women Helpline","India","1091"],
  ["Disaster Control Room","Tamil Nadu","1077"],
  ["State Control Room","Tamil Nadu","1070"],
  ["Police WhatsApp","Tirupattur District","9092700100"],
].map(([name,location,phone]) => ({
  name,category:"emergency",location,phone
}));

const EXTRA = [
  {name:"Vaniyambadi Railway Station",category:"railway",location:"Vaniyambadi",phone:"232308"},
  {name:"Vaniyambadi - Bengaluru Highway",category:"highway",location:"NH48 / Bengaluru Road"},
  {name:"Vaniyambadi - Chennai Highway",category:"highway",location:"NH48 / Chennai direction"},
  {name:"Today's Gold Rate",category:"gold",location:"Vaniyambadi",description:"Live API connection pending"},
  {name:"Vaniyambadi 360 Offers",category:"offers",location:"Vaniyambadi"},
  {name:"Vaniyambadi 360 Reels",category:"reels",location:"Vaniyambadi"},
];

const INITIAL_DATA = [
  ...LOCATIONS,...SCHOOLS,...COLLEGES,...HOSPITALS,...CLINICS,
  ...HOTELS,...AGENCIES,...DELIVERY,...PETROL,...SHOPS,
  ...EXTRA,...GOVERNMENT,...EMERGENCY
];

function cat(id){
  return CATEGORIES.find(x=>x[0]===id) || CATEGORIES[0];
}

function callNumber(phone){
  if(!phone) return Alert.alert("Phone","Number not available.");
  Linking.openURL(`tel:${String(phone).replace(/[^\d+]/g,"")}`);
}

function whatsapp(phone){
  if(!phone) return Alert.alert("WhatsApp","Number not available.");
  let n=String(phone).replace(/[^\d]/g,"");
  if(n.length===10)n="91"+n;
  Linking.openURL(`https://wa.me/${n}`);
}

function mapOpen(item){
  const q=encodeURIComponent(`${item.name} ${item.location} Vaniyambadi Tamil Nadu`);
  Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${q}`);
}

function Icon({symbol}) {
  return <View style={styles.icon}><Text style={styles.iconText}>{symbol}</Text></View>;
}

function Header({title,onBack}) {
  return (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
      )}
      <View style={{flex:1}}>
        <Text style={styles.logo}>VANIYAMBADI 360</Text>
        <Text style={styles.tag}>LOCAL, ALL AROUND</Text>
      </View>
    </View>
  );
}

function Card({item,fav,setFav}) {
  const info=cat(item.category);
  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Icon symbol={info[1]}/>
        <View style={{flex:1}}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          {item.verified && <Text style={styles.verified}>✓ VERIFIED</Text>}
        </View>
        {setFav && (
          <TouchableOpacity onPress={()=>setFav(!fav)}>
            <Text style={styles.heart}>{fav?"♥":"♡"}</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.location}>⌖ {item.location}</Text>

      {item.description && <Text style={styles.desc}>{item.description}</Text>}
      {item.hours && <Text style={styles.small}>Open: {item.hours}</Text>}

      <View style={styles.actionRow}>
        {item.phone && (
          <>
            <TouchableOpacity style={styles.action} onPress={()=>callNumber(item.phone)}>
              <Text>☎ Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={()=>whatsapp(item.phone)}>
              <Text>◉ WhatsApp</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.action} onPress={()=>mapOpen(item)}>
          <Text>⌖ Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Auth({type,onSuccess,onBack}) {
  const [login,setLogin]=useState(false);
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [password,setPassword]=useState("");
  const [area,setArea]=useState("");

  function submit(){
    if(!phone || !password || (!login && !name)){
      return Alert.alert("Required","Details அனைத்தும் உள்ளிடவும்.");
    }
    onSuccess({
      name:name||"Member",
      phone,
      area:area||"Vaniyambadi",
      type
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <Header onBack={onBack}/>
        <View style={styles.authBox}>
          <Icon symbol={type==="owner"?"▦":"●"}/>
          <Text style={styles.bigTitle}>
            {type==="owner"?"SHOP OWNER":"MEMBER"}
          </Text>
          <Text style={styles.sub}>
            {login?"Login":"Join Vaniyambadi 360"}
          </Text>

          {!login && (
            <Input label="Full Name" value={name} set={setName}/>
          )}
          <Input label="Mobile Number" value={phone} set={setPhone}/>
          {!login && (
            <Input label="Area / ஊர்" value={area} set={setArea}/>
          )}
          <Input label="Password" value={password} set={setPassword}/>

          <TouchableOpacity style={styles.primary} onPress={submit}>
            <Text style={styles.primaryText}>
              {login?"🔐 Login":"✓ Create Account"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setLogin(!login)}>
            <Text style={styles.link}>
              {login?"New user? Join Now":"Already have account? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Input({label,value,set,placeholder}) {
  return (
    <View style={{marginBottom:14}}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={set}
        placeholder={placeholder||label}
        placeholderTextColor="#94a3b8"
        style={styles.input}
      />
    </View>
  );
}

function Membership({onBack}) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <Header onBack={onBack}/>
        <View style={styles.membership}>
          <Text style={styles.price}>₹300</Text>
          <Text style={styles.month}>PER MONTH</Text>
          <Text style={styles.bigTitle}>SHOP OWNER MEMBERSHIP</Text>

          {[
            "✓ Own Shop Profile",
            "✓ Edit Shop Name & Photos",
            "✓ Create Posts",
            "✓ Upload Reels",
            "✓ Add Products",
            "✓ WhatsApp & Contact",
            "✓ Location & Map",
            "✓ Download ON / OFF",
          ].map(x=><Text key={x} style={styles.feature}>{x}</Text>)}

          <TouchableOpacity
            style={styles.primary}
            onPress={()=>Alert.alert(
              "Membership",
              "₹300/month payment integration pending. UPI / GPay can be connected in production."
            )}
          >
            <Text style={styles.primaryText}>₹300 Pay / Activate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ContentScreen({title,type,onBack,user}) {
  const [posts,setPosts]=useState([]);
  const [text,setText]=useState("");
  const [photo,setPhoto]=useState("");

  function publish(){
    if(!text.trim()) return Alert.alert("Post","Content enter செய்யவும்.");
    setPosts([
      {
        id:Date.now(),
        text:text.trim(),
        photo:photo.trim(),
        owner:user?.name||"Vaniyambadi 360",
        type
      },
      ...posts
    ]);
    setText("");
    setPhoto("");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <Header onBack={onBack}/>
        <Text style={styles.screenTitle}>{title}</Text>

        <View style={styles.createBox}>
          <Text style={styles.sectionTitle}>＋ Create {type}</Text>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={type==="Post"?"What's happening?":"Photo description"}
            multiline
            placeholderTextColor="#94a3b8"
            style={[styles.input,{height:90}]}
          />
          <TextInput
            value={photo}
            onChangeText={setPhoto}
            placeholder="Photo URL (optional)"
            placeholderTextColor="#94a3b8"
            style={styles.input}
          />
          <TouchableOpacity style={styles.primary} onPress={publish}>
            <Text style={styles.primaryText}>Publish</Text>
          </TouchableOpacity>
        </View>

        {posts.map(p=>(
          <View key={p.id} style={styles.post}>
            <Text style={styles.postOwner}>● {p.owner}</Text>
            <Text style={styles.postText}>{p.text}</Text>
            {p.photo ? <Text style={styles.photoPlaceholder}>▧ PHOTO</Text>:null}
          </View>
        ))}

        {!posts.length &&
          <Text style={styles.empty}>இன்னும் {type.toLowerCase()} எதுவும் இல்லை.</Text>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

function Home({go,setCategory,user}) {
  const quick=[
    ["posts","✚","Posts"],
    ["photos","▧","Photos"],
    ["reels","▶","Reels"],
    ["shop","▦","Shopping"],
    ["hospital","✚","Hospitals"],
    ["school","▣","Schools"],
    ["petrol","⛽","Petrol"],
    ["hotel","🍴","Hotels"],
    ["locations","⌖","Location"],
    ["government","⌘","Government"],
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.home}>
        <View style={styles.hero}>
          <Text style={styles.logo}>VANIYAMBADI 360</Text>
          <Text style={styles.tag}>LOCAL, ALL AROUND</Text>
          <Text style={styles.heroTitle}>வாணியம்பாடி சுற்றி உள்ள அனைத்தும் ஒரே இடத்தில்.</Text>
          <Text style={styles.free}>✓ PUBLIC ACCESS — FREE</Text>
        </View>

        <View style={styles.memberBanner}>
          <View style={{flex:1}}>
            <Text style={styles.bannerTitle}>
              {user?`Welcome ${user.name}`:"Join Vaniyambadi 360"}
            </Text>
            <Text style={styles.bannerText}>
              Member & Shop Owner access
            </Text>
          </View>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={()=>go(user?"owner":"member")}
          >
            <Text>{user?"MY ACCOUNT":"JOIN"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Explore Vaniyambadi</Text>

        <View style={styles.grid}>
          {quick.map(([id,icon,name])=>(
            <TouchableOpacity
              key={id}
              style={styles.tile}
              onPress={()=>{
                if(id==="posts")go("posts");
                else if(id==="photos")go("photos");
                else if(id==="reels")go("reels");
                else if(id==="locations")setCategory("locations");
                else setCategory(id);
              }}
            >
              <Icon symbol={icon}/>
              <Text style={styles.tileText}>{name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.emergency}
          onPress={()=>go("emergency")}
        >
          <Text style={styles.emergencyIcon}>!</Text>
          <View style={{flex:1}}>
            <Text style={styles.emergencyTitle}>EMERGENCY HELP</Text>
            <Text style={styles.emergencyText}>
              Police • Ambulance • Fire • 112
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ownerBanner}
          onPress={()=>go("membership")}
        >
          <Text style={styles.ownerTitle}>SHOP OWNER</Text>
          <Text style={styles.ownerText}>
            உங்கள் shop-ஐ Vaniyambadi 360-ல் வளர்க்கலாம்
          </Text>
          <Text style={styles.ownerPrice}>₹300 / MONTH → JOIN</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>All Categories</Text>

        <View style={styles.categoryList}>
          {CATEGORIES.slice(1).map(c=>(
            <TouchableOpacity
              key={c[0]}
              style={styles.categoryRow}
              onPress={()=>setCategory(c[0])}
            >
              <Icon symbol={c[1]}/>
              <Text style={styles.categoryName}>{c[2]}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Directory({data,category,setCategory,search,setSearch,favs,setFavs}) {
  const filtered=useMemo(()=>{
    const q=search.toLowerCase();
    return data.filter(x=>{
      const matchCat=category==="all" || x.category===category;
      const matchText=!q ||
        `${x.name} ${x.location} ${x.description||""}`
        .toLowerCase().includes(q);
      return matchCat && matchText;
    });
  },[data,category,search]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <Header/>
        <Text style={styles.screenTitle}>Search Directory</Text>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="எதை தேடுகிறீர்கள்?"
          placeholderTextColor="#94a3b8"
          style={styles.search}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map(c=>(
            <TouchableOpacity
              key={c[0]}
              onPress={()=>setCategory(c[0])}
              style={[styles.chip,category===c[0]&&styles.chipActive]}
            >
              <Text style={category===c[0]?styles.chipTextActive:styles.chipText}>
                {c[1]} {c[2]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.count}>{filtered.length} results</Text>

        {filtered.map((item,i)=>(
          <Card
            key={`${item.name}-${i}`}
            item={item}
            fav={!!favs[item.name]}
            setFav={(v)=>setFavs({...favs,[item.name]:v})}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function Emergency({onBack}) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <Header onBack={onBack}/>
        <Text style={styles.screenTitle}>Emergency Help</Text>
        {EMERGENCY.map((x,i)=>(
          <Card key={i} item={x}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function Government({onBack}) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <Header onBack={onBack}/>
        <Text style={styles.screenTitle}>Government Help</Text>
        {GOVERNMENT.map((x,i)=>(
          <Card key={i} item={x}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function Admin({data,setData,onBack}) {
  const [pin,setPin]=useState("");
  const [logged,setLogged]=useState(false);
  const [name,setName]=useState("");
  const [location,setLocation]=useState("");
  const [phone,setPhone]=useState("");

  if(!logged){
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.page}>
          <Header onBack={onBack}/>
          <View style={styles.authBox}>
            <Icon symbol="⌘"/>
            <Text style={styles.bigTitle}>ADMIN CONTROL</Text>
            <Text style={styles.sub}>Full Directory Management</Text>
            <Input label="Admin PIN" value={pin} set={setPin}/>
            <TouchableOpacity
              style={styles.primary}
              onPress={()=>{
                if(pin===ADMIN_PIN)setLogged(true);
                else Alert.alert("Admin","Wrong PIN");
              }}
            >
              <Text style={styles.primaryText}>🔐 Login Admin</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  function add(){
    if(!name.trim())return Alert.alert("Admin","Shop / listing name தேவை.");
    setData([
      ...data,
      {
        id:Date.now(),
        name:name.trim(),
        category:"shop",
        location:location||"Vaniyambadi",
        phone
      }
    ]);
    setName("");
    setLocation("");
    setPhone("");
    Alert.alert("Admin","Listing added.");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.page}>
        <Header onBack={onBack}/>
        <Text style={styles.screenTitle}>Admin Panel</Text>

        <View style={styles.createBox}>
          <Text style={styles.sectionTitle}>＋ Add Listing</Text>
          <Input label="Name" value={name} set={setName}/>
          <Input label="Location" value={location} set={setLocation}/>
          <Input label="Phone" value={phone} set={setPhone}/>
          <TouchableOpacity style={styles.primary} onPress={add}>
            <Text style={styles.primaryText}>＋ Add</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Full Control</Text>
        <Text style={styles.adminNote}>
          Public users cannot edit listings. Admin மட்டும் add/manage செய்யலாம்.
        </Text>

        {data.slice(-20).reverse().map((x,i)=>(
          <View style={styles.adminRow} key={i}>
            <View style={{flex:1}}>
              <Text style={styles.cardTitle}>{x.name}</Text>
              <Text style={styles.small}>{x.location}</Text>
            </View>
            <TouchableOpacity
              onPress={()=>setData(data.filter((_,idx)=>idx!==data.length-1-i))}
            >
              <Text style={styles.delete}>DELETE</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App(){
  const [data,setData]=useState(INITIAL_DATA);
  const [screen,setScreen]=useState("home");
  const [category,setCategory]=useState("all");
  const [search,setSearch]=useState("");
  const [user,setUser]=useState(null);
  const [favs,setFavs]=useState({});

  function go(s){
    setScreen(s);
  }

  function chooseCategory(c){
    setCategory(c);
    setScreen("search");
  }

  if(screen==="member")
    return <Auth type="member" onBack={()=>go("home")} onSuccess={u=>{setUser(u);go("home")}}/>;

  if(screen==="owner")
    return <Auth type="owner" onBack={()=>go("home")} onSuccess={u=>{setUser(u);go("home")}}/>;

  if(screen==="membership")
    return <Membership onBack={()=>go("home")}/>;

  if(screen==="posts")
    return <ContentScreen title="Posts" type="Post" user={user} onBack={()=>go("home")}/>;

  if(screen==="photos")
    return <ContentScreen title="Photos" type="Photo" user={user} onBack={()=>go("home")}/>;

  if(screen==="reels")
    return <ContentScreen title="Reels" type="Reel" user={user} onBack={()=>go("home")}/>;

  if(screen==="emergency")
    return <Emergency onBack={()=>go("home")}/>;

  if(screen==="government")
    return <Government onBack={()=>go("home")}/>;

  if(screen==="admin")
    return <Admin data={data} setData={setData} onBack={()=>go("home")}/>;

  if(screen==="search")
    return (
      <Directory
        data={data}
        category={category}
        setCategory={chooseCategory}
        search={search}
        setSearch={setSearch}
        favs={favs}
        setFavs={setFavs}
      />
    );

  return (
    <SafeAreaView style={styles.safe}>
      <Home
        go={go}
        setCategory={chooseCategory}
        user={user}
      />

      <View style={styles.bottom}>
        <TouchableOpacity onPress={()=>go("home")}>
          <Text style={styles.nav}>⌂{"\n"}Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>go("search")}>
          <Text style={styles.nav}>⌕{"\n"}Search</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>go("emergency")}>
          <Text style={styles.navDanger}>!{"\n"}Emergency</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>go("admin")}>
          <Text style={styles.nav}>⌘{"\n"}Admin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  safe:{
    flex:1,
    backgroundColor:"#f5f7fb"
  },
  home:{
    padding:16,
    paddingBottom:110
  },
  page:{
    padding:18,
    paddingBottom:40
  },
  header:{
    flexDirection:"row",
    alignItems:"center",
    paddingVertical:10,
    marginBottom:12
  },
  back:{
    fontSize:38,
    color:"#0f172a",
    marginRight:10
  },
  logo:{
    fontSize:21,
    fontWeight:"900",
    color:"#0f172a",
    letterSpacing:1
  },
  tag:{
    fontSize:11,
    color:"#16a34a",
    fontWeight:"800",
    letterSpacing:2,
    marginTop:2
  },
  hero:{
    backgroundColor:"#0f172a",
    borderRadius:26,
    padding:22,
    marginBottom:16
  },
  heroTitle:{
    color:"#fff",
    fontSize:24,
    fontWeight:"900",
    lineHeight:32,
    marginTop:25
  },
  free:{
    color:"#86efac",
    fontWeight:"800",
    marginTop:18
  },
  memberBanner:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:16,
    marginBottom:22,
    borderWidth:1,
    borderColor:"#e2e8f0"
  },
  bannerTitle:{
    fontSize:17,
    fontWeight:"900",
    color:"#0f172a"
  },
  bannerText:{
    color:"#64748b",
    marginTop:4
  },
  smallButton:{
    backgroundColor:"#dcfce7",
    paddingHorizontal:15,
    paddingVertical:11,
    borderRadius:13
  },
  sectionTitle:{
    fontSize:20,
    fontWeight:"900",
    color:"#0f172a",
    marginBottom:13
  },
  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },
  tile:{
    width:"48%",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:17,
    marginBottom:12,
    alignItems:"center",
    borderWidth:1,
    borderColor:"#e2e8f0"
  },
  tileText:{
    fontWeight:"800",
    color:"#1e293b",
    marginTop:8,
    textAlign:"center"
  },
  icon:{
    width:45,
    height:45,
    borderRadius:15,
    backgroundColor:"#ecfdf5",
    alignItems:"center",
    justifyContent:"center"
  },
  iconText:{
    fontSize:21,
    fontWeight:"900",
    color:"#15803d"
  },
  emergency:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff1f2",
    borderRadius:22,
    padding:18,
    marginVertical:12,
    borderWidth:1,
    borderColor:"#fecdd3"
  },
  emergencyIcon:{
    width:46,
    height:46,
    borderRadius:15,
    backgroundColor:"#dc2626",
    color:"#fff",
    textAlign:"center",
    textAlignVertical:"center",
    fontSize:25,
    fontWeight:"900",
    marginRight:13
  },
  emergencyTitle:{
    color:"#991b1b",
    fontWeight:"900",
    fontSize:17
  },
  emergencyText:{
    color:"#7f1d1d",
    marginTop:3
  },
  ownerBanner:{
    backgroundColor:"#052e16",
    borderRadius:23,
    padding:21,
    marginVertical:14
  },
  ownerTitle:{
    color:"#86efac",
    fontWeight:"900",
    letterSpacing:2
  },
  ownerText:{
    color:"#fff",
    fontSize:18,
    fontWeight:"800",
    marginTop:8
  },
  ownerPrice:{
    color:"#bbf7d0",
    fontWeight:"900",
    marginTop:15
  },
  categoryList:{
    marginBottom:20
  },
  categoryRow:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff",
    padding:12,
    borderRadius:17,
    marginBottom:8
  },
  categoryName:{
    flex:1,
    fontWeight:"800",
    color:"#1e293b",
    marginLeft:12
  },
  arrow:{
    fontSize:28,
    color:"#94a3b8"
  },
  screenTitle:{
    fontSize:26,
    fontWeight:"900",
    color:"#0f172a",
    marginBottom:15
  },
  search:{
    backgroundColor:"#fff",
    borderRadius:17,
    padding:16,
    fontSize:16,
    marginBottom:12,
    borderWidth:1,
    borderColor:"#e2e8f0",
    color:"#0f172a"
  },
  chip:{
    backgroundColor:"#fff",
    paddingHorizontal:14,
    paddingVertical:10,
    borderRadius:20,
    marginRight:8,
    borderWidth:1,
    borderColor:"#e2e8f0"
  },
  chipActive:{
    backgroundColor:"#166534",
    borderColor:"#166534"
  },
  chipText:{
    color:"#334155",
    fontWeight:"700"
  },
  chipTextActive:{
    color:"#fff",
    fontWeight:"800"
  },
  count:{
    color:"#64748b",
    marginVertical:14,
    fontWeight:"700"
  },
  card:{
    backgroundColor:"#fff",
    borderRadius:21,
    padding:16,
    marginBottom:12,
    borderWidth:1,
    borderColor:"#e2e8f0"
  },
  cardTop:{
    flexDirection:"row",
    alignItems:"center"
  },
  cardTitle:{
    fontSize:17,
    fontWeight:"900",
    color:"#0f172a"
  },
  verified:{
    color:"#16a34a",
    fontSize:10,
    fontWeight:"900",
    marginTop:3
  },
  heart:{
    fontSize:29,
    color:"#16a34a"
  },
  location:{
    color:"#475569",
    marginTop:12,
    fontWeight:"600"
  },
  desc:{
    color:"#64748b",
    marginTop:8
  },
  small:{
    color:"#64748b",
    marginTop:7
  },
  actionRow:{
    flexDirection:"row",
    flexWrap:"wrap",
    marginTop:14
  },
  action:{
    backgroundColor:"#f1f5f9",
    paddingHorizontal:12,
    paddingVertical:10,
    borderRadius:12,
    marginRight:7,
    marginBottom:6
  },
  bottom:{
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
    height:76,
    backgroundColor:"#fff",
    borderTopWidth:1,
    borderTopColor:"#e2e8f0",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  },
  nav:{
    textAlign:"center",
    color:"#334155",
    fontWeight:"800",
    fontSize:12
  },
  navDanger:{
    textAlign:"center",
    color:"#dc2626",
    fontWeight:"900",
    fontSize:12
  },
  authBox:{
    backgroundColor:"#fff",
    padding:22,
    borderRadius:25,
    borderWidth:1,
    borderColor:"#e2e8f0"
  },
  bigTitle:{
    fontSize:25,
    fontWeight:"900",
    color:"#0f172a",
    marginTop:12
  },
  sub:{
    color:"#64748b",
    marginBottom:22,
    marginTop:4
  },
  label:{
    color:"#334155",
    fontWeight:"800",
    marginBottom:6
  },
  input:{
    backgroundColor:"#f8fafc",
    borderWidth:1,
    borderColor:"#cbd5e1",
    borderRadius:14,
    padding:14,
    color:"#0f172a",
    fontSize:15
  },
  primary:{
    backgroundColor:"#166534",
    borderRadius:15,
    padding:15,
    alignItems:"center",
    marginTop:5,
    marginBottom:15
  },
  primaryText:{
    color:"#fff",
    fontWeight:"900",
    fontSize:16
  },
  link:{
    color:"#166534",
    fontWeight:"800",
    textAlign:"center",
    padding:10
  },
  membership:{
    backgroundColor:"#052e16",
    borderRadius:27,
    padding:25
  },
  price:{
    color:"#86efac",
    fontSize:52,
    fontWeight:"900"
  },
  month:{
    color:"#bbf7d0",
    fontWeight:"800",
    letterSpacing:3
  },
  feature:{
    color:"#fff",
    fontSize:16,
    fontWeight:"700",
    marginVertical:8
  },
  createBox:{
    backgroundColor:"#fff",
    borderRadius:22,
    padding:18,
    marginBottom:18,
    borderWidth:1,
    borderColor:"#e2e8f0"
  },
  post:{
    backgroundColor:"#fff",
    padding:18,
    borderRadius:21,
    marginBottom:12,
    borderWidth:1,
    borderColor:"#e2e8f0"
  },
  postOwner:{
    color:"#166534",
    fontWeight:"900",
    marginBottom:12
  },
  postText:{
    fontSize:17,
    color:"#0f172a",
    lineHeight:25
  },
  photoPlaceholder:{
    marginTop:15,
    height:150,
    borderRadius:16,
    backgroundColor:"#f1f5f9",
    textAlign:"center",
    textAlignVertical:"center",
    color:"#64748b",
    fontWeight:"900"
  },
  empty:{
    textAlign:"center",
    color:"#94a3b8",
    marginTop:30
  },
  adminNote:{
    color:"#64748b",
    backgroundColor:"#fff",
    padding:15,
    borderRadius:15,
    marginBottom:15
  },
  adminRow:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff",
    padding:15,
    borderRadius:16,
    marginBottom:8
  },
  delete:{
    color:"#dc2626",
    fontWeight:"900"
  }
});
