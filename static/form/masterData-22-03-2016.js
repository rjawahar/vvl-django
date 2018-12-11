var masterAddressProofArrayDic     = {"1": "AADHAR CARD", "3": "RATION CARD", "2": "PAN CARD", "5": "DRIVING LICENSE", "4": "VOTER ID", "6": "PASSPORT"};
var masterIdProofArrayDic 	     = {"1": "AADHAR CARD", "3": "RATION CARD", "2": "PAN CARD", "5": "DRIVING LICENSE", "4": "VOTER ID", "6": "PASSPORT"};
var masterValidationLevelArrayDic  = {"1": "MEMBER", "2": "LOAN"};
var masterEducationArrayDic	     = {"1": "10th", "2": "11th"};
var masterNetQuestionArrayDic	     = {"1": "HAVE FRIENDS LIVING IN", "3": "HAVE TRAVELLED IN THE LAST ONE YEAR TO", "2": "HAVE FAMILY LIVING IN", "5": "HAVE LIVED FOR MORE THEN ONE MONTH IN", "4": "HAVE TRAVELLED IN ENTIRE LIFE TO"};
var masterDistanceArrayDic	     = {"1": 1, "3": 5, "2": 3, "4": 10};
var masterOccupationArrayDic	     = {"1": "Government", "2": "Private"};
var masterPurposeArrayDic	     = {"1": "BUSINESS", "2": "AGRICULTURE"};
var masterProcessRemarkArrayDic    = {"1": "New", "3": "Rejected", "2": "ReworkCompleted", "5": "Approved", "4": "Rework", "6": "ProcessStopped"};
var masterAssetArrayDic 	     = {"1": "SHOP", "2": "FRI"};
var masterValidationTypeArrayDic   = {"1": " KYC Document", "2": "Loan Document"};
var masterCourierArrayDic	     = {"1": "PROFESSIONAL", "3": "DHL", "2": "FIRST FLIGHT"};
var masterProductArrayDic	     = {"1": "VVL", "2": "ATL"};
var masterBankArrayDic	     = {"344": "JANKALYAM NAGARI CENTRAL PATHSANSTHA MARYADIT KARAD", "345": "SHRI BHAIRAVNATH MULTISTATE CO-OPERATIVE CREDIT SOCIETY LTD", "346": "SHRI SADGURA HARIBUVA MAHARAJ NAGARI CENTRAL BANK", "347": "SHRI DALT DIGAMBAR NAGARI CENTRAL BANK", "340": "SADHANA SAHAKARI BANK LTD", "341": "BATLAGUNDU CO-OP URBAN BANK LTD", "342": "SHRIMANT MALOJIRAJE CENTRAL BANK LTD", "343": "JANOJIRAO MALOJIRAO BHOITE GRAMIN BIGARSHETI SOCIETY", "348": "SRI SADGURA HARIBUVA MAHARAJ NAGARI SAHAKARI PATSANSTHA MARYADIT", "349": "THE PARAMAKUDI CO-OPERATIVE URBAN BANK LTD", "-1": "--DEFAULT", "298": "KAVALKARANPATTI PRIMARY AGRI COOPERATIVE BANK LTD", "299": "UTHAMAPALAYAM CO-OP URBAN BANK LTD", "296": "THE ASHTA PEOPLES CO OPERATIVE BANK LTD", "297": "HARUR PRIMARY AGRI CO-OP CREDIT SOCIETY LTD", "294": "SRI KAMALAMBIKA CO OP URBAN BANK LTD", "295": "DHARMAPURI DISTRICT CENTRAL COOPERATIVE BANK LTD", "292": "MANORAMA URBAN CO OPERATIVE BANK LIMITED", "293": "KAMALA CO OPERATIVE BANK LIMITED", "290": "PRATHAMIK KRISHI PATTIN SAHAKARI BANK LTD", "291": "BELGAUM ZILLA RANI CHANNAMMA MAHILA SAHAKARI BANK NIYAMIT", "199": "THE TIRUTHURAIPUNDI-CO-OPERATIVE URBAN BANK LTD", "198": "THENMELPAKKAM PRIMARY AGRICULTURE CO-OP BANK", "195": "YOUTH DEVELOPMENT CO-OPERATIVE BANK LTD", "194": "THE PANDHARPUR URBAN CO-OPERATIVE BANK LTD", "197": "THE SHAMRAO VITHAL CO-OPERATIVE BANK LTD", "196": "THE KARAD URBAN CO OPERATIVE BANK LTD", "191": "THE VILLUPURAM COOPERATIVE URBAN BANK LTD", "190": "THE RADDI CO-OPERATIVE BANK LTD", "193": "THE AZAD URBAN CO-OPERATIVE BANK LTD", "192": "THE SOLAPUR SOCIAL URBAN CO-OP BANK LTD", "270": "THE BIJAPUR DIST,CENTRAL CO-OP BANK LTD", "271": "SARJERAODADA NAIK SHIRALA CO - OP BANK LIMITED", "272": "FARMERS SERVICE CO-OPERATIVE SOCIETY BANK LTD", "273": "THE ERODE DISTRICT CENTRAL COOPERATIVE BANK", "274": "KALIDAS CO-OPERATIVE BANK LTD", "275": "THE UNITED WESTERN BANK LTD", "276": "YASHWANT SAHAKARI BANK LIMITED", "277": "HANAMASAGAR URBAN CO-OPERATIVE BANK LTD", "278": "SHELBY COUNTY STATE BANK", "279": "KOTAK MAHINDRA BANK LIMITED", "108": "KALLAPPANNA AWADE ICHALKARANJI JANATA SAHAKARI BANK LTD", "109": "KOLHAPUR JILHA MADHYAVARTI SAHAKARI BANK LTD", "102": "THE RAMANATHAPURAM DISTRICT CENTRAL CO-OPERATIVE BANK LTD", "103": "THE SIVAGANGAI DISTRICT CENTRAL CO-OP BANK LTD", "100": "THE TAMILNADU STATE APEX CO-OP BANK LTD", "101": "SHRI SHANTAPPANNA MIRAJI URBAN CO-OP BANK LTD", "106": "TIRUVERUMBUR CENTRAL CO-OP BANK LTD", "107": "SRI GAVISIDDESWAR URBAN CO OPERATIVE BANK LTD", "104": "ARIGNAR ANNA T.R.PATTINAM PRIMARY AGRICULTURAL CO-OP BANK LTD", "105": "BHARAT HEAVY ELECTRICALS EMPLOYEES CO-OP BANK LTD", "39": "STATE BANK OF TRAVANCORE", "38": "STATE BANK OF MYSORE", "33": "ORIENTAL BANK OF COMMERCE", "32": "KARNATAKA BANK", "31": "CATHOLIC SYRIAN BANK", "30": "BANK OF MAHARASTRA", "37": "REPCO BANK", "36": "PUDUVAI BHARATHIAR GRAMA BANK", "35": "PUNJAB NATIONAL BANK", "34": "PANDYAN GRAMA BANK", "339": "NEIVILAKKU PRIMARY AGRICULTURAL CO-OPERATIVE CREDIT SOCIETY LTD", "338": "MAHILA MERCHANT NAGARI SAHAKARI PATSANSTHA", "335": "SHRIMANT MALOJIRAJE SAHAKARI BANK", "334": "VADUGAPATTI PRIMARY AGRICULTURAL CO-OPERATIVE CREDIT SOCIETY", "337": "VAITHIYANATHAPURAM PRIMARY AGRICULTURAL CO-OPERATIVE BANK", "336": "KAVERIPATNAM CO-OPERATIVE TOWN BANK", "331": "DNYANDEEP CO-OP CREDIT SOCEITY LTD", "330": "BHARATIYA MAHILA BANK", "333": "DNYANDEEP CO OPERATIVE CREDIT SOCIETY LIMITED", "332": "THE YASHWANT CO-OP BANK LTD", "6": "CORPORATION BANK", "99": "APNA SAHAKARI BANK", "98": "RATNAKAR BANK", "91": "THE TIRUVELVELI DISTRICT CENTRAL BANK LIMITED", "90": "SRIRAMANAGAR PATTANA SAHAKARA BANK", "93": "THENMALAR BENEFIT FUND LIMITED", "92": "MADURAI DISTRICT CENTRAL CO-OP BANK LTD", "95": "SRI KAMALAMBIKA CO-OP BANK LTD", "94": "SRI LAKSHMINARAYANA CO-OP URBAN BANK LTD", "97": "KOLHAPUR URBAN CO-OPERATIVE BANK", "96": "UNITED BANK OF INDIA", "238": "PALUS SAHAKARI BANK LTD", "239": "DILIP URBAN CO-OPERATIVE BANK LTD", "234": "THE TASGAON URBAN CO-OPERATIVE BANK LTD", "235": "DHARMAPURI CENTRAL COOPERATIVE BANK", "236": "SANGLI DISTRICT PRIMARY TEACHER SAHAKARI BANK LTD", "237": "SANGLI DISTRICT CENTRAL COOPERATIVE BANK LIMITED", "230": "THE MUSLIM CO-OPERATIVE BANK LIMITED", "231": "PRIMARY AGRI CO-OP CREDIT SOCIETY LTD", "232": "HUTATMA SAHAKARI BANK LTD", "233": "SANGLI ZILLA MADHYAVARTI SAHAKARI BANK LTD", "1": "ALLAHABAD BANK", "146": "CHENNAI CENTRAL CO-OP BANK LTD", "147": "CHOUNDESHWARI SAHAKARI BANK LTD", "144": "BELLAD-BAGEWADI URBAN SOUHARD SAHAKARI BANK", "145": "NANDANI SAHAKARI BANK LTD", "142": "THE BELGAUM DISTRICT CENTRAL CO-OP BANK LTD", "143": "THE JANATA CO-OP BANK", "140": "THE ILKAL CO-OPERATIVE BANK LTD", "141": "SHRIPATRAODADA SAHAKARI BANK LTD", "148": "ICHALKARANJI JANATA SAHAKARI BANK LTD", "149": "THE CHIKODI TALUKA PRIMARY CO-OP AGRICULTURE & RURAL DEVELOPMENT BANK LTD", "133": "SANMATI SAHAKARI BANK LTD", "132": "SHRI PANCHAGANGA NAGARI SAHAKARI BANK LTD", "131": "THE SARASWAT CO-OPERATIVE BANK LTD", "130": "THE GADHINGLAJI URBAN CO-OPERATIVE BANK LTD", "137": "THE BAGALKOT DIST.CENTRAL CO-OP.BANK LTD", "136": "THE KARUNTHATTANGUDI DRAVIDIAN CO-OP URBAN BANK LTD", "135": "SHRI VEERASHAI CO-OP BANK LTD", "134": "THE AJARA URBAN CO-OP BANK LTD", "139": "THE CHIDAMBARAM CO-OP URBAN BANK LTD", "138": "MERCHANTS LIBERAL CO-OP BANK LTD", "24": "UNITED COMMERCIAL BANK", "25": "VIJAYA BANK", "26": "CO-OPERATIVE BANK", "27": "AXIS BANK", "20": "STATE BANK OF INDIA", "21": "SOUTH INDIAN BANK", "22": "TAMILNADU MERCHANTILE BANK", "23": "UNION BANK OF INDIA", "28": "BANK OF BARODA", "29": "BANK OF MADURA", "379": "MANVI PATTANA SOUHARDA SAHAKARI NIYAMITA", "378": "ANAND NAGARI SAHAKARI PATSANSTHA MARYADIT", "371": "RAJGURUNAGAR SAHAKARI BANK LTD", "370": "TIRUCHIRAPALLI CITY CO-OP BANK", "373": "SABIR GRAMIN BIGARSHETI SAHAKARI BANK", "372": "VASANTDADA PATIL SAHAKARI PATSANSTHA MARYADIT", "375": "ABHYUDAYA CO-OP BANK LTD", "374": "LALA URBAN CO-OP BANK LTD", "377": "KHANAPUR CO-OPERATIVE BANK LTD", "376": "NAGAR URBAN CO-OP BANK", "393": "SAINATH MULTISTATE CO-OPERATIVE CREDIT SOCIETY LTD", "392": "KALLOORANI PRIMARY AGRICUTURAL CO OPERATIVE BANK LTD", "88": "BHARAT OVERSEAS BANK", "89": "THE CUDDALORE DISTRICT CENTRAL CO-OP BANK LTD", "397": "THE PALAKKAD DISTRICT CO-OPERATIVE BANK LTD", "396": "OTHAKADAI COOPERATIVE RURAL BANK LTD", "395": "THE DINDIGUL CENTRAL COOPERATIVE BANK LTD", "394": "THE THIRUVANANTHAPURAM DISTRICT CO OPERATIVE BANK LTD", "82": "THE THIRUCHIRAPALLI DISTRICT CENTRAL CO-OPERATIVE BANK", "83": "PURASAI CO-OP BANK", "80": "PRIMARY AGRI CO-OP BANK LTD", "81": "VEVASAYA SEVA SAHAKARA BANK", "86": "PUNJAB AND MAHARASHTRA CO-OP BANK LTD", "87": "SHAMRAO VITHAL CO-OP BANK LTD", "84": "STATE BANK OF BIKANER AND JAIPUR", "85": "THE TIRUPUR CO-OPERATIVE URBAN BANK LTD", "7": "CITY UNION BANK", "245": "THE HUKKERI URBAN CO OP BANK LTD", "244": "THE RADDI SAHAKARA BANK NIYAMITHA", "247": "SADALAGA URBAN SOUHARDA SAHAKARI BANK NIYAMIT", "246": "MANORAMA CO-OP BANK LTD", "241": "THE DHARAPURAM CO-OP URBAN BANK LTD", "240": "ADHIYAMAN GRAMA BANK", "243": "NILKANTH CO-OP BANK LTD", "242": "LOKMANGAL NAGARI SAHAKARI PATSANSTHA LTD", "249": "KANCHEEPURAM CENTRAL CO-OPERATIVE BANK LTD", "248": "SANGLI ZILLA MADHYAVARTI BANK", "179": "SHIVSHAKTI URBAN CO-OP BANK LTD", "178": "SHRI BASAVESHWAR CO OPERATIVE BANK", "177": "KACHANAM P.A.C.C.S LTD", "176": "BRAHMADEODADA MANE SAHAKARI BANK LTD", "175": "SOLAPUR DISTRICT CENTRAL CO-OP BANK LTD", "174": "SOLAPUR JANTA SAHAKARI BANK LTD", "173": "SHRI BALBHIM CO-OP BANK LTD", "172": "SUBHADRA LOCAL AREA BANK LTD", "171": "ICHALKARANJI MAHILA SAHAKARI BANK LTD", "170": "SWATANTRA SENANI LATE SHRIPAL ALASA (KAKA)KURUNDWAD URBAN CO-OP BANK LTD", "253": "VISHWESHWAR CO-OPERATIVE BANK LTD", "182": "THIRUPPUVANAM FARMERS SERVICE CO-OP SOCIETY LTD", "183": "KULAIYANKARISAL PRIMARY AGRICULTURE CO-OP BANK", "180": "THE VELLORE DISTRICT CENTRAL CO-OPERATIVE BANK LTD", "181": "THE LAXMI CO-OPERATIVE BANK LIMITED", "186": "THE PUDUKOTTAI PRIMARY AGRICULTURAL COOPERATIVE CREDIT SOCIETY LTD", "187": "OSMANABAD JANATA SAHAKARI BANK LIMITED", "184": "THE MANAPPARAI TOWN CO-OPERATIVE BANK LTD", "185": "KANYAKUMARI DISTRICT CENTRAL CO-OPERATIVE BANK", "188": "THE RAITHARA SEVA SAHAKARA BANK", "189": "KARAIKUDI CO-OPERATIVE TOWN BANK LTD", "11": "FEDERAL BANK", "13": "INDIAN BANK", "12": "HDFC BANK", "15": "IDBI", "14": "ICICI BANK", "17": "KARUR VISYA BANK", "16": "INDIAN OVERSEAS BANK", "19": "PALLAVAN GRAMIYA BANK", "18": "LAKSHMI VILAS BANK", "62": "KALLAKUDI PRIMARY AGRI CO-OP SOCEITY LTD", "322": "PUNE DISTRICT CENTRAL CO-OPERATIVE BANK LTD", "323": "THE WAI URBAN CO OPERATIVE BANK LIMITED", "320": "THE SATARA DISTRICT CENTRAL COOPERATIVE BANK LTD", "321": "JANASEVA SAHAKARI BANK LTD", "326": "JANATA URBAN CO-OPERATIVE BANK", "327": "THE BELGAUM INDUSTRIAL CO-OPERATIVE BANK LTD", "324": "RAJASINGAMANGALAM PRIMARY AGRI CO OPERATIVE BANK", "325": "MANN DESHI MAHILA SAHAKARI BANK", "328": "THE BELAGAVI DISTRICT CENTRAL COOPERATIVE BANK LTD", "329": "AKKAMAHADEVI MAHILA SAHAKARI NIYAMIT", "201": "SATYA SHODHAK SAHAKARI BANK LTD", "200": "BHARATI SAHAKARI BANK LTD", "203": "THE MELUR CO-OP URBAN BANK LTD", "202": "THE ARUMANAI PRIMARY AGRICULTURAL CO-OP BANK LTD", "205": "SANGLI URBAN CO- OPERATIVE BANK LTD", "204": "K.C.C BANK LTD", "207": "PERIYAKULAM CO-OP URBAN BANK", "206": "BULDANA URBAN CO-OP. CREDIT SOCIETY LTD", "209": "CO-OP RURAL BANK LTD", "208": "SOLAPUR SIDDHESHWAR SAHAKARI BANK LTD", "77": "PRATHAMIK KRISHI SEVA SAHAKARI BANK LTD", "76": "NICHOLSON CO-OP TOWN BANK LTD", "75": "THE VILLUPURAM DIST. CENTRAL CO-OP BANK LTD", "74": "THE BELLARY DISTRICT CO-OP CENTRAL BANK LTD", "73": "SRI CHANNA BASAWA SWAMI SOWHADRA PATANNA SHAKARI BANK LTD", "72": "SIVAGANGAI DISTRICT CO-OP BANK LTD", "71": "SHRI VIJAY MAHANTESH CO-OP BANK LTD", "70": "THE PONDICHERRY STATE CO-OP BANK LTD", "79": "THE DALMIAPURAM EMPLOYEES CO-OPERATIVE BANK LTD", "78": "THE NAMAKKAL CO-OP URBAN BANK LTD", "2": "PUNJAB GRAMIN BANK", "8": "DENA BANK", "68": "THE KUMBAKONAM MUTUAL BENEFIT FUND LTD", "120": "THE LIBERAL CO-OP BANK LTD", "121": "THE SAVANUR URBAN CO OPERATIVE BANK LTD", "122": "KOLHAPUR MAHILA SAHAKARI BANK LTD", "123": "KOLHAPUR DISTRICT CENTRAL CO-OPERATIVE BANK LTD", "124": "NUTAN NAGARI SAHAKARI BANK LTD", "125": "THE MULGUND URBAN SOUHRADA CO-OP.BANK LTD", "126": "THE KUMBAKONAM CITY UNION BANK LTD", "127": "THE COSMOS CO-OP BANK LTD", "128": "NKGSB CO-OP BANK LTD", "129": "THANJAVUR CENTRAL CO-OP BANK", "319": "THIRUKKALACHERY PRIMARY AGRICULTURAL CO-OPERATIVE SOCIETY LTD", "318": "OSMANABAD DISTRICT CENTRAL CO-OPERATIVE BANK LTD", "313": "THE COIMBATORE CITY COOPERATIVE BANK LTD", "312": "THAMARAIKULAM PRIMARY AGRICULTURAL CO OPERATIVE BANK", "311": "VIKAS CO OPERATIVE BANK LTD", "310": "MAHARASHTRA GRAMIN BANK", "317": "KALYANSAGAR URBAN CO-OPERATIVE BANK LTD", "316": "JANSEVA NAGARI SAH BANK LTD", "315": "THE OSMANABAD DISTRICT CENTRAL COOPERATIVE BANK", "314": "YES BANK", "3": "BANK OF INDIA", "368": "SHRIMANT NIRMALADEVI NAGARI SAHA PATSANSTHA MARYA", "369": "KOTTAPATTY PRIMARY AGRICULTURAL CO OP CREDIT SOCIETY", "366": "VISHAL JUNNAR SAHAKARI PATPEDI LIMIT", "367": "LALGUDI RURAL PRIMARY AGRI CO-OP BANK LTD", "364": "SAMPADA NAGARI SAHAKARI PATSANSTHA MARYADIT", "365": "SHRIMANT SAIBAI MAHARAJ MAHILA SAHAKARI PATSANSTHA", "362": "SAMPADA NAGARI SAHAKARI PATSANSTHA LTD", "363": "JIJAMATA MAHILA SAHAKARI BANK LIMITED", "360": "SHREE SADGURU KRUPA MAHILA NAGARI SAHAKARI PATASANSTA MARYA", "361": "SAMARTH SEVA NAGARI PATASANSTA MARYA", "380": "ADITYA NAGARI SAHAKARI PATSANSTHA MARYADIT", "381": "SWAMI VIVEKANAND NAGARAI SAHAKARI PATSANSTHA MARYADIT", "382": "THE VIRUDHUNAGAR DISTRICT CENTRAL CO-OPERATIVE BANK LTD", "383": "SHIVASPOORTHI GRAMEEN BIGARSHETI CO-OP CREDIT SOCIETY LTD", "384": "SAATHI MULTI STATE CREDIT CO-OPERATIVE SOCIETY LTD", "385": "VIRUDHUNAGAR CO-OPERATIVE URBAN BANK LTD", "386": "VIRSHEW CO OP BANK LTD", "387": "KOODALORE FARMERS WORKING CO-OPERATIVE SOCIETY LTD", "388": "LOKMANGAL MULTISTATE CO-OPERATIVE LIMITED", "389": "MAHALAXMI CO-OP BANK LTD", "60": "SRIRANGAM CO-OP BANK", "61": "MALAPRABHA GRAMEENA BANK", "258": "THE MAYURAM CO-OP URBAN BANK LTD", "259": "BARAMATI SAHAKARI BANK LTD", "64": "SUCO BANK", "65": "SHREE CHANNABASAVA SWAMY SAUHARDA URBAN CO-OP BANK", "66": "KARNATAKA CENTRAL CO-OP BANK", "67": "SHRI VEERAPULIKESHI CO-OP BANK LTD", "252": "KARUNTHATANKUDI DRAVIDIAN CO-OPERATIVE URBAN BANK", "69": "KARNATAKA VIKAS GRAMEENA BANK", "250": "SADALGA URBAN CO-OPERATIVE BANK", "251": "TJSB SAHAKARI BANK LTD", "256": "COIMBATORE DISTRICT CENTRAL CO-OPERATIVE BANK LIMITED", "257": "BILAGI PATTANA SAHAKARI BANK LTD", "254": "MANORAMA MULTI-STATE CO-OPERATIVE CREDIT SOCIETY LTD", "255": "THE TIRUNELVELI KATTABOMMAN DIST CENTRAL CO OP BANK LIMITED", "168": "GOPINATH PATIL PARSIK JANATA SAHAKARI BANK LTD", "169": "GATEWAY BENEFITS FUND LTD", "164": "VIDHARBHA KONKAN GRAMIN BANK", "165": "RAJARSHI SHAHU GOVERNMENT SERVANTS CO-OP BANK LTD", "166": "THANE DISTRICT CENTRAL CO-OP BANK", "167": "KOHINOOR SAHAKARI BANK LTD", "160": "THE SANGLI BANK LTD", "161": "JAYSINGPUR UDGAON SAHAKARI BANK LTD", "162": "THE KAGAL CO-OP BANK LTD", "163": "PARSHWANATH CO-OP BANK LTD", "9": "DHANA LAKSHMI BANK", "357": "KARAD MERCHANT CO-OP CREDIT SOCIETY LTD", "356": "BOMBAY MERCANTILE CO-OP BANK LTD", "355": "STANDARD CHARTERED BANK", "354": "RETTANAI PRIMARY AGRICULTURAL COOPERATIVE BANK LTD", "353": "JANATA SAHAKARI BANK LTD", "352": "SHRI SWAMI SAMARTH SAHAKARI BANK LTD", "351": "KARAD MERCHANT SAHAKARI CREDIT SANSTHA LIMITED", "350": "TUTICORIN MELUR CO-OPERATIVE BANK LTD", "359": "THE TIRUNELVELI DISTRICT CENTRAL CO-OP BANK LTD", "358": "SHIRALA TALUKA URBAN CO-OPERATIVE BANK", "216": "LOKMANGAL CO OP BANK LTD", "217": "KAVITA URBAN CO OPERATIVE BANK", "214": "SAMARTH SAHAKARI BANK LTD", "215": "SHARAD NAGARI SAHAKARI BANK LTD", "212": "KUTTALAM CO OP RURAL BANK LTD", "213": "SHRI MAHALAXMI CO-OP BANK LTD", "210": "THE ILAYANGUDI CO- OPERATIVE URBAN BANK", "211": "PASUMPON MUTHURAMALINGA THEVAR DISTRICT CENTRAL CO-OP BANK", "218": "SHIVAM SAHAKARI BANK LTD", "219": "AMAN SAHAKARI BANK LTD", "289": "UTHAMAPALAYAM CO-OP BANK LTD", "288": "THE ICHALKARANJI MERCHANT CO-OP BANK LTD", "4": "CANARA BANK", "281": "UMASA CHARAN NAGARI SAHAKARI PATSARNTA MARYA", "280": "SHRI SUVARNA PATTINA SOUHARDA SAHAKARI NIYAMIT", "283": "THE THOOTHUKUDI DISTRICT CENTRAL CO-OP BANK LTD", "282": "DY PATIL SAHAKARI BANK LIMITED", "285": "VYAPARI CO-OPERATIVE BANK", "284": "KALGHATGI URBAN CO-OPERATIVE BANK LTD", "287": "SOLAPUR GRAMIN BANK", "286": "VIKAS SOUHARDA CO OPERATIVE BANK LTD", "263": "THE SHEDBAL URBAN CO-OPERATIVE BANK LTD", "262": "DISTRICT COOPERATIVE CENTRAL BANK", "261": "SHRI VEER PULIKESHI SAHAKARI BANK", "260": "KUSHTAGI PATTANA SAHAKARI BANK", "267": "RAJARAMBAPU SAHAKARI BANK LTD", "266": "ILKAL SAHAKARA BANK NIYAMITA", "265": "VIRUDHUNAGAR CO-OP RURAL BANK LTD", "264": "PAPANASAM CO OP URBAN BANK LTD", "269": "THE VITA MERCHANTS CO-OP BANK LTD", "268": "JIWAJI SAHAKARI BANK LTD", "59": "SRIRANGAM CO-OP URBAN BANK", "58": "COIMBATORE DISTRICT CO-OP BANK", "55": "TUNGA BHADRA GRAMIN BANK", "54": "TIRUCHIRAPALLI DISTRICT CO-OP BANK", "57": "THE KUMBAKONAM CENTRAL CO-OP BANK", "56": "KARNATAKA VIKAS GRAMIN BANK", "51": "TINDINVANAM CO-OPERATIVE URBAN BANK LTD", "50": "STATE BANK OF HYDERABAD", "53": "PUNJAB AND SIND BANK", "52": "ING VYSYA BANK", "63": "RAICHUR DISTRICT CENTRAL CO-OP BANK", "115": "SHREE PANCHGANGA NAGARI SAHAKARI BANK", "114": "SHREE WARNA SAHAKARI BANK LTD", "117": "THE COMMERCIAL CO-OP BANK", "116": "THE VISHWESHWAR SAHAKARI BANK LTD", "111": "MAHA BANK", "110": "WAINGANGA KRISHNA GRAMIN BANK", "113": "SHRI PAISA FUND SHETKI SAHAKARI BANK", "112": "RENDAL SAHAKARI BANK", "119": "THE BELAGAVI JILLA KENDRA SAHAKARI BANK LTD", "118": "DR. ANNASAHEB CHOUGALE URBAN CO-OP BANK LTD", "308": "POYYUR PRIMARY AGRICULTURAL CREDIT SOCIETY BANK", "309": "VEMBUR PRIMARY AGRICULTURAL CO-OPERATIVE SOCIETY LTD", "300": "KALPADY PRIMARY AGRICULTURAL CO-OPERATIVE BANK LTD", "301": "PREPAID CARD", "302": "SHRI SATYAVIJAY SAHAKARI BANK LTD", "303": "KARIYAMANICKAM PRIMARY AGRICULTURAL COOPERATIVE BANK", "304": "YERAL PRIMARY AGRICULTURAL COOPERATIVE CREDIT SOCIETY LTD", "305": "THE SHIMOGA DISTRICT CO-OPERATIVE CENTRAL BANK LTD", "306": "URANGANPATTI PRIMARY AGRICULTURAL CREDIT SOCIETY BANK", "307": "THE KALLIDAIKURICHI COOPERATIVE URBAN BANK LTD", "229": "SHREE VEERSHAIV CO OPERATIVE BANK LTD", "228": "AZHAGAMANAGARI PRIMARY AGRICULTURE CO-OP BANK", "227": "ARIHANT URBAN SOUHARDA CREDIT SAHAKARI LTD", "226": "INDIRA SHRAMIK MAHILA NAGARI SAHAKARI BANK LTD", "225": "THE CHIKODI URBAN CO OPERATIVE BANK LTD", "224": "THIRUTHIYAMALAI PRIMARY AGRICULTURAL CO-OPERATIVE SOCIETY", "223": "PUDUKKOTTAI DISTRICT CENTRAL COOPERATIVE BANK", "222": "SRI CHOWDESHWARI TOGATVIR KSHETRIYA NAGARI SAHA PATPEDHI LTD", "221": "THE BANK OF RAJASTHAN LTD", "220": "BRAHMADEV DADA MANE SAHAKARI BANK LTD", "391": "THE MAHANAGAR COOPERATIVE BANK LTD", "390": "SRI VIVEKANAND NAGARI SAHAKARI PATSANSTHA MARYADIT", "151": "DOMBIVLI NAGARI SAHAKARI BANK LTD", "150": "BIRDEV SAHAKARI BANK LTD", "153": "THE JAMKHANDI URBAN CO-OP BANK LTD", "152": "SHRI ADINATH CO-OP BANK LTD", "155": "THE KAMUTHI CO-OP URBAN BANK LTD", "154": "LAXMESHWAR ALPA SANKYATHARA URBAN CO-OP CREDIT SOCIETY LTD", "157": "VALLALAR GRAMA BANK", "156": "THE HUBLI URBAN CO-OP BANK LTD", "159": "SHRI BHARAT URBAN CO-OP BANK LTD", "158": "KARAIKOVILPATHU PRIMARY AGRI CO-OP BANK LTD", "398": "AYANVADAMALAPURAM PRIMARY AGRI CO-OPERATIVE CREDIT SOCIETY", "48": "PRAGATHI GRAMIN BANK", "49": "PRAGATHI KRISHNA GRAMIN BANK", "46": "RAIGAD DISTRICT CO-OPERATIVE BANK", "47": "THANJAVUR CO-OPERATIVE BANK", "44": "STATE BANK OF PATIALA", "45": "ANDHRA BANK", "42": "INDUSIND BANK", "43": "POST OFFICE", "40": "SYNDICATE BANK", "41": "TAICO BANK", "5": "CENTRAL BANK OF INDIA"};
var masterRelationArrayDic	     = {"1": "Self", "3": "Mother", "2": "Father", "4": "Child"};
var masterValidationStatusArrayDic = {"1": "Approved", "3": "ReworkCompleted", "2": "Rework", "5": "StopProcess", "4": "Rejected"};