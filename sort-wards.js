const fs = require('fs');
const path = require('path');

// Read the original file
const enFilePath = path.join(__dirname, 'hcm-city-guide/src/assets/i18n/wards/wards.en.json');
const viFilePath = path.join(__dirname, 'hcm-city-guide/src/assets/i18n/wards/wards.vi.json');
const data = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));

// Create Vietnamese version
const viData = JSON.parse(JSON.stringify(data)); // Deep clone

// Define Vietnamese translations
const viTranslations = {
  provinces: {
    'Ba Ria - Vung Tau': 'tỉnh Bà Rịa - Vũng Tàu',
    'Binh Duong': 'tỉnh Bình Dương',
    'Ho Chi Minh City': 'TP. Hồ Chí Minh'
  },
  features: {
    'FEATURES.HISTORIC_SITE': 'FEATURES.DI_TICH_LICH_SU',
    'FEATURES.NATIONAL_PARK': 'FEATURES.VUON_QUOC_GIA',
    'FEATURES.TOURIST_ATTRACTION': 'FEATURES.DIEM_DU_LICH',
    'FEATURES.MARINE_CONSERVATION': 'FEATURES.BAO_TON_BIEN',
    'FEATURES.COMMERCIAL_HUB': 'FEATURES.TRUNG_TAM_THUONG_MAI',
    'FEATURES.TRADITIONAL_MARKET': 'FEATURES.CHO_TRUYEN_THONG',
    'FEATURES.CULTURAL_HERITAGE': 'FEATURES.DI_SAN_VAN_HOA',
    'FEATURES.RESIDENTIAL_AREA': 'FEATURES.KHU_DAN_CU',
    'FEATURES.WATERFRONT': 'FEATURES.VEN_SONG',
    'FEATURES.COMMUNITY_CENTER': 'FEATURES.TRUNG_TAM_CONG_DONG',
    'FEATURES.INDUSTRIAL_ZONE': 'FEATURES.KHU_CONG_NGHIEP',
    'FEATURES.MODERN_DEVELOPMENT': 'FEATURES.PHAT_TRIEN_HIEN_DAI',
    'FEATURES.GREEN_SPACE': 'FEATURES.KHONG_GIAN_XANH',
    'FEATURES.EDUCATION_HUB': 'FEATURES.TRUNG_TAM_GIAO_DUC',
    'FEATURES.AGRICULTURAL_HERITAGE': 'FEATURES.DI_SAN_NONG_NGHIEP',
    'FEATURES.TRADITIONAL_FARMING': 'FEATURES.NONG_NGHIEP_TRUYEN_THONG',
    'FEATURES.RURAL_COMMUNITY': 'FEATURES.CONG_DONG_NONG_THON',
    'FEATURES.FISHING_INDUSTRY': 'FEATURES.NGANH_DANH_BAT',
    'FEATURES.ENVIRONMENTAL_CONSERVATION': 'FEATURES.BAO_TON_MOI_TRUONG'
  },
  landmarks: {
    'LANDMARKS.CON_DAO_PRISON': 'LANDMARKS.NHA_TU_CON_DAO',
    'LANDMARKS.CON_DAO_NATIONAL_PARK': 'LANDMARKS.VUON_QUOC_GIA_CON_DAO',
    'LANDMARKS.AN_DONG_MARKET': 'LANDMARKS.CHO_AN_DONG',
    'LANDMARKS.COMMUNITY_CENTER': 'LANDMARKS.TRUNG_TAM_CONG_DONG',
    'LANDMARKS.LOCAL_MARKET': 'LANDMARKS.CHO_DIA_PHUONG',
    'LANDMARKS.FRUIT_ORCHARDS': 'LANDMARKS.VUON_CAY_AN_TRAI',
    'LANDMARKS.FARMERS_MARKET': 'LANDMARKS.CHO_NONG_SAN',
    'LANDMARKS.FISHING_PORT': 'LANDMARKS.CANG_CA',
    'LANDMARKS.MANGROVE_FOREST': 'LANDMARKS.RUNG_NGAP_MAN'
  }
};

// Load Vietnamese names and descriptions
const viNames = require('./vi-names.json');
const viDescriptions = require('./vi-descriptions.json');
const viSpecificFacts = require('./vi-facts.json');

// Function to generate Vietnamese descriptions
function generateVietnameseDescription(name, type, province) {
  if (viDescriptions[name]) {
    return viDescriptions[name];
  }

  const vietnameseName = viNames[name] || name;
  
  if (type === 'commune') {
    return `${vietnameseName} là một trong những xã truyền thống của ${province}, duy trì các hoạt động nông nghiệp và làng nghề. Khu vực này kết hợp hài hòa giữa bảo tồn văn hóa truyền thống và phát triển kinh tế hiện đại, tạo nên một cộng đồng năng động và đặc sắc.`;
  } else {
    return `${vietnameseName} là khu vực phát triển năng động của ${province}, kết hợp giữa các yếu tố đô thị hiện đại và giá trị văn hóa truyền thống. Với vị trí thuận lợi và cơ sở hạ tầng phát triển, phường đang không ngừng đổi mới trong khi vẫn giữ gìn bản sắc riêng.`;
  }
}

// Function to generate Vietnamese interesting facts
function generateVietnameseFacts(name, type, province) {
  if (viSpecificFacts[name]) {
    return viSpecificFacts[name];
  }

  if (type === 'commune') {
    return [
      `${viNames[name]} là một trong những xã truyền thống của ${province}, với lịch sử phát triển lâu đời và đặc trưng văn hóa riêng biệt`,
      `Duy trì và phát triển các hoạt động nông nghiệp truyền thống, đồng thời kết hợp với các phương pháp canh tác hiện đại để nâng cao năng suất và chất lượng sản phẩm`,
      `Bảo tồn và phát huy các giá trị văn hóa làng xã, với nhiều lễ hội truyền thống và các hoạt động cộng đồng đặc sắc`
    ];
  } else {
    return [
      `${viNames[name]} có lịch sử phát triển gắn liền với quá trình đô thị hóa của ${province}, thể hiện qua sự kết hợp hài hòa giữa kiến trúc truyền thống và hiện đại`,
      `Là nơi sinh sống của cộng đồng dân cư đa dạng, góp phần tạo nên bản sắc văn hóa phong phú và môi trường sống năng động`,
      `Phát triển cơ sở hạ tầng và tiện ích đô thị hiện đại, trong khi vẫn duy trì và phát huy các giá trị văn hóa địa phương`
    ];
  }
}

// Function to translate features and landmarks
function translateFeatures(features) {
  return features.map(feature => viTranslations.features[feature] || feature);
}

function translateLandmarks(landmarks) {
  return landmarks.map(landmark => ({
    ...landmark,
    name: viTranslations.landmarks[landmark.name] || landmark.name
  }));
}

// Function to translate neighboring ward names
function translateNeighboringWards(wards) {
  return wards.map(ward => {
    const wardId = ward.id.replace('-ward', '').replace('-commune', '').toUpperCase();
    const wardName = viNames[wardId];
    if (wardName) {
      return {
        ...ward,
        name: wardName.replace('Phường ', '').replace('Xã ', '')
      };
    }

    // Try to find the ward name in the Vietnamese names by converting the English name
    const englishName = ward.name.replace(/\s+/g, '_').toUpperCase();
    const viName = viNames[englishName];
    if (viName) {
      return {
        ...ward,
        name: viName.replace('Phường ', '').replace('Xã ', '')
      };
    }

    // If no match found, convert the English name to Vietnamese using a mapping
    const nameMapping = {
      'Can Gio': 'Cần Giờ',
      'Binh Khanh': 'Bình Khánh',
      'Tan Xuan': 'Tân Xuân',
      'Xuan Thoi Son': 'Xuân Thới Sơn',
      'Tan Phu': 'Tân Phú',
      'Tan Thoi Nhut': 'Tân Thới Nhứt',
      'Tan Thoi Nhi': 'Tân Thới Nhì',
      'Tan Thoi Hiep': 'Tân Thới Hiệp',
      'Tan Thoi Nhat': 'Tân Thới Nhất',
      'Tan Thoi Ba': 'Tân Thới Ba',
      'Tan Thoi Tu': 'Tân Thới Tư',
      'Tan Thoi Nam': 'Tân Thới Nam',
      'Tan Thoi Sau': 'Tân Thới Sáu',
      'Tan Thoi Bay': 'Tân Thới Bảy',
      'Tan Thoi Tam': 'Tân Thới Tám',
      'Tan Thoi Chin': 'Tân Thới Chín',
      'Tan Thoi Muoi': 'Tân Thới Mười',
      'Tan Thoi Muoi Mot': 'Tân Thới Mười Một',
      'Tan Thoi Muoi Hai': 'Tân Thới Mười Hai',
      'Tan Thoi Muoi Ba': 'Tân Thới Mười Ba',
      'Tan Thoi Muoi Bon': 'Tân Thới Mười Bốn',
      'Tan Thoi Muoi Nam': 'Tân Thới Mười Năm',
      'Tan Thoi Muoi Sau': 'Tân Thới Mười Sáu',
      'Tan Thoi Muoi Bay': 'Tân Thới Mười Bảy',
      'Tan Thoi Muoi Tam': 'Tân Thới Mười Tám',
      'Tan Thoi Muoi Chin': 'Tân Thới Mười Chín',
      'Tan Thoi Hai Muoi': 'Tân Thới Hai Mươi'
    };

    return {
      ...ward,
      name: nameMapping[ward.name] || ward.name
    };
  });
}

// Update provinces for English version
Object.keys(data).forEach(key => {
  const entry = data[key];
  if (entry.province === 'BR-VT') {
    entry.province = 'Ba Ria - Vung Tau';
  } else if (entry.province === 'BD') {
    entry.province = 'Binh Duong';
  } else if (entry.province === 'TP.HCM') {
    entry.province = 'Ho Chi Minh City';
  }
});

// Update content for Vietnamese version
Object.keys(viData).forEach(key => {
  const entry = viData[key];
  
  // Update province names
  entry.province = viTranslations.provinces[entry.province] || entry.province;

  // Update type for communes
  if (entry.id.includes('-commune')) {
    entry.id = entry.id.replace('-commune', '-xa');
  }

  // Update name to Vietnamese
  if (viNames[key]) {
    entry.name = viNames[key];
  }

  // Update description to Vietnamese
  const isCommune = entry.id.includes('-xa');
  const type = isCommune ? 'commune' : 'ward';
  entry.description = generateVietnameseDescription(key, type, entry.province);

  // Generate Vietnamese interesting facts
  entry.interesting_facts = generateVietnameseFacts(key, type, entry.province);

  // Translate features and landmarks
  entry.features = translateFeatures(entry.features);
  entry.landmarks = translateLandmarks(entry.landmarks);

  // Translate neighboring ward names
  if (entry.neighboring_wards) {
    entry.neighboring_wards = translateNeighboringWards(entry.neighboring_wards);
  }
});

// Write the updated English data back to file
fs.writeFileSync(enFilePath, JSON.stringify(data, null, 2));

// Write the Vietnamese data to new file
fs.writeFileSync(viFilePath, JSON.stringify(viData, null, 2)); 