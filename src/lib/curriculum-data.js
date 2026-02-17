/**
 * Comprehensive Curriculum Data Structure
 * Organized by Class (LKG to 12th/2nd Year) and Board (CBSE & State)
 */

export const CURRICULUM_STRUCTURE = {
  // Pre-Primary Education
  LKG: {
    name: "Lower Kindergarten",
    ageGroup: "3-4 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Alphabets A-Z", "Phonics", "Simple Words", "Rhymes"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-20", "Shapes", "Colors", "Patterns"] },
          { id: "evs", name: "Environmental Studies", topics: ["My Body", "My Family", "Animals", "Plants"] },
          { id: "art", name: "Art & Craft", topics: ["Drawing", "Coloring", "Clay Modeling"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Alphabets", "Simple Words", "Rhymes"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-20", "Shapes", "Colors"] },
          { id: "evs", name: "Environmental Studies", topics: ["My Body", "My Family", "Animals"] },
          { id: "regional", name: "Regional Language", topics: ["Alphabets", "Simple Words"] }
        ]
      }
    }
  },

  UKG: {
    name: "Upper Kindergarten",
    ageGroup: "4-5 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Alphabets", "Two-letter Words", "Three-letter Words", "Rhymes & Stories"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-50", "Addition", "Subtraction", "Measurement"] },
          { id: "evs", name: "Environmental Studies", topics: ["Seasons", "Transport", "Food", "Safety"] },
          { id: "art", name: "Art & Craft", topics: ["Drawing", "Coloring", "Paper Craft"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Alphabets", "Simple Words", "Stories"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-50", "Basic Addition", "Shapes"] },
          { id: "evs", name: "Environmental Studies", topics: ["Seasons", "Transport", "Food"] },
          { id: "regional", name: "Regional Language", topics: ["Alphabets", "Words", "Stories"] }
        ]
      }
    }
  },

  CLASS_1: {
    name: "Class 1",
    ageGroup: "5-6 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Reading", "Writing", "Grammar Basics", "Comprehension"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-100", "Addition", "Subtraction", "Shapes", "Patterns"] },
          { id: "evs", name: "Environmental Studies", topics: ["Living & Non-living", "Plants", "Animals", "My Family"] },
          { id: "hindi", name: "Hindi", topics: ["Varnamala", "Matras", "Simple Words"] },
          { id: "art", name: "Art & Craft", topics: ["Drawing", "Coloring", "Craft Work"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Reading", "Writing", "Simple Sentences"] },
          { id: "math", name: "Mathematics", topics: ["Numbers 1-100", "Addition", "Subtraction"] },
          { id: "evs", name: "Environmental Studies", topics: ["Living Things", "Plants", "Animals"] },
          { id: "regional", name: "Regional Language", topics: ["Alphabets", "Words", "Sentences"] }
        ]
      }
    }
  },

  CLASS_2: {
    name: "Class 2",
    ageGroup: "6-7 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Reading Comprehension", "Grammar", "Vocabulary", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Numbers to 1000", "Addition", "Subtraction", "Multiplication Tables", "Time", "Money"] },
          { id: "evs", name: "Environmental Studies", topics: ["Good Habits", "Safety", "Water", "Air", "Community Helpers"] },
          { id: "hindi", name: "Hindi", topics: ["Varnamala", "Matras", "Reading", "Writing"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Reading", "Grammar Basics", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Numbers to 1000", "Addition", "Subtraction", "Time"] },
          { id: "evs", name: "Environmental Studies", topics: ["Good Habits", "Water", "Air"] },
          { id: "regional", name: "Regional Language", topics: ["Reading", "Writing", "Grammar"] }
        ]
      }
    }
  },

  CLASS_3: {
    name: "Class 3",
    ageGroup: "7-8 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Comprehension", "Grammar", "Composition", "Vocabulary"] },
          { id: "math", name: "Mathematics", topics: ["Numbers to 10000", "Four Operations", "Fractions", "Geometry", "Measurement"] },
          { id: "evs", name: "Environmental Studies", topics: ["Plants", "Animals", "Food", "Shelter", "Water Resources"] },
          { id: "hindi", name: "Hindi", topics: ["Reading", "Writing", "Grammar", "Comprehension"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Reading", "Grammar", "Writing"] },
          { id: "math", name: "Mathematics", topics: ["Numbers", "Operations", "Fractions", "Geometry"] },
          { id: "science", name: "Science", topics: ["Plants", "Animals", "Matter"] },
          { id: "social", name: "Social Studies", topics: ["Family", "Community", "Maps"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Writing"] }
        ]
      }
    }
  },

  CLASS_4: {
    name: "Class 4",
    ageGroup: "8-9 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Writing Skills", "Comprehension"] },
          { id: "math", name: "Mathematics", topics: ["Large Numbers", "Operations", "Fractions", "Decimals", "Geometry", "Symmetry"] },
          { id: "evs", name: "Environmental Studies", topics: ["Food & Nutrition", "Transport", "Communication", "Natural Resources"] },
          { id: "hindi", name: "Hindi", topics: ["Literature", "Grammar", "Composition"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
          { id: "math", name: "Mathematics", topics: ["Numbers", "Fractions", "Decimals", "Geometry"] },
          { id: "science", name: "Science", topics: ["Living Things", "Matter", "Energy", "Environment"] },
          { id: "social", name: "Social Studies", topics: ["History", "Geography", "Civics"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Composition"] }
        ]
      }
    }
  },

  CLASS_5: {
    name: "Class 5",
    ageGroup: "9-10 years",
    boards: {
      CBSE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Writing", "Comprehension"] },
          { id: "math", name: "Mathematics", topics: ["Numbers", "Fractions", "Decimals", "Percentage", "Geometry", "Data Handling"] },
          { id: "evs", name: "Environmental Studies", topics: ["Super Senses", "Food", "Water", "Travel", "Maps"] },
          { id: "hindi", name: "Hindi", topics: ["Literature", "Grammar", "Composition"] }
        ]
      },
      STATE: {
        subjects: [
          { id: "english", name: "English", topics: ["Literature", "Grammar", "Composition"] },
          { id: "math", name: "Mathematics", topics: ["Numbers", "Fractions", "Decimals", "Percentage", "Geometry"] },
          { id: "science", name: "Science", topics: ["Living Organisms", "Matter", "Force & Energy", "Environment"] },
          { id: "social", name: "Social Studies", topics: ["History of India", "Geography", "Civics", "Economics Basics"] },
          { id: "regional", name: "Regional Language", topics: ["Literature", "Grammar", "Composition"] }
        ]
      }
    }
  },

  CLASS_6: {
    name: "Class 6",
    ageGroup: "10-11 years",
    boards: {
      CBSE: {
        subjects: [
          {
            id: "english",
            name: "English",
            topics: [
              "A Tale of Two Birds", "The Friendly Mongoose", "The Shepherd's Treasure",
              "The Old-Clock Shop", "Tansen", "The Monkey and the Crocodile", "The Wonder Called Sleep",
              "A Pact with the Sun", "What Happened to the Reptiles", "A Strange Wrestling Match",
              "Nouns", "Pronouns", "Verbs", "Adjectives", "Adverbs", "Prepositions",
              "Conjunctions", "Tenses", "Active and Passive Voice", "Direct and Indirect Speech",
              "Letter Writing", "Essay Writing", "Story Writing", "Comprehension"
            ]
          },
          {
            id: "math",
            name: "Mathematics",
            topics: [
              "Knowing Our Numbers", "Whole Numbers", "Playing with Numbers", "Basic Geometrical Ideas",
              "Understanding Elementary Shapes", "Integers", "Fractions", "Decimals", "Data Handling",
              "Mensuration", "Algebra", "Ratio and Proportion", "Symmetry", "Practical Geometry"
            ]
          },
          {
            id: "science",
            name: "Science",
            topics: [
              "Food: Where Does It Come From?", "Components of Food", "Fibre to Fabric",
              "Sorting Materials into Groups", "Separation of Substances", "Changes Around Us",
              "Getting to Know Plants", "Body Movements", "The Living Organisms and Their Surroundings",
              "Motion and Measurement of Distances", "Light, Shadows and Reflections",
              "Electricity and Circuits", "Fun with Magnets", "Water", "Air Around Us", "Garbage In, Garbage Out"
            ]
          },
          {
            id: "social",
            name: "Social Science",
            topics: [
              "What, Where, How and When?", "From Hunting-Gathering to Growing Food", "In the Earliest Cities",
              "What Books and Burials Tell Us", "Kingdoms, Kings and an Early Republic", "New Questions and Ideas",
              "Ashoka, The Emperor Who Gave Up War", "Vital Villages, Thriving Towns", "Traders, Kings and Pilgrims",
              "New Empires and Kingdoms", "Buildings, Paintings and Books",
              "The Earth in the Solar System", "Globe: Latitudes and Longitudes", "Motions of the Earth",
              "Maps", "Major Domains of the Earth", "Major Landforms of the Earth", "Our Country - India",
              "India: Climate, Vegetation and Wildlife",
              "Understanding Diversity", "Diversity and Discrimination", "What is Government?",
              "Key Elements of a Democratic Government", "Panchayati Raj", "Rural Administration",
              "Urban Administration", "Rural Livelihoods", "Urban Livelihoods"
            ]
          },
          {
            id: "hindi",
            name: "Hindi",
            topics: [
              "वह चिड़िया जो", "बचपन", "नादान दोस्त", "चाँद से थोड़ी सी गप्पें", "अक्षरों का महत्व",
              "पार नज़र के", "साथी हाथ बढ़ाना", "ऐसे-ऐसे", "टिकट अलबम", "झांसी की रानी",
              "जो देखकर भी नहीं देखते", "संसार पुस्तक है", "मैं सबसे छोटी होऊं", "लोकगीत", "नौकर",
              "वन के मार्ग में", "साँस-साँस में बांस",
              "संज्ञा", "सर्वनाम", "विशेषण", "क्रिया", "काल", "वचन", "लिंग", "कारक",
              "पत्र लेखन", "निबंध लेखन", "अनुच्छेद लेखन"
            ]
          },
          {
            id: "sanskrit",
            name: "Sanskrit",
            topics: [
              "शब्द परिचयः", "तत्र किं?", "एतत् किम्?", "सः कः?", "अहं कः?", "किं करोषि?",
              "किं पठसि?", "सप्ताहः", "मम परिवारः", "त्वं किं करोषि?", "पुष्पोद्यानम्",
              "दीपावलिः", "विद्यालयः", "मम दिनचर्या", "संख्याज्ञानम्"
            ]
          }
        ]
      },
      STATE: {
        subjects: [
          {
            id: "english",
            name: "English",
            topics: [
              "Prose Lessons", "Poetry", "Grammar - Parts of Speech", "Tenses", "Voice", "Speech",
              "Comprehension", "Letter Writing", "Essay Writing", "Story Writing"
            ]
          },
          {
            id: "math",
            name: "Mathematics",
            topics: [
              "Number System", "Whole Numbers", "Integers", "Fractions", "Decimals",
              "Basic Geometry", "Mensuration", "Algebra Basics", "Ratio and Proportion", "Data Handling"
            ]
          },
          {
            id: "science",
            name: "Science",
            topics: [
              "Food and Nutrition", "Materials and Their Properties", "Separation of Substances",
              "Plants", "Animals", "Human Body", "Motion and Measurement", "Light and Shadows",
              "Electricity", "Magnets", "Water", "Air", "Environment"
            ]
          },
          {
            id: "social",
            name: "Social Science",
            topics: [
              "Ancient India - Indus Valley", "Vedic Period", "Mauryan Empire", "Gupta Period",
              "Earth and Solar System", "Globe", "Maps", "Landforms", "Climate", "India - Location and Physical Features",
              "Democracy", "Government", "Local Administration", "Rural and Urban Livelihoods"
            ]
          },
          {
            id: "regional",
            name: "Regional Language",
            topics: [
              "Literature - Prose", "Poetry", "Grammar", "Composition", "Letter Writing", "Essay Writing"
            ]
          }
        ]
      }
    }
  },

  CLASS_7: {
    name: "Class 7",
    ageGroup: "11-12 years",
    boards: {
      CBSE: {
        subjects: [
          {
            id: "english",
            name: "English",
            topics: [
              "Three Questions", "A Gift of Chappals", "Gopal and the Hilsa Fish", "The Ashes That Made Trees Bloom",
              "Quality", "Expert Detectives", "The Invention of Vita-Wonk", "Fire: Friend and Foe",
              "A Bicycle in Good Repair", "The Story of Cricket", "Golu Grows a Nose",
              "The Alien Hand", "I Want Something in a Cage", "Chandni", "The Bear Story", "A Tiger in the House",
              "An Alien Hand",
              "Nouns", "Pronouns", "Adjectives", "Verbs", "Adverbs", "Prepositions", "Conjunctions",
              "Tenses", "Active and Passive Voice", "Direct and Indirect Speech", "Clauses",
              "Letter Writing", "Essay Writing", "Story Writing", "Diary Entry", "Comprehension"
            ]
          },
          {
            id: "math",
            name: "Mathematics",
            topics: [
              "Integers", "Fractions and Decimals", "Data Handling", "Simple Equations",
              "Lines and Angles", "The Triangle and its Properties", "Congruence of Triangles",
              "Comparing Quantities", "Rational Numbers", "Practical Geometry", "Perimeter and Area",
              "Algebraic Expressions", "Exponents and Powers", "Symmetry", "Visualising Solid Shapes"
            ]
          },
          {
            id: "science",
            name: "Science",
            topics: [
              "Nutrition in Plants", "Nutrition in Animals", "Fibre to Fabric", "Heat",
              "Acids, Bases and Salts", "Physical and Chemical Changes", "Weather, Climate and Adaptations",
              "Winds, Storms and Cyclones", "Soil", "Respiration in Organisms", "Transportation in Animals and Plants",
              "Reproduction in Plants", "Motion and Time", "Electric Current and its Effects",
              "Light", "Water: A Precious Resource", "Forests: Our Lifeline", "Wastewater Story"
            ]
          },
          {
            id: "social",
            name: "Social Science",
            topics: [
              "Tracing Changes Through a Thousand Years", "New Kings and Kingdoms", "The Delhi Sultans",
              "The Mughal Empire", "Rulers and Buildings", "Towns, Traders and Craftspersons",
              "Tribes, Nomads and Settled Communities", "Devotional Paths to the Divine", "The Making of Regional Cultures",
              "Eighteenth-Century Political Formations",
              "Environment", "Inside Our Earth", "Our Changing Earth", "Air", "Water",
              "Natural Vegetation and Wildlife", "Human Environment - Settlement, Transport and Communication",
              "Human Environment Interactions - The Tropical and the Subtropical Region", "Life in the Temperate Grasslands",
              "Life in the Deserts",
              "On Equality", "Role of the Government in Health", "How the State Government Works",
              "Growing Up as Boys and Girls", "Women Change the World", "Understanding Media",
              "Understanding Advertising", "Markets Around Us", "A Shirt in the Market"
            ]
          },
          {
            id: "hindi",
            name: "Hindi",
            topics: [
              "हम पंछी उन्मुक्त गगन के", "दादी माँ", "हिमालय की बेटियाँ", "कठपुतली", "मिठाईवाला",
              "रक्त और हमारा शरीर", "पापा खो गए", "शाम - एक किसान", "चिड़िया की बच्ची", "अपूर्व अनुभव",
              "रहीम के दोहे", "कंचा", "शक्ति और क्षमा", "एक तिनका", "खानपान की बदलती तस्वीर",
              "नीलकंठ", "भोर और बरखा", "वीर कुँवर सिंह", "संघर्ष के कारण मैं तुनुकमिज़ाज हो गया: धनराज",
              "संज्ञा", "सर्वनाम", "विशेषण", "क्रिया", "काल", "वाच्य", "अव्यय", "उपसर्ग", "प्रत्यय",
              "समास", "पत्र लेखन", "निबंध लेखन", "अनुच्छेद लेखन", "संवाद लेखन"
            ]
          },
          {
            id: "sanskrit",
            name: "Sanskrit",
            topics: [
              "सुभाषितानि", "दुर्बुद्धिः विनश्यति", "स्वावलम्बनम्", "हास्यबालकविसम्मेलनम्", "पण्डिता रमाबाई",
              "सदाचारः", "संकल्पः सिद्धिदायकः", "त्रिवर्णः ध्वजः", "अहमपि विद्यालयं गमिष्यामि", "विश्वबन्धुत्वम्",
              "समुद्रतटः", "विद्याधनम्", "अमृतं संस्कृतम्", "अनारिकायाः जिज्ञासा", "लालनगीतम्",
              "संधि", "समास", "उपसर्ग", "प्रत्यय", "धातुरूपाणि", "शब्दरूपाणि", "कारक", "विभक्ति"
            ]
          }
        ]
      },
      STATE: {
        subjects: [
          {
            id: "english",
            name: "English",
            topics: [
              "Prose Lessons", "Poetry", "Supplementary Reader",
              "Grammar - Parts of Speech", "Tenses", "Voice", "Speech", "Clauses",
              "Comprehension", "Letter Writing", "Essay Writing", "Story Writing", "Diary Entry"
            ]
          },
          {
            id: "math",
            name: "Mathematics",
            topics: [
              "Integers", "Fractions and Decimals", "Rational Numbers", "Simple Equations", "Algebra",
              "Lines and Angles", "Triangles", "Congruence", "Practical Geometry",
              "Perimeter and Area", "Data Handling", "Exponents and Powers", "Symmetry"
            ]
          },
          {
            id: "science",
            name: "Science",
            topics: [
              "Nutrition in Plants and Animals", "Heat and Temperature", "Motion and Time",
              "Acids, Bases and Salts", "Physical and Chemical Changes", "Weather and Climate",
              "Respiration", "Transportation", "Reproduction in Plants", "Electric Current",
              "Light", "Water Resources", "Forests", "Wastewater Management"
            ]
          },
          {
            id: "social",
            name: "Social Science",
            topics: [
              "Medieval History - Delhi Sultanate", "Mughal Empire", "Regional Kingdoms", "Devotional Movements",
              "Geography - Environment", "Earth's Interior", "Landforms", "Climate", "Natural Vegetation",
              "Human Settlements", "Transport and Communication",
              "Civics - Equality", "Government", "Media", "Markets",
              "Economics - Markets and Trade"
            ]
          },
          {
            id: "regional",
            name: "Regional Language",
            topics: [
              "Literature - Prose", "Poetry", "Drama", "Grammar", "Composition",
              "Letter Writing", "Essay Writing", "Story Writing"
            ]
          }
        ]
      }
    }
  },

  CLASS_8: {
    name: "Class 8",
    ageGroup: "12-13 years",
    boards: {
      CBSE: {
        subjects: [
          {
            id: "english",
            name: "English",
            topics: [
              "The Best Christmas Present in the World", "The Tsunami", "Glimpses of the Past", "Bepin Choudhury's Lapse of Memory",
              "The Summit Within", "This is Jody's Fawn", "A Visit to Cambridge", "A Short Monsoon Diary",
              "The Great Stone Face - I", "The Great Stone Face - II",
              "How the Camel Got His Hump", "Children at Work", "The Selfish Giant", "The Treasure Within",
              "Princess September", "The Fight", "The Open Window", "Jalebis", "The Comet - I", "The Comet - II",
              "Ancient Education System of India",
              "Nouns", "Pronouns", "Adjectives", "Verbs", "Adverbs", "Prepositions", "Conjunctions", "Interjections",
              "Tenses", "Active and Passive Voice", "Direct and Indirect Speech", "Clauses", "Transformation of Sentences",
              "Letter Writing - Formal and Informal", "Essay Writing", "Story Writing", "Diary Entry", "Article Writing", "Comprehension"
            ]
          },
          {
            id: "math",
            name: "Mathematics",
            topics: [
              "Rational Numbers", "Linear Equations in One Variable", "Understanding Quadrilaterals", "Practical Geometry",
              "Data Handling", "Squares and Square Roots", "Cubes and Cube Roots", "Comparing Quantities",
              "Algebraic Expressions and Identities", "Mensuration", "Exponents and Powers", "Direct and Inverse Proportions",
              "Factorisation", "Introduction to Graphs", "Playing with Numbers"
            ]
          },
          {
            id: "science",
            name: "Science",
            topics: [
              "Crop Production and Management", "Microorganisms: Friend and Foe", "Synthetic Fibres and Plastics",
              "Materials: Metals and Non-Metals", "Coal and Petroleum", "Combustion and Flame",
              "Conservation of Plants and Animals", "Cell - Structure and Functions", "Reproduction in Animals",
              "Reaching the Age of Adolescence", "Force and Pressure", "Friction", "Sound",
              "Chemical Effects of Electric Current", "Some Natural Phenomena", "Light", "Stars and the Solar System",
              "Pollution of Air and Water"
            ]
          },
          {
            id: "social",
            name: "Social Science",
            topics: [
              "How, When and Where", "From Trade to Territory", "Ruling the Countryside", "Tribals, Dikus and the Vision of a Golden Age",
              "When People Rebel", "Colonialism and the City", "Weavers, Iron Smelters and Factory Owners",
              "Civilising the 'Native', Educating the Nation", "Women, Caste and Reform", "The Changing World of Visual Arts",
              "The Making of the National Movement: 1870s-1947", "India After Independence",
              "Resources", "Land, Soil, Water, Natural Vegetation and Wildlife Resources", "Mineral and Power Resources",
              "Agriculture", "Industries", "Human Resources",
              "The Indian Constitution", "Understanding Secularism", "Why Do We Need a Parliament?",
              "Understanding Laws", "Judiciary", "Understanding Our Criminal Justice System",
              "Understanding Marginalization", "Confronting Marginalization", "Public Facilities", "Law and Social Justice"
            ]
          },
          {
            id: "hindi",
            name: "Hindi",
            topics: [
              "ध्वनि", "लाख की चूड़ियाँ", "बस की यात्रा", "दीवानों की हस्ती", "चिट्ठियों की अनूठी दुनिया",
              "भगवान के डाकिए", "क्या निराश हुआ जाए", "यह सबसे कठिन समय नहीं", "कबीर की साखियाँ",
              "सूरदास के पद", "पानी की कहानी", "बाज और साँप", "टोपी", "ओस की बूँद",
              "संज्ञा", "सर्वनाम", "विशेषण", "क्रिया", "काल", "वाच्य", "अव्यय", "उपसर्ग", "प्रत्यय",
              "समास", "मुहावरे और लोकोक्तियाँ", "पत्र लेखन", "निबंध लेखन", "अनुच्छेद लेखन", "संवाद लेखन", "विज्ञापन लेखन"
            ]
          },
          {
            id: "sanskrit",
            name: "Sanskrit",
            topics: [
              "सुभाषितानि", "बिलस्य वाणी न कदापि मे श्रुता", "डिजीभारतम्", "सदैव पुरतो निधेहि चरणम्",
              "पञ्चतन्त्रात्", "सूक्तयः", "भारतजनताऽहम्", "संसारसागरस्य नायकाः", "सप्तभगिन्यः",
              "नीतिनवनीतम्", "सावित्री बाई फुले", "कर्मवीरकथा", "आर्यभटः", "शास्त्रकाराः",
              "संधि", "समास", "उपसर्ग", "प्रत्यय", "धातुरूपाणि", "शब्दरूपाणि", "कारक", "विभक्ति", "अव्यय"
            ]
          }
        ]
      },
      STATE: {
        subjects: [
          {
            id: "english",
            name: "English",
            topics: [
              "Prose Lessons", "Poetry", "Supplementary Reader",
              "Grammar - Parts of Speech", "Tenses", "Voice", "Speech", "Clauses", "Transformation",
              "Comprehension", "Letter Writing", "Essay Writing", "Story Writing", "Article Writing"
            ]
          },
          {
            id: "math",
            name: "Mathematics",
            topics: [
              "Rational Numbers", "Linear Equations", "Quadrilaterals", "Practical Geometry",
              "Data Handling", "Squares and Square Roots", "Cubes and Cube Roots",
              "Algebraic Expressions", "Mensuration", "Exponents", "Proportions", "Factorisation", "Graphs"
            ]
          },
          {
            id: "science",
            name: "Science",
            topics: [
              "Biology - Crop Production", "Microorganisms", "Cell Structure", "Reproduction", "Adolescence",
              "Physics - Force and Pressure", "Friction", "Sound", "Light", "Electric Current",
              "Chemistry - Metals and Non-metals", "Coal and Petroleum", "Combustion", "Chemical Effects"
            ]
          },
          {
            id: "social",
            name: "Social Science",
            topics: [
              "Modern History - British Rule", "Colonialism", "Nationalism", "Independence",
              "Geography - Resources", "Agriculture", "Industries", "Human Resources",
              "Civics - Constitution", "Secularism", "Parliament", "Judiciary", "Marginalization",
              "Economics - Public Facilities", "Social Justice"
            ]
          },
          {
            id: "regional",
            name: "Regional Language",
            topics: [
              "Literature - Prose", "Poetry", "Drama", "Grammar", "Composition",
              "Letter Writing", "Essay Writing", "Story Writing", "Article Writing"
            ]
          }
        ]
      }
    }
  },

  CLASS_9: {
    name: "Class 9",
    ageGroup: "13-14 years",
    boards: {
      CBSE: {
        subjects: [
          {
            id: "english",
            name: "English",
            topics: [
              "The Fun They Had", "The Sound of Music", "The Little Girl", "A Truly Beautiful Mind",
              "The Snake and the Mirror", "My Childhood", "Reach for the Top", "Kathmandu", "If I Were You",
              "The Road Not Taken", "Wind", "Rain on the Roof", "The Lake Isle of Innisfree", "A Legend of the Northland",
              "No Men Are Foreign", "The Duck and the Kangaroo", "On Killing a Tree", "The Snake Trying", "A Slumber Did My Spirit Seal",
              "The Lost Child", "The Adventures of Toto", "Iswaran the Storyteller", "In the Kingdom of Fools",
              "The Happy Prince", "Weathering the Storm in Ersama", "The Last Leaf", "A House is Not a Home", "The Beggar",
              "Tenses", "Modals", "Determiners", "Subject-Verb Agreement", "Reported Speech", "Commands and Requests",
              "Statements", "Questions", "Clauses", "Relative Pronouns", "Connectors", "Editing", "Omission",
              "Letter Writing - Formal and Informal", "Article Writing", "Diary Entry", "Story Writing", "Descriptive Paragraph", "Comprehension"
            ]
          },
          {
            id: "math",
            name: "Mathematics",
            topics: [
              "Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations in Two Variables",
              "Introduction to Euclid's Geometry", "Lines and Angles", "Triangles", "Quadrilaterals",
              "Areas of Parallelograms and Triangles", "Circles", "Constructions", "Heron's Formula",
              "Surface Areas and Volumes", "Statistics", "Probability"
            ]
          },
          {
            id: "science",
            name: "Science",
            topics: [
              "Matter in Our Surroundings", "Is Matter Around Us Pure", "Atoms and Molecules", "Structure of the Atom",
              "The Fundamental Unit of Life", "Tissues", "Diversity in Living Organisms", "Motion",
              "Force and Laws of Motion", "Gravitation", "Work and Energy", "Sound",
              "Why Do We Fall Ill", "Natural Resources", "Improvement in Food Resources"
            ]
          },
          {
            id: "social",
            name: "Social Science",
            topics: [
              "The French Revolution", "Socialism in Europe and the Russian Revolution", "Nazism and the Rise of Hitler",
              "Forest Society and Colonialism", "Pastoralists in the Modern World",
              "India - Size and Location", "Physical Features of India", "Drainage", "Climate", "Natural Vegetation and Wildlife", "Population",
              "What is Democracy? Why Democracy?", "Constitutional Design", "Electoral Politics", "Working of Institutions", "Democratic Rights",
              "The Story of Village Palampur", "People as Resource", "Poverty as a Challenge", "Food Security in India"
            ]
          },
          {
            id: "hindi",
            name: "Hindi A",
            topics: [
              "दो बैलों की कथा", "ल्हासा की ओर", "उपभोक्तावाद की संस्कृति", "साँवले सपनों की याद", "नाना साहब की पुत्री देवी मैना को भस्म कर दिया गया",
              "प्रेमचंद के फटे जूते", "मेरे बचपन के दिन", "एक कुत्ता और एक मैना",
              "साखियाँ एवं सबद", "वाख", "सवैये", "कैदी और कोकिला", "ग्राम श्री", "चंद्र गहना से लौटती बेर", "मेघ आए", "यमराज की दिशा", "बच्चे काम पर जा रहे हैं",
              "गिल्लू", "स्मृति", "कल्लू कुम्हार की उनाकोटी", "मेरा छोटा सा निजी पुस्तकालय", "हामिद खान की सरताज",
              "संज्ञा", "सर्वनाम", "विशेषण", "क्रिया", "काल", "वाच्य", "अव्यय", "उपसर्ग", "प्रत्यय", "समास",
              "मुहावरे और लोकोक्तियाँ", "पत्र लेखन", "निबंध लेखन", "अनुच्छेद लेखन", "संवाद लेखन", "विज्ञापन लेखन", "सूचना लेखन"
            ]
          },
          {
            id: "it",
            name: "Information Technology",
            topics: [
              "Introduction to IT", "Computer System", "Operating System", "Word Processing", "Spreadsheet",
              "Presentation Software", "Internet Basics", "Email", "Web Browsing", "Cyber Safety", "Digital Footprint"
            ]
          }
        ]
      },
      STATE: {
        subjects: [
          {
            id: "english",
            name: "English",
            topics: [
              "Prose Lessons", "Poetry", "Supplementary Reader",
              "Grammar - Tenses", "Modals", "Voice", "Speech", "Clauses", "Editing",
              "Comprehension", "Letter Writing", "Article Writing", "Story Writing", "Descriptive Writing"
            ]
          },
          {
            id: "math",
            name: "Mathematics",
            topics: [
              "Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations",
              "Euclid's Geometry", "Lines and Angles", "Triangles", "Quadrilaterals", "Circles",
              "Constructions", "Heron's Formula", "Surface Areas and Volumes", "Statistics", "Probability"
            ]
          },
          {
            id: "science",
            name: "Science",
            topics: [
              "Physics - Motion", "Force and Laws of Motion", "Gravitation", "Work and Energy", "Sound",
              "Chemistry - Matter", "Atoms and Molecules", "Structure of Atom",
              "Biology - Cell", "Tissues", "Diversity", "Health", "Natural Resources", "Food Resources"
            ]
          },
          {
            id: "social",
            name: "Social Science",
            topics: [
              "History - French Revolution", "Russian Revolution", "Nazism", "Colonialism",
              "Geography - India - Location, Physical Features, Climate, Vegetation, Population",
              "Civics - Democracy", "Constitution", "Elections", "Institutions", "Rights",
              "Economics - Village Economy", "Poverty", "Food Security"
            ]
          },
          {
            id: "regional",
            name: "Regional Language",
            topics: [
              "Literature - Prose", "Poetry", "Drama", "Grammar", "Composition",
              "Letter Writing", "Essay Writing", "Story Writing", "Article Writing"
            ]
          }
        ]
      }
    }
  },

  CLASS_10: {
    name: "Class 10",
    ageGroup: "14-15 years",
    boards: {
      CBSE: {
        subjects: [
          {
            id: "english",
            name: "English",
            topics: [
              "A Letter to God", "Nelson Mandela: Long Walk to Freedom", "Two Stories about Flying", "From the Diary of Anne Frank",
              "The Hundred Dresses - I", "The Hundred Dresses - II", "Glimpses of India", "Mijbil the Otter",
              "Madam Rides the Bus", "The Sermon at Benares", "The Proposal",
              "Dust of Snow", "Fire and Ice", "A Tiger in the Zoo", "How to Tell Wild Animals", "The Ball Poem",
              "Amanda!", "Animals", "The Trees", "Fog", "The Tale of Custard the Dragon", "For Anne Gregory",
              "A Triumph of Surgery", "The Thief's Story", "The Midnight Visitor", "A Question of Trust",
              "Footprints without Feet", "The Making of a Scientist", "The Necklace", "The Hack Driver", "Bholi", "The Book That Saved the Earth",
              "Tenses", "Modals", "Use of Passive Voice", "Subject-Verb Concord", "Reporting", "Commands and Requests",
              "Statements", "Questions", "Determiners", "Clauses", "Relative Pronouns", "Gap Filling", "Editing", "Omission",
              "Letter Writing - Formal and Informal", "Article Writing", "Report Writing", "Story Writing", "Analytical Paragraph", "Comprehension"
            ]
          },
          {
            id: "math",
            name: "Mathematics",
            topics: [
              "Real Numbers", "Polynomials", "Pair of Linear Equations in Two Variables", "Quadratic Equations",
              "Arithmetic Progressions", "Triangles", "Coordinate Geometry", "Introduction to Trigonometry",
              "Some Applications of Trigonometry", "Circles", "Constructions", "Areas Related to Circles",
              "Surface Areas and Volumes", "Statistics", "Probability"
            ]
          },
          {
            id: "science",
            name: "Science",
            topics: [
              "Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals", "Carbon and its Compounds",
              "Periodic Classification of Elements", "Life Processes", "Control and Coordination", "How do Organisms Reproduce?",
              "Heredity and Evolution", "Light - Reflection and Refraction", "Human Eye and Colourful World",
              "Electricity", "Magnetic Effects of Electric Current", "Sources of Energy", "Our Environment",
              "Sustainable Management of Natural Resources"
            ]
          },
          {
            id: "social",
            name: "Social Science",
            topics: [
              "The Rise of Nationalism in Europe", "Nationalism in India", "The Making of a Global World",
              "The Age of Industrialisation", "Print Culture and the Modern World",
              "Resources and Development", "Forest and Wildlife Resources", "Water Resources", "Agriculture",
              "Minerals and Energy Resources", "Manufacturing Industries", "Lifelines of National Economy",
              "Power Sharing", "Federalism", "Democracy and Diversity", "Gender, Religion and Caste",
              "Popular Struggles and Movements", "Political Parties", "Outcomes of Democracy",
              "Development", "Sectors of the Indian Economy", "Money and Credit", "Globalisation and the Indian Economy",
              "Consumer Rights"
            ]
          },
          {
            id: "hindi",
            name: "Hindi A",
            topics: [
              "सूरदास के पद", "तुलसीदास के पद", "देव", "जयशंकर प्रसाद - आत्मकथ्य", "सूर्यकांत त्रिपाठी 'निराला' - उत्साह और अट नहीं रही",
              "नागार्जुन - यह दंतुरहित मुस्कान और फसल", "गिरिजा कुमार माथुर - छाया मत छूना", "ऋतुराज - कन्यादान", "मंगलेश डबराल - संगतकार",
              "नेताजी का चश्मा", "बालगोबिन भगत", "लखनवी अंदाज", "मानवीय करुणा की दिव्य चमक", "एक कहानी यह भी",
              "स्त्री शिक्षा के विरोधी कुतर्कों का खंडन", "नौबतखाने में इबादत", "संस्कृति",
              "हरिहर काका", "सपनों के-से दिन", "टोपी शुक्ला",
              "संज्ञा", "सर्वनाम", "विशेषण", "क्रिया", "काल", "वाच्य", "अव्यय", "उपसर्ग", "प्रत्यय", "समास",
              "मुहावरे और लोकोक्तियाँ", "पत्र लेखन", "निबंध लेखन", "अनुच्छेद लेखन", "संवाद लेखन", "विज्ञापन लेखन", "सूचना लेखन", "लघुकथा लेखन"
            ]
          },
          {
            id: "it",
            name: "Information Technology",
            topics: [
              "Communication Skills", "Self-Management Skills", "ICT Skills", "Entrepreneurial Skills", "Green Skills",
              "Introduction to IT-ITeS Industry", "Data Entry and Keyboarding Skills", "Digital Documentation",
              "Electronic Spreadsheet", "Digital Presentation", "Introduction to Internet and WWW",
              "Email and Social Networking", "E-Commerce", "Digital Financial Tools and Applications",
              "Overview of Programming", "Problem Solving", "Introduction to Python", "Database Management System"
            ]
          }
        ]
      },
      STATE: {
        subjects: [
          {
            id: "english",
            name: "English",
            topics: [
              "Prose Lessons", "Poetry", "Supplementary Reader",
              "Grammar - Tenses", "Modals", "Voice", "Speech", "Clauses", "Editing", "Gap Filling",
              "Comprehension", "Letter Writing", "Article Writing", "Report Writing", "Story Writing", "Analytical Paragraph"
            ]
          },
          {
            id: "math",
            name: "Mathematics",
            topics: [
              "Real Numbers", "Polynomials", "Linear Equations", "Quadratic Equations", "Arithmetic Progressions",
              "Triangles", "Coordinate Geometry", "Trigonometry", "Applications of Trigonometry", "Circles",
              "Constructions", "Areas Related to Circles", "Surface Areas and Volumes", "Statistics", "Probability"
            ]
          },
          {
            id: "science",
            name: "Science",
            topics: [
              "Physics - Light", "Human Eye", "Electricity", "Magnetic Effects",
              "Chemistry - Chemical Reactions", "Acids and Bases", "Metals", "Carbon Compounds", "Periodic Table",
              "Biology - Life Processes", "Control and Coordination", "Reproduction", "Heredity and Evolution",
              "Environment - Energy Sources", "Environment", "Natural Resources"
            ]
          },
          {
            id: "social",
            name: "Social Science",
            topics: [
              "History - Nationalism in Europe and India", "Globalization", "Industrialization", "Print Culture",
              "Geography - Resources", "Agriculture", "Industries", "Transport and Communication",
              "Civics - Power Sharing", "Federalism", "Democracy", "Political Parties",
              "Economics - Development", "Sectors of Economy", "Money and Credit", "Globalization", "Consumer Rights"
            ]
          },
          {
            id: "regional",
            name: "Regional Language",
            topics: [
              "Literature - Prose", "Poetry", "Drama", "Grammar", "Composition",
              "Letter Writing", "Essay Writing", "Story Writing", "Article Writing", "Report Writing"
            ]
          }
        ]
      }
    }
  },

  CLASS_11: {
    name: "Class 11",
    ageGroup: "15-16 years",
    boards: {
      CBSE: {
        streams: {
          SCIENCE: {
            subjects: [
              {
                id: "physics",
                name: "Physics",
                topics: [
                  "Physical World", "Units and Measurements", "Motion in a Straight Line", "Motion in a Plane",
                  "Laws of Motion", "Work, Energy and Power", "System of Particles and Rotational Motion",
                  "Gravitation", "Mechanical Properties of Solids", "Mechanical Properties of Fluids",
                  "Thermal Properties of Matter", "Thermodynamics", "Kinetic Theory", "Oscillations", "Waves"
                ]
              },
              {
                id: "chemistry",
                name: "Chemistry",
                topics: [
                  "Some Basic Concepts of Chemistry", "Structure of Atom", "Classification of Elements and Periodicity in Properties",
                  "Chemical Bonding and Molecular Structure", "States of Matter", "Thermodynamics", "Equilibrium",
                  "Redox Reactions", "Hydrogen", "The s-Block Elements", "The p-Block Elements",
                  "Organic Chemistry - Some Basic Principles and Techniques", "Hydrocarbons", "Environmental Chemistry"
                ]
              },
              {
                id: "math",
                name: "Mathematics",
                topics: [
                  "Sets", "Relations and Functions", "Trigonometric Functions", "Principle of Mathematical Induction",
                  "Complex Numbers and Quadratic Equations", "Linear Inequalities", "Permutations and Combinations",
                  "Binomial Theorem", "Sequences and Series", "Straight Lines", "Conic Sections",
                  "Introduction to Three Dimensional Geometry", "Limits and Derivatives", "Mathematical Reasoning",
                  "Statistics", "Probability"
                ]
              },
              {
                id: "biology",
                name: "Biology",
                topics: [
                  "The Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom",
                  "Morphology of Flowering Plants", "Anatomy of Flowering Plants", "Structural Organisation in Animals",
                  "Cell: The Unit of Life", "Biomolecules", "Cell Cycle and Cell Division",
                  "Transport in Plants", "Mineral Nutrition", "Photosynthesis in Higher Plants", "Respiration in Plants", "Plant Growth and Development",
                  "Digestion and Absorption", "Breathing and Exchange of Gases", "Body Fluids and Circulation",
                  "Excretory Products and their Elimination", "Locomotion and Movement", "Neural Control and Coordination",
                  "Chemical Coordination and Integration"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "The Portrait of a Lady", "We're Not Afraid to Die... if We Can All Be Together", "Discovering Tut: the Saga Continues",
                  "Landscape of the Soul", "The Ailing Planet: the Green Movement's Role", "The Browning Version", "The Adventure",
                  "Silk Road", "The Summer of the Beautiful White Horse", "The Address", "Ranga's Marriage",
                  "Albert Einstein at School", "Mother's Day", "The Ghat of the Only World", "Birth",
                  "A Photograph", "The Laburnum Top", "The Voice of the Rain", "Childhood", "Father to Son",
                  "Note Making", "Summarizing", "Letter Writing", "Article Writing", "Report Writing", "Notice Writing",
                  "Poster Making", "Advertisement", "Debate", "Speech Writing"
                ]
              },
              {
                id: "cs",
                name: "Computer Science",
                topics: [
                  "Computer System and Organisation", "Computational Thinking and Programming - I",
                  "Introduction to Python", "Getting Started with Python", "Data Types", "Operators", "Flow of Control",
                  "Strings", "Lists", "Tuples", "Dictionary", "Introduction to Emerging Trends"
                ]
              }
            ]
          },
          COMMERCE: {
            subjects: [
              {
                id: "accountancy",
                name: "Accountancy",
                topics: [
                  "Introduction to Accounting", "Theory Base of Accounting", "Recording of Transactions - I",
                  "Recording of Transactions - II", "Bank Reconciliation Statement", "Trial Balance and Rectification of Errors",
                  "Depreciation, Provisions and Reserves", "Bills of Exchange", "Financial Statements - I",
                  "Financial Statements - II", "Accounts from Incomplete Records", "Applications of Computers in Accounting",
                  "Computerised Accounting System"
                ]
              },
              {
                id: "business",
                name: "Business Studies",
                topics: [
                  "Nature and Purpose of Business", "Forms of Business Organisation", "Public, Private and Global Enterprises",
                  "Business Services", "Emerging Modes of Business", "Social Responsibilities of Business and Business Ethics",
                  "Formation of a Company", "Sources of Business Finance", "Small Business and Entrepreneurship",
                  "Internal Trade", "International Business", "International Business - II"
                ]
              },
              {
                id: "economics",
                name: "Economics",
                topics: [
                  "Introduction to Microeconomics", "Theory of Consumer Behaviour", "Production and Costs",
                  "The Theory of the Firm under Perfect Competition", "Market Equilibrium", "Non-competitive Markets",
                  "Indian Economy on the Eve of Independence", "Indian Economy 1950-1990", "Liberalisation, Privatisation and Globalisation",
                  "Poverty", "Human Capital Formation in India", "Rural Development", "Employment: Growth, Informalisation and Related Issues",
                  "Infrastructure", "Sustainable Economic Development", "Development Experience of India", "Comparative Development Experiences"
                ]
              },
              {
                id: "math",
                name: "Mathematics",
                topics: [
                  "Sets", "Relations and Functions", "Trigonometric Functions", "Principle of Mathematical Induction",
                  "Complex Numbers and Quadratic Equations", "Linear Inequalities", "Permutations and Combinations",
                  "Binomial Theorem", "Sequences and Series", "Straight Lines", "Conic Sections",
                  "Introduction to Three Dimensional Geometry", "Limits and Derivatives", "Mathematical Reasoning",
                  "Statistics", "Probability", "Linear Programming"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "The Portrait of a Lady", "We're Not Afraid to Die... if We Can All Be Together", "Discovering Tut: the Saga Continues",
                  "Landscape of the Soul", "The Ailing Planet: the Green Movement's Role", "The Browning Version", "The Adventure",
                  "Silk Road", "The Summer of the Beautiful White Horse", "The Address", "Ranga's Marriage",
                  "Albert Einstein at School", "Mother's Day", "The Ghat of the Only World", "Birth",
                  "Note Making", "Summarizing", "Letter Writing", "Article Writing", "Report Writing", "Notice Writing"
                ]
              }
            ]
          },
          ARTS: {
            subjects: [
              {
                id: "history",
                name: "History",
                topics: [
                  "From the Beginning of Time", "Writing and City Life", "An Empire Across Three Continents",
                  "The Central Islamic Lands", "Nomadic Empires", "The Three Orders", "Changing Cultural Traditions",
                  "Confrontation of Cultures", "Paths to Modernisation", "Displacing Indigenous Peoples",
                  "Towards Modernisation"
                ]
              },
              {
                id: "geography",
                name: "Geography",
                topics: [
                  "Geography as a Discipline", "The Origin and Evolution of the Earth", "Interior of the Earth",
                  "Distribution of Oceans and Continents", "Minerals and Rocks", "Geomorphic Processes",
                  "Landforms and their Evolution", "Composition and Structure of Atmosphere", "Solar Radiation, Heat Balance and Temperature",
                  "Atmospheric Circulation and Weather Systems", "Water in the Atmosphere", "World Climate and Climate Change",
                  "Water (Oceans)", "Movements of Ocean Water", "Life on the Earth", "Biodiversity and Conservation",
                  "Indian Location", "Structure and Physiography", "Drainage System", "Climate", "Natural Vegetation",
                  "Soils", "Natural Hazards and Disasters"
                ]
              },
              {
                id: "political",
                name: "Political Science",
                topics: [
                  "Political Theory: An Introduction", "Freedom", "Equality", "Social Justice", "Rights", "Citizenship",
                  "Nationalism", "Secularism", "Peace", "Development",
                  "Constitution: Why and How?", "Rights in the Indian Constitution", "Election and Representation",
                  "Executive", "Legislature", "Judiciary", "Federalism", "Local Governments", "Constitution as a Living Document",
                  "The Philosophy of the Constitution"
                ]
              },
              {
                id: "economics",
                name: "Economics",
                topics: [
                  "Introduction to Statistics", "Collection of Data", "Organisation of Data", "Presentation of Data",
                  "Measures of Central Tendency", "Measures of Dispersion", "Correlation", "Index Numbers", "Use of Statistical Tools",
                  "Indian Economy on the Eve of Independence", "Indian Economy 1950-1990", "Liberalisation, Privatisation and Globalisation",
                  "Poverty", "Human Capital Formation in India", "Rural Development", "Employment", "Infrastructure",
                  "Sustainable Economic Development", "Development Experience of India"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "The Portrait of a Lady", "We're Not Afraid to Die... if We Can All Be Together", "Discovering Tut: the Saga Continues",
                  "Landscape of the Soul", "The Ailing Planet: the Green Movement's Role", "The Browning Version", "The Adventure",
                  "Silk Road", "The Summer of the Beautiful White Horse", "The Address", "Ranga's Marriage",
                  "Note Making", "Summarizing", "Letter Writing", "Article Writing", "Report Writing"
                ]
              },
              {
                id: "sociology",
                name: "Sociology",
                topics: [
                  "Sociology and Society", "Terms, Concepts and their Use in Sociology", "Understanding Social Institutions",
                  "Culture and Socialisation", "Doing Sociology: Research Methods", "Social Structure, Stratification and Social Processes in Society",
                  "Rural and Urban Society", "Environment and Society", "Introducing Western Sociologists",
                  "Indian Sociologists"
                ]
              }
            ]
          }
        }
      },
      STATE: {
        streams: {
          SCIENCE: {
            subjects: [
              {
                id: "physics",
                name: "Physics",
                topics: [
                  "Mechanics - Units, Motion, Laws of Motion, Work and Energy, Rotational Motion, Gravitation",
                  "Properties of Matter - Solids, Fluids", "Thermodynamics - Heat, Kinetic Theory",
                  "Oscillations and Waves"
                ]
              },
              {
                id: "chemistry",
                name: "Chemistry",
                topics: [
                  "Basic Concepts", "Atomic Structure", "Periodic Table", "Chemical Bonding", "States of Matter",
                  "Thermodynamics", "Equilibrium", "Redox Reactions", "Hydrogen", "s-Block Elements", "p-Block Elements",
                  "Organic Chemistry Basics", "Hydrocarbons"
                ]
              },
              {
                id: "math",
                name: "Mathematics",
                topics: [
                  "Sets and Relations", "Functions", "Trigonometry", "Complex Numbers", "Inequalities",
                  "Permutations and Combinations", "Binomial Theorem", "Sequences and Series",
                  "Coordinate Geometry - Lines, Circles, Conic Sections", "3D Geometry", "Calculus - Limits and Derivatives",
                  "Statistics", "Probability"
                ]
              },
              {
                id: "biology",
                name: "Biology",
                topics: [
                  "Diversity of Living World", "Plant Kingdom", "Animal Kingdom", "Morphology and Anatomy",
                  "Cell Biology", "Biomolecules", "Cell Division", "Plant Physiology", "Human Physiology"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "Literature - Prose", "Poetry", "Drama", "Grammar", "Composition",
                  "Letter Writing", "Article Writing", "Report Writing"
                ]
              },
              {
                id: "regional",
                name: "Regional Language",
                topics: [
                  "Literature - Prose", "Poetry", "Grammar", "Composition"
                ]
              }
            ]
          },
          COMMERCE: {
            subjects: [
              {
                id: "accountancy",
                name: "Accountancy",
                topics: [
                  "Introduction to Accounting", "Accounting Principles", "Recording Transactions", "Journal and Ledger",
                  "Trial Balance", "Financial Statements", "Bank Reconciliation", "Depreciation", "Bills of Exchange"
                ]
              },
              {
                id: "business",
                name: "Business Studies",
                topics: [
                  "Nature of Business", "Forms of Business Organization", "Public and Private Enterprises",
                  "Business Services", "Emerging Business Modes", "Social Responsibility", "Company Formation",
                  "Business Finance", "Small Business", "Trade"
                ]
              },
              {
                id: "economics",
                name: "Economics",
                topics: [
                  "Microeconomics - Consumer Behavior", "Production", "Costs", "Market Forms", "Competition",
                  "Macroeconomics - National Income", "Money", "Banking", "Indian Economy - Development, Poverty, Employment"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "Literature - Prose", "Poetry", "Grammar", "Composition",
                  "Letter Writing", "Article Writing", "Report Writing"
                ]
              },
              {
                id: "regional",
                name: "Regional Language",
                topics: [
                  "Literature - Prose", "Poetry", "Grammar", "Composition"
                ]
              }
            ]
          },
          ARTS: {
            subjects: [
              {
                id: "history",
                name: "History",
                topics: [
                  "Ancient History - Prehistoric Times", "Indus Valley", "Vedic Period", "Mauryan Empire",
                  "Medieval History - Delhi Sultanate", "Mughal Empire", "Regional Kingdoms",
                  "Modern History - British Rule", "Freedom Struggle"
                ]
              },
              {
                id: "geography",
                name: "Geography",
                topics: [
                  "Physical Geography - Earth, Atmosphere, Climate, Oceans, Landforms",
                  "Human Geography - Population, Settlement, Resources",
                  "Indian Geography - Physical Features, Climate, Resources"
                ]
              },
              {
                id: "political",
                name: "Political Science",
                topics: [
                  "Political Theory - Freedom, Equality, Justice, Rights, Citizenship",
                  "Indian Constitution - Features, Rights, Institutions, Federalism"
                ]
              },
              {
                id: "economics",
                name: "Economics",
                topics: [
                  "Statistics - Data Collection, Presentation, Central Tendency, Dispersion",
                  "Indian Economy - Development, Poverty, Employment, Infrastructure"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "Literature - Prose", "Poetry", "Drama", "Grammar", "Composition",
                  "Letter Writing", "Article Writing", "Report Writing"
                ]
              },
              {
                id: "regional",
                name: "Regional Language",
                topics: [
                  "Literature - Prose", "Poetry", "Grammar", "Composition"
                ]
              }
            ]
          }
        }
      }
    }
  },

  CLASS_12: {
    name: "Class 12",
    ageGroup: "16-17 years",
    boards: {
      CBSE: {
        streams: {
          SCIENCE: {
            subjects: [
              {
                id: "physics",
                name: "Physics",
                topics: [
                  "Electric Charges and Fields", "Electrostatic Potential and Capacitance", "Current Electricity",
                  "Moving Charges and Magnetism", "Magnetism and Matter", "Electromagnetic Induction",
                  "Alternating Current", "Electromagnetic Waves", "Ray Optics and Optical Instruments",
                  "Wave Optics", "Dual Nature of Radiation and Matter", "Atoms", "Nuclei",
                  "Semiconductor Electronics: Materials, Devices and Simple Circuits", "Communication Systems"
                ]
              },
              {
                id: "chemistry",
                name: "Chemistry",
                topics: [
                  "The Solid State", "Solutions", "Electrochemistry", "Chemical Kinetics", "Surface Chemistry",
                  "General Principles and Processes of Isolation of Elements", "The p-Block Elements",
                  "The d- and f-Block Elements", "Coordination Compounds", "Haloalkanes and Haloarenes",
                  "Alcohols, Phenols and Ethers", "Aldehydes, Ketones and Carboxylic Acids", "Amines",
                  "Biomolecules", "Polymers", "Chemistry in Everyday Life"
                ]
              },
              {
                id: "math",
                name: "Mathematics",
                topics: [
                  "Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants",
                  "Continuity and Differentiability", "Application of Derivatives", "Integrals",
                  "Application of Integrals", "Differential Equations", "Vector Algebra",
                  "Three Dimensional Geometry", "Linear Programming", "Probability"
                ]
              },
              {
                id: "biology",
                name: "Biology",
                topics: [
                  "Reproduction in Organisms", "Sexual Reproduction in Flowering Plants", "Human Reproduction",
                  "Reproductive Health", "Principles of Inheritance and Variation", "Molecular Basis of Inheritance",
                  "Evolution", "Human Health and Disease", "Strategies for Enhancement in Food Production",
                  "Microbes in Human Welfare", "Biotechnology: Principles and Processes", "Biotechnology and its Applications",
                  "Organisms and Populations", "Ecosystem", "Biodiversity and Conservation", "Environmental Issues"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "The Last Lesson", "Lost Spring", "Deep Water", "The Rattrap", "Indigo", "Poets and Pancakes",
                  "The Interview", "Going Places", "My Mother at Sixty-six", "An Elementary School Classroom in a Slum",
                  "Keeping Quiet", "A Thing of Beauty", "A Roadside Stand", "Aunt Jennifer's Tigers",
                  "The Third Level", "The Tiger King", "The Enemy", "On the Face of It", "Evans Tries an O-Level",
                  "Memories of Childhood", "Note Making", "Summarizing", "Letter Writing", "Article Writing",
                  "Report Writing", "Notice Writing", "Poster Making", "Advertisement"
                ]
              },
              {
                id: "cs",
                name: "Computer Science",
                topics: [
                  "Computational Thinking and Programming - II", "Python Revision", "Functions", "File Handling",
                  "Data Structure - Stack", "Data Structure - Queue", "Computer Networks", "Database Management",
                  "Structured Query Language (SQL)", "Interface Python with SQL", "Data Visualization",
                  "Boolean Algebra", "Communication and Network Concepts", "Societal Impacts"
                ]
              }
            ]
          },
          COMMERCE: {
            subjects: [
              {
                id: "accountancy",
                name: "Accountancy",
                topics: [
                  "Accounting for Partnership: Basic Concepts", "Goodwill: Nature and Valuation", "Change in Profit-Sharing Ratio among the Existing Partners",
                  "Admission of a Partner", "Retirement/Death of a Partner", "Dissolution of Partnership Firm",
                  "Accounting for Share Capital", "Issue and Redemption of Debentures", "Financial Statements of a Company",
                  "Analysis of Financial Statements", "Comparative Statements", "Common-Size Statements",
                  "Accounting Ratios", "Cash Flow Statement"
                ]
              },
              {
                id: "business",
                name: "Business Studies",
                topics: [
                  "Nature and Significance of Management", "Principles of Management", "Business Environment",
                  "Planning", "Organising", "Staffing", "Directing", "Controlling",
                  "Financial Management", "Financial Markets", "Marketing Management", "Consumer Protection"
                ]
              },
              {
                id: "economics",
                name: "Economics",
                topics: [
                  "Introduction to Microeconomics", "Consumer Equilibrium and Demand", "Producer Behaviour and Supply",
                  "Forms of Market and Price Determination", "Simple Applications of Tools of Demand and Supply",
                  "National Income and Related Aggregates", "Money and Banking", "Determination of Income and Employment",
                  "Government Budget and the Economy", "Balance of Payments",
                  "Indian Economy on the Eve of Independence", "Indian Economy 1950-1990", "Liberalisation, Privatisation and Globalisation",
                  "Poverty", "Human Capital Formation in India", "Rural Development", "Employment",
                  "Infrastructure", "Sustainable Economic Development", "Development Experience of India"
                ]
              },
              {
                id: "math",
                name: "Mathematics",
                topics: [
                  "Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants",
                  "Continuity and Differentiability", "Application of Derivatives", "Integrals",
                  "Application of Integrals", "Differential Equations", "Vector Algebra",
                  "Three Dimensional Geometry", "Linear Programming", "Probability"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "The Last Lesson", "Lost Spring", "Deep Water", "The Rattrap", "Indigo", "Poets and Pancakes",
                  "The Interview", "Going Places", "My Mother at Sixty-six", "Keeping Quiet", "A Thing of Beauty",
                  "Note Making", "Summarizing", "Letter Writing", "Article Writing", "Report Writing"
                ]
              },
              {
                id: "entrepreneurship",
                name: "Entrepreneurship",
                topics: [
                  "Entrepreneurial Opportunity", "Entrepreneurship Development", "Enterprise Planning and Resourcing",
                  "Enterprise Marketing", "Enterprise Growth Strategies", "Business Arithmetic"
                ]
              }
            ]
          },
          ARTS: {
            subjects: [
              {
                id: "history",
                name: "History",
                topics: [
                  "Bricks, Beads and Bones: The Harappan Civilisation", "Kings, Farmers and Towns: Early States and Economies",
                  "Kinship, Caste and Class: Early Societies", "Thinkers, Beliefs and Buildings: Cultural Developments",
                  "Through the Eyes of Travellers: Perceptions of Society", "Bhakti-Sufi Traditions: Changes in Religious Beliefs and Devotional Texts",
                  "An Imperial Capital: Vijayanagara", "Peasants, Zamindars and the State: Agrarian Society and the Mughal Empire",
                  "Kings and Chronicles: The Mughal Courts", "Colonialism and the Countryside: Exploring Official Archives",
                  "Rebels and the Raj: The Revolt of 1857 and its Representations", "Colonial Cities: Urbanisation, Planning and Architecture",
                  "Mahatma Gandhi and the Nationalist Movement: Civil Disobedience and Beyond",
                  "Framing the Constitution: The Beginning of a New Era", "Understanding Partition: Politics, Memories, Experiences"
                ]
              },
              {
                id: "geography",
                name: "Geography",
                topics: [
                  "Human Geography: Nature and Scope", "The World Population: Distribution, Density and Growth",
                  "Population Composition", "Human Development", "Primary Activities", "Secondary Activities",
                  "Tertiary and Quaternary Activities", "Transport and Communication", "International Trade",
                  "Human Settlements", "Data Processing", "Thematic Maps",
                  "Population: Distribution, Density, Growth and Composition", "Migration: Types, Causes and Consequences",
                  "Human Settlements", "Land Resources and Agriculture", "Water Resources", "Mineral and Energy Resources",
                  "Planning and Sustainable Development in Indian Context", "Transport and Communication",
                  "International Trade", "Geographical Perspective on Selected Issues and Problems"
                ]
              },
              {
                id: "political",
                name: "Political Science",
                topics: [
                  "The Cold War Era", "The End of Bipolarity", "US Hegemony in World Politics", "Alternative Centres of Power",
                  "Contemporary South Asia", "International Organisations", "Security in the Contemporary World",
                  "Environment and Natural Resources", "Globalisation",
                  "Challenges of Nation-Building", "Era of One-Party Dominance", "Politics of Planned Development",
                  "India's External Relations", "Challenges to and Restoration of the Congress System",
                  "The Crisis of Democratic Order", "Popular Movements", "Regional Aspirations",
                  "Recent Developments in Indian Politics"
                ]
              },
              {
                id: "economics",
                name: "Economics",
                topics: [
                  "Introduction to Microeconomics", "Consumer Equilibrium and Demand", "Producer Behaviour and Supply",
                  "Forms of Market and Price Determination",
                  "National Income and Related Aggregates", "Money and Banking", "Determination of Income and Employment",
                  "Government Budget and the Economy", "Balance of Payments",
                  "Indian Economy on the Eve of Independence", "Indian Economy 1950-1990", "Liberalisation, Privatisation and Globalisation",
                  "Poverty", "Human Capital Formation in India", "Rural Development", "Employment",
                  "Infrastructure", "Sustainable Economic Development", "Development Experience of India"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "The Last Lesson", "Lost Spring", "Deep Water", "The Rattrap", "Indigo", "Poets and Pancakes",
                  "The Interview", "Going Places", "My Mother at Sixty-six", "Keeping Quiet", "A Thing of Beauty",
                  "Note Making", "Summarizing", "Letter Writing", "Article Writing", "Report Writing"
                ]
              },
              {
                id: "psychology",
                name: "Psychology",
                topics: [
                  "What is Psychology?", "Methods of Enquiry in Psychology", "The Bases of Human Behaviour",
                  "Human Development", "Sensory, Attentional and Perceptual Processes", "Learning",
                  "Human Memory", "Thinking", "Motivation and Emotion", "Intelligence and Aptitude",
                  "Self and Personality", "Attitude and Social Cognition", "Interpersonal Attraction and Close Relationships",
                  "Social Influence and Group Processes", "Psychology and Life", "Psychological Disorders",
                  "Therapeutic Approaches", "Rehabilitation of the Mentally Ill"
                ]
              },
              {
                id: "sociology",
                name: "Sociology",
                topics: [
                  "Introducing Indian Society", "The Demographic Structure of the Indian Society",
                  "Social Institutions: Continuity and Change", "The Market as a Social Institution",
                  "Patterns of Social Inequality and Exclusion", "The Challenges of Cultural Diversity",
                  "Structural Change", "Cultural Change", "The Story of Indian Democracy",
                  "Change and Development in Rural Society", "Change and Development in Industrial Society",
                  "Globalisation and Social Change", "Mass Media and Communications", "Social Movements"
                ]
              }
            ]
          }
        }
      },
      STATE: {
        streams: {
          SCIENCE: {
            subjects: [
              {
                id: "physics",
                name: "Physics",
                topics: [
                  "Electricity and Magnetism - Electric Charges, Current, Magnetism, Electromagnetic Induction, AC",
                  "Optics - Ray Optics, Wave Optics", "Modern Physics - Dual Nature, Atoms, Nuclei, Semiconductors",
                  "Electronics and Communication"
                ]
              },
              {
                id: "chemistry",
                name: "Chemistry",
                topics: [
                  "Physical Chemistry - Solid State, Solutions, Electrochemistry, Kinetics, Surface Chemistry",
                  "Inorganic Chemistry - Metallurgy, p-Block, d-Block, f-Block, Coordination Compounds",
                  "Organic Chemistry - Haloalkanes, Alcohols, Aldehydes, Ketones, Carboxylic Acids, Amines, Biomolecules, Polymers"
                ]
              },
              {
                id: "math",
                name: "Mathematics",
                topics: [
                  "Relations and Functions", "Inverse Trigonometry", "Matrices", "Determinants",
                  "Calculus - Continuity, Differentiation, Integration, Differential Equations",
                  "Vectors", "3D Geometry", "Linear Programming", "Probability"
                ]
              },
              {
                id: "biology",
                name: "Biology",
                topics: [
                  "Reproduction - Organisms, Plants, Humans", "Genetics - Inheritance, Molecular Basis, Evolution",
                  "Biology and Human Welfare - Health, Food Production, Microbes", "Biotechnology",
                  "Ecology - Organisms, Ecosystem, Biodiversity, Environment"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "Literature - Prose", "Poetry", "Drama", "Grammar", "Composition",
                  "Letter Writing", "Article Writing", "Report Writing"
                ]
              },
              {
                id: "regional",
                name: "Regional Language",
                topics: [
                  "Literature - Prose", "Poetry", "Grammar", "Composition"
                ]
              }
            ]
          },
          COMMERCE: {
            subjects: [
              {
                id: "accountancy",
                name: "Accountancy",
                topics: [
                  "Partnership Accounts - Goodwill, Admission, Retirement, Dissolution",
                  "Company Accounts - Share Capital, Debentures, Financial Statements",
                  "Financial Analysis - Comparative Statements, Ratios, Cash Flow"
                ]
              },
              {
                id: "business",
                name: "Business Studies",
                topics: [
                  "Management Principles - Nature, Principles, Environment, Planning, Organizing, Staffing, Directing, Controlling",
                  "Financial Management", "Marketing Management", "Consumer Protection"
                ]
              },
              {
                id: "economics",
                name: "Economics",
                topics: [
                  "Microeconomics - Consumer Equilibrium, Producer Behavior, Market Forms",
                  "Macroeconomics - National Income, Money, Banking, Income Determination, Government Budget, Balance of Payments",
                  "Indian Economy - Development, Poverty, Employment, Infrastructure"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "Literature - Prose", "Poetry", "Grammar", "Composition",
                  "Letter Writing", "Article Writing", "Report Writing"
                ]
              },
              {
                id: "regional",
                name: "Regional Language",
                topics: [
                  "Literature - Prose", "Poetry", "Grammar", "Composition"
                ]
              }
            ]
          },
          ARTS: {
            subjects: [
              {
                id: "history",
                name: "History",
                topics: [
                  "Ancient India - Harappan Civilization, Vedic Period, Mauryan Empire, Gupta Period",
                  "Medieval India - Delhi Sultanate, Mughal Empire, Regional Kingdoms",
                  "Modern India - British Rule, Freedom Struggle, Independence, Post-Independence",
                  "World History - World Wars, Cold War, Decolonization"
                ]
              },
              {
                id: "geography",
                name: "Geography",
                topics: [
                  "Human Geography - Population, Migration, Settlements, Economic Activities, Transport, Trade",
                  "Economic Geography - Agriculture, Industries, Resources",
                  "Indian Geography - Population, Resources, Agriculture, Industries, Transport"
                ]
              },
              {
                id: "political",
                name: "Political Science",
                topics: [
                  "International Relations - Cold War, Globalization, International Organizations, Security",
                  "Indian Politics - Nation Building, Democracy, Political Parties, Movements, Recent Developments",
                  "Public Administration"
                ]
              },
              {
                id: "economics",
                name: "Economics",
                topics: [
                  "Microeconomics", "Macroeconomics", "Development Economics", "Indian Economy"
                ]
              },
              {
                id: "english",
                name: "English",
                topics: [
                  "Literature - Prose", "Poetry", "Drama", "Grammar", "Composition",
                  "Letter Writing", "Article Writing", "Report Writing"
                ]
              },
              {
                id: "regional",
                name: "Regional Language",
                topics: [
                  "Literature - Prose", "Poetry", "Grammar", "Composition"
                ]
              }
            ]
          }
        }
      }
    }
  }
};


// Helper functions to access curriculum data
export const getCurriculumByClass = (className) => {
  return CURRICULUM_STRUCTURE[className];
};

export const getCurriculumByClassAndBoard = (className, board) => {
  const classData = CURRICULUM_STRUCTURE[className];
  return classData?.boards?.[board];
};

export const getCurriculumByClassBoardAndStream = (className, board, stream) => {
  const boardData = getCurriculumByClassAndBoard(className, board);
  return boardData?.streams?.[stream] || boardData;
};

export const getAllClasses = () => {
  return Object.keys(CURRICULUM_STRUCTURE);
};

export const getClassesByLevel = () => {
  return {
    prePrimary: ['LKG', 'UKG'],
    primary: ['CLASS_1', 'CLASS_2', 'CLASS_3', 'CLASS_4', 'CLASS_5'],
    middle: ['CLASS_6', 'CLASS_7', 'CLASS_8'],
    secondary: ['CLASS_9', 'CLASS_10'],
    seniorSecondary: ['CLASS_11', 'CLASS_12']
  };
};

export const getSubjectsByClassAndBoard = (className, board, stream = null) => {
  const boardData = getCurriculumByClassAndBoard(className, board);

  // For classes with streams (11 & 12), we need to check if stream is provided
  if (boardData?.streams) {
    if (!stream) {
      // If no stream selected, return empty array
      return [];
    }
    // Return subjects for the selected stream
    return boardData.streams[stream]?.subjects || [];
  }

  // For classes without streams, return subjects directly
  return boardData?.subjects || [];
};

export const getAvailableStreams = (className, board) => {
  const boardData = getCurriculumByClassAndBoard(className, board);
  return boardData?.streams ? Object.keys(boardData.streams) : null;
};
