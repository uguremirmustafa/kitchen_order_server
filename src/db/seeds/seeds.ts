import { FoodCategory } from '@/models/food_category';
import { Ingredient } from '@/models/ingredient';
import { Recipe, RecipeIngredient } from '@/models/recipe';
import { Unit } from '@/models/unit';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('recipe_ingredients').del();
  await knex('unit').del();
  await knex('recipe').del();
  await knex('ingredient').del();
  await knex('food_category').del();

  // Inserts seed entries
  await knex<Unit>('unit').insert([
    { id: 1, code: 'GRAM' },
    { id: 2, code: 'LITER' },
    { id: 3, code: 'TABLESPOON' },
    { id: 4, code: 'TEASPOON' },
    { id: 5, code: 'CUP' },
    { id: 6, code: 'LOAF' },
    { id: 7, code: 'PACKAGE' },
    { id: 8, code: 'CLOVE' },
  ]);

  await knex.raw("select setval('unit_id_seq', max(id)) from unit");

  // Inserts seed entries
  await knex<FoodCategory>('food_category').insert([
    { id: 1, name: 'Atiştırmalık' },
    { id: 2, name: 'Meyve-sebze' },
    { id: 3, name: 'İçecek' },
    { id: 4, name: 'Dondurulmuş Gıda' },
    { id: 5, name: 'Et-Tavuk-Şarküteri' },
    { id: 6, name: 'Süt Ürünleri' },
    { id: 7, name: 'Ekmek-Pastane' },
    { id: 8, name: 'Kahvaltılık' },
    { id: 9, name: 'Yemeklik Malzemeler' },
  ]);

  await knex.raw("select setval('food_category_id_seq', max(id)) from unit");

  await knex<Ingredient>('ingredient').insert([
    {
      id: 1,
      name: 'Evin Ayçiçek Yağı',
      image: 'https://docsd.ceptesok.com/product/420x420/7c02f_Aycicek_Yagi_1lt.jpg',
      food_category_id: 9,
    },
    {
      id: 2,
      name: 'Mis Tereyağ',
      image: 'https://docsd.ceptesok.com/product/420x420/21acc_Tereyag_250_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 3,
      name: 'Piyale Un',
      image: 'https://docsd.ceptesok.com/product/420x420/91fdc_Un_5_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 4,
      name: 'Aınküp Küp Şeker',
      image: 'https://docsd.ceptesok.com/product/420x420/49d07_Kup_Seker_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 5,
      name: 'Piyale Mantı',
      image: 'https://docsd.ceptesok.com/product/420x420/e092a_Manti_500__Gr_.jpg',
      food_category_id: 9,
    },
    {
      id: 6,
      name: 'Anadolu Mutfağı Baldo Pirinç',
      image: 'https://docsd.ceptesok.com/product/420x420/2960c_Baldo_Pirinc_1000_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 7,
      name: 'Anadolu Mutfağı Kırmızı Mercimek',
      image: 'https://docsd.ceptesok.com/product/420x420/16360_Kirmizi_Mercimek_1000_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 8,
      name: 'Vatan Domates Salçası',
      image: 'https://docsd.ceptesok.com/product/420x420/e21ab_Domates_Salcasi_830_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 9,
      name: 'Vatan Ketçap Tatlı',
      image: 'https://docsd.ceptesok.com/product/420x420/7e1b5_Ketcap_Tatli_1000_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 10,
      name: 'Bizim Vatan Biberiye Turşusu',
      image: 'https://docsd.ceptesok.com/product/420x420/3c9ea_Biberiye_Tursusu_325_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 11,
      name: 'Vatan Haşlanmış Nohut',
      image: 'https://docsd.ceptesok.com/product/420x420/8b47d_Haslanmis_Nohut_800_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 12,
      name: 'Piyale Kremalı Tavuk',
      image: 'https://docsd.ceptesok.com/product/420x420/3c0a5_Kremali_Tavuk_62_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 13,
      name: 'Anadolu Mutfağı Tuz',
      image: 'https://docsd.ceptesok.com/product/420x420/5e159_Tuz_750_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 14,
      name: 'Anadolu Mutfağı İri Salamura Tuzu',
      image:
        'https://docsd.ceptesok.com/product/420x420/fc3d4_Anadolu_Mutfagi_Iri_Salamura_Tuzu_3_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 15,
      name: 'Vatan Elma Sirkesi',
      image: 'https://docsd.ceptesok.com/product/420x420/59228_Elma_Sirkesi_750_Ml.jpg',
      food_category_id: 9,
    },
    {
      id: 16,
      name: 'Anadolu Çiftliği M Yumurta',
      image: 'https://docsd.ceptesok.com/product/420x420/fc15d_M_Yumurta_30lu_.jpg',
      food_category_id: 9,
    },
    {
      id: 17,
      name: 'Tamköy Yufka',
      image: 'https://docsd.ceptesok.com/product/420x420/4d84d_Tamkoy_Yufka_500_Gr_.jpg',
      food_category_id: 9,
    },
    {
      id: 18,
      name: 'Evin Ayçiçek Yağı',
      image: 'https://docsd.ceptesok.com/product/420x420/1d4de_Aycicek_Yagi_2_lt.jpg',
      food_category_id: 9,
    },
    {
      id: 19,
      name: 'Piyale Un',
      image: 'https://docsd.ceptesok.com/product/420x420/ab820_Un_2_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 20,
      name: 'Aınküp Toz Şeker',
      image: 'https://docsd.ceptesok.com/product/420x420/3fec3_Toz_Seker_2000_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 21,
      name: 'Piyale Erişte',
      image: 'https://docsd.ceptesok.com/product/420x420/d4cba_Eriste_500__Gr_.jpg',
      food_category_id: 9,
    },
    {
      id: 22,
      name: 'Anadolu Mutfağı Osmancık Pirinç',
      image: 'https://docsd.ceptesok.com/product/420x420/b04c3_Osmancik_Pirinc_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 23,
      name: 'Anadolu Mutfağı Yerli Pilavlik Pirinç',
      image: 'https://docsd.ceptesok.com/product/420x420/9f0f5_Yerli_Pilavlik_Pirinc_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 24,
      name: 'Anadolu Mutfağı Bakliyat Nohut',
      image: 'https://docsd.ceptesok.com/product/420x420/5afdc_Bakliyat_Nohut_1000_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 25,
      name: 'Bizim Vatan Tatlı Biber Salçası',
      image: 'https://docsd.ceptesok.com/product/420x420/01acc_Tatli_Biber_Salcasi_650_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 26,
      name: 'Vatan Ketçap Acılı',
      image: 'https://docsd.ceptesok.com/product/420x420/4373f_Ketcap_Acili_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 27,
      name: 'Bizim Vatan Acı Biber',
      image: 'https://docsd.ceptesok.com/product/420x420/bb8d0_Aci_Biber_325_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 28,
      name: 'Vatan Haşlanmış Kuru Fasulye',
      image: 'https://docsd.ceptesok.com/product/420x420/6606f_Haslanmis_Kuru_Fasulye_800_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 29,
      name: 'Piyale Şehriyeli Tavuk Çorbası',
      image: 'https://docsd.ceptesok.com/product/420x420/bae69_Sehriyeli_Tavuk_Corbasi_58_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 30,
      name: 'Billur Tuz İyotlu Tuz',
      image: 'https://docsd.ceptesok.com/product/420x420/d93a5_Iyotlu_750_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 31,
      name: 'Vatan Üzüm Sirkesi',
      image: 'https://docsd.ceptesok.com/product/420x420/vatan-uzum-sirkesi-750-ml-44676.jpg',
      food_category_id: 9,
    },
    {
      id: 32,
      name: 'Anadolu Çiftliği L Yumurta',
      image: 'https://docsd.ceptesok.com/product/420x420/23467_L_Yumurta_15li_.jpg',
      food_category_id: 9,
    },
    {
      id: 33,
      name: 'Tamköy Yufka',
      image: 'https://docsd.ceptesok.com/product/420x420/75377_Tamkoy_Yufka_800_Gr_.jpg',
      food_category_id: 9,
    },
    {
      id: 34,
      name: 'Piyale Instant Maya *',
      image: 'https://docsd.ceptesok.com/product/420x420/3cb7e_Instant_Maya_3_11_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 35,
      name: 'Piyale Hamur Kabartma Tozu  Paket',
      image: 'https://docsd.ceptesok.com/product/420x420/66778_Hamur_Kabartma_Tozu_15li_Paket.jpg',
      food_category_id: 9,
    },
    {
      id: 36,
      name: 'Evin Ayçiçek Yağı Pet',
      image: 'https://docsd.ceptesok.com/product/420x420/134a7_Aycicek_Yagi_Pet_5_lt.jpg',
      food_category_id: 9,
    },
    {
      id: 37,
      name: 'Sinangil Glutensiz Un',
      image: 'https://docsd.ceptesok.com/product/420x420/12724_Glutensiz_Un_500_Gr.JPG',
      food_category_id: 9,
    },
    {
      id: 38,
      name: 'Piyale İrmik',
      image: 'https://docsd.ceptesok.com/product/420x420/c893b_Irmik_500_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 39,
      name: 'Aınküp Toz Şeker',
      image: 'https://docsd.ceptesok.com/product/420x420/03a65_Toz_Seker_5000_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 40,
      name: 'Piyale Boncuk Makarna',
      image: 'https://docsd.ceptesok.com/product/420x420/9acf6_Boncuk_Makarna_500_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 41,
      name: 'Piyale Yüksük Makarna',
      image: 'https://docsd.ceptesok.com/product/420x420/06f1d_Yuksuk_Makarna_500gr.jpg',
      food_category_id: 9,
    },
    {
      id: 42,
      name: 'Anadolu Mutfağı Kırık Pirinç',
      image: 'https://docsd.ceptesok.com/product/420x420/983b6_Kirik_Pirinc_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 43,
      name: 'Anadolu Mutfağı Yasemin Pirinç',
      image: 'https://docsd.ceptesok.com/product/420x420/39aa7_Yasemin_Pirinc_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 44,
      name: 'Anadolu Mutfağı Bakliyat Kuru Fasulye',
      image: 'https://docsd.ceptesok.com/product/420x420/81adf_Bakliyat_Kuru_Fasulye_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 45,
      name: 'Bizim Vatan Acı Biber Salçası',
      image: 'https://docsd.ceptesok.com/product/420x420/55db7_Aci_Biber_Salcasi_650_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 46,
      name: 'Vatan Mayonez',
      image: 'https://docsd.ceptesok.com/product/420x420/feb2c_Mayonez_840_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 47,
      name: 'Bizim Vatan Jalapeno Turşusu',
      image: 'https://docsd.ceptesok.com/product/420x420/38b2f_Jalapeno_Tursusu_340_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 48,
      name: 'Vatan Haşlanmış Barbunya',
      image: 'https://docsd.ceptesok.com/product/420x420/24cfe_Haslanmis_Barbunya_800_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 49,
      name: 'Piyale Kremalı Mantar Çorbası',
      image: 'https://docsd.ceptesok.com/product/420x420/2a859_Kremali_Mantar_Corbasi_65_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 50,
      name: 'Vatan Limon Sosu',
      image: 'https://docsd.ceptesok.com/product/420x420/7c5ec_Limon_Sosu_750_Ml.jpg',
      food_category_id: 9,
    },
    {
      id: 51,
      name: 'Anadolu Çiftliği Gezen Tavuk Yumurta M',
      image: 'https://docsd.ceptesok.com/product/420x420/6acec_Gezen_Tavuk_Yumurta_M_10lu.jpg',
      food_category_id: 9,
    },
    {
      id: 52,
      name: 'Dr. Oetker Instant Maya *',
      image: 'https://docsd.ceptesok.com/product/420x420/3ef7d_Instant_Maya_3_30_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 53,
      name: 'Piyale Şekerli Vanilin  Paket',
      image: 'https://docsd.ceptesok.com/product/420x420/f7ba9_Sekerli_Vanilin_15li_Paket.jpg',
      food_category_id: 9,
    },
    {
      id: 54,
      name: 'Mis Tuzlu Tereyağı',
      image: 'https://docsd.ceptesok.com/product/420x420/b2852_Tuzlu_Tereyagi_500_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 55,
      name: 'Piyale İnce Uzun Makarna',
      image: 'https://docsd.ceptesok.com/product/420x420/0303e_Ince_Uzun_Makarna_500gr.jpg',
      food_category_id: 9,
    },
    {
      id: 56,
      name: 'Anadolu Mutfağı Osmancık Pirinç .',
      image: 'https://docsd.ceptesok.com/product/420x420/2a025_Osmancik_Pirinc_2.5_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 57,
      name: 'Anadolu Mutfağı Yeşil Mercimek',
      image: 'https://docsd.ceptesok.com/product/420x420/fc6ac_Yesil_Mercimek_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 58,
      name: 'Tat Domates Salçası',
      image: 'https://docsd.ceptesok.com/product/420x420/ea7a3_Domates_Salcasi_830_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 59,
      name: 'Vatan Ketçap Tatlı',
      image: 'https://docsd.ceptesok.com/product/420x420/3adcb_Ketcap_Tatli_500_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 60,
      name: 'Bizim Vatan Bezelye Konservesi',
      image: 'https://docsd.ceptesok.com/product/420x420/ecea3_Bezelye_Konservesi_830_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 61,
      name: 'Bizim Vatan Karışık Turşu',
      image: 'https://docsd.ceptesok.com/product/420x420/161e0_Karisik_Tursu_680_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 62,
      name: 'Vatan Barbunya Pilaki',
      image: 'https://docsd.ceptesok.com/product/420x420/2813a_Barbunya_Pilaki_400_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 63,
      name: 'Knorr Kremalı Tavuk  Çorbası',
      image: 'https://docsd.ceptesok.com/product/420x420/811fe_Kremali_Tavuk__Corbasi_69_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 64,
      name: 'Anadolu Çiftliği Omega  M Yumurta',
      image: 'https://docsd.ceptesok.com/product/420x420/22eff_Omega_3_M_Yumurta_10lu_.jpg',
      food_category_id: 9,
    },
    {
      id: 65,
      name: 'Dr. Oetker Hamur Kabartma Tozu',
      image: 'https://docsd.ceptesok.com/product/420x420/fb262_Hamur_Kabartma_Tozu_15li.jpg',
      food_category_id: 9,
    },
    {
      id: 66,
      name: 'Kebir Tereyağı',
      image: 'https://docsd.ceptesok.com/product/420x420/1f137_Tereyagi_500_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 67,
      name: 'Anadolu Mutfağı Baldo Pirinç',
      image: 'https://docsd.ceptesok.com/product/420x420/63797_Baldo_Pirinc_2500_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 68,
      name: 'Anadolu Mutfağı Bakliyat Barbunya',
      image: 'https://docsd.ceptesok.com/product/420x420/398d8_Bakliyat_Barbunya_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 69,
      name: 'Tat Domates Püresı',
      image: 'https://docsd.ceptesok.com/product/420x420/05777_Domates_Puresi_200gr.JPG',
      food_category_id: 9,
    },
    {
      id: 70,
      name: 'Vatan Ketçap Acılı',
      image: 'https://docsd.ceptesok.com/product/420x420/65ed3_Ketcap_Acili_500_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 71,
      name: 'Vatan Garnitür Konservesi',
      image: 'https://docsd.ceptesok.com/product/420x420/a02b7_Garnitur_Konservesi_560_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 72,
      name: 'Vatan Salatalık Turşusu',
      image: 'https://docsd.ceptesok.com/product/420x420/c9f4f_Salatalik_Tursusu_670_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 73,
      name: 'Vatan Yaprak Sarma',
      image: 'https://docsd.ceptesok.com/product/420x420/b6c0e_Yaprak_Sarma_400_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 74,
      name: 'Knorr Şehriyeli Tavuk Çorbası',
      image: 'https://docsd.ceptesok.com/product/420x420/a6202_Sehriyeli_Tavuk_Corbasi_54_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 75,
      name: 'Güzide Hanım M Organik Yumurta  (-)',
      image:
        'https://docsd.ceptesok.com/product/420x420/0d2cc_Guzide_Hanim_M_Organik_Yumurta_6li_53-62gr.jpg',
      food_category_id: 9,
    },
    {
      id: 76,
      name: 'Piyale Galeta Unu',
      image: 'https://docsd.ceptesok.com/product/420x420/0d7ee_Galeta_Unu_250_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 77,
      name: 'Aınküp Esmer Küp Şeker',
      image: 'https://docsd.ceptesok.com/product/420x420/e0d54_Esmer_Kup_Seker_500_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 78,
      name: 'Anadolu Mutfağı İthal Pilavlık Pirinç .',
      image: 'https://docsd.ceptesok.com/product/420x420/27bb2_Ithal_Pilavlik_Pirinc_2.5_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 79,
      name: 'Anadolu Mutfağı İthal Pilavlık Pirinç',
      image: 'https://docsd.ceptesok.com/product/420x420/f2d48_Ithal_Pilavlik_Pirinc_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 80,
      name: 'Anadolu Mutfağı Yerli Pilavlik Pirinç .',
      image: 'https://docsd.ceptesok.com/product/420x420/98fad_Yerli_Pilavlik_Pirinc_2.5.jpg',
      food_category_id: 9,
    },
    {
      id: 81,
      name: 'Anadolu Mutfağı Kırmızı Mercimek .',
      image: 'https://docsd.ceptesok.com/product/420x420/99eb5_Kirmizi_Mercimek_2.5kg.jpg',
      food_category_id: 9,
    },
    {
      id: 82,
      name: 'Anadolu Mutfağı Aşurelik Buğday',
      image: 'https://docsd.ceptesok.com/product/420x420/894fb_Asurelik_Bugday_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 83,
      name: 'Vatan Mayonez',
      image: 'https://docsd.ceptesok.com/product/420x420/03436_Mayonez_430_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 84,
      name: 'Vatan Közlenmiş Biber',
      image: 'https://docsd.ceptesok.com/product/420x420/84f67_Kozlenmis_Biber_680_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 85,
      name: 'Mezzet Yaprak Sarma',
      image: 'https://docsd.ceptesok.com/product/420x420/540b4_Yaprak_Sarma_300_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 86,
      name: 'Knorr Kremalı Mantar Çorbası',
      image: 'https://docsd.ceptesok.com/product/420x420/cbcaa_Kremali_Mantar_Corbasi_68_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 87,
      name: 'Dr. Oetker Şekerli Vanilin',
      image: 'https://docsd.ceptesok.com/product/420x420/eb568_Sekerli_Vanilin_15li.jpg',
      food_category_id: 9,
    },
    {
      id: 88,
      name: 'Mis Kozalak Tereyağ',
      image: 'https://docsd.ceptesok.com/product/420x420/88f48_Kozalak_Tereyag_350_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 89,
      name: 'Piyale Mısır Unu',
      image: 'https://docsd.ceptesok.com/product/420x420/0bd29_Misir_Unu_250gr.jpg',
      food_category_id: 9,
    },
    {
      id: 90,
      name: 'Piyale Burgu Makarna',
      image: 'https://docsd.ceptesok.com/product/420x420/c094e_Burgu_Makarna_500gr.jpg',
      food_category_id: 9,
    },
    {
      id: 91,
      name: 'Anadolu Mutfağı Pilavlık Bulgur',
      image: 'https://docsd.ceptesok.com/product/420x420/acf1a_Pilavlik_Bulgur_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 92,
      name: 'Anadolu Mutfağı Cin Mısır',
      image: 'https://docsd.ceptesok.com/product/420x420/e5ced_Cin_Misir_500_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 93,
      name: 'Piyale Ezogelin Çorba',
      image: 'https://docsd.ceptesok.com/product/420x420/eed6f_Ezogelin_Corba_80_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 94,
      name: 'Lio Riviera Zeytinyağı  Lt',
      image: 'https://docsd.ceptesok.com/product/420x420/9be33_Riviera_1_Lt.jpg',
      food_category_id: 9,
    },
    {
      id: 95,
      name: 'Piyale  Pirinç Unu',
      image: 'https://docsd.ceptesok.com/product/420x420/0cf67__Pirinc_Unu_250_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 96,
      name: 'Piyale Kelebek Makarna',
      image: 'https://docsd.ceptesok.com/product/420x420/9a1d2_Kelebek_Makarna_500gr.jpg',
      food_category_id: 9,
    },
    {
      id: 97,
      name: 'Anadolu Mutfağı Köftelik Bulgur',
      image: 'https://docsd.ceptesok.com/product/420x420/7f318_Koftelik_Bulgur_1_Kg.jpg',
      food_category_id: 9,
    },
    {
      id: 98,
      name: 'Vatan Közlenmiş Patlıcan',
      image: 'https://docsd.ceptesok.com/product/420x420/b04ef_Kozlenmis_Patlican_510_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 99,
      name: 'Piyale Mercimek Çorbası',
      image: 'https://docsd.ceptesok.com/product/420x420/ac4da_Mercimek_Corbasi_72_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 100,
      name: 'Piyale Pasta Kreması Sade',
      image: 'https://docsd.ceptesok.com/product/420x420/ff545_Pasta_Kremasi_Sade_140_Gr.jpg',
      food_category_id: 9,
    },
    {
      id: 101,
      name: 'Karmen Sütlü Çikolata',
      image: 'https://docsd.ceptesok.com/product/420x420/2eb54_Sutlu_Cikolata_80_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 102,
      name: 'Tempo Vanilya  Kremalı Bisküvi',
      image: 'https://docsd.ceptesok.com/product/420x420/38f5b_Vanilya__Kremali_Biskuvi_100gr.jpg',
      food_category_id: 1,
    },
    {
      id: 103,
      name: 'Karmen Çikolata Gofret',
      image: 'https://docsd.ceptesok.com/product/420x420/7f076_Cikolata_Gofret_38_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 104,
      name: 'Tempo Tuzlu Çubuk Kraker',
      image: 'https://docsd.ceptesok.com/product/420x420/400e6_Tuzlu_Cubuk_Kraker_150_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 105,
      name: 'Peki Meyveli Kek',
      image: 'https://docsd.ceptesok.com/product/420x420/b4ed9_Meyveli_Kek_200_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 106,
      name: 'Amigo Tırtıklı Sade Patates Cipsi',
      image:
        'https://docsd.ceptesok.com/product/420x420/00774_Tirtikli_Sade_Patates_Cipsi_150_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 107,
      name: "Falım Damla Sakız 'lü",
      image: 'https://docsd.ceptesok.com/product/420x420/falim-damla-3lu-21-gr-16673.jpg',
      food_category_id: 1,
    },
    {
      id: 108,
      name: 'Olips Mentol&Okaliptus Şeker',
      image: 'https://docsd.ceptesok.com/product/420x420/2fa7e_MentolOkaliptus_Seker_28_Gr.JPG',
      food_category_id: 1,
    },
    {
      id: 109,
      name: 'Bisto Kepekli Galeta',
      image: 'https://docsd.ceptesok.com/product/420x420/63ad8_Kepekli_Galeta_200_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 110,
      name: 'Karmen Bitter Çikolata',
      image: 'https://docsd.ceptesok.com/product/420x420/00103_Bitter_Cikolata_80_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 111,
      name: 'Karmen Antep Fıstıklı Çikolata',
      image: 'https://docsd.ceptesok.com/product/420x420/a05b6_Antep_Fistikli_Cikolata_80gr.jpg',
      food_category_id: 1,
    },
    {
      id: 112,
      name: 'Tempo Kremalı Kakaolu Bisküvi',
      image: 'https://docsd.ceptesok.com/product/420x420/5a9e3_Kremali_Kakaolu_Biskuvi_100_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 113,
      name: 'Karmen Fındıklı Gofret',
      image: 'https://docsd.ceptesok.com/product/420x420/37334_Findikli_Gofret_32gr.jpg',
      food_category_id: 1,
    },
    {
      id: 114,
      name: 'Tempo Susamlı Çubuk Kraker',
      image: 'https://docsd.ceptesok.com/product/420x420/76a37_Susamli_Cubuk_Kraker_100_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 115,
      name: 'Peki Mozaik Kek',
      image: 'https://docsd.ceptesok.com/product/420x420/70e2f_Mozaik_Kek_200_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 116,
      name: 'Amigo Düz Sade Patates Cipsi',
      image: 'https://docsd.ceptesok.com/product/420x420/49887_Duz_Sade_Patates_Cipsi_150_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 117,
      name: "Falım Nane 'lü Sakız",
      image: 'https://docsd.ceptesok.com/product/420x420/falim-nane-3lu-21-gr-73942.jpg',
      food_category_id: 1,
    },
    {
      id: 118,
      name: 'Bisto Tereyağlı Çörek Otlu Kurabiye',
      image:
        'https://docsd.ceptesok.com/product/420x420/7c65a_Tereyagli_Corek_Otlu_Kurabiye_500_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 119,
      name: 'Bisto Sade Galeta',
      image: 'https://docsd.ceptesok.com/product/420x420/16d9c_Sade_Galeta_200_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 120,
      name: 'Karmen Fındıklı Çikolata',
      image: 'https://docsd.ceptesok.com/product/420x420/1540b_Findikli_Cikolata_80gr.jpg',
      food_category_id: 1,
    },
    {
      id: 121,
      name: 'Karmen Tane Fındıklı Gofret',
      image: 'https://docsd.ceptesok.com/product/420x420/d0f4d_Tane_Findikli_Gofret_33_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 122,
      name: 'Peki Kakaolu Kek',
      image: 'https://docsd.ceptesok.com/product/420x420/eac42_Kakaolu_Kek_200gr.jpg',
      food_category_id: 1,
    },
    {
      id: 123,
      name: 'Amigo Soslu Mısır',
      image: 'https://docsd.ceptesok.com/product/420x420/7b57e_Soslu_Misir_150_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 124,
      name: 'Amigo Taco Mısır Cipsi',
      image: 'https://docsd.ceptesok.com/product/420x420/amigo-taco-misir-cipsi-130-gr-61690.jpg',
      food_category_id: 1,
    },
    {
      id: 125,
      name: 'Karmen Sütlü Çakıaşı Draje',
      image: 'https://docsd.ceptesok.com/product/420x420/b2195_Sutlu_Cakiltasi_Draje_20Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 126,
      name: 'Ülker Hobby Fındıklı Bar',
      image: 'https://docsd.ceptesok.com/product/420x420/a4620_Hobby_250gr.jpg',
      food_category_id: 1,
    },
    {
      id: 127,
      name: 'Eti Lifalif Müslibar Kuru Yemişli',
      image:
        'https://docsd.ceptesok.com/product/420x420/1a4ac_Lifalif_Muslibar_Kuru_Yemisli_35_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 128,
      name: 'Eti Lifalif Müslibar Bitter Çikolatalı',
      image:
        'https://docsd.ceptesok.com/product/420x420/2427a_Lifalif_Muslibar_Bitter_cikolatali_35gr.jpg',
      food_category_id: 1,
    },
    {
      id: 129,
      name: 'Bisto Sütlü Mahlepli Tuzlu Kurabiye',
      image:
        'https://docsd.ceptesok.com/product/420x420/cb7db_Sutlu_Mahlepli_Tuzlu_Kurabiye_500_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 130,
      name: 'Ülker Sütlü Kare',
      image: 'https://docsd.ceptesok.com/product/420x420/b55e1_sutlu-kare-70-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 131,
      name: 'Ülker Çikolatalı Gofret',
      image: 'https://docsd.ceptesok.com/product/420x420/6dcbf_Cikolatali_Gofret_36_Gr.png',
      food_category_id: 1,
    },
    {
      id: 132,
      name: 'Peki Meyveli Kek',
      image: 'https://docsd.ceptesok.com/product/420x420/fa67f_Meyveli_Kek_40_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 133,
      name: 'Ruffles Originals Patates Cipsi',
      image: 'https://docsd.ceptesok.com/product/420x420/756a0_Originals_Patates_Cipsi_107_Gr.png',
      food_category_id: 1,
    },
    {
      id: 134,
      name: 'Amigo Acı Baharat Patates Cipsi',
      image:
        'https://docsd.ceptesok.com/product/420x420/4393a_Aci_Baharat_Patates_Cipsi_135_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 135,
      name: 'Yupo Draje Tüp x',
      image: 'https://docsd.ceptesok.com/product/420x420/ffc5c_Draje_Tup_3x20gr.png',
      food_category_id: 1,
    },
    {
      id: 136,
      name: 'Yıldız Şekersiz Stıck Damla Sakız',
      image: 'https://docsd.ceptesok.com/product/420x420/01334_Sekersiz_Stick_Damla_21_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 137,
      name: 'Ülker Bonbon Nane Aromalı Rulo Şeker ,',
      image:
        'https://docsd.ceptesok.com/product/420x420/1d1bb_Bonbon_Nane_Aromali_Rulo_Seker_32_5_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 138,
      name: 'Aınbaşak issini Kepekli Bisküvi  Gr',
      image: 'https://docsd.ceptesok.com/product/420x420/cac30_Grissini_Kepekli_Biskuvi_125_Gr.JPG',
      food_category_id: 1,
    },
    {
      id: 139,
      name: 'Ülker Antep Fıstıklı Kare Çikolata',
      image: 'https://docsd.ceptesok.com/product/420x420/7b8b2_antep-fistikli-kare-70-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 140,
      name: 'Ülker Çikolata Bitter % Kakao',
      image:
        'https://docsd.ceptesok.com/product/420x420/a510c_ulker_cikolata_Bitter_80_Kakao_60_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 141,
      name: 'Eti Nero Kakaolu Kremalı Bisküvi',
      image: 'https://docsd.ceptesok.com/product/420x420/c8844_Negro_Kakaolu_Kremali_110_Gr.png',
      food_category_id: 1,
    },
    {
      id: 142,
      name: 'Ülker Çokonat Çikolata',
      image: 'https://docsd.ceptesok.com/product/420x420/c48cc_Cokonat_33_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 143,
      name: 'Peki Mozaik Kek',
      image: 'https://docsd.ceptesok.com/product/420x420/7f40b_Mozaik_Kek_40_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 144,
      name: 'Lays Klasik Patates Cipsi',
      image: 'https://docsd.ceptesok.com/product/420x420/3d4ab_Klasik_Patates_Cipsi_107_Gr_.png',
      food_category_id: 1,
    },
    {
      id: 145,
      name: 'Milka Bonibon lü ,',
      image: 'https://docsd.ceptesok.com/product/420x420/c4d82_bonibon-3lu-243-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 146,
      name: 'Yıldız Şekersiz Stıck Çilek Sakız',
      image: 'https://docsd.ceptesok.com/product/420x420/532c0_Sekersiz_Stick_Cilek_21_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 147,
      name: 'Bisto Tahinli Susamlı Kurabiye',
      image: 'https://docsd.ceptesok.com/product/420x420/a8f56_Tahinli_Susamli_Kurabiye_500_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 148,
      name: 'Ülker Bitter Kare',
      image: 'https://docsd.ceptesok.com/product/420x420/d6796_bitter-kare-70-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 149,
      name: 'Ülker Antep Fıstıklı Bitter Kare Çikolata',
      image:
        'https://docsd.ceptesok.com/product/420x420/ae1c4_antep-fistikli-bitter-kare-70-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 150,
      name: 'Ülker Antep Fıstıklı Beyaz Çikolata',
      image:
        'https://docsd.ceptesok.com/product/420x420/1faab_Antep_Fistikli_Beyaz_Cikolata_65_gr.JPG',
      food_category_id: 1,
    },
    {
      id: 151,
      name: 'Ülker Çikolatalı Gofret Beyaz',
      image: 'https://docsd.ceptesok.com/product/420x420/7dc27_Cikolatali_Gofret_Beyaz_35_Gr.PNG',
      food_category_id: 1,
    },
    {
      id: 152,
      name: 'Ülker Cici Balık Kraker',
      image: 'https://docsd.ceptesok.com/product/420x420/ulker-cici-balik-kraker-135-gr-30576.jpg',
      food_category_id: 1,
    },
    {
      id: 153,
      name: 'Peki Kakaolu Kek',
      image: 'https://docsd.ceptesok.com/product/420x420/c989f_Kakaolu_Kek_40_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 154,
      name: 'Doritos Taco Cips',
      image: 'https://docsd.ceptesok.com/product/420x420/0dd67_Taco_Cips_121_Gr_.png',
      food_category_id: 1,
    },
    {
      id: 155,
      name: 'Eti Form Limon Lifli Bisküvi',
      image: 'https://docsd.ceptesok.com/product/420x420/8c92a_Form_Limon_Lifli_50_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 156,
      name: 'Bisto Portakallı Kurabiye',
      image: 'https://docsd.ceptesok.com/product/420x420/38484_Portakalli_Kurabiye_500_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 157,
      name: 'Wasa Original Gevrek',
      image: 'https://docsd.ceptesok.com/product/420x420/ed3cd_Original_Gevrek_275_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 158,
      name: 'Ülker Şeker İlavesiz Bitter Çikolata',
      image:
        'https://docsd.ceptesok.com/product/420x420/25253_Ulker_seker_Ilavesiz_Bitter_cikolata_60_Gr.JPG',
      food_category_id: 1,
    },
    {
      id: 159,
      name: 'Karmen Bütün Antep Fıstıklı Çikolata',
      image:
        'https://docsd.ceptesok.com/product/420x420/e00fb_Butun_Antep_Fistikli_Cikolata_80_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 160,
      name: 'Ülker Dido Çikolata Gofret',
      image: 'https://docsd.ceptesok.com/product/420x420/dca40_dido-35-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 161,
      name: 'Ülker Kekstra Jöleli Çilekli Kek',
      image:
        'https://docsd.ceptesok.com/product/420x420/3cee6_kekstra-joleli-cilekli-kek-30-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 162,
      name: 'Amigo Antep Fıstığı',
      image: 'https://docsd.ceptesok.com/product/420x420/cee6c_Antep_Fistigi_150_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 163,
      name: 'Ruffles Ketçap Aromalı Patates Cipsi',
      image:
        'https://docsd.ceptesok.com/product/420x420/264fb_Ketcap_Aromali_Patates_Cipsi_107_Gr.png',
      food_category_id: 1,
    },
    {
      id: 164,
      name: "Eti Burçak Bisküvi 'lü",
      image: 'https://docsd.ceptesok.com/product/420x420/9570c_Burcak_3lu_393_Gr_.jpg',
      food_category_id: 1,
    },
    {
      id: 165,
      name: 'Ülker Dido Gold Süt Reçeli Tadında',
      image:
        'https://docsd.ceptesok.com/product/420x420/958e7_ulker_Dido_Gold_Sut_Receli_Tadinda_36_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 166,
      name: 'Ülker Laviva Çikolata',
      image: 'https://docsd.ceptesok.com/product/420x420/edef2_laviva-35gr.jpg',
      food_category_id: 1,
    },
    {
      id: 167,
      name: 'Ülker Krispi Peynirli Çubuk Kraker',
      image:
        'https://docsd.ceptesok.com/product/420x420/fe311_Krispi_Peynirli_Cubuk_Kraker_43_Gr.png',
      food_category_id: 1,
    },
    {
      id: 168,
      name: 'Amigo Kaju Cevizi',
      image: 'https://docsd.ceptesok.com/product/420x420/e0e56_Kaju_Cevizi_150_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 169,
      name: 'Lays Baharat Süper Boy Patates Cipsi',
      image:
        'https://docsd.ceptesok.com/product/420x420/1fccf_Baharat_Super_Boy_Patates_Cipsi_107_Gr.png',
      food_category_id: 1,
    },
    {
      id: 170,
      name: 'Ülker Yupo Lolipop',
      image: 'https://docsd.ceptesok.com/product/420x420/5601b_ulker_Yupo_Lolipop_31_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 171,
      name: "Eti Burçak Yulaflı Bisküvi 'lü",
      image: 'https://docsd.ceptesok.com/product/420x420/6b211_Burcak_Yulafli_3lu_465_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 172,
      name: 'Bisto Çikolata Parçacıklı Hindistan Cevizli Kurabiye',
      image:
        'https://docsd.ceptesok.com/product/420x420/c4e88_Cikolata_Parcacikli_Hindistan_Cevizli_Kurabiye_500.jpg',
      food_category_id: 1,
    },
    {
      id: 173,
      name: 'Ülker Alpella  Gen Gofret Beyaz',
      image:
        'https://docsd.ceptesok.com/product/420x420/dc312_alpella-3-gen-gofret-beyaz-28-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 174,
      name: 'Amigo Lüks Kabuksuz Karışık Kuruyemiş',
      image:
        'https://docsd.ceptesok.com/product/420x420/383bd_Luks_Kabuksuz_Karisik_Kuruyemis_200_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 175,
      name: 'Doritos Nacho Süper Boy Cips',
      image: 'https://docsd.ceptesok.com/product/420x420/fad2e_Nacho_Super_Boy_Cips_121_Gr.png',
      food_category_id: 1,
    },
    {
      id: 176,
      name: "Eti Burçak Sütlü Kremalı Bisküvi 'lü",
      image:
        'https://docsd.ceptesok.com/product/420x420/92d82_Eti_Burcak_Sutlu_Kremali_4lu_400_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 177,
      name: 'Bisto Kavala Kurabiyesi',
      image: 'https://docsd.ceptesok.com/product/420x420/176b8_Kavala_Kurabiyesi_290_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 178,
      name: 'Ülker Hanımeller Fındıklı Bisküvi',
      image: 'https://docsd.ceptesok.com/product/420x420/dccb7_Hanimeller_Findikli_82_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 179,
      name: 'Ülker Dido Trio Beyaz Çikolatalı Gofret .',
      image:
        'https://docsd.ceptesok.com/product/420x420/a6403_dido-trio-beyaz-cikolatali-gofret-365-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 180,
      name: 'Karmen  Kattat Gofret',
      image: 'https://docsd.ceptesok.com/product/420x420/5c089_3_Kattat_Gofret_80_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 181,
      name: 'Ülker Çizi Kraker Sade',
      image: 'https://docsd.ceptesok.com/product/420x420/5dc3e_Cizi_Kraker_Sade_70_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 182,
      name: 'Today Snowball Kek Hidistan Cevizli',
      image: 'https://docsd.ceptesok.com/product/420x420/bc119_Today_Snowball_Kek_60_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 183,
      name: 'Amigo Badem İçi',
      image: 'https://docsd.ceptesok.com/product/420x420/340fb_Badem_Ici_150_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 184,
      name: 'Lays Yoğurt Mevsim Yeşillikleri Patates Cipsi',
      image:
        'https://docsd.ceptesok.com/product/420x420/70e49_Yogurt_Mevsim_Yesillikleri_Patates_Cipsi_107_Gr.png',
      food_category_id: 1,
    },
    {
      id: 185,
      name: "M&amp;M''S  Çikolatalı Draje",
      image:
        'https://docsd.ceptesok.com/product/420x420/m-ms-m-ms-cikolatali-draje-45-gr-63249.jpg',
      food_category_id: 1,
    },
    {
      id: 186,
      name: 'Oneo Slims Yeşil Nane Aromalı Sakız',
      image:
        'https://docsd.ceptesok.com/product/420x420/e13d2_slims-yesil-nane-aromali-sakiz-14-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 187,
      name: 'Haribo Chammallows',
      image: 'https://docsd.ceptesok.com/product/420x420/30e43_chammallows-130-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 188,
      name: 'Nestle Classic Beyaz Çikolata',
      image: 'https://docsd.ceptesok.com/product/420x420/ab264_Classic_Beyaz_Cikolata_60_Gr.JPG',
      food_category_id: 1,
    },
    {
      id: 189,
      name: 'Ülker Biskrem Rulo Bisküvi',
      image: 'https://docsd.ceptesok.com/product/420x420/20e0b_Biskrem_Rulo_100_Gr.PNG',
      food_category_id: 1,
    },
    {
      id: 190,
      name: 'Ülker Çikolatalı Gofret Bitter',
      image: 'https://docsd.ceptesok.com/product/420x420/c30e7_Cikolatali_Gofret_Bitter_36_Gr.JPG',
      food_category_id: 1,
    },
    {
      id: 191,
      name: 'Ülker Çiziviç  Peynirli Sandviç Kraker',
      image:
        'https://docsd.ceptesok.com/product/420x420/b98fa_Cizivic__Peynirli_Sandvic_Kraker_82_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 192,
      name: 'Eti Browni Intense Kek',
      image: 'https://docsd.ceptesok.com/product/420x420/e3396_browni-intense-48-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 193,
      name: 'Amigo Fındık İçi',
      image: 'https://docsd.ceptesok.com/product/420x420/4805c_Findik_Ici_150_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 194,
      name: 'Lays Fırından Süper Boy Patates Cipsi',
      image:
        'https://docsd.ceptesok.com/product/420x420/f4e77_Firindan_Super_Boy_Patates_Cipsi_96_Gr.png',
      food_category_id: 1,
    },
    {
      id: 195,
      name: 'Oneo Slims Karpuz Aromalı  Sakız',
      image:
        'https://docsd.ceptesok.com/product/420x420/71a43_Slims_Karpuz_Aromali__Sakiz_14_Gr.JPG',
      food_category_id: 1,
    },
    {
      id: 196,
      name: 'Haribo Party Mix Şekerleme',
      image: 'https://docsd.ceptesok.com/product/420x420/4b07a_Party_Mix_130_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 197,
      name: 'Eti Lifalif Kırmızı Meyveli',
      image:
        'https://docsd.ceptesok.com/product/420x420/1933b_eti-lifalif-kirmizi-meyveli-35-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 198,
      name: 'Bisto Damla Kurabiye Çeşitleri',
      image: 'https://docsd.ceptesok.com/product/420x420/8fd5a_Damla_Kurabiye_Cesitleri_230_Gr.jpg',
      food_category_id: 1,
    },
    {
      id: 199,
      name: 'Ülker Napoliten Çikolata',
      image: 'https://docsd.ceptesok.com/product/420x420/43d6a_napoliten-33-gr.jpg',
      food_category_id: 1,
    },
    {
      id: 200,
      name: 'Nestle Damak Kare Antep Fıstıklı Çikolata',
      image: 'https://docsd.ceptesok.com/product/420x420/335b2_Damak_Kare_Antep_Fistikli_60_Gr.PNG',
      food_category_id: 1,
    },
    {
      id: 201,
      name: 'İnci Garnitür',
      image: 'https://docsd.ceptesok.com/product/420x420/bf857_garnitur-450-gr.jpg',
      food_category_id: 2,
    },
    {
      id: 202,
      name: 'Domates Rio  .',
      image: 'https://docsd.ceptesok.com/product/420x420/65f01_Domates_Rio__Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 203,
      name: 'İnci Bezelye',
      image: 'https://docsd.ceptesok.com/product/420x420/1ab6d_Bezelye_450_Gr.jpg',
      food_category_id: 2,
    },
    {
      id: 204,
      name: 'Patates',
      image: 'https://docsd.ceptesok.com/product/420x420/5b07d_Patates_Kg.jpg',
      food_category_id: 2,
    },
    {
      id: 205,
      name: 'Şeker Domates Adet',
      image: 'https://docsd.ceptesok.com/product/420x420/bcb5d_seker_Domates_Adet_.jpg',
      food_category_id: 2,
    },
    {
      id: 206,
      name: 'Ceviz Hindistan Ad.',
      image: 'https://docsd.ceptesok.com/product/420x420/7c868_Ceviz_Hindistan_Ad._.jpg',
      food_category_id: 2,
    },
    {
      id: 207,
      name: 'Superfresh  Bezelye',
      image: 'https://docsd.ceptesok.com/product/420x420/0bc8c_bezelye-450-gr.jpg',
      food_category_id: 2,
    },
    {
      id: 208,
      name: 'Salata Kıvırcık(adet)',
      image: 'https://docsd.ceptesok.com/product/420x420/4026b_Salata_Kivircikadet_.jpg',
      food_category_id: 2,
    },
    {
      id: 209,
      name: 'Maydanoz Dmt.',
      image: 'https://docsd.ceptesok.com/product/420x420/23777_Maydanoz_Dmt._.jpg',
      food_category_id: 2,
    },
    {
      id: 210,
      name: 'İnci Tane Mısır',
      image: 'https://docsd.ceptesok.com/product/420x420/f8873_tane-misir-450-gr.jpg',
      food_category_id: 2,
    },
    {
      id: 211,
      name: 'Dereotu Dmt.',
      image: 'https://docsd.ceptesok.com/product/420x420/f0967_Dereotu_Dmt._.jpg',
      food_category_id: 2,
    },
    {
      id: 212,
      name: 'Roka Demet',
      image: 'https://docsd.ceptesok.com/product/420x420/2db58_Roka_Demet_.jpg',
      food_category_id: 2,
    },
    {
      id: 213,
      name: 'Salata Atom Adet',
      image: 'https://docsd.ceptesok.com/product/420x420/07334_Salata_Atom_Adet_.jpg',
      food_category_id: 2,
    },
    {
      id: 214,
      name: 'İnci Elma Dilim Patates',
      image: 'https://docsd.ceptesok.com/product/420x420/63243_elma-dilim-patates-1-kg.jpg',
      food_category_id: 2,
    },
    {
      id: 215,
      name: 'İnci Patates',
      image: 'https://docsd.ceptesok.com/product/420x420/16a9b_Patates_1000gr.png',
      food_category_id: 2,
    },
    {
      id: 216,
      name: 'Domates',
      image: 'https://docsd.ceptesok.com/product/420x420/112c4_Domates_Kg_.jpg',
      food_category_id: 2,
    },
    {
      id: 217,
      name: 'Salkım Domates .',
      image: 'https://docsd.ceptesok.com/product/420x420/bb350_Domates_Salkim_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 218,
      name: 'İnci Soğan Halkası',
      image: 'https://docsd.ceptesok.com/product/420x420/7ad92_sogan-halkasi-450-gr.jpg',
      food_category_id: 2,
    },
    {
      id: 219,
      name: 'Mandalina',
      image: 'https://docsd.ceptesok.com/product/420x420/61bf3_Mandalina_Kg.jpg',
      food_category_id: 2,
    },
    {
      id: 220,
      name: 'Kavun Kırkağaç',
      image: 'https://docsd.ceptesok.com/product/420x420/6ebbe_Kavun_Kirkagac_Kg.jpg',
      food_category_id: 2,
    },
    {
      id: 221,
      name: 'Nane Dmt.',
      image: 'https://docsd.ceptesok.com/product/420x420/64d96_Nane_Dmt._.jpg',
      food_category_id: 2,
    },
    {
      id: 222,
      name: 'Kuru Soğan',
      image: 'https://docsd.ceptesok.com/product/420x420/6c6b7_Kuru_Sogan_Kg.jpg',
      food_category_id: 2,
    },
    {
      id: 223,
      name: 'Soğan Taze Demet',
      image: 'https://docsd.ceptesok.com/product/420x420/17ed9_Sogan_Taze_Demet.jpg',
      food_category_id: 2,
    },
    {
      id: 224,
      name: 'Quru Kurutulmuş Çilek',
      image: 'https://docsd.ceptesok.com/product/420x420/880a2_Kurutulmus_Cilek_19_Gr.jpg',
      food_category_id: 2,
    },
    {
      id: 225,
      name: 'Quru Kurutulmuş Portakal',
      image: 'https://docsd.ceptesok.com/product/420x420/b2b5c_Kurutulmus_Portakal_18_Gr.jpg',
      food_category_id: 2,
    },
    {
      id: 226,
      name: 'Quru Kurutulmuş Trabzon Hurması',
      image:
        'https://docsd.ceptesok.com/product/420x420/bc8dd_Kurutulmus_Trabzon_Hurmasi_19_Gr.jpg',
      food_category_id: 2,
    },
    {
      id: 227,
      name: 'Sarımsak Kuru',
      image: 'https://docsd.ceptesok.com/product/420x420/23f65_Sarimsak_Kuru_Kg.jpg',
      food_category_id: 2,
    },
    {
      id: 228,
      name: 'Salatalık',
      image: 'https://docsd.ceptesok.com/product/420x420/a4a87_Salatalik_Kg_.jpg',
      food_category_id: 2,
    },
    {
      id: 229,
      name: 'Çengelköy Salatalık',
      image: 'https://docsd.ceptesok.com/product/420x420/591a3_Cengelkoy_Salatalik_Kg_.jpg',
      food_category_id: 2,
    },
    {
      id: 230,
      name: 'Erik Anjelik .',
      image: 'https://docsd.ceptesok.com/product/420x420/3c37e_Erik_Anjelik_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 231,
      name: 'Sarımsak   .',
      image: 'https://docsd.ceptesok.com/product/420x420/a4306_Sarimsak__250_Gr._.jpg',
      food_category_id: 2,
    },
    {
      id: 232,
      name: 'Amigo Dalından Meyve Mıx',
      image: 'https://docsd.ceptesok.com/product/420x420/9a64c_Dalindan_Meyve_Mix_250_Gr.jpg',
      food_category_id: 2,
    },
    {
      id: 233,
      name: 'Limon',
      image: 'https://docsd.ceptesok.com/product/420x420/7b5b5_limon-mayer-kg.jpg',
      food_category_id: 2,
    },
    {
      id: 234,
      name: 'Amigo Dalından Kuru Üzüm',
      image: 'https://docsd.ceptesok.com/product/420x420/8bd6b_dalindan-kuru-uzum-500-gr.jpg',
      food_category_id: 2,
    },
    {
      id: 235,
      name: 'Patlıcan Kemer .',
      image: 'https://docsd.ceptesok.com/product/420x420/b4841_Patlican_Kemer_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 236,
      name: 'Havuç',
      image: 'https://docsd.ceptesok.com/product/420x420/be94a_Havuc_Kg_.jpg',
      food_category_id: 2,
    },
    {
      id: 237,
      name: 'Kabak Sakız .',
      image: 'https://docsd.ceptesok.com/product/420x420/b08d3_Kabak_Sakiz_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 238,
      name: 'Yerli Muz',
      image: 'https://docsd.ceptesok.com/product/420x420/9613c_Muz_Yerli_Kg_.jpg',
      food_category_id: 2,
    },
    {
      id: 239,
      name: 'Kivi',
      image: 'https://docsd.ceptesok.com/product/420x420/9507d_Kivi_Kg.jpg',
      food_category_id: 2,
    },
    {
      id: 240,
      name: 'Biber Sivri .',
      image: 'https://docsd.ceptesok.com/product/420x420/43c94_Biber_Sivri_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 241,
      name: 'Elma Starking .',
      image: 'https://docsd.ceptesok.com/product/420x420/1d0a2_Elma_Starking_Kg..jpg',
      food_category_id: 2,
    },
    {
      id: 242,
      name: 'Elma anny',
      image: 'https://docsd.ceptesok.com/product/420x420/ce378_Elma_Granny_Kg_.jpg',
      food_category_id: 2,
    },
    {
      id: 243,
      name: 'Elma Golden',
      image: 'https://docsd.ceptesok.com/product/420x420/141bb_Elma_Golden_Kg_.jpg',
      food_category_id: 2,
    },
    {
      id: 244,
      name: 'Kokteyl Domates Paket',
      image: 'https://docsd.ceptesok.com/product/420x420/1bf64_Kokteyl_Domates_Paket.JPG',
      food_category_id: 2,
    },
    {
      id: 245,
      name: 'Domates Pembe',
      image: 'https://docsd.ceptesok.com/product/420x420/ae7e5_Domates_Pembe_Kg_.jpg',
      food_category_id: 2,
    },
    {
      id: 246,
      name: 'Çarliston Biber .',
      image: 'https://docsd.ceptesok.com/product/420x420/5ce0d_Biber_Carliston_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 247,
      name: 'Çalı Fasulye .',
      image: 'https://docsd.ceptesok.com/product/420x420/b272e_Fasulye_Cali_Kg._.jpeg',
      food_category_id: 2,
    },
    {
      id: 248,
      name: 'Amigo Dalından Kuru Kayısı',
      image:
        'https://docsd.ceptesok.com/product/420x420/2876c_Amigo__Dalindan_Kuru_Kayisi_250_Gr.JPG',
      food_category_id: 2,
    },
    {
      id: 249,
      name: 'Quru Kurutulmuş Vişne',
      image: 'https://docsd.ceptesok.com/product/420x420/217b0_Quru_Kurutulmus_Visne_18_Gr.jpg',
      food_category_id: 2,
    },
    {
      id: 250,
      name: 'Armut Sanmaria',
      image: 'https://docsd.ceptesok.com/product/420x420/9595b_Armut_Sanmaria_Kg.jpg',
      food_category_id: 2,
    },
    {
      id: 251,
      name: 'Kırmızı Biber .',
      image: 'https://docsd.ceptesok.com/product/420x420/96981_Biber_Kirmizi_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 252,
      name: 'Lahana Kırmızı .',
      image: 'https://docsd.ceptesok.com/product/420x420/b3ae5_Lahana_Kirmizi_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 253,
      name: 'Avokado / Adet',
      image: 'https://docsd.ceptesok.com/product/420x420/3c0b6_avakado-adet.jpg',
      food_category_id: 2,
    },
    {
      id: 254,
      name: 'Fasulye Taze',
      image: 'https://docsd.ceptesok.com/product/420x420/1ec15_Fasulye_Taze_Kg.jpg',
      food_category_id: 2,
    },
    {
      id: 255,
      name: 'Findik Turp Ad.',
      image: '',
      food_category_id: 2,
    },
    {
      id: 256,
      name: 'Ispanak .',
      image: 'https://docsd.ceptesok.com/product/420x420/39606_Ispanak_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 257,
      name: 'Şeftali .',
      image: 'https://docsd.ceptesok.com/product/420x420/d7593_Seftali_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 258,
      name: 'Çekirdeksiz Üzüm',
      image: 'https://docsd.ceptesok.com/product/420x420/b826a_uzum_cekirdeksiz_Kg._.jpg',
      food_category_id: 2,
    },
    {
      id: 259,
      name: 'Mantar   Pkt',
      image: 'https://docsd.ceptesok.com/product/420x420/2c14a_Mantar_300_Gr_Pkt_.jpg',
      food_category_id: 2,
    },
    {
      id: 260,
      name: 'Portakal .',
      image: 'https://docsd.ceptesok.com/product/420x420/6cd8d_portakal-kg.jpg',
      food_category_id: 2,
    },
    {
      id: 261,
      name: 'Semizotu Demet',
      image: 'https://docsd.ceptesok.com/product/420x420/34a88_Semizotu_Demet.jpg',
      food_category_id: 2,
    },
  ]);
  // we are setting the id_seq of the table manually for later inserts
  await knex.raw("select setval('ingredient_id_seq', max(id)) from ingredient");

  await knex<Recipe>('recipe').insert([
    {
      id: 1,
      name: 'Kremali makarna',
      description:
        'Hazir krema ve penne makarna ile yapilmis harika bir lezzet. Kolay ve doyurucu.',
    },
  ]);

  await knex.raw("select setval('recipe_id_seq', max(id)) from recipe");

  await knex<RecipeIngredient>('recipe_ingredients').insert([
    {
      id: 1,
      recipe_id: 1,
      amount: 1,
      unit_id: 3,
      ingredient_id: 9,
    },
    {
      id: 2,
      recipe_id: 1,
      amount: 0.5,
      unit_id: 3,
      ingredient_id: 10,
    },
    {
      id: 3,
      recipe_id: 1,
      amount: 1,
      unit_id: 7,
      ingredient_id: 11,
    },
    {
      id: 4,
      recipe_id: 1,
      amount: 1,
      unit_id: 2,
      ingredient_id: 12,
    },
  ]);

  await knex.raw("select setval('recipe_ingredients_id_seq', max(id)) from recipe_ingredients");
}
