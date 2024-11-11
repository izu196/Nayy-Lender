import React from "react";
import Select from "react-select";

const ZAMBIAN_PROVINCES = {
  LUSAKA: "Lusaka Province",
  COPPERBELT: "Copperbelt Province",
  CENTRAL: "Central Province",
  EASTERN: "Eastern Province",
  NORTHERN: "Northern Province",
  LUAPULA: "Luapula Province",
  NORTHWESTERN: "North-Western Province",
  WESTERN: "Western Province",
  SOUTHERN: "Southern Province",
  MUCHINGA: "Muchinga Province",
};

const CITIES_BY_PROVINCE = {
  "Lusaka Province": [
    "Lusaka",
    "Kafue",
    "Chongwe",
    "Chilanga",
    "Chirundu",
    "Rufunsa",
    "Luangwa",
    "Shibuyunji",
    "Garden House",
    "Makeni",
    "Chalimbana",
    "Palabana",
    "Shimabala",
    "Zanimuone",
    "Kasisi",
  ],
  "Copperbelt Province": [
    "Kitwe",
    "Ndola",
    "Chingola",
    "Mufulira",
    "Luanshya",
    "Kalulushi",
    "Chililabombwe",
    "Chambishi",
    "Masaiti",
    "Mpongwe",
    "Lufwanyama",
    "Garneton",
    "Mindolo",
    "Chimwemwe",
    "Kawama",
    "Riverside",
    "Bwana Mkubwa",
    "Twatasha",
    "Kantolomba",
    "Kamfinsa",
    "Nkana East",
    "Nkana West",
  ],
  "Central Province": [
    "Kabwe",
    "Kapiri Mposhi",
    "Mkushi",
    "Serenje",
    "Mumbwa",
    "Chibombo",
    "Itezhi-tezhi",
    "Luano",
    "Chitambo",
    "Ngabwe",
    "Chisamba",
    "Mulungushi",
    "Mpima",
    "Mukonchi",
    "Masansa",
    "Liteta",
    "Keembe",
    "Muchinda",
  ],
  "Eastern Province": [
    "Chipata",
    "Petauke",
    "Katete",
    "Lundazi",
    "Nyimba",
    "Chadiza",
    "Mambwe",
    "Sinda",
    "Vubwi",
    "Kasenengwa",
    "Lumezi",
    "Chasefu",
    "Msanzala",
    "Mwami",
    "Chama",
    "Msoro",
    "Chiparamba",
    "Kagoro",
    "Minga",
    "Mtenguleni",
  ],
  "Northern Province": [
    "Kasama",
    "Mpika",
    "Mbala",
    "Mungwi",
    "Luwingu",
    "Mporokoso",
    "Kaputa",
    "Chilubi",
    "Lunte",
    "Lupososhi",
    "Senga Hill",
    "Nsama",
    "Malole",
    "Mwamba",
    "Lukashya",
    "Munkonge",
    "Lubansenshi",
    "Chambeshi",
    "Lumimba",
  ],
  "Luapula Province": [
    "Mansa",
    "Kawambwa",
    "Nchelenge",
    "Samfya",
    "Mwense",
    "Chembe",
    "Chipili",
    "Milenge",
    "Lunga",
    "Chiengi",
    "Chifunabuli",
    "Mwansabombwe",
    "Kashikishi",
    "Puta",
    "Mbereshi",
    "Lubwe",
    "Musaila",
    "Mulunda",
    "Mano",
  ],
  "North-Western Province": [
    "Solwezi",
    "Kasempa",
    "Mwinilunga",
    "Zambezi",
    "Kabompo",
    "Mufumbwe",
    "Chavuma",
    "Mushindamo",
    "Kalumbila",
    "Ikelenge",
    "Kankoyo",
    "Lumwana",
    "Kisasa",
    "Mukumbi",
    "Kangwena",
    "Kalengwa",
    "Kamakechi",
    "Kizhingezhinge",
  ],
  "Western Province": [
    "Mongu",
    "Kaoma",
    "Senanga",
    "Sesheke",
    "Kalabo",
    "Lukulu",
    "Shangombo",
    "Limulunga",
    "Nkeyema",
    "Sikongo",
    "Nalolo",
    "Mulobezi",
    "Sioma",
    "Mitete",
    "Mwandi",
    "Luampa",
    "Mangango",
    "Namushakende",
    "Nalikwanda",
  ],
  "Southern Province": [
    "Livingstone",
    "Choma",
    "Mazabuka",
    "Monze",
    "Siavonga",
    "Kalomo",
    "Zimba",
    "Kazungula",
    "Namwala",
    "Gwembe",
    "Sinazongwe",
    "Pemba",
    "Chirundu",
    "Maamba",
    "Chikankata",
    "Dundumwezi",
    "Mbabala",
    "Mandia",
    "Batoka",
    "Chisekesi",
    "Mapanza",
    "Mapatizya",
  ],
  "Muchinga Province": [
    "Chinsali",
    "Mpika",
    "Nakonde",
    "Isoka",
    "Mafinga",
    "Shiwang'andu",
    "Kanchibiya",
    "Lavushimanda",
    "Mulilansolo",
    "Chambeshi",
    "Nkweto",
    "Chilonga",
    "Mununga",
    "Mulanga",
    "Kapufi",
    "Lundu",
  ],
};

const ZambianAddress = ({ value, onChange, className = "" }) => {
  const handleProvinceChange = (selectedOption) => {
    onChange({
      ...value,
      province: selectedOption.value,
      city: "",
      street: value.street,
    });
  };

  const handleCityChange = (selectedOption) => {
    onChange({
      ...value,
      city: selectedOption.value,
    });
  };

  const handleStreetChange = (e) => {
    onChange({
      ...value,
      street: e.target.value,
    });
  };

  const provinceOptions = Object.entries(ZAMBIAN_PROVINCES).map(
    ([key, label]) => ({
      value: label,
      label,
    })
  );

  const cityOptions = value.province
    ? CITIES_BY_PROVINCE[value.province].map((city) => ({
        value: city,
        label: city,
      }))
    : [];

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Province
        </label>
        <Select
          value={
            value.province
              ? { value: value.province, label: value.province }
              : null
          }
          onChange={handleProvinceChange}
          options={provinceOptions}
          className="mt-1"
          placeholder="Select province..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <Select
          value={value.city ? { value: value.city, label: value.city } : null}
          onChange={handleCityChange}
          options={cityOptions}
          className="mt-1"
          isDisabled={!value.province}
          placeholder={
            value.province ? "Select city..." : "Select province first"
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          type="text"
          value={value.street || ""}
          onChange={handleStreetChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter street address..."
        />
      </div>
    </div>
  );
};

export default ZambianAddress;
